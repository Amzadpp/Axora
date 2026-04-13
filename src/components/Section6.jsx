'use client';

import { useRef, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Section6() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState({});
  const [counters, setCounters] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
    counter4: 0
  });
  const [countersStarted, setCountersStarted] = useState(false);

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

  // Start all counters
  const startCounters = () => {
    if (countersStarted) return;
    
    setCountersStarted(true);
    
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
  };

  useEffect(() => {
    // Create intersection observer for reverse animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            if (entry.isIntersecting) {
              // Card entered viewport - ANIMATE IN
              setVisibleCards((prev) => ({ ...prev, [id]: true }));
              // Start counters when first card becomes visible
              if (id === 'card-0' && !countersStarted) {
                startCounters();
              }
            } else {
              // Card left viewport - REVERSE ANIMATION (ANIMATE OUT)
              setVisibleCards((prev) => ({ ...prev, [id]: false }));
            }
          }
        });
      },
      { 
        threshold: 0.3, // 30% visible hone par trigger
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe all cards
    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.setAttribute('data-id', `card-${index}`);
        observer.observe(card);
      }
    });

    return () => {
      // Cleanup observer
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [countersStarted]);

  // Function to add cards to refs
  const addToCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Get animation styles based on card index and visibility
  const getCardAnimation = (index, isVisible) => {
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
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translateX(0) translateY(0) scale(1)' 
        : `translateX(${fromX}px) translateY(${fromY}px) scale(0.9)`,
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="mxd-section padding-grid-pre-mtext overflow-hidden" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-stats-cards">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-stats-cards__item mxd-grid-item anim-uni-scale-in-right" ref={addToCardRef}>
                  <div 
                    className="mxd-stats-cards__inner align-end bg-accent radius-m padding-4"
                    style={getCardAnimation(0, visibleCards['card-0'])}
                  >
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
                  <div 
                    className="mxd-stats-cards__inner align-end bg-base-tint radius-m padding-4"
                    style={getCardAnimation(1, visibleCards['card-1'])}
                  >
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
                  <div 
                    className="mxd-stats-cards__inner bg-base-tint radius-m padding-4"
                    style={getCardAnimation(2, visibleCards['card-2'])}
                  >
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
                  <div 
                    className="mxd-stats-cards__inner bg-base-tint radius-m padding-4"
                    style={getCardAnimation(3, visibleCards['card-3'])}
                  >
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