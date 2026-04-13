'use client';

import { useRef, useEffect, useState } from 'react';

export default function Section11() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingContainerRef = useRef(null);
  const listItemsRef = useRef([]);
  const listContentsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});
  const [visibleItems, setVisibleItems] = useState({});
  const [visibleContents, setVisibleContents] = useState({});
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
              if (id.startsWith('heading')) {
                setVisibleElements((prev) => ({ ...prev, [id]: true }));
              } else if (id.startsWith('item-')) {
                setVisibleItems((prev) => ({ ...prev, [id]: true }));
              } else if (id.startsWith('content-')) {
                setVisibleContents((prev) => ({ ...prev, [id]: true }));
              }
            } else {
              // Element left viewport - REVERSE ANIMATION (ANIMATE OUT)
              if (id.startsWith('heading')) {
                setVisibleElements((prev) => ({ ...prev, [id]: false }));
              } else if (id.startsWith('item-')) {
                setVisibleItems((prev) => ({ ...prev, [id]: false }));
              } else if (id.startsWith('content-')) {
                setVisibleContents((prev) => ({ ...prev, [id]: false }));
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

    // Observe list items
    listItemsRef.current.forEach((item, index) => {
      if (item) {
        item.setAttribute('data-id', `item-${index}`);
        observer.observe(item);
      }
    });

    // Observe list contents
    listContentsRef.current.forEach((content, index) => {
      if (content) {
        content.setAttribute('data-id', `content-${index}`);
        observer.observe(content);
      }
    });

    return () => {
      // Cleanup observer
      if (headingRef.current) observer.unobserve(headingRef.current);
      listItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
      listContentsRef.current.forEach((content) => {
        if (content) observer.unobserve(content);
      });
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

  // Get heading animation style
  const getHeadingStyle = () => {
    const isVisible = visibleElements['heading'];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${isMobile ? 50 : 100}px)`,
      transition: `all ${isMobile ? 0.8 : 1.5}s cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  // Get list item animation style
  const getListItemStyle = (index) => {
    const isVisible = visibleItems[`item-${index}`];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${isMobile ? 40 : 60}px)`,
      transition: `all ${isMobile ? 0.6 : 1}s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
    };
  };

  // Get content animation style (slide from left)
  const getContentStyle = (index) => {
    const isVisible = visibleContents[`content-${index}`];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      return {
        opacity: 1,
        transform: 'translateX(0)',
        transition: 'none',
      };
    }
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.1}s`,
    };
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
                                style={getHeadingStyle()}
                              >
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
                          style={getListItemStyle(index)}
                        >
                          <div 
                            className="mxd-res-list__divider"
                            style={getListItemStyle(index)}
                          ></div>
                          <div 
                            className="mxd-res-list__content"
                            ref={(el) => addToContentRef(el, index)}
                            style={getContentStyle(index)}
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
                          <div 
                            className="mxd-res-list__divider"
                            style={getListItemStyle(index)}
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