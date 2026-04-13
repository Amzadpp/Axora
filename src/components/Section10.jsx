'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Expertise() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const pinTriggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Check if mobile view
      const isMobile = window.innerWidth < 768;
      
      // Sticky heading that stays fixed while scrolling (only for desktop)
      if (headingContainerRef.current && !isMobile) {
        // Get the scroll section height
        const scrollSection = document.querySelector('.mxd-pinned-universal__scroll');
        
        // Calculate exact end point based on scroll content
        const getEndPoint = () => {
          if (scrollSection) {
            const scrollHeight = scrollSection.scrollHeight;
            const viewportHeight = window.innerHeight;
            // End when scroll section content is completely viewed
            return scrollHeight - viewportHeight + 100;
          }
          return 500;
        };
        
        // Kill existing trigger if any
        if (pinTriggerRef.current) {
          pinTriggerRef.current.kill();
        }
        
        // Create proper pin trigger without scrub
        pinTriggerRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getEndPoint()}`,
          pin: headingContainerRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onLeave: () => {
            // When pinning ends, reset position
            if (headingContainerRef.current) {
              headingContainerRef.current.style.position = 'relative';
              headingContainerRef.current.style.top = '0';
            }
          },
          onEnterBack: () => {
            // When scrolling back, reapply pinning
            if (headingContainerRef.current && !isMobile) {
              headingContainerRef.current.style.position = '';
            }
          }
        });
      } else if (headingContainerRef.current && isMobile) {
        // On mobile, ensure no pinning
        headingContainerRef.current.style.position = 'relative';
      }

      // Smooth scroll-triggered animation for heading
      if (headingRef.current) {
        if (!isMobile) {
          gsap.fromTo(headingRef.current,
            {
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: 1.2,
                toggleActions: "play none none reverse",
              }
            }
          );
        } else {
          // Mobile: Simple animation without scrub
          gsap.fromTo(headingRef.current,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      }

      // Animate cards with stagger and smooth scroll effect
      cardsRef.current.forEach((card, index) => {
        if (card) {
          if (!isMobile) {
            // Desktop: Complex animations with scrub
            const fromX = index % 2 === 0 ? -50 : 50;
            const fromY = Math.floor(index / 2) % 2 === 0 ? -30 : 30;
            
            gsap.fromTo(card,
              {
                opacity: 0,
                x: fromX,
                y: fromY,
                scale: 0.8,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 40%",
                  scrub: 0.8,
                  toggleActions: "play none none reverse",
                }
              }
            );

            // Icon bounce effect on scroll
            const icon = card.querySelector('.mxd-tech-stack-cards__icon');
            if (icon) {
              gsap.fromTo(icon,
                {
                  scale: 0.5,
                  rotate: -180,
                },
                {
                  scale: 1,
                  rotate: 0,
                  duration: 0.8,
                  ease: "back.out(1.2)",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 0.6,
                  }
                }
              );
            }
          } else {
            // Mobile: Simple animations without scrub
            gsap.fromTo(card,
              {
                opacity: 0,
                y: 30,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  end: "top 70%",
                  toggleActions: "play none none reverse",
                }
              }
            );

            // Simple icon animation for mobile
            const icon = card.querySelector('.mxd-tech-stack-cards__icon');
            if (icon) {
              gsap.fromTo(icon,
                {
                  scale: 0.8,
                },
                {
                  scale: 1,
                  duration: 0.4,
                  ease: "back.out(1.2)",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 70%",
                  }
                }
              );
            }
          }
        }
      });

      // Grid cards container animation
      const gridContainer = document.querySelector('.grid-cards');
      if (gridContainer) {
        if (!isMobile) {
          gsap.fromTo(gridContainer,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: gridContainer,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.5,
              }
            }
          );
        } else {
          gsap.set(gridContainer, { opacity: 1 });
        }
      }

    }, sectionRef);

    // Handle resize to refresh animations
    const handleResize = () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        
        if (headingContainerRef.current && !isMobile) {
          const scrollSection = document.querySelector('.mxd-pinned-universal__scroll');
          
          const getEndPoint = () => {
            if (scrollSection) {
              const scrollHeight = scrollSection.scrollHeight;
              const viewportHeight = window.innerHeight;
              return scrollHeight - viewportHeight + 100;
            }
            return 500;
          };
          
          if (pinTriggerRef.current) {
            pinTriggerRef.current.kill();
          }
          
          pinTriggerRef.current = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getEndPoint()}`,
            pin: headingContainerRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
            onLeave: () => {
              if (headingContainerRef.current) {
                headingContainerRef.current.style.position = 'relative';
                headingContainerRef.current.style.top = '0';
              }
            },
            onEnterBack: () => {
              if (headingContainerRef.current && !isMobile) {
                headingContainerRef.current.style.position = '';
              }
            }
          });
        } else if (headingContainerRef.current && isMobile) {
          headingContainerRef.current.style.position = 'relative';
          headingContainerRef.current.style.top = '0';
        }

        if (headingRef.current) {
          if (!isMobile) {
            gsap.fromTo(headingRef.current,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.5, ease: "power2.out",
                scrollTrigger: {
                  trigger: headingRef.current,
                  start: "top 80%",
                  end: "top 40%",
                  scrub: 1.2,
                  toggleActions: "play none none reverse",
                }
              }
            );
          } else {
            gsap.fromTo(headingRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                scrollTrigger: {
                  trigger: headingRef.current,
                  start: "top 85%",
                  end: "top 60%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }
        }

        cardsRef.current.forEach((card, index) => {
          if (card) {
            if (!isMobile) {
              const fromX = index % 2 === 0 ? -50 : 50;
              const fromY = Math.floor(index / 2) % 2 === 0 ? -30 : 30;
              
              gsap.fromTo(card,
                { opacity: 0, x: fromX, y: fromY, scale: 0.8 },
                { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 0.8,
                    toggleActions: "play none none reverse",
                  }
                }
              );

              const icon = card.querySelector('.mxd-tech-stack-cards__icon');
              if (icon) {
                gsap.fromTo(icon,
                  { scale: 0.5, rotate: -180 },
                  { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.2)",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 85%",
                      end: "top 50%",
                      scrub: 0.6,
                    }
                  }
                );
              }
            } else {
              gsap.fromTo(card,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 70%",
                    toggleActions: "play none none reverse",
                  }
                }
              );

              const icon = card.querySelector('.mxd-tech-stack-cards__icon');
              if (icon) {
                gsap.fromTo(icon,
                  { scale: 0.8 },
                  { scale: 1, duration: 0.4, ease: "back.out(1.2)",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 90%",
                      end: "top 70%",
                    }
                  }
                );
              }
            }
          }
        });

        const gridContainer = document.querySelector('.grid-cards');
        if (gridContainer && !isMobile) {
          gsap.fromTo(gridContainer,
            { opacity: 0 },
            { opacity: 1, duration: 1,
              scrollTrigger: {
                trigger: gridContainer,
                start: "top 80%",
                end: "top 30%",
                scrub: 0.5,
              }
            }
          );
        } else if (gridContainer && isMobile) {
          gsap.set(gridContainer, { opacity: 1 });
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to add cards to refs
  const addToCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
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
                  <div className="mxd-pinned-universal__static-inner no-margin" ref={headingContainerRef}>
                    <div className="mxd-section-title h2-only no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title card-split-title">
                              <h2 className="reveal-type" ref={headingRef}>
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
                    <div className="mxd-tech-stack-cards grid-cards">
                      {techCards.map((card, index) => (
                        <div 
                          key={index}
                          className="mxd-tech-stack-cards__item animate-card-4"
                          ref={addToCardRef}
                        >
                          <div className="mxd-tech-stack-cards__inner-v2">
                            <div className="mxd-tech-stack-cards__icon">
                              <img
                                alt={card.name}
                                loading="lazy"
                                width="300"
                                height="300"
                                decoding="async"
                                data-nimg="1"
                                style={{ color: "transparent" }}
                                src={card.img}
                              />
                            </div>
                            <div className="mxd-tech-stack-cards__title">
                              <p className="t-bright t-caption">{card.name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
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