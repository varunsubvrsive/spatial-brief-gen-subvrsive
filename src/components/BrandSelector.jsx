import React, { useState } from 'react';
import useSlotMachineAnimation from '../hooks/useSlotMachineAnimation';
import SlotMachine from './SlotMachine';

const BrandSelector = ({ brands, selectedBrand, onSelectBrand, onRandomize, onAddBrand, onRemoveBrand, onResetBrands }) => {
  if (!brands || brands.length === 0) return null;

  // Modal state and inputs for managing brands
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmoji, setNewEmoji] = useState('');
  const [newName, setNewName] = useState('');
  // State for new brand color and presets
  const [newColor, setNewColor] = useState('#E2453B');
  const presetColors = ['#E2453B', '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#A142F4', '#F442A1', '#2E2E2E', '#FFFFFF'];
  // Validation flags
  const isDuplicate = brands.some(b => b.id.toLowerCase() === newName.trim().toLowerCase());
  const isValidHex = /^#([0-9A-Fa-f]{6})$/.test(newColor);

  // Use the dynamic brands prop for options
  const filteredBrandOptions = brands; // brands passed in have id, name, color, emoji

  // Set up the slot machine animation
  const { isAnimating, displayedOptions, startAnimation, scrollPosition, selectedOption } = useSlotMachineAnimation(
    filteredBrandOptions,
    (selectedOption) => onSelectBrand(selectedOption.id),
    2000 // Shorter duration for snappier animation
  );

  // Handle randomize button click
  const handleRandomize = () => {
    startAnimation();
  };

  // Helper to detect if a hex color is light (for contrast)
  const isLightColor = (hex) => {
    if (typeof hex !== 'string' || !hex.startsWith('#') || hex.length !== 7) return false;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    // Calculate brightness per ITU-R BT.601
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200;
  };

  return (
    <div className="brand-selector">
      {/* Manage and Randomize controls above slot machine */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
        >
          Manage Brands
        </button>
        <button
          onClick={handleRandomize}
          className="flex items-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium gap-2"
        >
          <span>🎲</span> Randomize
        </button>
      </div>
      {/* Slot machine display remains here */}
      <SlotMachine
        isAnimating={isAnimating}
        displayedOptions={displayedOptions}
        scrollPosition={scrollPosition}
        selectedOption={selectedOption}
        renderItem={option => {
          const isHex = typeof option.color === 'string' && option.color.startsWith('#');
          const textColorClass = isHex && isLightColor(option.color) ? 'text-black' : 'text-white';
          return (
            <div className="w-full brand-slot-item">
              <div
                className={`${isHex ? '' : option.color} ${textColorClass} font-medium rounded-lg px-4 w-0.25 flex items-center justify-center gap-2`}
                style={{ ...(isHex ? { backgroundColor: option.color } : {}), height: 'calc(40px + 6px)' }}
              >
                <span className="text-xl mr-1">{option.emoji}</span>
                <span className={`${textColorClass} text-lg font-semibold`}>{option.name}</span>
              </div>
            </div>
          );
        }}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {filteredBrandOptions.map(brand => {
          const isHex = typeof brand.color === 'string' && brand.color.startsWith('#');
          const textColorClass = isHex && isLightColor(brand.color) ? 'text-black' : 'text-white';
          return (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand.id)}
              className={`${isHex ? '' : brand.color} ${selectedBrand === brand.id ? 'ring-4 ring-offset-2 ring-gray-400' : ''} rounded-xl p-4 ${textColorClass} font-medium select-option flex items-center justify-center h-24 transition-all`}
              style={isHex ? { backgroundColor: brand.color } : {}}
            >
              <span className="mr-2">{brand.emoji}</span> {brand.name}
            </button>
          );
        })}
      </div>

      {/* Manage Brands Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Brands</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure? This will erase all your custom brands.')) {
                      onResetBrands();
                      setIsModalOpen(false);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >Reset to Defaults</button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >&times;</button>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto mb-4">
              {brands.map(brand => (
                <div key={brand.id} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                  <span className="mr-2">{brand.emoji}</span>
                  <span className="mr-2">{brand.name}</span>
                  <button
                    onClick={() => onRemoveBrand(brand.id)}
                    className="text-red-500 hover:text-red-700"
                  >&times;</button>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Emoji</label>
              <input
                type="text"
                maxLength={2}
                value={newEmoji}
                onChange={e => setNewEmoji(e.target.value)}
                className="border border-black bg-white text-black rounded px-2 py-1 w-full"
                placeholder="e.g. 🥤"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Brand Name</label>
              <input
                type="text"
                maxLength={20}
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="border border-black bg-white text-black rounded px-2 py-1 w-full"
                placeholder="Brand name (max 20 chars)"
              />
            </div>
            {/* Brand Color Picker */}
            <div className="mb-4">
              <label className="block mb-1">Brand Color</label>
              <div className="flex space-x-2 mb-2">
                {presetColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${newColor === color ? 'border-black' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="color"
                  value={newColor}
                  onChange={e => setNewColor(e.target.value)}
                  className="h-8 w-8 p-0 border-0"
                />
                <input
                  type="text"
                  maxLength={7}
                  value={newColor}
                  onChange={e => setNewColor(e.target.value)}
                  className="border border-black bg-white text-black rounded px-2 py-1 ml-2 w-24"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
            {isDuplicate && (
              <p className="text-sm text-red-500 mb-2">This brand name already exists.</p>
            )}
            {!isValidHex && (
              <p className="text-sm text-red-500 mb-2">Please enter a valid hex code (e.g. #AABBCC).</p>
            )}
            <button
              disabled={!newEmoji || !newName || isDuplicate || !isValidHex}
              onClick={() => {
                onAddBrand({ id: newName, name: newName, emoji: newEmoji, color: newColor });
                setNewEmoji('');
                setNewName('');
                setNewColor(presetColors[0]);
              }}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                newEmoji && newName && !isDuplicate && isValidHex ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Brand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandSelector; 