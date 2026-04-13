'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { PiEye } from 'react-icons/pi';

export default function Section14() {
  const sectionRef = useRef(null);
  const promoInnerRef = useRef(null);
  const promoBgRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const iconRef = useRef(null);
  const floatingAnimationRef = useRef(null);
  
  const [visibleElements, setVisibleElements] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isImage1Hovered, setIsImage1Hovered] = useState(false);
  const [isImage2Hovered, setIsImage2Hovered] = useState(false);

  // Floating animation for image2
  useEffect(() => {
    let animationId;
    let startTime;
    let direction = 1;
    let currentY = 0;
    
    const startFloatingAnimation = () => {
      const image2 = image2Ref.current;
      if (!image2) return;
      
      startTime = Date.now();
      
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        // Smooth sine wave movement
        currentY = Math.sin(elapsed * 1.5) * -15;
        
        if (image2 && !isImage2Hovered) {
          image2.style.transform = `translateY(${currentY}px)`;
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    // Start floating animation after entrance animation
    const timer = setTimeout(() => {
      startFloatingAnimation();
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isImage2Hovered]);

  useEffect(() => {
    // Create intersection observer for reverse animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            if (entry.isIntersecting) {
              setVisibleElements((prev) => ({ ...prev, [id]: true }));
            } else {
              setVisibleElements((prev) => ({ ...prev, [id]: false }));
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe all elements
    const elementsToObserve = [
      { ref: promoInnerRef, id: 'container' },
      { ref: promoBgRef, id: 'bg' },
      { ref: textRef, id: 'text' },
      { ref: iconRef, id: 'icon' },
      { ref: buttonRef, id: 'button' },
      { ref: image1Ref, id: 'image1' },
      { ref: image2Ref, id: 'image2' }
    ];

    elementsToObserve.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-id', id);
        observer.observe(ref.current);
      }
    });

    return () => {
      elementsToObserve.forEach(({ ref, id }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Handle character animation
  useEffect(() => {
    if (textRef.current && visibleElements['text']) {
      const chars = textRef.current.querySelectorAll('.char');
      chars.forEach((char, index) => {
        char.style.opacity = '1';
        char.style.transform = 'translateY(0) rotateX(0)';
        char.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.03}s`;
      });
    } else if (textRef.current && visibleElements['text'] === false) {
      const chars = textRef.current.querySelectorAll('.char');
      chars.forEach((char, index) => {
        char.style.opacity = '0';
        char.style.transform = 'translateY(80px) rotateX(-60deg)';
        char.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.03}s`;
      });
    }
  }, [visibleElements['text']]);

  return (
    <div className="mxd-section overflow-hidden" ref={sectionRef}>
      <div className="mxd-container">
        <div className="mxd-block">
          <div className="mxd-promo">
            <div 
              className="mxd-promo__inner anim-zoom-out-container" 
              ref={promoInnerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: visibleElements['container'] ? 'scale(0.95)' : 'scale(1.02)',
                borderRadius: visibleElements['container'] ? '200px' : '50px',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div 
                className="mxd-promo__bg" 
                ref={promoBgRef}
                style={{
                  transform: isHovered ? 'scale(1.02)' : (visibleElements['bg'] ? 'scale(0.95)' : 'scale(1)'),
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              ></div>
              <div className="mxd-promo__content">
                <p className="mxd-promo__title anim-uni-in-up" ref={textRef}>
                  <span 
                    className="mxd-promo__icon" 
                    ref={iconRef}
                    style={{
                      opacity: visibleElements['icon'] ? 1 : 0,
                      transform: visibleElements['icon'] ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                      transition: 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                      display: 'inline-block'
                    }}
                  >
                    <img alt="Illustration" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/hrd.webp" />
                  </span>
                  <span className="reveal-type mxd-promo__caption">
                    <span className="word"><span className="char">L</span><span className="char">e</span><span className="char">t</span><span className="char">'</span><span className="char">s</span></span>{' '}
                    <span className="word"><span className="char">t</span><span className="char">a</span><span className="char">l</span><span className="char">k</span></span>{' '}
                    <span className="word"><span className="char">a</span><span className="char">b</span><span className="char">o</span><span className="char">u</span><span className="char">t</span></span>{' '}
                    <span className="word"><span className="char">y</span><span className="char">o</span><span className="char">u</span><span className="char">r</span></span>{' '}
                    <span className="word"><span className="char">p</span><span className="char">r</span><span className="char">o</span><span className="char">j</span><span className="char">e</span><span className="char">c</span><span className="char">t</span><span className="char">!</span></span>
                  </span>
                </p>
                <div 
                  className="mxd-promo__controls anim-uni-in-up" 
                  ref={buttonRef}
                  style={{
                    opacity: visibleElements['button'] ? 1 : 0,
                    transform: visibleElements['button'] ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Link href="/contact" className="btn-anim btn btn-anim btn-default btn-large btn-additional slide-right-up" aria-label="Contact Me">
                    <span className="btn-caption">
                      <div className="btn-anim__block">
                        <span className="btn-anim__letter">C</span>
                        <span className="btn-anim__letter">o</span>
                        <span className="btn-anim__letter">n</span>
                        <span className="btn-anim__letter">t</span>
                        <span className="btn-anim__letter">a</span>
                        <span className="btn-anim__letter">c</span>
                        <span className="btn-anim__letter">t</span>
                        <span className="btn-anim__letter">&nbsp;</span>
                        <span className="btn-anim__letter">M</span>
                        <span className="btn-anim__letter">e</span>
                      </div>
                      <div className="btn-anim__block" aria-hidden="true">
                        <span className="btn-anim__letter">C</span>
                        <span className="btn-anim__letter">o</span>
                        <span className="btn-anim__letter">n</span>
                        <span className="btn-anim__letter">t</span>
                        <span className="btn-anim__letter">a</span>
                        <span className="btn-anim__letter">c</span>
                        <span className="btn-anim__letter">t</span>
                        <span className="btn-anim__letter">&nbsp;</span>
                        <span className="btn-anim__letter">M</span>
                        <span className="btn-anim__letter">e</span>
                      </div>
                    </span>
                    <i className="ph-bold ph-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
              <div className="mxd-promo__images">
                <img 
                  className="promo-image promo-image" 
                  ref={image1Ref}
                  alt="Illustration" 
                  loading="lazy" 
                  width="800" 
                  height="912" 
                  decoding="async" 
                  data-nimg="1" 
                  style={{ 
                    color: 'transparent',
                    opacity: visibleElements['image1'] ? 1 : 0,
                    transform: visibleElements['image1'] ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(-200px) rotate(-10deg) scale(0.8)',
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(isImage1Hovered && { transform: 'scale(1.03) rotate(3deg)' })
                  }}
                  src="/img/head-bg.webp" 
                  onMouseEnter={() => setIsImage1Hovered(true)}
                  onMouseLeave={() => setIsImage1Hovered(false)}
                />
                <img 
                  className="promo-image promo-image-1" 
                  ref={image2Ref}
                  alt="Illustration" 
                  loading="lazy" 
                  width="600" 
                  height="601" 
                  decoding="async" 
                  data-nimg="1" 
                  style={{ 
                    color: 'transparent',
                    opacity: visibleElements['image2'] ? 1 : 0,
                    transform: visibleElements['image2'] ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(200px) rotate(10deg) scale(0.8)',
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(isImage2Hovered && { transform: 'scale(1.05) rotate(-3deg)' })
                  }}
                  src="/img/head-bot2.webp" 
                  onMouseEnter={() => setIsImage2Hovered(true)}
                  onMouseLeave={() => setIsImage2Hovered(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}