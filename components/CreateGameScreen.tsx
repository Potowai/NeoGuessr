import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { LocationData } from '../types';
import { ArrowLeft, Copy, Link as LinkIcon, MapPin, Image as ImageIcon, Type } from 'lucide-react';

interface CreateGameScreenProps {
  onBack: () => void;
}

export const CreateGameScreen: React.FC<CreateGameScreenProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    landmark: '',
    city: '',
    country: '',
    clue: '',
    funFact: ''
  });
  
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [pinPos, setPinPos] = useState<{x: number, y: number} | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const lng = (xPercent / 100) * 360 - 180;
    const lat = 90 - (yPercent / 100) * 180;

    setCoordinates({ lat, lng });
    setPinPos({ x: xPercent, y: yPercent });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLink = () => {
    if (!coordinates || !formData.imageUrl || !formData.landmark) return;

    const gameData: LocationData = {
      ...formData,
      region: 'Custom',
      clues: [formData.clue || "No clue provided."],
      coordinates: coordinates,
      imageUrl: formData.imageUrl
    };

    const jsonString = JSON.stringify(gameData);
    const encoded = btoa(unescape(encodeURIComponent(jsonString)));
    
    const url = new URL(window.location.href);
    url.searchParams.set('challenge', encoded);
    setGeneratedLink(url.toString());
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-arcade text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Builder Mode</h2>
        <Button variant="ghost" onClick={onBack} className="text-gray-400">
           <ArrowLeft size={18} className="mr-2"/> Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon size={20} className="text-primary"/> Visual Intel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">Image URL</label>
                <input 
                  name="imageUrl"
                  className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 transition-colors" 
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
                {formData.imageUrl && (
                  <div className="mt-4 relative h-40 w-full bg-black/20 rounded-lg overflow-hidden border border-white/10">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Type size={20} className="text-secondary"/> Data Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">Landmark</label>
                  <input 
                    name="landmark"
                    className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:border-secondary/50" 
                    placeholder="Eiffel Tower"
                    value={formData.landmark}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">City</label>
                  <input 
                    name="city"
                    className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:border-secondary/50" 
                    placeholder="Paris"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">Country</label>
                  <input 
                    name="country"
                    className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:border-secondary/50" 
                    placeholder="France"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">Clue</label>
                  <input 
                    name="clue"
                    className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:border-secondary/50" 
                    placeholder="A hint..."
                    value={formData.clue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                  <label className="text-xs font-arcade uppercase text-gray-500 mb-1 block">Fun Fact (Optional)</label>
                  <input 
                    name="funFact"
                    className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:border-secondary/50" 
                    placeholder="Did you know..."
                    value={formData.funFact}
                    onChange={handleInputChange}
                  />
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin size={20} className="text-accent"/> Coordinate Target</CardTitle>
              <p className="text-sm text-gray-500">Tap map to set the winning location.</p>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              <div 
                className="relative w-full h-full bg-[#1a2333] cursor-crosshair overflow-hidden rounded-xl border border-white/10 shadow-inner" 
              >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full" style={{ aspectRatio: '2/1' }}>
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png" 
                          alt="World Map"
                          className="w-full h-full object-cover pointer-events-none opacity-50 contrast-125"
                        />
                        <div 
                          ref={mapRef}
                          className="absolute inset-0 z-10"
                          onClick={handleMapClick}
                        />
                        {pinPos && (
                          <div 
                            className="absolute w-6 h-6 bg-accent rounded-full border-2 border-white shadow-[0_0_15px_#8600F0] transform -translate-x-1/2 -translate-y-full pointer-events-none"
                            style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                          />
                        )}
                    </div>
                  </div>
              </div>
              {coordinates && (
                <div className="mt-4 p-2 bg-accent/10 border border-accent/30 rounded text-center">
                  <span className="text-accent font-arcade text-xs">Lat: {coordinates.lat.toFixed(4)} | Lng: {coordinates.lng.toFixed(4)}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
              {!generatedLink ? (
                <Button 
                  className="w-full" 
                  onClick={generateLink}
                  variant="gradient-right"
                  disabled={!coordinates || !formData.imageUrl || !formData.landmark}
                >
                  <LinkIcon size={16} className="mr-2"/> Generate Encrypted Link
                </Button>
              ) : (
                <div className="w-full space-y-4 animate-in zoom-in">
                  <div className="p-4 bg-black/50 rounded-lg break-all text-[10px] font-mono border border-white/10 text-gray-400">
                    {generatedLink}
                  </div>
                  <Button className="w-full" onClick={copyToClipboard} variant="secondary">
                    <Copy size={16} className="mr-2"/> Copy Link
                  </Button>
                  <Button className="w-full" onClick={() => setGeneratedLink(null)} variant="ghost">
                    Reset Builder
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};