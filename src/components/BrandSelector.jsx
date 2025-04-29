import React from 'react';
import useSlotMachineAnimation from '../hooks/useSlotMachineAnimation';
import SlotMachine from './SlotMachine';

const BrandSelector = ({ brands, selectedBrand, onSelectBrand, onRandomize }) => {
  if (!brands || brands.length === 0) return null;

  // Define the brand options with proper styling and emojis
  const brandOptions = [
    { id: 'Coca-Cola', name: 'Coca-Cola', color: 'brand-coke', emoji: '🥤' },
    { id: 'Fanta', name: 'Fanta', color: 'brand-fanta', emoji: '🍊' },
    { id: 'Powerade', name: 'Powerade', color: 'brand-powerade', emoji: '🔵' },
    { id: 'Minute Maid', name: 'Minute Maid', color: 'brand-minutemaid', emoji: '🧃' },
    { id: 'Jack&Coke', name: 'Jack&Coke', color: 'brand-jackcoke', emoji: '⚫' }
  ];

  // Filter the brand options to only include those in the brands array
  const filteredBrandOptions = brandOptions.filter(option => 
    brands.includes(option.id)
  );

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

  return (
    <div className="brand-selector">
      <div className="flex justify-end mb-6">
        <button 
          onClick={handleRandomize}
          className="flex items-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium gap-2"
        >
          <span>🎲</span> Randomize
        </button>
      </div>
      <SlotMachine
        isAnimating={isAnimating}
        displayedOptions={displayedOptions}
        scrollPosition={scrollPosition}
        selectedOption={selectedOption}
        renderItem={option => (
          <div className="w-full brand-slot-item">
            <div 
              className={`${option.color} text-white font-medium rounded-lg px-4 w-0.25 flex items-center justify-center gap-2`} 
              style={{ height: "calc(40px + 0px)" }}
            >
              <span className="text-xl mr-1">{option.emoji}</span> 
              <span className="text-white text-lg font-semibold">{option.name}</span>
            </div>
          </div>
        )}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {filteredBrandOptions.map(brand => (
          <button
            key={brand.id}
            onClick={() => onSelectBrand(brand.id)}
            className={`${brand.color} ${
              selectedBrand === brand.id ? 'ring-4 ring-offset-2 ring-gray-400' : ''
            } rounded-xl p-4 text-white font-medium select-option flex items-center justify-center h-24 transition-all`}
          >
            <span className="mr-2">{brand.emoji}</span> {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandSelector; 