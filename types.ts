export interface LocationData {
  country: string;
  city: string;
  region: string;
  landmark: string;
  clues: string[];
  funFact: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export enum GameView {
  START = 'START',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  CREATE = 'CREATE'
}

export interface GameState {
  score: number;
  round: number;
  totalRounds: number;
  highScore: number;
}
