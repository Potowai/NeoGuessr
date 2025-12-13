import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Play, PenTool, Globe, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  onCreate: () => void;
  highScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onCreate, highScore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full p-4 animate-in fade-in zoom-in duration-700">
      
      {/* Hero Header */}
      <div className="mb-12 text-center space-y-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="relative text-5xl md:text-8xl font-black font-arcade tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary drop-shadow-[0_0_15px_rgba(0,255,204,0.5)]">
          NEON ATLAS
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light tracking-widest uppercase">
          Global Arcade Exploration
        </p>
        
        {highScore > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mt-4">
             <Trophy className="w-4 h-4 text-yellow-500" />
             <span className="font-arcade text-yellow-500 text-sm">Best Score: {highScore}</span>
          </div>
        )}
      </div>

      {/* Two-Card Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        
        {/* Play Card */}
        <div 
          onClick={onStart}
          className="group cursor-pointer relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#3B0F68] to-[#170419] p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(134,0,240,0.4)]"
        >
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe size={120} />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
              <div>
                 <h2 className="font-arcade text-3xl font-bold text-white mb-2 group-hover:text-[#F900CE] transition-colors">Quick Play</h2>
                 <p className="text-gray-400">Dive into random locations around the world. Race for points.</p>
              </div>
              <Button variant="gradient-left" className="w-full gap-2">
                 <Play size={18} /> Start Mission
              </Button>
           </div>
        </div>

        {/* Create Card */}
        <div 
          onClick={onCreate}
          className="group cursor-pointer relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#2C4569] to-[#09111F] p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(84,151,247,0.4)]"
        >
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <PenTool size={120} />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
              <div>
                 <h2 className="font-arcade text-3xl font-bold text-white mb-2 group-hover:text-[#5497F7] transition-colors">Builder Mode</h2>
                 <p className="text-gray-400">Design your own challenge. Set location, image and clues.</p>
              </div>
              <Button variant="gradient-right" className="w-full gap-2">
                 Create Challenge
              </Button>
           </div>
        </div>

      </div>
      
      <p className="mt-16 text-[10px] text-gray-600 font-arcade tracking-widest uppercase">
        System Active • v0.2.0 • Gemini 2.5
      </p>
    </div>
  );
};