'use client';

import { useRef, useEffect } from 'react';

export default function Section4() {
  const marqueeTrackRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const directionRef = useRef(-1); // -1 = right to left, 1 = left to right
  const animationRef = useRef(null);
  const currentXRef = useRef(0);
  const totalWidthRef = useRef(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    // Force section to be visible on load
    if (sectionRef.current) {
      sectionRef.current.style.minHeight = '200px';
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
    }

    // Small delay to ensure DOM is fully rendered
    const initializeMarquee = () => {
      // Force a reflow to get correct dimensions
      track.style.transform = 'translateX(0)';
      
      // Get the actual width of one set (first child)
      const firstSet = track.children[0];
      if (!firstSet) return;
      
      const setWidth = firstSet.offsetWidth;
      totalWidthRef.current = setWidth;
      
      // Reset position
      currentXRef.current = 0;
      track.style.transform = `translateX(${currentXRef.current}px)`;
    };

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(initializeMarquee, 100);
    
    let animationId;
    
    const animate = () => {
      // Move based on current direction
      currentXRef.current -= (5 * directionRef.current);
      
      // Reset position for seamless loop
      if (directionRef.current === -1) { // Right to left
        if (Math.abs(currentXRef.current) >= totalWidthRef.current) {
          currentXRef.current = currentXRef.current + totalWidthRef.current;
        }
      } else { // Left to right
        if (currentXRef.current >= 0) {
          currentXRef.current = currentXRef.current - totalWidthRef.current;
        }
        if (Math.abs(currentXRef.current) >= totalWidthRef.current) {
          currentXRef.current = currentXRef.current + totalWidthRef.current;
        }
      }
      
      if (track) {
        track.style.transform = `translateX(${currentXRef.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation after initialization
    const startAnimation = setTimeout(() => {
      if (totalWidthRef.current > 0) {
        animationId = requestAnimationFrame(animate);
      }
    }, 150);
    
    // Change direction based on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollYRef.current) {
        // Scrolling Down - Right to Left
        directionRef.current = -1;
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling Up - Left to Right
        directionRef.current = 1;
      }
      
      lastScrollYRef.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Resize observer to handle window resize
    const handleResize = () => {
      if (track && track.children[0]) {
        totalWidthRef.current = track.children[0].offsetWidth;
        currentXRef.current = 0;
        track.style.transform = `translateX(0)`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startAnimation);
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="mxd-section padding-mtext-pre-title" 
      ref={sectionRef}
      style={{ 
        visibility: 'visible',
        opacity: 1,
        display: 'block'
      }}
    >
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <div className="marquee marquee-right--gsap muted-extra" style={{ overflow: 'hidden', width: '100%' }}>
            <div 
              className="marquee-flex" 
              ref={marqueeTrackRef}
              style={{ 
                display: 'inline-flex', 
                whiteSpace: 'nowrap',
                willChange: 'transform'
              }}
            >
              {/* First set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <p className="marquee__text" style={{ margin: 0 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px' }}>
                  <svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                   fill="currentColor">
                    <path fill="currentColor" d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>
              
              {/* Second set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <p className="marquee__text" style={{ margin: 0 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px' }}>
                  <svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                   fill="currentColor">
                    <path fill="currentColor" 
                    d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>
              
              {/* Third set for seamless loop */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <p className="marquee__text" style={{ margin: 0 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px' }}>
                  <svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" 
                  fill="currentColor">
                    <path fill="currentColor" d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}