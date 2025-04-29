import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for slot machine animation effect (endless cyclic version)
 * @param {Array} options - Array of options to animate through
 * @param {Function} onSelect - Callback when final selection is made
 * @param {Number} duration - Animation duration in milliseconds
 * @returns {Object} Animation state and trigger function
 */
const ITEM_HEIGHT = 56;
const REPEAT_COUNT = 50; // Repeat options 50x for long scroll

const useSlotMachineAnimation = (options, onSelect, duration = 2000) => {
  // Use a single state for updates
  const [state, setState] = useState({
    isAnimating: false,
    selectedOption: null,
    scrollPosition: 0
  });
  
  // Store everything else in refs to avoid re-renders
  const optionsRef = useRef(options);
  const isInitializedRef = useRef(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const startScrollRef = useRef(0);
  const endScrollRef = useRef(0);
  
  // Create repeatedOptions only once and store in ref
  const repeatedOptionsRef = useRef([]);
  const centerIndexRef = useRef(0);
  
  // Initialize once on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      optionsRef.current = options;
      
      // Create repeated options
      const result = [];
      for (let i = 0; i < options.length * REPEAT_COUNT; i++) {
        const option = options[i % options.length];
        result.push({ ...option, _key: `${option.id}-${i}` });
      }
      repeatedOptionsRef.current = result;
      
      // Calculate center index
      centerIndexRef.current = Math.floor(repeatedOptionsRef.current.length / 2);
      
      // Set initial scroll position to center
      setState(prev => ({
        ...prev,
        scrollPosition: centerIndexRef.current * ITEM_HEIGHT
      }));
      
      isInitializedRef.current = true;
    }
  }, []);
  
  // Update options ref when options change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);
  
  // Animation step
  const animationStep = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const t = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    const newScroll = startScrollRef.current + (endScrollRef.current - startScrollRef.current) * ease;
    
    setState(prev => ({
      ...prev,
      scrollPosition: newScroll
    }));
    
    if (t < 1) {
      animationRef.current = requestAnimationFrame(animationStep);
    } else {
      // Animation complete
      const finalOptionIndex = Math.floor(endScrollRef.current / ITEM_HEIGHT) % optionsRef.current.length;
      const finalOption = optionsRef.current[finalOptionIndex];
      
      setState(prev => ({
        ...prev,
        isAnimating: false,
        scrollPosition: endScrollRef.current,
        selectedOption: finalOption
      }));
      
      onSelect(finalOption);
    }
  }, [duration, onSelect]);
  
  // Start the animation
  const startAnimation = useCallback(() => {
    if (state.isAnimating || options.length === 0) return;
    
    startTimeRef.current = Date.now();
    
    // Get current option id to avoid selecting it again
    const currentOptionId = state.selectedOption?.id;
    
    // Make sure we pick a different option than the current one
    let randomIdx;
    if (options.length > 1) {
      do {
        randomIdx = Math.floor(Math.random() * options.length);
      } while (options[randomIdx].id === currentOptionId);
    } else {
      // If only one option, still animate but will end on same value
      randomIdx = 0;
    }
    
    const targetIndex = centerIndexRef.current + randomIdx;
    const selectedOption = options[randomIdx];
    
    // Force animation to be noticeable even if ending on similar index by adding offset
    startScrollRef.current = state.scrollPosition;
    endScrollRef.current = targetIndex * ITEM_HEIGHT;
    
    // Add extra scrolling to make animation more visible when selecting the same index
    if (Math.abs(endScrollRef.current - startScrollRef.current) < ITEM_HEIGHT * 3) {
      // Move at least 10 items worth of scrolling to make animation visible
      startScrollRef.current -= ITEM_HEIGHT * 10;
    }
    
    setState(prev => ({
      ...prev,
      isAnimating: true,
      selectedOption
    }));
    
    animationRef.current = requestAnimationFrame(animationStep);
  }, [state.isAnimating, state.scrollPosition, state.selectedOption, options, animationStep]);
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return { 
    isAnimating: state.isAnimating, 
    displayedOptions: repeatedOptionsRef.current, 
    selectedOption: state.selectedOption, 
    startAnimation, 
    scrollPosition: state.scrollPosition 
  };
};

export default useSlotMachineAnimation; 