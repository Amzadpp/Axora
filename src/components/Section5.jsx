'use client';

import { useRef, useEffect, useState } from 'react';

export default function Section5() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const listItemsRef = useRef([]);
  const buttonsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});

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
        threshold: 0.3, // 30% visible hone par trigger
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe heading
    if (headingRef.current) {
      headingRef.current.setAttribute('data-id', 'heading');
      observer.observe(headingRef.current);
    }

    // Observe paragraph
    if (paragraphRef.current) {
      paragraphRef.current.setAttribute('data-id', 'paragraph');
      observer.observe(paragraphRef.current);
    }

    // Observe list items
    listItemsRef.current.forEach((item, index) => {
      if (item) {
        item.setAttribute('data-id', `list-${index}`);
        observer.observe(item);
      }
    });

    // Observe buttons
    buttonsRef.current.forEach((button, index) => {
      if (button) {
        button.setAttribute('data-id', `button-${index}`);
        observer.observe(button);
      }
    });

    return () => {
      // Cleanup observer
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (paragraphRef.current) observer.unobserve(paragraphRef.current);
      listItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
      buttonsRef.current.forEach((button) => {
        if (button) observer.unobserve(button);
      });
    };
  }, []);

  // Function to add items to refs
  const addToListRef = (el) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current.push(el);
    }
  };

  const addToButtonRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  // Get animation styles based on visibility
  const getAnimationStyle = (id, delay = 0, type = 'fade-up') => {
    const isVisible = visibleElements[id];
    
    if (type === 'fade-up') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    if (type === 'fade-up-fast') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    return {};
  };

  return (
    <div className="mxd-section padding-pre-grid" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <h2 
                    className="reveal-type anim-uni-in-up" 
                    ref={headingRef}
                    style={getAnimationStyle('heading', 0, 'fade-up')}
                  >
                    Approach and philosophy
                  </h2>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <p 
                      className="t-large t-bright anim-uni-in-up" 
                      ref={paragraphRef}
                      style={getAnimationStyle('paragraph', 0.1, 'fade-up')}
                    >
                      From pixel-perfect designs to flawless code, every aspect of my projects is crafted with care to ensure the highest standards of quality.
                    </p>
                    <div className="mxd-paragraph__lists">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-0', 0.2, 'fade-up-fast')}
                                >
                                  Innovations
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-1', 0.3, 'fade-up-fast')}
                                >
                                  Excellence
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-2', 0.4, 'fade-up-fast')}
                                >
                                  Creativity
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-3', 0.5, 'fade-up-fast')}
                                >
                                  Experience
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-4', 0.6, 'fade-up-fast')}
                                >
                                  Competence
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-5', 0.7, 'fade-up-fast')}
                                >
                                  Passion
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-6', 0.2, 'fade-up-fast')}
                                >
                                  Web design
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-7', 0.3, 'fade-up-fast')}
                                >
                                  UI/UX
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-8', 0.4, 'fade-up-fast')}
                                >
                                  App design
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-9', 0.5, 'fade-up-fast')}
                                >
                                  Development
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-10', 0.6, 'fade-up-fast')}
                                >
                                  Branding
                                </p>
                              </li>
                              <li ref={addToListRef}>
                                <p 
                                  className="anim-uni-in-up"
                                  style={getAnimationStyle('list-11', 0.7, 'fade-up-fast')}
                                >
                                  Motion
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mxd-paragraph__controls anim-uni-in-up">
                      <div className="mxd-btngroup">
                        <a 
                          className="btn-anim btn btn-anim btn-default btn-accent slide-down" 
                          aria-label="Download CV" 
                          href="#"
                          ref={addToButtonRef}
                          style={getAnimationStyle('button-0', 0.4, 'fade-up')}
                        >
                          <span className="btn-caption">
                            <div className="btn-anim__block">Download CV</div>
                            <div className="btn-anim__block" aria-hidden="true">Download CV</div>
                          </span>
                          <i className="ph-bold ph-arrow-down"></i>
                        </a>
                        <a 
                          className="btn-anim btn btn-anim btn-default btn-outline slide-right-up" 
                          aria-label="Let's Meet Closer" 
                          href="/about-me"
                          ref={addToButtonRef}
                          style={getAnimationStyle('button-1', 0.55, 'fade-up')}
                        >
                          <span className="btn-caption">
                            <div className="btn-anim__block">Let's Meet Closer</div>
                            <div className="btn-anim__block" aria-hidden="true">Let's Meet Closer</div>
                          </span>
                          <i className="ph-bold ph-arrow-up-right"></i>
                        </a>
                      </div>
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