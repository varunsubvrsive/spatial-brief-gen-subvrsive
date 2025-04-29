import React from 'react';

const SlotMachine = ({ isAnimating, displayedOptions, scrollPosition, renderItem, selectedOption }) => {
  // Only render the slot machine if the user has clicked randomize at least once
  // This is determined by checking if the component is currently animating OR has animated in the past
  const hasAnimatedBefore = selectedOption !== null;
  const shouldDisplay = isAnimating || hasAnimatedBefore;

  if (!shouldDisplay) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="slot-machine-container relative w-1/2" style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}>
        <div
          className="slot-machine-reel"
          style={{ transform: `translateY(${-scrollPosition}px)` }}
        >
          {displayedOptions.map((option, index) => (
            <div key={option._key || index} className="slot-machine-item">
              {renderItem(option)}
            </div>
          ))}
        </div>
        {/* Center highlight overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '56px',
          transform: 'translateY(-50%)',
          borderRadius: '8px',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
      </div>
    </div>
  );
};

export default SlotMachine; 