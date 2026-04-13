'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section11() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const listItemsRef = useRef([]);
  const listContentsRef = useRef([]);
  const pinTriggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Check if mobile view
      const isMobile = window.innerWidth < 768;
      
      // Sticky heading that stays fixed while scrolling (only for desktop)
      if (headingContainerRef.current && !isMobile) {
        // Kill existing trigger if any
        if (pinTriggerRef.current) {
          pinTriggerRef.current.kill();
        }
        
        // Create proper pin trigger with bottom bottom end point
        pinTriggerRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom", // This ensures pin lasts till the very end of section
          pin: headingContainerRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onLeave: () => {
            // When section ends, reset position
            if (headingContainerRef.current) {
              headingContainerRef.current.style.position = 'relative';
              headingContainerRef.current.style.top = '0';
            }
          },
          onEnterBack: () => {
            // When scrolling back into section, reapply pinning
            if (headingContainerRef.current && !isMobile) {
              headingContainerRef.current.style.position = '';
            }
          }
        });
      } else if (headingContainerRef.current && isMobile) {
        // On mobile, ensure no pinning
        headingContainerRef.current.style.position = 'relative';
        headingContainerRef.current.style.top = '0';
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
          // Mobile: Simple animation
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

      // Ultra-smooth animation for each list item
      listItemsRef.current.forEach((item, index) => {
        if (item) {
          if (!isMobile) {
            // Desktop: Complex animations with scrub
            gsap.fromTo(item,
              {
                opacity: 0,
                y: 60,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  end: "top 35%",
                  scrub: 0.8,
                  toggleActions: "play none none reverse",
                }
              }
            );

            // Inner content smooth reveal
            const content = listContentsRef.current[index];
            if (content) {
              gsap.fromTo(content,
                {
                  opacity: 0,
                  x: -30,
                },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 0.6,
                  }
                }
              );
            }
          } else {
            // Mobile: Simple animations
            gsap.fromTo(item,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  end: "top 70%",
                  toggleActions: "play none none reverse",
                }
              }
            );

            // Inner content for mobile
            const content = listContentsRef.current[index];
            if (content) {
              gsap.set(content, { opacity: 1, x: 0 });
            }
          }
        }
      });

    }, sectionRef);

    // Handle resize to refresh animations
    const handleResize = () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        
        if (headingContainerRef.current && !isMobile) {
          if (pinTriggerRef.current) {
            pinTriggerRef.current.kill();
          }
          
          pinTriggerRef.current = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
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

        // Re-trigger heading animation
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

        // Re-trigger list items animations
        listItemsRef.current.forEach((item, index) => {
          if (item) {
            if (!isMobile) {
              gsap.fromTo(item,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "top 35%",
                    scrub: 0.8,
                    toggleActions: "play none none reverse",
                  }
                }
              );

              const content = listContentsRef.current[index];
              if (content) {
                gsap.fromTo(content,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 80%",
                      end: "top 40%",
                      scrub: 0.6,
                    }
                  }
                );
              }
            } else {
              gsap.fromTo(item,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "top 70%",
                    toggleActions: "play none none reverse",
                  }
                }
              );

              const content = listContentsRef.current[index];
              if (content) {
                gsap.set(content, { opacity: 1, x: 0 });
              }
            }
          }
        });
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

  // Function to add items to refs
  const addToListRef = (el, index) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current[index] = el;
    }
  };

  const addToContentRef = (el, index) => {
    if (el && !listContentsRef.current.includes(el)) {
      listContentsRef.current[index] = el;
    }
  };

  const educationItems = [
    {
      title: 'Drawing Concentration',
      source: 'New York Academy of Art',
      descr: 'Intensive drawing courses that present the fundamental principles of drawing.',
      year: '2015 - 2016'
    },
    {
      title: 'UI/UX Design Specialization',
      source: 'California Institute of Arts',
      descr: 'Research, design, and prototype effective, visually-driven websites and apps.',
      year: '2019 - 2021'
    },
    {
      title: 'UI/UX Designer',
      source: 'Coursera',
      descr: 'This course is about how to complete the design process from beginning to end.',
      year: '2022'
    }
  ];

  return (
    <div className="mxd-section padding-default add-margin-top" ref={sectionRef}>
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
                                My<br />education
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
                    <div className="mxd-res-list">
                      {educationItems.map((item, index) => (
                        <div 
                          key={index} 
                          className="mxd-res-list__item"
                          ref={(el) => addToListRef(el, index)}
                        >
                          <div className="mxd-res-list__divider"></div>
                          <div 
                            className="mxd-res-list__content"
                            ref={(el) => addToContentRef(el, index)}
                          >
                            <div className="mxd-res-list__data">
                              <div className="mxd-res-list__title">
                                <h4>{item.title}</h4>
                                <p className="mxd-res-list__source">course by <a href="#" target="_blank">{item.source}</a></p>
                              </div>
                              <div className="mxd-res-list__descr">
                                <p>{item.descr}</p>
                              </div>
                            </div>
                            <div className="mxd-res-list__year">
                              <p>{item.year}</p>
                            </div>
                          </div>
                          <div className="mxd-res-list__divider"></div>
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