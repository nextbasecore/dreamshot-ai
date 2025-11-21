import { RefObject } from 'react';

export interface ScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
}

export interface DragScrollOptions {
  sensitivity?: number;
  momentum?: boolean;
  momentumStrength?: number;
}

export interface TouchScrollOptions extends DragScrollOptions {
  passive?: boolean;
}

/**
 * Smooth scroll utility with customizable easing and duration
 */
export const smoothScrollTo = (
  element: HTMLElement | null,
  targetScrollTop: number,
  options: ScrollOptions = {}
): void => {
  if (!element) return;
  
  const { duration = 200, easing = easeOutCubic } = options;
  const startScrollTop = element.scrollTop;
  const distance = targetScrollTop - startScrollTop;
  let startTime: number;

  const animateScroll = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easing(progress);
    const currentScrollTop = startScrollTop + (distance * easedProgress);
    
    element.scrollTop = currentScrollTop;
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

/**
 * Easing functions for smooth animations
 */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number): number => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

/**
 * Create mouse drag scroll handler
 */
export const createMouseDragScroll = (
  elementRef: RefObject<HTMLElement | null>,
  options: DragScrollOptions = {}
) => {
  const { sensitivity = 1, momentum = false, momentumStrength = 100 } = options;
  
  return (e: React.MouseEvent) => {
    if (!elementRef.current) return;
    
    const startY = e.clientY;
    const startScrollTop = elementRef.current.scrollTop;
    let isDragging = false;
    let lastY = startY;
    let lastTime = Date.now();
    let velocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      const currentY = e.clientY;
      const currentTime = Date.now();
      const deltaY = (lastY - currentY) * sensitivity;
      const deltaTime = currentTime - lastTime;
      
      // Calculate velocity for momentum
      if (momentum && deltaTime > 0) {
        velocity = deltaY / deltaTime;
      }
      
      const newScrollTop = elementRef.current.scrollTop + deltaY;
      
      // Only start dragging if we've moved enough
      if (Math.abs(currentY - startY) > 3) {
        isDragging = true;
        elementRef.current.scrollTop = newScrollTop;
        lastY = currentY;
        lastTime = currentTime;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Add momentum scrolling if enabled
      if (momentum && Math.abs(velocity) > 0.5 && elementRef.current) {
        const momentumScroll = velocity * momentumStrength;
        const currentScrollTop = elementRef.current.scrollTop;
        const targetScrollTop = currentScrollTop + momentumScroll;
        
        smoothScrollTo(elementRef.current, targetScrollTop);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
};

/**
 * Create touch scroll handler
 */
export const createTouchScroll = (
  elementRef: RefObject<HTMLElement | null>,
  options: TouchScrollOptions = {}
) => {
  const { sensitivity = 1, momentum = true, momentumStrength = 100, passive = false } = options;
  
  return (e: React.TouchEvent) => {
    if (!elementRef.current) return;
    
    const startY = e.touches[0].clientY;
    let lastY = startY;
    let lastTime = Date.now();
    let velocity = 0;

    const handleTouchMove = (e: TouchEvent) => {
      if (!elementRef.current) return;
      
      const currentY = e.touches[0].clientY;
      const currentTime = Date.now();
      const deltaY = (lastY - currentY) * sensitivity;
      const deltaTime = currentTime - lastTime;
      
      // Calculate velocity for momentum
      if (momentum && deltaTime > 0) {
        velocity = deltaY / deltaTime;
      }
      
      const newScrollTop = elementRef.current.scrollTop + deltaY;
      
      // Direct scroll update for immediate response
      elementRef.current.scrollTop = newScrollTop;
      lastY = currentY;
      lastTime = currentTime;
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Add momentum scrolling if enabled
      if (momentum && Math.abs(velocity) > 0.5 && elementRef.current) {
        const momentumScroll = velocity * momentumStrength;
        const currentScrollTop = elementRef.current.scrollTop;
        const targetScrollTop = currentScrollTop + momentumScroll;
        
        smoothScrollTo(elementRef.current, targetScrollTop);
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive });
    document.addEventListener('touchend', handleTouchEnd);
  };
};

/**
 * Create wheel scroll handler for React synthetic events
 * Note: This version doesn't prevent default to avoid passive event listener issues
 */
export const createWheelScroll = (
  elementRef: RefObject<HTMLElement | null>,
  options: { sensitivity?: number; smooth?: boolean } = {}
) => {
  const { sensitivity = 0.8, smooth = false } = options;
  
  return (e: React.WheelEvent) => {
    // Don't prevent default for React synthetic events to avoid passive listener issues
    e.stopPropagation();
    
    if (!elementRef.current) return;
    
    const scrollAmount = e.deltaY * sensitivity;
    const currentScrollTop = elementRef.current.scrollTop;
    const newScrollTop = currentScrollTop + scrollAmount;
    
    if (smooth) {
      smoothScrollTo(elementRef.current, newScrollTop);
    } else {
      elementRef.current.scrollTop = newScrollTop;
    }
  };
};

/**
 * Create wheel scroll handler with proper event listener registration
 * Use this when you need to prevent default scroll behavior
 */
export const createWheelScrollHandler = (
  elementRef: RefObject<HTMLElement | null>,
  options: { sensitivity?: number; smooth?: boolean } = {}
) => {
  const { sensitivity = 0.8, smooth = false } = options;
  
  const handleWheel = (e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!elementRef.current) return;
    
    const scrollAmount = e.deltaY * sensitivity;
    const currentScrollTop = elementRef.current.scrollTop;
    const newScrollTop = currentScrollTop + scrollAmount;
    
    if (smooth) {
      smoothScrollTo(elementRef.current, newScrollTop);
    } else {
      elementRef.current.scrollTop = newScrollTop;
    }
  };

  return {
    addEventListener: () => {
      if (elementRef.current) {
        elementRef.current.addEventListener('wheel', handleWheel, { passive: false });
      }
    },
    removeEventListener: () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('wheel', handleWheel);
      }
    }
  };
};

/**
 * Hook for managing wheel scroll with proper event listener registration
 * This completely avoids the passive event listener issue
 */
export const useWheelScroll = (
  elementRef: RefObject<HTMLElement | null>,
  options: { sensitivity?: number; smooth?: boolean; enabled?: boolean } = {}
) => {
  const { sensitivity = 0.8, smooth = false, enabled = true } = options;
  
  const handleWheel = (e: WheelEvent) => {
    if (!enabled || !elementRef.current) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    const scrollAmount = e.deltaY * sensitivity;
    const currentScrollTop = elementRef.current.scrollTop;
    const newScrollTop = currentScrollTop + scrollAmount;
    
    if (smooth) {
      smoothScrollTo(elementRef.current, newScrollTop);
    } else {
      elementRef.current.scrollTop = newScrollTop;
    }
  };

  // Add event listener with passive: false
  const addWheelListener = () => {
    if (elementRef.current && enabled) {
      elementRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }
  };

  // Remove event listener
  const removeWheelListener = () => {
    if (elementRef.current) {
      elementRef.current.removeEventListener('wheel', handleWheel);
    }
  };

  return {
    addWheelListener,
    removeWheelListener,
    handleWheel
  };
};

/**
 * Get optimized scroll styles for smooth scrolling
 */
export const getScrollStyles = (options: {
  scrollbarWidth?: 'thin' | 'auto' | 'none';
  scrollbarColor?: string;
  overscrollBehavior?: 'auto' | 'contain' | 'none';
  willChange?: boolean;
} = {}) => {
  const {
    scrollbarWidth = 'thin',
    scrollbarColor = 'rgb(209 213 219) transparent',
    overscrollBehavior = 'contain',
    willChange = true
  } = options;

  return {
    scrollbarWidth,
    scrollbarColor,
    touchAction: 'pan-y' as const,
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    scrollBehavior: 'auto' as const,
    overscrollBehavior,
    ...(willChange && { willChange: 'scroll-position' as const })
  };
};
