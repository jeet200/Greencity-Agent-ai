# 🌱 GreenCity Challenge - Simple MVP

A fun and interactive web app where users can complete eco-friendly challenges, earn points, and get help from an AI chatbot!

## ✨ Features

### 🏠 Home Page
- Welcome message with inspiring eco-friendly messaging
- "Start Challenge" button to navigate to challenges
- Featured daily challenges with "Mark as Done" functionality
- Real-time points counter showing your GreenPoints
- Beautiful gradient designs and emojis

### 🎯 Challenges Page
- 10 unique eco-challenges across different categories
- Challenge difficulty levels (Easy, Medium, Hard)
- Category filtering (Waste, Transportation, Lifestyle, etc.)
- Progress bar showing completion towards goals
- Point rewards for completing challenges

### 👤 Profile Page
- Editable username functionality
- Comprehensive stats dashboard
- Badge system with 8 different achievements
- "Next Badge" progress tracking
- Complete list of completed challenges

### 🤖 AI Chatbot (GreenBot)
- **Full-page modern chat interface** with professional UI
- **Real Gemini AI integration** with fallback responses
- Smart responses to eco-friendly questions
- **Quick question sidebar** for easy interaction
- **Message timestamps** and conversation history
- **Clear chat functionality** to start fresh
- **Typing indicators** and smooth animations
- Pre-built knowledge about:
  - Plastic reduction tips
  - Recycling guidelines
  - Composting advice
  - Energy saving methods
  - Water conservation
  - Eco-challenge suggestions
- **See [GEMINI_API_SETUP.md](GEMINI_API_SETUP.md) for API key setup**

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

The app will automatically reload if you make changes to the source code.

### 🤖 Gemini AI Integration (Optional)

To enable real AI responses in GreenBot:

1. **Get a Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Create a `.env` file** in the project root:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
3. **Restart the app** to load the new environment variable

📖 **Detailed setup guide:** [GEMINI_API_SETUP.md](GEMINI_API_SETUP.md)

**Note:** The app works perfectly without the API key using smart fallback responses!

## 🎮 How to Use

1. **Start on the Home Page:**
   - See your current GreenPoints
   - Try the featured daily challenges
   - Click "Start Challenge" to see more options

2. **Complete Challenges:**
   - Visit the Challenges page
   - Filter by category to find challenges you're interested in
   - Click "Complete Challenge" to earn points
   - Watch your progress bar fill up!

3. **Track Your Progress:**
   - Visit your Profile page
   - Edit your username by clicking the edit button
   - See your earned badges and progress toward next badges
   - Review all your completed challenges

4. **Chat with GreenBot:**
   - Click the floating bot button in the bottom right
   - Ask questions like:
     - "How to reduce plastic?"
     - "Give me an eco-challenge"
     - "What is composting?"
     - "Energy saving tips"

## 💾 Data Persistence

The app uses localStorage to save:
- Your total GreenPoints
- Completed challenges
- Username preferences

Your data persists between browser sessions on the same device.

## 🎨 Design Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern UI:** Clean interface with Tailwind CSS
- **Eco-Friendly Colors:** Green color scheme reflecting environmental themes
- **Emojis & Icons:** Fun visual elements throughout the app
- **Smooth Animations:** Hover effects and transitions

## 🔧 Technical Details

- **Frontend:** React 18 with functional components and hooks
- **Styling:** Tailwind CSS for rapid UI development
- **Routing:** React Router for navigation between pages
- **State Management:** React useState and useEffect hooks
- **Storage:** Browser localStorage for data persistence
- **No Backend:** Fully client-side application

## 🌟 Badge System

Earn badges by completing challenges and earning points:

- 🌱 **Eco Beginner:** Complete your first challenge
- 🌿 **Green Enthusiast:** Complete 5 challenges  
- 🌟 **Eco Warrior:** Complete 10 challenges
- 🏆 **Eco Hero:** Complete 15 challenges
- 🌍 **Planet Champion:** Complete 20 challenges
- 💎 **Point Collector:** Earn 50 points
- 👑 **Point Master:** Earn 100 points
- ⭐ **Point Legend:** Earn 200 points

## 🚀 Future Enhancements

This MVP can be extended with:
- **Real AI Integration:** Connect GreenBot to Gemini API
- **User Authentication:** Add login/signup functionality
- **Social Features:** Share achievements with friends
- **Weekly Challenges:** Time-based challenge system
- **Leaderboards:** Compete with other users
- **Real Impact Tracking:** Calculate actual environmental impact

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with 💚 for a greener planet! 🌍 