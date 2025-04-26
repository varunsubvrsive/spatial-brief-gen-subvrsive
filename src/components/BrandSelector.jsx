import React from 'react';

const BrandSelector = ({ brands, selectedBrand, onSelectBrand, onRandomize }) => {
  if (!brands || brands.length === 0) return null;

  // Define the brand options with proper styling
  const brandOptions = [
    { id: 'Coca-Cola', name: 'Coca-Cola', color: 'brand-coke' },
    { id: 'Fanta', name: 'Fanta', color: 'brand-fanta' },
    { id: 'Powerade', name: 'Powerade', color: 'brand-powerade' },
    { id: 'Minute Maid', name: 'Minute Maid', color: 'brand-minutemaid' },
    { id: 'Jack&Coke', name: 'Jack&Coke', color: 'brand-jackcoke' }
  ];

  // Filter the brand options to only include those in the brands array
  const filteredBrandOptions = brandOptions.filter(option => 
    brands.includes(option.id)
  );

  return (
    <div className="brand-selector">
      <div className="flex justify-end mb-6">
        <button 
          onClick={onRandomize}
          className="flex items-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium gap-2"
        >
          <span>🎲</span> Randomize
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {filteredBrandOptions.map(brand => (
          <button
            key={brand.id}
            onClick={() => onSelectBrand(brand.id)}
            className={`${brand.color} ${
              selectedBrand === brand.id ? 'ring-4 ring-offset-2 ring-gray-400' : ''
            } rounded-xl p-4 text-white font-medium select-option flex items-center justify-center h-24 transition-all`}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandSelector; 