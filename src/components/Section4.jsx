'use client';

import { useRef, useEffect, useState } from 'react';

export default function Section4() {
  const marqueeTrackRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const directionRef = useRef(-1); // -1 = right to left, 1 = left to right
  const positionRef = useRef(0);
  const speedRef = useRef(2);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    // Force section visibility
    if (sectionRef.current) {
      sectionRef.current.style.minHeight = '200px';
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.opacity = '1';
    }

    // Get total width of one set
    let totalWidth = 0;
    const firstSet = track.children[0];
    if (firstSet) {
      totalWidth = firstSet.offsetWidth;
    }

    // Clone items for seamless loop (ensure enough items)
    const neededClones = 4 - track.children.length;
    for (let i = 0; i < neededClones; i++) {
      const clone = track.children[i % track.children.length].cloneNode(true);
      track.appendChild(clone);
    }

    // Set initial position
    positionRef.current = 0;
    track.style.transform = `translateX(${positionRef.current}px)`;

    // Animation function
    const animate = () => {
      if (!track) return;
      
      // Move based on direction
      positionRef.current -= (speedRef.current * directionRef.current);
      
      // Reset position for seamless loop
      if (directionRef.current === -1) { // Right to left
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = positionRef.current + totalWidth;
        }
      } else { // Left to right
        if (positionRef.current >= 0) {
          positionRef.current = positionRef.current - totalWidth;
        }
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = positionRef.current + totalWidth;
        }
      }
      
      track.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Scroll direction detection
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Get section position
      const section = sectionRef.current;
      if (!section) return;
      
      const sectionRect = section.getBoundingClientRect();
      const isSectionVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
      
      if (isSectionVisible) {
        if (currentScrollY > lastScrollY) {
          // Scrolling Down - Right to Left
          directionRef.current = -1;
          speedRef.current = 2.5;
        } else if (currentScrollY < lastScrollY) {
          // Scrolling Up - Left to Right
          directionRef.current = 1;
          speedRef.current = 2.5;
        }
      }
      
      lastScrollY = currentScrollY;
      
      // Smooth speed transition
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        speedRef.current = 2;
      }, 500);
    };

    // Handle resize
    const handleResize = () => {
      if (firstSet) {
        totalWidth = firstSet.offsetWidth;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      className="mxd-section padding-mtext-pre-title" 
      ref={sectionRef}
      style={{ 
        visibility: 'visible',
        opacity: 1,
        display: 'block',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <div className="marquee marquee-right--gsap muted-extra" style={{ overflow: 'hidden', width: '100%' }}>
            <div 
              className="marquee-flex" 
              ref={marqueeTrackRef}
              style={{ 
                display: 'flex', 
                whiteSpace: 'nowrap',
                willChange: 'transform',
                width: 'fit-content'
              }}
            >
              {/* First set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <p className="marquee__text" style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px', marginRight: '20px' }}>
                  <svg version="1.1" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                   fill="currentColor">
                    <path fill="currentColor" d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>
              
              {/* Second set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <p className="marquee__text" style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px', marginRight: '20px' }}>
                  <svg version="1.1" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                   fill="currentColor">
                    <path fill="currentColor" d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>
              
              {/* Third set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <p className="marquee__text" style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px', marginRight: '20px' }}>
                  <svg version="1.1" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" 
                  fill="currentColor">
                    <path fill="currentColor" d="M78.4,38.4c0,0-11.8,0-15.8,0c-1.6,0-4.8-0.2-7.1-0.8c-2.3-0.6-4.3-0.8-6.3-2.4c-2-1.2-3.5-3.2-4.7-4.8 c-1.2-1.6-1.6-3.6-2-5.5c-0.3-1.5-0.7-4.3-0.8-5.9c-0.2-4.3,0-17.4,0-17.4C41.8,0.8,41,0,40.2,0s-1.6,0.8-1.6,1.6c0,0,0,13.1,0,17.4 c0,1.6-0.6,4.3-0.8,5.9c-0.3,2-0.8,4-2,5.5c-1.2,2-2.8,3.6-4.7,4.8s-4,1.8-6.3,2.4c-1.9,0.5-4.7,0.6-6.7,0.8c-3.9,0.4-16.6,0-16.6,0 C0.8,38.4,0,39.2,0,40c0,0.8,0.8,1.6,1.6,1.6c0,0,12.2,0,16.6,0c1.6,0,4.8,0.3,6.7,0.8c2.3,0.6,4.3,0.8,6.3,2.4 c1.6,1.2,3.2,2.8,4.3,4.4c1.2,2,2.1,3.9,2.4,6.3c0.2,1.7,0.7,4.7,0.8,6.7c0.2,4,0,16.2,0,16.2c0,0.8,0.8,1.6,1.6,1.6 s1.6-0.8,1.6-1.6c0,0,0-12.3,0-16.2c0-1.6,0.5-5.1,0.8-6.7c0.5-2.3,0.8-4.4,2.4-6.3c1.2-1.6,2.8-3.2,4.3-4.4c2-1.2,3.9-2,6.3-2.4 c1.8-0.3,5.1-0.7,7.1-0.8c3.5-0.2,15.8,0,15.8,0c0.8,0,1.6-0.8,1.6-1.6C80,39.2,79.2,38.4,78.4,38.4C78.4,38.4,78.4,38.4,78.4,38.4z"></path>
                  </svg>
                </div>
              </div>

              {/* Fourth set */}
              <div className="marquee__item one-line item-regular text" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <p className="marquee__text" style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500 }}>About Me</p>
                <div className="marquee__image" style={{ display: 'inline-flex', marginLeft: '20px', marginRight: '20px' }}>
                  <svg version="1.1" width="60" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" 
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