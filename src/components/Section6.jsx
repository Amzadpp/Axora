'use client';

import { useRef, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section6() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const counterRefs = useRef([]);
  const [counters, setCounters] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
    counter4: 0
  });

  // Counter animation function
  const animateCounter = (target, duration, setter) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        setter(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        setter(target);
      }
    };
    
    updateCounter();
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll trigger context for this section only
    const ctx = gsap.context(() => {
      
      // Animate each card with different directions
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        let fromX = 0;
        let fromY = 0;
        
        // Set different directions for each card
        switch(index) {
          case 0: // First card - from left
            fromX = -100;
            fromY = 0;
            break;
          case 1: // Second card - from top
            fromX = 0;
            fromY = -100;
            break;
          case 2: // Third card - from right
            fromX = 100;
            fromY = 0;
            break;
          case 3: // Fourth card - from bottom
            fromX = 0;
            fromY = 100;
            break;
          default:
            fromX = 0;
            fromY = 50;
        }
        
        gsap.fromTo(card,
          {
            x: fromX,
            y: fromY,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            }
          }
        );
      });

      // Trigger counters when cards come into view
      const countersTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          // Counter 1: Happy clients (85)
          animateCounter(85, 2000, (value) => {
            setCounters(prev => ({ ...prev, counter1: value }));
          });
          
          // Counter 2: Clients come back (97%)
          animateCounter(97, 2000, (value) => {
            setCounters(prev => ({ ...prev, counter2: value }));
          });
          
          // Counter 3: Years of experience (12)
          animateCounter(12, 2000, (value) => {
            setCounters(prev => ({ ...prev, counter3: value }));
          });
          
          // Counter 4: Completed projects (150)
          animateCounter(150, 2000, (value) => {
            setCounters(prev => ({ ...prev, counter4: value }));
          });
        },
        once: true // Only trigger once
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && sectionRef.current?.contains(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Function to add cards to refs
  const addToCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <div className="mxd-section padding-grid-pre-mtext overflow-hidden" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-stats-cards">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-stats-cards__item mxd-grid-item anim-uni-scale-in-right" ref={addToCardRef}>
                  <div className="mxd-stats-cards__inner align-end bg-accent radius-m padding-4">
                    <div className="mxd-counter">
                      <p id="stats-counter-1" className="mxd-counter__number mxd-stats-number opposite">
                        <span className="mxd-counter__number mxd-stats-number opposite">{counters.counter1}</span>+
                      </p>
                      <p className="mxd-counter__descr t-140 t-bright opposite">
                        Happy clients who<br />trust my work
                      </p>
                    </div>
                    <div className="mxd-stats-cards__btngroup">
                      <a className="btn-anim btn btn-anim btn-default btn-outline opposite slide-right-up" aria-label="Studio" href="/about-us">
                        <span className="btn-caption">
                          <div className="btn-anim__block">Studio</div>
                          <div className="btn-anim__block" aria-hidden="true">Studio</div>
                        </span>
                        <i className="ph-bold ph-arrow-up-right"></i>
                      </a>
                    </div>
                    <div className="mxd-stats-cards__image mxd-stats-cards-image-1">
                      <img alt="Illustration" loading="lazy" width="800" height="800" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/big-start.webp" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-7 mxd-stats-cards__item mxd-grid-item anim-uni-scale-in-left" ref={addToCardRef}>
                  <div className="mxd-stats-cards__inner align-end bg-base-tint radius-m padding-4">
                    <div className="mxd-stats-cards__btngroup">
                      <div className="mxd-avatars">
                        <div className="mxd-avatars__item">
                          <img alt="Illustration" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/woman.webp" />
                        </div>
                        <div className="mxd-avatars__item bg-base-opp">
                          <FaStar className="mxd-avatars__icon icon-star" size={60} />
                        </div>
                        <div className="mxd-avatars__item">
                          <img alt="Illustration" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/man.webp" />
                        </div>
                      </div>
                    </div>
                    <div className="mxd-counter align-end">
                      <p id="stats-counter-2" className="mxd-counter__number mxd-stats-number">
                        <span className="mxd-counter__number mxd-stats-number">{counters.counter2}</span>%
                      </p>
                      <p className="mxd-counter__descr t-140 t-bright">
                        Clients come back for<br />a new projects
                      </p>
                    </div>
                    <div className="mxd-stats-cards__image mxd-stats-cards-image-2">
                      <img alt="Illustration" loading="lazy" width="800" height="800" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/i.webp" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-7 mxd-stats-cards__item mxd-grid-item anim-uni-scale-in-right" ref={addToCardRef}>
                  <div className="mxd-stats-cards__inner bg-base-tint radius-m padding-4">
                    <div className="mxd-counter">
                      <p id="stats-counter-3" className="mxd-counter__number mxd-stats-number">
                        <span className="mxd-counter__number mxd-stats-number">{counters.counter3}</span>+
                      </p>
                      <p className="mxd-counter__descr t-140 t-bright">
                        Years of professional experience in designing digital products
                      </p>
                    </div>
                    <div className="mxd-stats-cards__btngroup">
                      <a className="btn-anim btn btn-anim btn-default btn-outline slide-right-down" aria-label="Start New Project" href="/contact">
                        <span className="btn-caption">
                          <div className="btn-anim__block">Start New Project</div>
                          <div className="btn-anim__block" aria-hidden="true">Start New Project</div>
                        </span>
                        <i className="ph-bold ph-arrow-down-right"></i>
                      </a>
                    </div>
                    <div className="mxd-stats-cards__image mxd-stats-cards-image-3">
                      <img alt="Illustration" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/robot.webp" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-5 mxd-stats-cards__item mxd-grid-item anim-uni-scale-in-left" ref={addToCardRef}>
                  <div className="mxd-stats-cards__inner bg-base-tint radius-m padding-4">
                    <div className="mxd-counter">
                      <p id="stats-counter-4" className="mxd-counter__number mxd-stats-number">
                        <span className="mxd-counter__number mxd-stats-number">{counters.counter4}</span>+
                      </p>
                      <p className="mxd-counter__descr t-140 t-bright">
                        Successfully<br />completed projects
                      </p>
                    </div>
                    <div className="mxd-stats-cards__btngroup">
                      <a className="btn-anim btn btn-anim btn-default btn-outline slide-right-up" aria-label="Works" href="/works-simple">
                        <span className="btn-caption">
                          <div className="btn-anim__block">Works</div>
                          <div className="btn-anim__block" aria-hidden="true">Works</div>
                        </span>
                        <i className="ph-bold ph-arrow-up-right"></i>
                      </a>
                    </div>
                    <div className="mxd-stats-cards__image mxd-stats-cards-image-4">
                      <img alt="Illustration" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="/img/head-bot.webp" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}