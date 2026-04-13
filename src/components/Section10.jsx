'use client';

import { useRef, useEffect, useState } from 'react';

export default function Expertise() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});
  const [visibleCards, setVisibleCards] = useState({});
  const [isSticky, setIsSticky] = useState(false);

  // Sticky heading functionality (desktop only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile && headingContainerRef.current && sectionRef.current) {
      const handleScroll = () => {
        const section = sectionRef.current;
        const headingContainer = headingContainerRef.current;
        const scrollSection = document.querySelector('.mxd-pinned-universal__scroll');
        
        if (!section || !headingContainer || !scrollSection) return;
        
        const sectionRect = section.getBoundingClientRect();
        const scrollSectionRect = scrollSection.getBoundingClientRect();
        
        // Calculate when to pin
        const shouldSticky = sectionRect.top <= 0 && scrollSectionRect.bottom > window.innerHeight;
        
        if (shouldSticky) {
          setIsSticky(true);
          headingContainer.style.position = 'fixed';
          headingContainer.style.top = '100px';
          headingContainer.style.left = `${sectionRect.left}px`;
          headingContainer.style.width = `${sectionRect.width}px`;
          headingContainer.style.zIndex = '100';
        } else {
          setIsSticky(false);
          headingContainer.style.position = 'relative';
          headingContainer.style.top = 'auto';
          headingContainer.style.left = 'auto';
          headingContainer.style.width = 'auto';
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    // Create intersection observer for reverse animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            if (entry.isIntersecting) {
              // Element entered viewport - ANIMATE IN
              if (id.startsWith('card-')) {
                setVisibleCards((prev) => ({ ...prev, [id]: true }));
              } else {
                setVisibleElements((prev) => ({ ...prev, [id]: true }));
              }
            } else {
              // Element left viewport - REVERSE ANIMATION (ANIMATE OUT)
              if (id.startsWith('card-')) {
                setVisibleCards((prev) => ({ ...prev, [id]: false }));
              } else {
                setVisibleElements((prev) => ({ ...prev, [id]: false }));
              }
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe heading
    if (headingRef.current) {
      headingRef.current.setAttribute('data-id', 'heading');
      observer.observe(headingRef.current);
    }

    // Observe cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.setAttribute('data-id', `card-${index}`);
        observer.observe(card);
      }
    });

    return () => {
      // Cleanup observer
      if (headingRef.current) observer.unobserve(headingRef.current);
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Function to add cards to refs
  const addToCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Get animation styles based on visibility
  const getAnimationStyle = (id, delay = 0) => {
    const isVisible = visibleElements[id];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${isMobile ? 50 : 100}px)`,
      transition: `all ${isMobile ? 0.8 : 1.5}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
    };
  };

  // Get card animation styles with different directions
  const getCardAnimationStyle = (index, isVisible) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: Simple fade up
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
      };
    }
    
    // Desktop: Different directions based on position
    const fromX = index % 2 === 0 ? -50 : 50;
    const fromY = Math.floor(index / 2) % 2 === 0 ? -30 : 30;
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'translateX(0) translateY(0) scale(1)' 
        : `translateX(${fromX}px) translateY(${fromY}px) scale(0.8)`,
      transition: `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
    };
  };

  // Get icon animation style
  const getIconAnimationStyle = (index, isVisible) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      return {
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: `all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.05}s`,
      };
    }
    
    return {
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)',
      transition: `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.05}s`,
    };
  };

  const techCards = [
    { name: 'Photoshop', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-photoshop.svg' },
    { name: 'Figma', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-figma.svg' },
    { name: 'Illustrator', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-illustrator.svg' },
    { name: 'Sketch', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-scketch.svg' },
    { name: 'Blender', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-blender.svg' },
    { name: 'HTML5', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-html.svg' },
    { name: 'CSS3', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-css.svg' },
    { name: 'Notion', img: 'https://rayo-nextjs-creative-template.netlify.app/img/tech/icon-notion.svg' }
  ];

  return (
    <div className="mxd-section padding-grid-pre-pinned add-margin-top" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-universal">
            <div className="container-fluid px-0">
              <div className="row gx-0">

                <div className="col-12 col-xl-5 mxd-pinned-universal__static">
                  <div 
                    className="mxd-pinned-universal__static-inner no-margin" 
                    ref={headingContainerRef}
                    style={{
                      transition: 'all 0.3s ease',
                      zIndex: 100
                    }}
                  >
                    <div className="mxd-section-title h2-only no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title card-split-title">
                              <h2 
                                className="reveal-type" 
                                ref={headingRef}
                                style={getAnimationStyle('heading', 0)}
                              >
                                My favorite<br />stack
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-7 mxd-pinned-universal__scroll">
                  <div className="mxd-pinned-universal__scroll-inner mxd-grid-item no-margin">
                    <div className="mxd-tech-stack-cards grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '20px' }}>
                      {techCards.map((card, index) => {
                        const isCardVisible = visibleCards[`card-${index}`];
                        return (
                          <div 
                            key={index}
                            className="mxd-tech-stack-cards__item animate-card-4"
                            ref={addToCardRef}
                            style={getCardAnimationStyle(index, isCardVisible)}
                          >
                            <div className="mxd-tech-stack-cards__inner-v2">
                              <div 
                                className="mxd-tech-stack-cards__icon"
                                style={getIconAnimationStyle(index, isCardVisible)}
                              >
                                <img
                                  alt={card.name}
                                  loading="lazy"
                                  width="300"
                                  height="300"
                                  decoding="async"
                                  data-nimg="1"
                                  style={{ color: "transparent", width: '60px', height: '60px', objectFit: 'contain' }}
                                  src={card.img}
                                />
                              </div>
                              <div className="mxd-tech-stack-cards__title">
                                <p className="t-bright t-caption">{card.name}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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