import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { fetchRandomLocation } from '../services/geminiService';
import { LocationData } from '../types';
import { Plus, Minus, Maximize2, X, MapPin as MapPinIcon, Eye, EyeOff, CheckCircle2, ArrowRight, Home } from 'lucide-react';

interface GameScreenProps {
  onGameOver: (finalScore: number) => void;
  currentScore: number;
  updateScore: (points: number) => void;
  customLocation?: LocationData | null;
}

// MapPin component
const MapPin: React.FC<{ x: number; y: number; color: string; scale: number; label?: string; icon?: React.ReactNode }> = ({ x, y, color, scale, label, icon }) => (
  <div 
    className="absolute flex flex-col items-center group z-10 pointer-events-none"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      transform: `translate(-50%, -100%) scale(${1/scale})`,
      transformOrigin: 'bottom center',
      transition: 'left 0.5s ease-out, top 0.5s ease-out'
    }}
  >
    <div 
      className={`w-10 h-10 rounded-full border-[3px] border-white shadow-[0_0_20px_currentColor] ${color} animate-in zoom-in duration-300 flex items-center justify-center text-white`} 
    >
      {icon || <div className="w-2 h-2 bg-white rounded-full" />}
    </div>
    <div className={`w-0.5 h-6 ${color} opacity-80`} />
    {label && (
       <div className="absolute -top-14 bg-black/90 text-white border border-white/20 text-[12px] px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-arcade uppercase shadow-xl z-50 pointer-events-auto">
         {label}
       </div>
    )}
  </div>
);

export const GameScreen: React.FC<GameScreenProps> = ({ onGameOver, currentScore, updateScore, customLocation }) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [userGuess, setUserGuess] = useState<{ lat: number; lng: number; x: number; y: number } | null>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isHintOpen, setIsHintOpen] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  // Map Navigation State
  const [mapTransform, setMapTransform] = useState({ x: 0, y: 0, scale: 1.2 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapContentRef = useRef<HTMLDivElement>(null);

  const loadRound = async () => {
    setLoading(true);
    setRoundOver(false);
    setUserGuess(null);
    setImageUrl(null);
    setMapTransform({ x: 0, y: 0, scale: 1.2 });
    setIsHintOpen(true);
    setIsImageZoomed(false);

    try {
      const data = customLocation ? customLocation : await fetchRandomLocation();
      setLocation(data);
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRound();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customLocation]);

  // Fit bounds logic when round is over
  useEffect(() => {
    if (roundOver && userGuess && location && mapContentRef.current && mapContainerRef.current) {
        // Calculate the bounding box of the two points (in percentage 0-100)
        const actualPos = latLngToPercent(location.coordinates.lat, location.coordinates.lng);
        
        const minX = Math.min(userGuess.x, actualPos.x);
        const maxX = Math.max(userGuess.x, actualPos.x);
        const minY = Math.min(userGuess.y, actualPos.y);
        const maxY = Math.max(userGuess.y, actualPos.y);

        const width = Math.max(Math.abs(maxX - minX), 10); // Minimum width to prevent infinite zoom
        const height = Math.max(Math.abs(maxY - minY), 10);

        // Map content is 2:1.
        // We want to fit the bounding box into the container view.
        // Container dimensions:
        const containerW = mapContainerRef.current.clientWidth;
        const containerH = mapContainerRef.current.clientHeight;
        
        // Map content logical dimensions (at scale 1):
        // It fits width 100% of container (roughly) in our CSS setup?
        // Actually map-content is width: 100%. So map logical width = containerW.
        // Map logical height = containerW / 2.
        
        // Bounding box in pixels (at scale 1):
        const boxW = (width / 100) * containerW;
        const boxH = (height / 100) * (containerW / 2);
        
        // Scale needed to fit boxW into containerW (with padding)
        const padding = 100; // pixels
        const scaleX = (containerW - padding) / boxW;
        const scaleY = (containerH - padding) / boxH;
        
        let targetScale = Math.min(scaleX, scaleY);
        targetScale = Math.min(Math.max(targetScale, 1), 6); // Clamp

        // Center point in percentages
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Calculate translation to bring (centerX, centerY) to viewport center.
        // At scale S, the map is S times bigger.
        // The transform origin is center.
        // Visual center of map at scale 1 is (50, 50).
        // If we want (centerX, centerY) to be at visual center, we offset by (50 - centerX, 50 - centerY).
        // Since transform scale applies after translate (or before depending on order? default matrix order usually translates then scales if written 'translate scale')
        // But here we write `translate(x, y) scale(s)`.
        // CSS transform order: right to left visually, but locally: translate moves it, then scale scales it at the origin.
        // Actually it's simpler:
        // shiftX = (50 - centerX)% of mapWidth
        // shiftY = (50 - centerY)% of mapHeight
        
        const pixelShiftX = ((50 - centerX) / 100) * containerW;
        const pixelShiftY = ((50 - centerY) / 100) * (containerW / 2);

        // Apply scale * shift? No, translate moves the element, then scale expands it.
        // If origin is center: 
        // We just need to move the logical center to the physical center.
        // Since we scale around center, the centered point stays centered.
        // So we just need to translate the desired center to the geometric center.
        
        // However, if we scale up, the "viewport" on the map shrinks.
        // Let's rely on the translate being in unscaled pixels or scaled pixels?
        // In CSS `transform: translate(Xpx, Ypx) scale(S)`, X and Y are in the coordinate system of the parent usually if they are percentages, but pixels are pixels.
        // If we translate by 100px then scale by 2, visual shift is 100px * ? No, translate happens first.
        
        // Let's try this simple logic which works for 'origin-center':
        // 1. Move map so target is at center.
        // 2. Scale.
        
        setMapTransform({
            scale: targetScale,
            x: pixelShiftX,
            y: pixelShiftY
        });
    }
  }, [roundOver, userGuess, location]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // --- Map Interaction Logic ---

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.003; // Increased speed (was 0.001)
    const newScale = Math.min(Math.max(1, mapTransform.scale + scaleAmount), 8);
    setMapTransform(prev => ({
      ...prev,
      scale: newScale,
      ...(newScale === 1 ? { x: 0, y: 0 } : {})
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current) return;
    
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setIsDragging(true);
      setMapTransform(prev => ({
        ...prev,
        x: prev.x + dx, // Add logic to clamp panning if needed, but unbounded is fun too
        y: prev.y + dy
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    dragStartRef.current = null;
    if (!isDragging) {
      handleMapClick(e);
    }
  };

  const handleMouseLeave = () => {
    // When leaving the map (e.g., to click a button), cancel any drag but DO NOT trigger a click.
    dragStartRef.current = null;
    setIsDragging(false);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (roundOver || !mapContainerRef.current) return;
    const target = e.target as HTMLElement;
    if (!target.closest('.map-layer')) return;
    
    const mapContent = mapContainerRef.current.querySelector('.map-content') as HTMLElement;
    if(!mapContent) return;
    
    const contentRect = mapContent.getBoundingClientRect();
    const clickX = e.clientX - contentRect.left;
    const clickY = e.clientY - contentRect.top;
    
    const xPercent = (clickX / contentRect.width) * 100;
    const yPercent = (clickY / contentRect.height) * 100;

    const lng = (xPercent / 100) * 360 - 180;
    const lat = 90 - (yPercent / 100) * 180;

    setUserGuess({ lat, lng, x: xPercent, y: yPercent });
  };
  
  const latLngToPercent = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const handleGuess = () => {
    if (!location || !userGuess) return;
    setRoundOver(true);
    setIsHintOpen(false); // Auto hide hint to clear view
    
    const distance = calculateDistance(
        userGuess.lat, userGuess.lng,
        location.coordinates.lat, location.coordinates.lng
    );
    const score = Math.round(5000 * Math.exp(-distance / 2000));
    updateScore(score);
  };

  const handleNext = () => {
      if (customLocation) {
          onGameOver(currentScore);
      } else {
          loadRound();
      }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4 animate-pulse">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-white/10" />
        </div>
        <span className="text-primary font-arcade uppercase tracking-widest text-sm">Initializing Satellite Feed...</span>
      </div>
    );
  }

  if (!location) return <div className="p-4 text-center">Failed to load. <Button onClick={loadRound}>Retry</Button></div>;

  const actualPos = roundOver ? latLngToPercent(location.coordinates.lat, location.coordinates.lng) : null;

  return (
    <div className="relative w-full h-[85vh] md:h-auto md:aspect-[2/1] md:min-h-[500px] bg-[#050505] rounded-[28px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group select-none flex flex-col">
       
       {/* 1. Map Viewport */}
       <div 
          ref={mapContainerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full bg-[#050810] cursor-crosshair overflow-hidden flex items-center justify-center bg-grid-pattern"
       >
          <div 
            ref={mapContentRef}
            className="map-content absolute origin-center will-change-transform map-layer"
            style={{ 
              width: '100%',
              aspectRatio: '2 / 1',
              transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)'
            }}
          >
             {/* Map Image with Neon Filter */}
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png" 
               alt="World Map"
               draggable={false}
               className="w-full h-full block pointer-events-none select-none"
               style={{
                 filter: 'invert(1) grayscale(1) brightness(0.7) contrast(2) drop-shadow(0 0 2px rgba(0,255,204,0.3))'
               }}
             />
             
             {/* Pins Layer */}
             {userGuess && (
               <MapPin 
                  x={userGuess.x} 
                  y={userGuess.y} 
                  color="bg-secondary text-secondary-foreground shadow-[0_0_15px_#F900CE]" 
                  scale={mapTransform.scale}
                  label="Your Drop"
               />
             )}

             {roundOver && actualPos && (
               <>
                 <MapPin 
                    x={actualPos.x} 
                    y={actualPos.y} 
                    color="bg-primary text-primary-foreground shadow-[0_0_15px_#00FFCC]" 
                    scale={mapTransform.scale}
                    label={location.city}
                    icon={<CheckCircle2 size={24} />}
                 />
                 
                 {/* Animated Result Line */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                   <defs>
                     <filter id="glow">
                       <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                       <feMerge>
                         <feMergeNode in="coloredBlur"/>
                         <feMergeNode in="SourceGraphic"/>
                       </feMerge>
                     </filter>
                   </defs>
                   <line 
                     x1={`${userGuess!.x}%`} 
                     y1={`${userGuess!.y}%`} 
                     x2={`${actualPos.x}%`} 
                     y2={`${actualPos.y}%`} 
                     stroke="#00FFCC" 
                     strokeWidth={3 / mapTransform.scale} 
                     strokeDasharray="10" 
                     className="animate-dash"
                     filter="url(#glow)"
                     strokeLinecap="round"
                   />
                 </svg>
               </>
             )}
          </div>
       </div>

       {/* 2. HUD Layers */}
       
       {/* Top Bar */}
       <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 pointer-events-none">
          <div className="pointer-events-auto bg-black/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
             <div className="flex flex-col leading-none">
                <span className="font-arcade text-gray-500 text-[10px] uppercase tracking-wider">Score</span>
                <span className="font-arcade text-white text-lg font-bold">{currentScore}</span>
             </div>
          </div>
          
          <Button 
            size="icon" 
            variant="destructive" 
            onClick={() => onGameOver(currentScore)} 
            className="pointer-events-auto rounded-full w-10 h-10 shadow-lg border border-white/20"
            title="Exit Mission"
          >
             <X size={18} />
          </Button>
       </div>

       {/* Top Right: Hint Toggle */}
       {!roundOver && (
         <div className="absolute top-20 right-4 z-20 pointer-events-none">
             <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => setIsHintOpen(!isHintOpen)}
                className="pointer-events-auto flex gap-2 font-arcade uppercase text-[10px] tracking-widest border-white/20 shadow-lg"
             >
                {isHintOpen ? <><EyeOff size={14} /> Hide Intel</> : <><Eye size={14} /> Show Intel</>}
             </Button>
         </div>
       )}

       {/* Clue/Intel Card - Hidden when round over */}
       {isHintOpen && !roundOver && (
         <div className="absolute top-32 right-4 w-64 md:w-72 z-20 pointer-events-auto animate-in slide-in-from-right-10 fade-in duration-300">
            <Card className="overflow-hidden border-white/20 bg-[#0A090F]/90 backdrop-blur-md shadow-2xl">
               <div className="relative h-32 w-full bg-black/50 group cursor-pointer" onClick={() => setIsImageZoomed(true)}>
                  <img 
                     src={imageUrl || `https://placehold.co/800x450?text=${location.city}`} 
                     className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100" 
                     alt="Target"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Maximize2 className="text-white drop-shadow-md" size={24} />
                  </div>
                  <div className="absolute top-2 left-2 bg-primary/90 text-black text-[10px] px-2 py-0.5 rounded-sm font-arcade font-bold uppercase tracking-wider">
                    Target Alpha
                  </div>
               </div>
               <div className="p-3 border-t border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="text-[10px] text-primary font-arcade uppercase tracking-widest mb-1 flex items-center gap-1">
                    <MapPinIcon size={10} /> Clue Sequence
                  </div>
                  <p className="text-xs font-medium text-gray-200 leading-relaxed font-sans">{location.clues[0]}</p>
               </div>
            </Card>
         </div>
       )}

       {/* Image Zoom Modal */}
       {isImageZoomed && (
         <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsImageZoomed(false)}>
            <div className="relative max-w-5xl w-full max-h-[90vh]">
               <img 
                 src={imageUrl || ''} 
                 className="w-full h-full object-contain rounded-lg border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                 alt="Enlarged View" 
               />
               <Button 
                  className="absolute -top-12 right-0 rounded-full" 
                  variant="secondary"
                  onClick={(e) => { e.stopPropagation(); setIsImageZoomed(false); }}
               >
                 <X size={20} /> Close View
               </Button>
            </div>
         </div>
       )}

       {/* Round Result - Bottom Sheet style */}
       {roundOver && (
          <div className="absolute bottom-0 left-0 right-0 z-40 p-4 animate-in slide-in-from-bottom-full duration-500">
             <Card className="w-full mx-auto max-w-xl pointer-events-auto border-t border-l border-r border-white/20 md:border-b md:rounded-b-lg rounded-b-none bg-[#0A090F]/95 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-[0_0_50px_rgba(0,0,0,0.8)] md:mb-6">
                <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                   
                   <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-arcade uppercase tracking-[0.2em] text-xs">
                         <CheckCircle2 size={14} /> Mission Status
                      </div>
                      <div className="text-3xl font-black text-white font-arcade drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                          {calculateDistance(userGuess!.lat, userGuess!.lng, location.coordinates.lat, location.coordinates.lng).toFixed(0)} <span className="text-sm text-gray-500 font-normal">km off</span>
                      </div>
                      <div className="text-sm text-gray-400">
                         {location.landmark}, {location.city}, {location.country}
                      </div>
                   </div>

                   <div className="flex-1 w-full md:w-auto">
                      <Button onClick={handleNext} className="w-full h-14 font-arcade tracking-wider text-sm md:text-base shadow-[0_0_20px_rgba(84,151,247,0.4)]" variant="gradient-right">
                         {customLocation ? <><Home size={18} className="mr-2"/> Finish Mission</> : <><ArrowRight size={18} className="mr-2"/> Next Target</>}
                      </Button>
                   </div>
                </div>
                {/* Fun Fact Strip */}
                <div className="px-6 pb-6 pt-0">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-gray-400 italic text-center md:text-left">
                         "{location.funFact}"
                    </div>
                </div>
             </Card>
          </div>
       )}

       {/* Bottom Controls (Only when playing) */}
       {!roundOver && (
         <>
            {/* Zoom Controls */}
            <div className="absolute bottom-28 right-4 flex flex-col gap-3 z-20 pointer-events-none">
               <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={() => setMapTransform(p => ({ ...p, scale: Math.min(p.scale + 0.5, 8) }))} 
                  className="pointer-events-auto rounded-full w-12 h-12 shadow-lg border-white/20 hover:border-primary/50 bg-black/50 backdrop-blur"
                >
                  <Plus size={20} />
               </Button>
               <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={() => setMapTransform(p => ({ ...p, scale: Math.max(p.scale - 0.5, 1) }))} 
                  className="pointer-events-auto rounded-full w-12 h-12 shadow-lg border-white/20 hover:border-primary/50 bg-black/50 backdrop-blur"
                >
                  <Minus size={20} />
               </Button>
            </div>

            {/* Confirm Guess Button */}
            {userGuess && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none px-4">
                   <Button 
                      onClick={(e) => { e.stopPropagation(); handleGuess(); }} 
                      className="pointer-events-auto shadow-[0_0_30px_rgba(0,255,204,0.4)] px-8 py-4 text-base md:text-lg animate-in slide-in-from-bottom-10 zoom-in font-arcade tracking-widest w-full max-w-sm rounded-full border border-primary/50"
                      variant="default" // Using default neon teal for confirm
                   >
                      CONFIRM DROP
                   </Button>
              </div>
            )}
         </>
       )}
    </div>
  );
};