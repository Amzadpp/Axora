'use client';

import { useRef, useEffect, useState } from 'react';

export default function Section9() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const listItemsRef = useRef([]);
  const listContentsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    // Sticky heading functionality (desktop only)
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
              setVisibleElements((prev) => ({ ...prev, [id]: true }));
            } else {
              // Element left viewport - REVERSE ANIMATION (ANIMATE OUT)
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

    // Observe heading
    if (headingRef.current) {
      headingRef.current.setAttribute('data-id', 'heading');
      observer.observe(headingRef.current);
    }

    // Observe list items
    listItemsRef.current.forEach((item, index) => {
      if (item) {
        item.setAttribute('data-id', `list-${index}`);
        observer.observe(item);
      }
    });

    return () => {
      // Cleanup observer
      if (headingRef.current) observer.unobserve(headingRef.current);
      listItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
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

  // Get animation styles based on visibility
  const getAnimationStyle = (id, delay = 0, type = 'fade-up') => {
    const isVisible = visibleElements[id];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (type === 'fade-up') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${isMobile ? 50 : 100}px)`,
        transition: `all ${isMobile ? 0.8 : 1.2}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    if (type === 'fade-up-item') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${isMobile ? 40 : 80}px)`,
        transition: `all ${isMobile ? 0.6 : 1}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    if (type === 'slide-right') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    return {};
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
                                style={getAnimationStyle('heading', 0, 'fade-up')}
                              >
                                Experience
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
                      {experienceItems.map((item, index) => (
                        <div 
                          key={index} 
                          className="mxd-res-list__item"
                          ref={(el) => addToListRef(el, index)}
                          data-id={`list-${index}`}
                          style={getAnimationStyle(`list-${index}`, index * 0.15, 'fade-up-item')}
                        >
                          <div 
                            className="mxd-res-list__divider"
                            style={getAnimationStyle(`list-${index}`, index * 0.15, 'fade-up-item')}
                          ></div>
                          <div 
                            className="mxd-res-list__content"
                            ref={(el) => addToContentRef(el, index)}
                            style={getAnimationStyle(`list-${index}`, index * 0.15 + 0.1, 'slide-right')}
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
                          <div 
                            className="mxd-res-list__divider"
                            style={getAnimationStyle(`list-${index}`, index * 0.15 + 0.2, 'fade-up-item')}
                          ></div>
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