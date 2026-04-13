'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section5() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const listItemsRef = useRef([]);
  const buttonsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial visibility before animations
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, { opacity: 1, y: 0 });
    }
    if (listItemsRef.current.length > 0) {
      gsap.set(listItemsRef.current, { opacity: 1, y: 0 });
    }
    if (buttonsRef.current.length > 0) {
      gsap.set(buttonsRef.current, { opacity: 1, y: 0 });
    }

    // Create scroll trigger context for this section only
    const ctx = gsap.context(() => {
      
      // Animate heading
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Animate paragraph
      if (paragraphRef.current) {
        gsap.fromTo(paragraphRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Animate list items with stagger effect
      if (listItemsRef.current.length > 0) {
        gsap.fromTo(listItemsRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listItemsRef.current[0],
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Animate buttons
      if (buttonsRef.current.length > 0) {
        gsap.fromTo(buttonsRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: buttonsRef.current[0],
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

    }, sectionRef);

    return () => {
      ctx.revert();
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

  return (
    <div className="mxd-section padding-pre-grid" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <h2 className="reveal-type anim-uni-in-up" ref={headingRef}>Approach and philosophy</h2>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <p className="t-large t-bright anim-uni-in-up" ref={paragraphRef}>From pixel-perfect designs to flawless code, every aspect of my projects is crafted with care to ensure the highest standards of quality.</p>
                    <div className="mxd-paragraph__lists">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Innovations</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Excellence</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Creativity</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Experience</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Competence</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Passion</p></li>
                            </ul>
                          </div>
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Web design</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">UI/UX</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">App design</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Development</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Branding</p></li>
                              <li ref={addToListRef}><p className="anim-uni-in-up">Motion</p></li>
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