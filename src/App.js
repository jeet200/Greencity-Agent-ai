import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import ChatBot from './pages/ChatBot';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="gradient-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              🌱 GreenCity Challenge
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-600 hover:text-white'
              }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/challenges"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/challenges' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-600 hover:text-white'
              }`}
            >
              🎯 Challenges
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/profile' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-600 hover:text-white'
              }`}
            >
              👤 Profile
            </Link>
            <Link
              to="/chatbot"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/chatbot' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-600 hover:text-white'
              }`}
            >
              🤖 GreenBot
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Home />
            </main>
          } />
          <Route path="/challenges" element={
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Challenges />
            </main>
          } />
          <Route path="/profile" element={
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Profile />
            </main>
          } />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/*" element={
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-xl text-gray-600">Return to <Link to="/" className="text-green-600 hover:text-green-700">Home</Link></p>
              </div>
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 