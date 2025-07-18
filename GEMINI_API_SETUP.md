# 🤖 Gemini AI Integration Setup

This guide will help you integrate your Gemini API key into the GreenCity Challenge app.

## 📋 Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (it will start with something like `AIza...`)

## 🔧 Step 2: Add Your API Key

You have **two options** to add your API key:

### Option A: Environment Variable (Recommended)
1. Create a `.env` file in your project root directory
2. Add your API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. **Important:** Add `.env` to your `.gitignore` file to keep your API key secret

### Option B: Direct Code Edit (Not Recommended for Production)
1. Open `src/components/Chatbot.js`
2. Find this line:
   ```javascript
   const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyC...your_key_here';
   ```

## 🚀 Step 3: Test the Integration

1. Start your app: `npm start`
2. Click the floating chat button (🤖) in the bottom right
3. Ask GreenBot a question like "How can I reduce plastic waste?"
4. You should now get AI-powered responses!

## 🔄 Fallback System

Don't worry if something goes wrong! The app has a built-in fallback system:
- If no API key is provided, it uses the original dummy responses
- If the API fails, it automatically falls back to dummy responses
- Error messages are handled gracefully

## 🛡️ Security Best Practices

1. **Never commit your API key to version control**
2. **Use environment variables** for production
3. **Add `.env` to your `.gitignore`** file
4. **Consider using API key restrictions** in Google Cloud Console

## 🎯 What GreenBot Can Do

With the Gemini API integrated, GreenBot can:
- Answer complex eco-friendly questions
- Provide personalized advice
- Suggest creative solutions
- Give detailed explanations
- Adapt to your specific situation

## 🔍 Troubleshooting

### Issue: "Sorry, I'm having trouble connecting"
- Check your API key is correct
- Verify your internet connection
- Check the browser console for error messages

### Issue: Still getting dummy responses
- Make sure you restarted the app after adding the API key
- Verify the API key starts with `AIza`
- Check that you're using `REACT_APP_GEMINI_API_KEY` (with the `REACT_APP_` prefix)

### Issue: API quota exceeded
- Check your [Google Cloud Console](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)
- Consider implementing rate limiting for production use

## 💡 Example Questions to Try

Once your API is working, try these questions:
- "How can I make my home more energy efficient?"
- "What are some creative ways to upcycle plastic bottles?"
- "Give me a 7-day eco-challenge plan"
- "How do I start a community garden?"
- "What's the environmental impact of different transportation methods?"

## 🌱 Next Steps

- Consider adding user authentication to track usage
- Implement conversation history
- Add more specialized eco-friendly prompts
- Create themed conversation starters

---

Need help? Check the [Gemini API documentation](https://ai.google.dev/docs) or create an issue in this repository! 