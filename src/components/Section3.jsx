'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section3() {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Image upar aur neeche dono move karegi
    gsap.fromTo(
      imageRef.current,
      {
        y: -200, // Start: upar
      },
      {
        y: 150, // End: neeche5
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Jab section bottom par aaye
          end: "bottom top",   // Jab section top par chale jaye
          scrub: 12, // Smooth animation
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="mxd-section padding-grid-pre-mtext" style={{overflow:"hidden"}}>
      <div className="mxd-container">
        <div className="mxd-divider" ref={containerRef}>
          <div className="mxd-divider__image divider-image-4 parallax-img" ref={imageRef}>
            
          </div>
        </div>
      </div>
    </div>
  );
}