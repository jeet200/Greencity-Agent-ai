import React, { useState, useEffect } from 'react';

const BADGES = [
  { id: 'starter', name: 'Eco Beginner', icon: '🌱', description: 'Complete your first challenge', requirement: 1 },
  { id: 'enthusiast', name: 'Green Enthusiast', icon: '🌿', description: 'Complete 5 challenges', requirement: 5 },
  { id: 'warrior', name: 'Eco Warrior', icon: '🌟', description: 'Complete 10 challenges', requirement: 10 },
  { id: 'hero', name: 'Eco Hero', icon: '🏆', description: 'Complete 15 challenges', requirement: 15 },
  { id: 'champion', name: 'Planet Champion', icon: '🌍', description: 'Complete 20 challenges', requirement: 20 },
  { id: 'points50', name: 'Point Collector', icon: '💎', description: 'Earn 50 points', requirement: 50, type: 'points' },
  { id: 'points100', name: 'Point Master', icon: '👑', description: 'Earn 100 points', requirement: 100, type: 'points' },
  { id: 'points200', name: 'Point Legend', icon: '⭐', description: 'Earn 200 points', requirement: 200, type: 'points' }
];

const ALL_CHALLENGES = [
  { id: 'recycle', title: 'Recycle 1 item today', points: 10 },
  { id: 'bike', title: 'Use a bicycle instead of car', points: 15 },
  { id: 'water', title: 'Use a reusable water bottle', points: 8 },
  { id: 'energy', title: 'Turn off lights when leaving room', points: 5 },
  { id: 'compost', title: 'Start composting organic waste', points: 12 },
  { id: 'recycle-daily', title: 'Daily Recycling Hero', points: 15 },
  { id: 'bike-commute', title: 'Eco-Friendly Commute', points: 20 },
  { id: 'water-bottle', title: 'Plastic-Free Hydration', points: 10 },
  { id: 'lights-off', title: 'Energy Saver', points: 8 },
  { id: 'composting', title: 'Composting Champion', points: 25 },
  { id: 'meatless-meal', title: 'Plant-Based Power', points: 12 },
  { id: 'short-shower', title: 'Water Conservation', points: 10 },
  { id: 'local-shopping', title: 'Local Hero', points: 18 },
  { id: 'reusable-bags', title: 'Bag It Right', points: 8 },
  { id: 'tree-planting', title: 'Tree Planter', points: 30 }
];

function Profile() {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPoints = localStorage.getItem('greenPoints');
    const savedCompleted = localStorage.getItem('completedChallenges');
    
    if (savedUsername) setUsername(savedUsername);
    else setUsername('Eco Friend');
    
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedCompleted) setCompletedChallenges(JSON.parse(savedCompleted));
  }, []);

  const saveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      localStorage.setItem('username', tempUsername.trim());
      setIsEditingUsername(false);
      setTempUsername('');
    }
  };

  const getEarnedBadges = () => {
    return BADGES.filter(badge => {
      if (badge.type === 'points') {
        return points >= badge.requirement;
      }
      return completedChallenges.length >= badge.requirement;
    });
  };

  const getCompletedChallengeDetails = () => {
    return completedChallenges.map(challengeId => {
      const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
      return challenge || { id: challengeId, title: 'Unknown Challenge', points: 0 };
    });
  };

  const earnedBadges = getEarnedBadges();
  const completedChallengeDetails = getCompletedChallengeDetails();
  const totalPointsFromChallenges = completedChallengeDetails.reduce((sum, challenge) => sum + challenge.points, 0);

  const getNextBadge = () => {
    const unearned = BADGES.filter(badge => !earnedBadges.includes(badge));
    if (unearned.length === 0) return null;
    
    return unearned.reduce((closest, badge) => {
      const requirement = badge.type === 'points' ? points : completedChallenges.length;
      const badgeGap = badge.requirement - requirement;
      const closestGap = closest.requirement - requirement;
      
      return badgeGap > 0 && badgeGap < closestGap ? badge : closest;
    });
  };

  const nextBadge = getNextBadge();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          👤 Your Profile
        </h1>
        <p className="text-xl text-gray-600">
          Track your eco-friendly progress and achievements
        </p>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              {isEditingUsername ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    placeholder={username}
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={saveUsername}
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingUsername(false);
                      setTempUsername('');
                    }}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
                  <button
                    onClick={() => {
                      setIsEditingUsername(true);
                      setTempUsername(username);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <p className="text-gray-600">Eco Challenge Member</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{points}</div>
            <div className="text-sm text-gray-500">GreenPoints</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {completedChallenges.length}
          </div>
          <div className="text-gray-600">Challenges Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {earnedBadges.length}
          </div>
          <div className="text-gray-600">Badges Earned</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {totalPointsFromChallenges}
          </div>
          <div className="text-gray-600">Points from Challenges</div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 Your Badges</h3>
        
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Complete challenges to earn your first badge!</p>
        )}

        {nextBadge && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Next Badge</h4>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl opacity-50">{nextBadge.icon}</span>
              <div>
                <h5 className="font-semibold text-gray-900">{nextBadge.name}</h5>
                <p className="text-sm text-gray-600">{nextBadge.description}</p>
                <p className="text-sm text-green-600 font-medium">
                  Progress: {nextBadge.type === 'points' ? points : completedChallenges.length} / {nextBadge.requirement}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Completed Challenges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">✅ Completed Challenges</h3>
        
        {completedChallengeDetails.length > 0 ? (
          <div className="space-y-3">
            {completedChallengeDetails.map(challenge => (
              <div key={challenge.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">+{challenge.points} points</p>
                </div>
                <span className="text-green-600 font-bold">✅</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No challenges completed yet. Start with some easy challenges on the 
            <a href="/challenges" className="text-green-600 hover:text-green-700 font-medium"> Challenges page</a>!
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile; 