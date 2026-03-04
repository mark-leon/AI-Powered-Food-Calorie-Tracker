# 🍎 Cal AI - AI-Powered Calorie Tracker

A React Native + Expo app that lets users snap a photo of their meal and get instant nutritional breakdowns, track weight progress, and compare before/after photos.

## 📱 Screens

| Screen | Description |
|--------|-------------|
| **Home** | Daily calorie dashboard with macro rings, streak badge, and food log |
| **Camera** | Food scanner with AI detection overlays (Scan, Barcode, Label, Library modes) |
| **Nutrition** | Detailed breakdown: calories, macros, ingredients with serving size control |
| **Progress** | Weight chart, streak tracker, calorie averages |
| **Compare** | Before/after photo slider with weight diff display |
| **Settings** | Goals, macros, preferences, account |

## 🚀 Setup

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)

### Install & Run

```bash
npm install
npx expo start
```

Scan the QR code with your Expo Go app, or press:
- `i` for iOS Simulator
- `a` for Android Emulator
- `w` for Web browser

## 🔌 AI Integration (OpenRouter)

To connect real AI food recognition, update `src/screens/CameraScreen.js`:

```javascript
// Replace the mock detection with real API call
const analyzeFood = async (base64Image) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOUR_OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-flash-1.5',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64Image}` }
          },
          {
            type: 'text',
            text: `Analyze this food image. Return JSON with: 
            { name, calories, protein_g, carbs_g, fat_g, 
              ingredients: [{name, calories, amount}] }`
          }
        ]
      }]
    })
  });
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};
```

## 📁 Project Structure

```
CalAI/
├── App.js                    # Navigation setup
├── app.json                  # Expo config
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Main dashboard
│   │   ├── CameraScreen.js   # Food scanner
│   │   ├── NutritionScreen.js # Food details
│   │   ├── ProgressScreen.js  # Charts & stats
│   │   ├── CompareScreen.js   # Before/after
│   │   └── SettingsScreen.js  # App settings
│   ├── components/           # Reusable components
│   └── utils/               # Helpers
└── assets/                  # Icons, images
```

## 🎨 Design

Faithful to the Cal AI design language:
- Clean black & white primary palette
- Orange/flame accent for calories and streaks  
- Green for positive progress
- Card-based layout with subtle shadows
- Bottom tab navigation: Home, Progress, Settings
- FAB (floating action button) for quick food logging

## 📦 Key Dependencies

- `expo-camera` - Camera access for food scanning
- `expo-image-picker` - Photo library access
- `react-native-chart-kit` - Weight progress charts
- `@react-navigation/bottom-tabs` - Tab navigation
- `@expo/vector-icons` - Ionicons icon set
