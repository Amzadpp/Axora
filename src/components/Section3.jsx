'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function Section3() {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (!container || !image) return;

    // Get section bounds
    const getBounds = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress based on section position
      const startPoint = rect.top - viewportHeight; // When section bottom hits viewport top
      const endPoint = rect.bottom; // When section top hits viewport bottom
      const totalScroll = endPoint - startPoint;
      const currentScroll = viewportHeight - rect.top;
      
      let progress = (currentScroll - startPoint) / totalScroll;
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      return progress;
    };

    // Update image position based on scroll
    const updatePosition = () => {
      const progress = getBounds();
      
      // Reverse progress for up/down movement
      // Progress 0 = image at top (-200px)
      // Progress 1 = image at bottom (150px)
      const startY = -200;
      const endY = 150;
      const currentY = startY + (endY - startY) * progress;
      
      image.style.transform = `translateY(${currentY}px)`;
      setScrollProgress(progress);
    };

    // Throttle function for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Handle resize
    const handleResize = () => {
      updatePosition();
    };

    // Initial position
    updatePosition();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mxd-section padding-grid-pre-mtext" style={{ overflow: "hidden", position: 'relative' }}>
      <div className="mxd-container">
        <div className="mxd-divider" ref={containerRef} style={{ position: 'relative', minHeight: '400px' }}>
          <div 
            className="mxd-divider__image divider-image-4 parallax-img" 
            ref={imageRef}
            style={{ 
              position: 'relative',
              width: '100%',
              height: '400px',
              transform: 'translateY(0px)',
              transition: 'transform 0.1s linear'
            }}
          >
            
          </div>
        </div>
      </div>
    </div>
  );
}