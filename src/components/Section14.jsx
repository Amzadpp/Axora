'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // 1. Main container shrink/grow on scroll - FIXED TRIGGER
      if (promoInnerRef.current) {
        gsap.fromTo(promoInnerRef.current,
          {
            scale: 1.02,
            borderRadius: '50px',
          },
          {
            scale: 0.95,
            borderRadius: '200px',
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%", // Jab section 95% visible ho tab start
              end: "bottom 80%", // Jab section 80% visible rahe tab end
              scrub: 1.5,
            }
          }
        );
      }

      // 2. Background shrink/grow animation - FIXED TRIGGER
      if (promoBgRef.current) {
        gsap.fromTo(promoBgRef.current,
          {
            scale: 1,
          },
          {
            scale: 0.95,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "bottom 80%",
              scrub: 1.5,
            }
          }
        );
      }

      // 3. Text animation (character by character)
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.char');
        gsap.fromTo(textElements,
          {
            y: 80,
            opacity: 0,
            rotationX: -60,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.5,
            stagger: 0.05,
            ease: "back.out(1)",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 4. Icon animation
      if (iconRef.current) {
        gsap.fromTo(iconRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: iconRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            }
          }
        );
      }

      // 5. Button animation
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            }
          }
        );
      }

      // 6. Image 1 - from left with scale on scroll
      if (image1Ref.current) {
        gsap.fromTo(image1Ref.current,
          {
            x: -200,
            opacity: 0,
            rotation: -10,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image1Ref.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      }

      // 7. Image 2 - from right with continuous up-down animation
      if (image2Ref.current) {
        // Entrance animation
        gsap.fromTo(image2Ref.current,
          {
            x: 200,
            opacity: 0,
            rotation: 10,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image2Ref.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
              onComplete: () => {
                startFloatingAnimation();
              }
            }
          }
        );
      }

      // Function for continuous up-down floating animation
      function startFloatingAnimation() {
        if (image2Ref.current && !floatingAnimationRef.current) {
          floatingAnimationRef.current = gsap.to(image2Ref.current, {
            y: -20,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5,
          });
        }
      }

    }, sectionRef);

    return () => {
      if (floatingAnimationRef.current) {
        floatingAnimationRef.current.kill();
        floatingAnimationRef.current = null;
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Hover effects
  useEffect(() => {
    const img1 = image1Ref.current;
    const img2 = image2Ref.current;
    const container = promoInnerRef.current;
    const bg = promoBgRef.current;

    // Image 1 hover effect
    if (img1) {
      const handleMouseEnter = () => {
        gsap.to(img1, { scale: 1.03, rotate: 3, duration: 0.5, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(img1, { scale: 1, rotate: 0, duration: 0.5, ease: "power2.out" });
      };
      img1.addEventListener('mouseenter', handleMouseEnter);
      img1.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        img1.removeEventListener('mouseenter', handleMouseEnter);
        img1.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const img2 = image2Ref.current;
    
    if (img2) {
      const handleMouseEnter = () => {
        gsap.to(img2, { scale: 1.05, rotate: -3, duration: 0.5, ease: "power2.out" });
        if (floatingAnimationRef.current) {
          floatingAnimationRef.current.pause();
        }
      };
      const handleMouseLeave = () => {
        gsap.to(img2, { scale: 1, rotate: 0, duration: 0.5, ease: "power2.out" });
        if (floatingAnimationRef.current) {
          floatingAnimationRef.current.resume();
        }
      };
      img2.addEventListener('mouseenter', handleMouseEnter);
      img2.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        img2.removeEventListener('mouseenter', handleMouseEnter);
        img2.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const container = promoInnerRef.current;
    const bg = promoBgRef.current;

    if (container && bg) {
      const handleMouseEnter = () => {
        gsap.to(bg, { scale: 1.02, duration: 0.6, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(bg, { scale: 1, duration: 0.6, ease: "power2.out" });
      };
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="mxd-section overflow-hidden" ref={sectionRef}>
      <div className="mxd-container">
        <div className="mxd-block">
          <div className="mxd-promo">
            <div className="mxd-promo__inner anim-zoom-out-container" ref={promoInnerRef}>
              <div className="mxd-promo__bg" ref={promoBgRef}></div>
              <div className="mxd-promo__content">
                <p className="mxd-promo__title anim-uni-in-up" ref={textRef}>
                  <span className="mxd-promo__icon" ref={iconRef}>
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
                <div className="mxd-promo__controls anim-uni-in-up" ref={buttonRef}>
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
                  style={{ color: 'transparent' }} 
                  src="/img/head-bg.webp" 
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
                  style={{ color: 'transparent' }} 
                  src="/img/head-bot2.webp" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}