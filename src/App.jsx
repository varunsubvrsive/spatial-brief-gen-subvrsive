import { useState, useMemo } from 'react';
import BrandSelector from './components/BrandSelector';
import SurfaceSelector from './components/SurfaceSelector';
import BriefDisplay from './components/BriefDisplay';

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1 = brand selection, 2 = surface selection, 3 = brief
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSurface, setSelectedSurface] = useState(null);
  const [generatedBrief, setGeneratedBrief] = useState(null);

  // Define the initial brand options as objects
  const initialBrandOptions = [
    { id: 'Coca-Cola', name: 'Coca-Cola', color: 'brand-coke', emoji: '🥤' },
    { id: 'Fanta', name: 'Fanta', color: 'brand-fanta', emoji: '🍊' },
    { id: 'Powerade', name: 'Powerade', color: 'brand-powerade', emoji: '🔵' },
    { id: 'Minute Maid', name: 'Minute Maid', color: 'brand-minutemaid', emoji: '🧃' },
    { id: 'Jack&Coke', name: 'Jack&Coke', color: 'brand-jackcoke', emoji: '⚫' }
  ];
  const [brands, setBrands] = useState(initialBrandOptions);
  // Handlers to add and remove brands
  const handleAddBrand = (brand) => {
    setBrands(prev => [...prev, brand]);
  };
  const handleRemoveBrand = (brandId) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    // If current selected matches removed, clear it
    if (selectedBrand === brandId) setSelectedBrand(null);
  };

  // Define the static surface options (memoized to maintain stable reference)
  const surfaces = useMemo(() => [
    'On-Pack', 
    'Digital OOH', 
    'Virtual Worlds', 
    'Location-Based', 
    'Live & Shared Events', 
    'Influencer Collaborations', 
    'Gaming & Interactive Play', 
    'New Frontiers'
  ], []);

  const handleRandomizeBrand = () => {
    // This function will be called after the animation finishes 
    // and the component selects a brand, so we don't need
    // to set the brand here directly
  };

  const handleRandomizeSurface = () => {
    // This function will be called after the animation finishes
    // and the component selects a surface, so we don't need
    // to set the surface here directly
  };

  const generateBrief = () => {
    if (!selectedBrand || !selectedSurface) return;
    
    // Create a template-based brief
    const brief = {
      question: `How might ${selectedBrand} leverage ${selectedSurface} to create a spatial experience that drives meaningful consumer engagement and brand impact?`,
      objective: `Use ${selectedSurface} to build a meaningful, memorable brand moment for ${selectedBrand}.`,
      context: `${selectedBrand} is exploring new ways to meet audiences in high-engagement environments. ${selectedSurface} provides a creative playground to design standout interactions.`,
      steps: [
        `Map out how ${selectedBrand} naturally fits into the ${selectedSurface} environment.`,
        `Design a playful or useful brand experience that adds value.`,
        `Experiment with immersive formats or community-based interaction.`
      ],
      metrics: [
        'Engagement time or interaction rate',
        'Total reach or participation',
        'Brand recall or sentiment uplift'
      ]
    };

    setGeneratedBrief(brief);
    setCurrentStep(3);
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedBrand) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedSurface) {
      generateBrief();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startOver = () => {
    setSelectedBrand(null);
    setSelectedSurface(null);
    setGeneratedBrief(null);
    setCurrentStep(1);
  };

  const beginJourney = () => {
    setCurrentStep(1);
  };

  // Get brand-specific color classes
  const getBrandColorClass = (brand) => {
    if (!brand) return '';
    
    const brandMap = {
      'Coca-Cola': 'brand-coke',
      'Fanta': 'brand-fanta',
      'Powerade': 'brand-powerade',
      'Minute Maid': 'brand-minutemaid',
      'Jack&Coke': 'brand-jackcoke'
    };
    
    return brandMap[brand] || '';
  };

  // Get brand text color class (for BriefDisplay labels)
  const getBrandTextClass = (brand) => {
    if (!brand) return '';
    const brandMap = {
      'Coca-Cola': 'brand-text-coke',
      'Fanta': 'brand-text-fanta',
      'Powerade': 'brand-text-powerade',
      'Minute Maid': 'brand-text-minutemaid',
      'Jack&Coke': 'brand-text-jackcoke'
    };
    return brandMap[brand] || '';
  };

  // Determine raw color for selected brand from state (could be hex or Tailwind class)
  const selectedBrandObj = brands.find(b => b.id === selectedBrand);
  const selectedBrandColor = selectedBrandObj ? selectedBrandObj.color : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        {/* Welcome Screen */}
        {currentStep === 0 && (
          <div className="animate-fadeIn text-center flex flex-col justify-center min-h-[80vh]">
            <header className="mb-8">
              <h1 className="text-5xl font-bold mb-4 text-gray-900">Enter the Spatial Era</h1>
              <p className="text-lg text-gray-600">Generate customized briefs to inspire spatial innovation.</p>
            </header>
            <div>
              <button 
                onClick={beginJourney} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-full text-lg transition-all inline-flex items-center font-bold"
              >
                Begin Journey 🚀
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Brand Selection */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Select a Brand</h1>
              <p className="text-lg text-gray-600">Choose a brand to start creating your spatial brief</p>
            </header>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <BrandSelector 
                brands={brands}
                selectedBrand={selectedBrand}
                onSelectBrand={setSelectedBrand}
                onRandomize={handleRandomizeBrand}
                onAddBrand={handleAddBrand}
                onRemoveBrand={handleRemoveBrand}
              />
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedBrand}
                  className={`py-3 px-6 rounded-full text-lg font-semibold transition-all ${
                    selectedBrand
                      ? `${selectedBrandColor.startsWith('#') ? '' : selectedBrandColor} text-white hover:opacity-90`
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  style={selectedBrand && selectedBrandColor.startsWith('#') ? { backgroundColor: selectedBrandColor } : {}}
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Surface Selection */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Select a Spatial Surface</h1>
              <p className="text-lg text-gray-600">Choose where your brand experience will live</p>
            </header>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {selectedBrand && (
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-xl border border-gray-200 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Selected Brand:</span>
                    <span
                      className={`${selectedBrandColor.startsWith('#') ? '' : selectedBrandColor} text-white font-bold py-1 px-3 rounded-md`}
                      style={selectedBrandColor.startsWith('#') ? { backgroundColor: selectedBrandColor } : {}}
                    >
                      {selectedBrand}
                    </span>
                  </div>
                </div>
              )}
              
              <SurfaceSelector 
                surfaces={surfaces}
                selectedSurface={selectedSurface}
                onSelectSurface={setSelectedSurface}
                onRandomize={handleRandomizeSurface}
              />
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-lg font-semibold transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={generateBrief}
                  disabled={!selectedSurface}
                  className={`py-3 px-6 rounded-full text-lg font-semibold transition-all ${
                    selectedSurface
                      ? `${selectedBrandColor.startsWith('#') ? '' : selectedBrandColor} text-white hover:opacity-90`
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  style={selectedSurface && selectedBrandColor.startsWith('#') ? { backgroundColor: selectedBrandColor } : {}}
                >
                  Generate Brief
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Brief Display */}
        {currentStep === 3 && generatedBrief && (
          <div className="animate-fadeIn">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Spatial Innovation Brief</h1>
              <p className="text-lg text-gray-600">Ready to inspire your next spatial experience</p>
            </header>
            
            <div className="brief-card rounded-2xl p-8">
              <BriefDisplay
                brand={selectedBrand}
                surface={selectedSurface}
                brief={generatedBrief}
                brandColorClass={getBrandTextClass(selectedBrand)}
                brandEmoji={selectedBrandObj ? selectedBrandObj.emoji : ''}
              />
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-lg font-semibold transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={startOver}
                  className={`py-3 px-6 ${getBrandColorClass(selectedBrand)} text-white hover:opacity-90 rounded-full text-lg font-semibold transition-all`}
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Spatial Experience Brief Generator © {new Date().getFullYear()}</p>
        <p className="mt-2">For workshop use only</p>
      </footer>
    </div>
  );
}

export default App; 