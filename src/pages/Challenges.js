import React, { useState, useEffect } from 'react';

const ALL_CHALLENGES = [
  {
    id: 'recycle-daily',
    icon: '♻️',
    title: 'Daily Recycling Hero',
    description: 'Recycle at least 3 items today (plastic, paper, or glass)',
    points: 15,
    difficulty: 'Easy',
    category: 'Waste'
  },
  {
    id: 'bike-commute',
    icon: '🚴‍♀️',
    title: 'Eco-Friendly Commute',
    description: 'Use bike, walk, or public transport instead of driving',
    points: 20,
    difficulty: 'Medium',
    category: 'Transportation'
  },
  {
    id: 'water-bottle',
    icon: '💧',
    title: 'Plastic-Free Hydration',
    description: 'Use only reusable water bottles for the entire day',
    points: 10,
    difficulty: 'Easy',
    category: 'Lifestyle'
  },
  {
    id: 'lights-off',
    icon: '💡',
    title: 'Energy Saver',
    description: 'Turn off all lights when leaving rooms throughout the day',
    points: 8,
    difficulty: 'Easy',
    category: 'Energy'
  },
  {
    id: 'composting',
    icon: '🌱',
    title: 'Composting Champion',
    description: 'Start or maintain a compost bin with organic waste',
    points: 25,
    difficulty: 'Hard',
    category: 'Waste'
  },
  {
    id: 'meatless-meal',
    icon: '🥗',
    title: 'Plant-Based Power',
    description: 'Eat at least one plant-based meal today',
    points: 12,
    difficulty: 'Easy',
    category: 'Food'
  },
  {
    id: 'short-shower',
    icon: '🚿',
    title: 'Water Conservation',
    description: 'Take a shower under 5 minutes',
    points: 10,
    difficulty: 'Medium',
    category: 'Water'
  },
  {
    id: 'local-shopping',
    icon: '🏪',
    title: 'Local Hero',
    description: 'Buy groceries from local farmers market or store',
    points: 18,
    difficulty: 'Medium',
    category: 'Community'
  },
  {
    id: 'reusable-bags',
    icon: '🛍️',
    title: 'Bag It Right',
    description: 'Use reusable bags for all shopping today',
    points: 8,
    difficulty: 'Easy',
    category: 'Lifestyle'
  },
  {
    id: 'tree-planting',
    icon: '🌳',
    title: 'Tree Planter',
    description: 'Plant a tree or support a tree-planting organization',
    points: 30,
    difficulty: 'Hard',
    category: 'Environment'
  }
];

function Challenges() {
  const [points, setPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const savedPoints = localStorage.getItem('greenPoints');
    const savedCompleted = localStorage.getItem('completedChallenges');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedCompleted) setCompletedChallenges(JSON.parse(savedCompleted));
  }, []);

  const completeChallenge = (challengeId, challengePoints) => {
    if (completedChallenges.includes(challengeId)) return;

    const newPoints = points + challengePoints;
    const newCompleted = [...completedChallenges, challengeId];

    setPoints(newPoints);
    setCompletedChallenges(newCompleted);

    localStorage.setItem('greenPoints', newPoints.toString());
    localStorage.setItem('completedChallenges', JSON.stringify(newCompleted));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['All', ...new Set(ALL_CHALLENGES.map(c => c.category))];
  const filteredChallenges = selectedCategory === 'All' 
    ? ALL_CHALLENGES 
    : ALL_CHALLENGES.filter(c => c.category === selectedCategory);

  const maxPoints = 200;
  const progressPercentage = Math.min((points / maxPoints) * 100, 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎯 Eco Challenges
        </h1>
        <p className="text-xl text-gray-600">
          Complete challenges to earn points and help the planet!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
          <div className="text-xl font-semibold text-green-600">
            {points} / {maxPoints} Points
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progressPercentage >= 100 ? '🏆 Congratulations! You\'ve reached the goal!' : `${Math.round(progressPercentage)}% complete`}
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-lg shadow-md p-6 ${
              completedChallenges.includes(challenge.id)
                ? 'ring-2 ring-green-200 bg-green-50'
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{challenge.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {challenge.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{challenge.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  +{challenge.points}
                </div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            
            <button
              onClick={() => completeChallenge(challenge.id, challenge.points)}
              disabled={completedChallenges.includes(challenge.id)}
              className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
                completedChallenges.includes(challenge.id)
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {completedChallenges.includes(challenge.id) ? '✅ Completed' : 'Complete Challenge'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges; 