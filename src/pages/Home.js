import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DAILY_CHALLENGES = [
  { id: 'recycle', icon: '♻️', title: 'Recycle 1 item today', points: 10 },
  { id: 'bike', icon: '🚴‍♀️', title: 'Use a bicycle instead of car', points: 15 },
  { id: 'water', icon: '💧', title: 'Use a reusable water bottle', points: 8 },
  { id: 'energy', icon: '💡', title: 'Turn off lights when leaving room', points: 5 },
  { id: 'compost', icon: '🌱', title: 'Start composting organic waste', points: 12 }
];

function Home() {
  const [points, setPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const savedPoints = localStorage.getItem('greenPoints');
    const savedCompleted = localStorage.getItem('completedChallenges');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedCompleted) setCompletedChallenges(JSON.parse(savedCompleted));
  }, []);

  const markChallengeDone = (challengeId, challengePoints) => {
    if (completedChallenges.includes(challengeId)) return;

    const newPoints = points + challengePoints;
    const newCompleted = [...completedChallenges, challengeId];

    setPoints(newPoints);
    setCompletedChallenges(newCompleted);

    localStorage.setItem('greenPoints', newPoints.toString());
    localStorage.setItem('completedChallenges', JSON.stringify(newCompleted));
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌱 Welcome to GreenCity Challenge!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Complete eco-friendly challenges, earn points, and make a difference!
        </p>
        <Link
          to="/challenges"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          🎯 Start Challenge
        </Link>
      </div>

      {/* Points Counter */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
        <div className="text-4xl font-bold text-green-600 mb-2">
          {points} GreenPoints! 🏆
        </div>
        <p className="text-gray-600">
          Keep going! Every small action counts towards a greener future.
        </p>
      </div>

      {/* Daily Challenges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🌟 Today's Featured Challenges
        </h2>
        <div className="space-y-4">
          {DAILY_CHALLENGES.map((challenge) => (
            <div
              key={challenge.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                completedChallenges.includes(challenge.id)
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{challenge.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                  <p className="text-sm text-gray-600">+{challenge.points} points</p>
                </div>
              </div>
              <button
                onClick={() => markChallengeDone(challenge.id, challenge.points)}
                disabled={completedChallenges.includes(challenge.id)}
                className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                  completedChallenges.includes(challenge.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {completedChallenges.includes(challenge.id) ? '✅ Done' : 'Mark as Done'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready for More?</h2>
        <p className="mb-4">
          Check out all our challenges and start your eco-friendly journey today!
        </p>
        <Link
          to="/challenges"
          className="inline-block bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-200"
        >
          View All Challenges
        </Link>
      </div>
    </div>
  );
}

export default Home; 