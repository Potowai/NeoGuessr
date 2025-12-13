# 🌏 Neon Atlas

**Neon Atlas** is a high-octane geography guessing game with a futuristic arcade aesthetic. Explore the world, decipher clues, and drop your pin on the map to rack up points.

![Neon Atlas Banner](https://placehold.co/1200x400/050505/00FFCC?text=NEON+ATLAS&font=chakra)

## 🕹️ Gameplay

### **Quick Play**
- You are presented with a satellite image, a landmark name, and cryptic clues.
- Navigate the neon-styled world map using drag and scroll (or pinch-to-zoom).
- **Drop your pin** where you think the location is.
- Score points based on accuracy (distance from the target).
- Aim for the High Score!

### **Builder Mode**
- Create your own custom challenges.
- Input an image URL, location details, and clues.
- Set the winning coordinates on the map.
- **Generate a shareable link** to challenge your friends with your custom mission.

## ✨ Features

- **Cyberpunk / Arcade Aesthetic**: Glowing neon UI, CRT scanline effects, and grid patterns.
- **Interactive Map**: Custom-styled world map with smooth zooming, panning, and animations.
- **Dynamic Result Visualization**: Animated dashed lines connect your guess to the actual location.
- **Mobile Optimized**: Bottom-sheet style results and touch-friendly controls.
- **Google GenAI Integration**: Powered by Gemini for generating location data (simulated/ready for API integration).

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables (Theming)
- **Icons**: Lucide React
- **Fonts**: Chakra Petch (Headers), Inter (Body)
- **Build Tooling**: ES Modules via `importmap` (No bundler required for devvit webview context)

## 🚀 Getting Started

This project is designed to run in a webview environment (like Reddit Devvit) or a standard browser.

### Local Development

1. **Clone the repository**
2. **Serve the file**: Since this uses ES modules directly in the browser, you need a local static server.
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` (or whatever port is assigned).

## 🎨 Customization

The visual theme is controlled via CSS variables in `index.html`. You can easily adjust the color palette for different "Neon" vibes:

```css
:root {
  --primary: 168 100% 50%; /* Neon Teal */
  --secondary: 290 100% 49%; /* Neon Magenta */
  --accent: 270 100% 47%; /* Neon Purple */
  --background: 240 5% 2%; /* Deep Space Black */
}
```

## 📝 License

MIT License.
