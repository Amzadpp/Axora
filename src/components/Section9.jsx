'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section9() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const listItemsRef = useRef([]);
  const listContentsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Check if mobile view
      const isMobile = window.innerWidth < 768;
      
      // Fix: Proper sticky heading using ScrollTrigger pin (for desktop)
      if (headingContainerRef.current && sectionRef.current && !isMobile) {
        // Get the scroll section height
        const scrollSection = document.querySelector('.mxd-pinned-universal__scroll');
        const scrollHeight = scrollSection ? scrollSection.offsetHeight : 500;
        
        // Create pin trigger that lasts until the very end of the scroll section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollHeight}`, // End after scrolling through the entire right column
          pin: headingContainerRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Optional: Add effect when reaching end
            if (self.progress >= 0.99) {
              headingContainerRef.current.style.opacity = '0.8';
            } else {
              headingContainerRef.current.style.opacity = '1';
            }
          }
        });
      }

      // Smooth scroll-triggered animation for heading text (only for desktop)
      if (headingRef.current && !isMobile) {
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
      } else if (headingRef.current && isMobile) {
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

      // Ultra-smooth animation for each list item
      listItemsRef.current.forEach((item, index) => {
        if (item) {
          // Different animation for mobile vs desktop
          if (!isMobile) {
            gsap.fromTo(item,
              {
                opacity: 0,
                y: 80,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  end: "top 30%",
                  scrub: 1,
                  toggleActions: "play none none reverse",
                }
              }
            );

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
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "top 35%",
                    scrub: 0.8,
                  }
                }
              );
            }
          } else {
            // Mobile: Simple animation without scrub to prevent hide/show
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
      
      // Re-initialize after resize
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        
        if (headingContainerRef.current && sectionRef.current && !isMobile) {
          const scrollSection = document.querySelector('.mxd-pinned-universal__scroll');
          const scrollHeight = scrollSection ? scrollSection.offsetHeight : 500;
          
          // Recreate pin
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollHeight}`,
            pin: headingContainerRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress >= 0.99) {
                headingContainerRef.current.style.opacity = '0.8';
              } else {
                headingContainerRef.current.style.opacity = '1';
              }
            }
          });
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
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                  }
                }
              );

              const content = listContentsRef.current[index];
              if (content) {
                gsap.fromTo(content,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 80%",
                      end: "top 35%",
                      scrub: 0.8,
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const experienceItems = [
    {
      title: 'Illustrator',
      source: 'Creative Mind',
      sourceLabel: 'Illustrator',
      descr: 'I created original images for a range of digital and printed products.',
      year: '2019 - 2021'
    },
    {
      title: 'Graphic designer',
      source: 'Moon Light',
      sourceLabel: 'Graphic designer',
      descr: 'My job was to create adverts, branding, signage and other media products.',
      year: '2021 - 2024'
    },
    {
      title: 'UI/UX designer',
      source: 'Moon Light',
      sourceLabel: 'UI/UX designer',
      descr: 'I am actively involved in creating user interfaces for mobile apps and websites.',
      year: '2024 - now'
    }
  ];

  return (
    <div className="mxd-section padding-grid-pre-pinned add-margin-top" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-universal">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-pinned-universal__static" style={{ position: 'relative' }}>
                  <div className="mxd-pinned-universal__static-inner no-margin" ref={headingContainerRef}>
                    <div className="mxd-section-title h2-only no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title card-split-title">
                              <h2 className="reveal-type" ref={headingRef}>Experience</h2>
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
                      {experienceItems.map((item, index) => (
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
                                <p className="mxd-res-list__source">in the <a href="#" target="_blank">{item.source}</a> agency</p>
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