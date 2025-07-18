import React, { useState, useRef, useEffect } from 'react';

// IMPORTANT: Add your Gemini API key here or use environment variables
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';

// Fallback dummy responses if API fails
function getFallbackResponse(input) {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('plastic')) {
    return "🌊 Avoid single-use plastics! Try using reusable bags, bottles, and containers. Every small change helps reduce ocean pollution!";
  }
  
  if (lowerInput.includes('bike') || lowerInput.includes('bicycle')) {
    return "🚴‍♀️ Biking reduces CO2 emissions and keeps you healthy! It's one of the most eco-friendly ways to travel. Great choice!";
  }
  
  if (lowerInput.includes('recycle') || lowerInput.includes('recycling')) {
    return "♻️ Recycling is amazing! Remember to clean containers, separate materials, and check your local recycling guidelines. Every item counts!";
  }
  
  if (lowerInput.includes('compost')) {
    return "🌱 Composting turns organic waste into nutrient-rich soil! Start with fruit peels, vegetable scraps, and coffee grounds. Avoid meat and dairy.";
  }
  
  if (lowerInput.includes('energy') || lowerInput.includes('electricity')) {
    return "💡 Save energy by using LED bulbs, unplugging devices, and using natural light when possible. Small actions make a big difference!";
  }
  
  if (lowerInput.includes('water')) {
    return "💧 Conserve water by taking shorter showers, fixing leaks, and using a dishwasher instead of hand washing. Every drop matters!";
  }
  
  if (lowerInput.includes('challenge') || lowerInput.includes('eco challenge')) {
    return "🎯 Try these eco-challenges: Use reusable bags, take shorter showers, bike instead of driving, or start composting! Pick one and start today!";
  }
  
  if (lowerInput.includes('tree') || lowerInput.includes('plant')) {
    return "🌳 Trees are nature's air purifiers! Plant native species, support reforestation projects, or even grow herbs on your windowsill!";
  }
  
  if (lowerInput.includes('food') || lowerInput.includes('eat')) {
    return "🥗 Eat more plants, buy local produce, and reduce food waste! Even one plant-based meal per week makes a positive impact!";
  }
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return "👋 Hello! I'm GreenBot, your eco-friendly assistant! Ask me about recycling, biking, composting, or any green living tips!";
  }
  
  if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
    return "🤖 I can help you with eco-friendly tips! Ask me about: plastic alternatives, recycling, composting, energy saving, water conservation, or eco challenges!";
  }
  
  return "🌱 That's a great question! Try recycling, biking, composting, or taking shorter showers today. Every eco-friendly action helps our planet!";
}

// Real Gemini API integration
async function getBotResponse(input) {
  // If no API key is provided, use fallback responses
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return getFallbackResponse(input);
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are GreenBot, an eco-friendly assistant for the GreenCity Challenge app. Keep responses under 150 words, use emojis, be friendly and encouraging, and focus on practical eco-friendly advice. Always provide actionable tips. User question: ${input}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackResponse(input);
  }
}

function ChatBot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hello! I'm GreenBot, your personal eco-friendly assistant! I'm here to help you live a more sustainable lifestyle. Feel free to ask me about recycling, energy saving, sustainable living, eco-challenges, or any environmental questions you have!", 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await getBotResponse(userInput);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "🤖 Sorry, I'm having trouble connecting right now. Try asking about recycling, biking, or composting!",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { text: "How can I reduce plastic waste?", icon: "♻️" },
    { text: "Give me an eco-challenge for today", icon: "🎯" },
    { text: "What is composting and how do I start?", icon: "🌱" },
    { text: "Energy saving tips for my home", icon: "💡" },
    { text: "Sustainable transportation options", icon: "🚴‍♀️" },
    { text: "How to start a zero-waste lifestyle?", icon: "🌍" }
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "👋 Hello! I'm GreenBot, your personal eco-friendly assistant! I'm here to help you live a more sustainable lifestyle. Feel free to ask me about recycling, energy saving, sustainable living, eco-challenges, or any environmental questions you have!", 
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-green-500">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">GreenBot</h1>
                <p className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Your AI Eco Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <span className="text-sm text-green-700">💬 {messages.length - 1} messages</span>
              </div>
              <button
                onClick={clearChat}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Quick Questions
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-green-50 hover:border-green-200 border border-transparent transition duration-200 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{question.icon}</span>
                      <span>{question.text}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl mb-2">🌱</div>
                  <p className="text-sm text-gray-700">
                    Ask me anything about eco-friendly living, sustainability, or environmental tips!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Messages */}
              <div className="h-96 lg:h-[600px] overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm lg:text-base leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md xl:max-w-lg">
                      <div className="p-4 rounded-2xl bg-gray-100 text-gray-900">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                          <span className="text-sm text-gray-600">GreenBot is typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask GreenBot about eco-friendly tips, recycling, composting, or any sustainability question..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>Send</span>
                    <span>🚀</span>
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Press Enter to send • Shift + Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot; 