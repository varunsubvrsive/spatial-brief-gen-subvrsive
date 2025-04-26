import { useState } from 'react';

function ContentSelector({ selectedContent, onSelectContent, onRandomize }) {
  const contentTypes = [
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'image', name: 'Image', icon: '🖼️' },
    { id: 'video', name: 'Video', icon: '🎬' },
    { id: 'audio', name: 'Audio', icon: '🔊' },
    { id: '3d', name: '3D Model', icon: '🧊' },
    { id: 'interactive', name: 'Interactive Element', icon: '🎮' }
  ];

  const handleRandomize = () => {
    if (onRandomize) {
      onRandomize();
    }
  };

  return (
    <div className="content-selector">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Content Type</h3>
        <button
          onClick={handleRandomize}
          className="py-2 px-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-full text-sm font-medium transition-all flex items-center"
        >
          <span className="mr-1">🎲</span> Random
        </button>
      </div>
      
      <p className="mb-4 text-gray-600">Select the type of content for your spatial experience:</p>
      
      <ul className="grid grid-cols-2 gap-3">
        {contentTypes.map((type) => (
          <li key={type.id}>
            <button
              onClick={() => onSelectContent(type.id)}
              className={`w-full p-4 rounded-xl flex items-center transition-all ${
                selectedContent === type.id
                  ? 'bg-indigo-50 border-2 border-indigo-300'
                  : 'bg-white border-2 border-gray-100 hover:border-gray-200'
              }`}
            >
              <span className="text-2xl mr-3">{type.icon}</span>
              <span className={`font-medium ${
                selectedContent === type.id ? 'text-indigo-700' : 'text-gray-700'
              }`}>
                {type.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentSelector; 