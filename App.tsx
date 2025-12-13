import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CreateGameScreen } from './components/CreateGameScreen';
import { Button } from './components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { GameView, LocationData } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<GameView>(GameView.START);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [customLocation, setCustomLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    // Check for "challenge" param in URL
    const searchParams = new URLSearchParams(window.location.search);
    const challengeParam = searchParams.get('challenge');

    if (challengeParam) {
      try {
        // Decode base64 json
        // Using decodeURIComponent(escape(atob())) to handle utf-8 properly
        const jsonString = decodeURIComponent(escape(window.atob(challengeParam)));
        const data = JSON.parse(jsonString) as LocationData;
        
        if (data && data.coordinates && data.imageUrl) {
          setCustomLocation(data);
          setView(GameView.PLAYING);
        }
      } catch (e) {
        console.error("Failed to parse challenge URL", e);
      }
    }
  }, []);

  const handleStartGame = () => {
    setScore(0);
    setCustomLocation(null);
    setView(GameView.PLAYING);
  };

  const handleCreateGame = () => {
    setView(GameView.CREATE);
  };

  const handleGameOver = (finalScore: number) => {
    if (finalScore > highScore && !customLocation) {
      // Only update high score for regular games, not custom challenges
      setHighScore(finalScore);
    }
    setView(GameView.GAME_OVER);
  };

  const updateScore = (points: number) => {
    setScore(prev => prev + points);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col font-sans selection:bg-primary selection:text-black">
      <main className={`flex-1 w-full mx-auto flex flex-col transition-all duration-300 ${view === GameView.PLAYING ? 'max-w-5xl p-2 md:p-6' : 'max-w-6xl p-6'}`}>
        {view === GameView.START && (
          <StartScreen 
            onStart={handleStartGame} 
            onCreate={handleCreateGame}
            highScore={highScore} 
          />
        )}
        
        {view === GameView.CREATE && (
          <CreateGameScreen onBack={() => setView(GameView.START)} />
        )}

        {view === GameView.PLAYING && (
          <GameScreen 
            onGameOver={handleGameOver} 
            currentScore={score}
            updateScore={updateScore}
            customLocation={customLocation}
          />
        )}

        {view === GameView.GAME_OVER && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in duration-300">
             <Card className="w-full max-w-lg text-center border-white/20 bg-black/80 backdrop-blur-xl">
               <CardHeader>
                 <CardTitle className="text-4xl text-primary drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">
                    {customLocation ? "Mission Debrief" : "Game Over"}
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-8 p-8">
                 <div className="space-y-2">
                   <p className="text-gray-400 font-arcade uppercase tracking-widest text-xs">Final Score</p>
                   <p className="text-7xl font-black text-white font-arcade">{score}</p>
                 </div>
                 
                 {score >= highScore && score > 0 && !customLocation && (
                   <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-arcade uppercase tracking-wider animate-pulse border border-yellow-500/50">
                     New High Score! 🏆
                   </div>
                 )}
                 
                 <div className="pt-4 space-y-3">
                   <Button onClick={handleStartGame} variant="gradient-left" size="lg" className="w-full">
                     Replay Mission
                   </Button>
                   <Button onClick={() => {
                        setCustomLocation(null);
                        setView(GameView.START);
                        // Clean url
                        window.history.pushState({}, '', window.location.pathname);
                   }} variant="ghost" className="w-full">
                     Return to Base
                   </Button>
                 </div>
               </CardContent>
             </Card>
          </div>
        )}
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center text-[10px] text-gray-700 font-arcade uppercase tracking-widest">
        <p>Neon Atlas Systems &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;