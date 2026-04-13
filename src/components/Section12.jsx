'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section12() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Image upar aur neeche dono move karegi scroll ke saath
    gsap.fromTo(imageRef.current,
      {
        y: -200, // Start: upar
      },
      {
        y: 100, // End: neeche
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="mxd-section padding-pre-title" ref={sectionRef}>
      <div className="mxd-container">
        <div className="mxd-divider">
          <div 
            ref={imageRef}
            className="mxd-divider__image divider-image-5 parallax-img"
          ></div>
        </div>
      </div>
    </div>
  );
}