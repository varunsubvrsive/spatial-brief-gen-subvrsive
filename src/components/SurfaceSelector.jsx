import React from 'react';

const SurfaceSelector = ({ surfaces, selectedSurface, onSelectSurface, onRandomize }) => {
  if (!surfaces || surfaces.length === 0) return null;

  // Surface icons mapping based on reference
  const surfaceIcons = {
    'On-Pack': '📦',
    'Digital OOH': '🏙️',
    'Virtual Worlds': '🌐',
    'Location-Based': '📍',
    'Live & Shared Events': '🎪',
    'Influencer Collaborations': '🌟',
    'Gaming & Interactive Play': '🎮',
    'New Frontiers': '🚀'
  };

  return (
    <div className="surface-selector">
      <div className="flex justify-end mb-4">
        <button 
          onClick={onRandomize}
          className="flex items-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium gap-2"
        >
          <span>🎲</span> Randomize
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {surfaces.map((surface) => (
          <div 
            key={surface}
            onClick={() => onSelectSurface(surface)}
            className={`
              select-option p-4 rounded-xl border transition-all cursor-pointer
              flex items-center gap-3
              ${selectedSurface === surface 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'}
            `}
          >
            <span className="text-xl">{surfaceIcons[surface] || '📋'}</span>
            <span className="font-medium text-lg">{surface}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurfaceSelector; 