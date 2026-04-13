'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Expertise() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const listItemsRef = useRef([]);
  const hoverContentsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
              scrub: 0.5,
            }
          }
        );
      }

      // Animate button
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
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
              trigger: buttonRef.current,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            }
          }
        );
      }

      // Animate list items with stagger effect
      if (listItemsRef.current.length > 0) {
        gsap.fromTo(listItemsRef.current,
          {
            y: 50,
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
              scrub: 0.5,
            }
          }
        );
      }

    }, sectionRef);

    // Hover effects
    const handleMouseEnter = (index, event) => {
      const hoverContent = hoverContentsRef.current[index];
      if (hoverContent) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        gsap.to(hoverContent, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
        });
      }
    };

    const handleMouseMove = (index, event) => {
      const hoverContent = hoverContentsRef.current[index];
      if (hoverContent && hoverContent.style.opacity === '1') {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        gsap.to(hoverContent, {
          left: `${x}px`,
          top: `${y}px`,
          duration: 0.1,
          ease: "power1.out",
        });
      }
    };

    const handleMouseLeave = (index) => {
      const hoverContent = hoverContentsRef.current[index];
      if (hoverContent) {
        gsap.to(hoverContent, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    };

    // Attach hover event listeners
    listItemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', (e) => handleMouseEnter(index, e));
        item.addEventListener('mousemove', (e) => handleMouseMove(index, e));
        item.addEventListener('mouseleave', () => handleMouseLeave(index));
      }
    });

    return () => {
      ctx.revert();
      listItemsRef.current.forEach((item, index) => {
        if (item) {
          item.removeEventListener('mouseenter', (e) => handleMouseEnter(index, e));
          item.removeEventListener('mousemove', (e) => handleMouseMove(index, e));
          item.removeEventListener('mouseleave', () => handleMouseLeave(index));
        }
      });
    };
  }, []);

  const addToListRef = (el) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current.push(el);
    }
  };

  const addToHoverRef = (el, index) => {
    if (el && !hoverContentsRef.current[index]) {
      hoverContentsRef.current[index] = el;
    }
  };

  const expertiseItems = [
    { title: "UI/UX design", number: "01", hoverImg: "/img/p-hover1.webp", img: "/img/hover1.webp" },
    { title: "Hi-end websites", number: "02", hoverImg: "/img/p-hover2.webp", img: "/img/hover2.webp" },
    { title: "Framer", number: "03", hoverImg: "/img/p-hover3.webp", img: "/img/hover3.webp" },
    { title: "Webflow", number: "04", hoverImg: "/img/p-hover4.webp", img: "/img/hover4.webp" },
    { title: "3d art", number: "05", hoverImg: "/img/p-hover5.webp", img: "/img/hover5.webp" },
    { title: "Motion graphics", number: "06", hoverImg: "/img/p-hover6.webp", img: "/img/hover6.webp" }
  ];

  return (
    <div className="mxd-section overflow-hidden padding-default" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <h2 className="reveal-type reveal-type" ref={headingRef}>My expertise</h2>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin"></div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up" ref={buttonRef}>
                    <a className="btn-anim btn btn-anim btn-default btn-outline slide-right-up" aria-label="All Services" href="/services">
                      <span className="btn-caption">
                        <div className="btn-anim__block">All Services</div>
                        <div className="btn-anim__block" aria-hidden="true">All Services</div>
                      </span>
                      <i className="ph-bold ph-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 mxd-grid-item no-margin">
                <div className="mxd-cpb-list">
                  {expertiseItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className="mxd-cpb-list__item hover-reveal__item"
                      ref={addToListRef}
                    >
                      <div className="mxd-cpb-list__divider anim-uni-in-up"></div>
                      <div 
                        className="hover-reveal__content hover-reveal-280x340" 
                        ref={(el) => addToHoverRef(el, idx)}
                        style={{
                          opacity: 0,
                          transform: 'translate(-50%, -50%)',
                          left: 0,
                          top: 0,
                          position: 'fixed',
                          pointerEvents: 'none',
                          transition: 'opacity 0.3s ease',
                          zIndex: 1000,
                          width: '280px',
                          height: '340px',
                          borderRadius: '16px',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          alt="Illustration"
                          loading="lazy"
                          width="300"
                          height="300"
                          decoding="async"
                          data-nimg="1"
                          style={{ color: "transparent", width: '100%', height: '100%', objectFit: 'cover' }}
                          src={item.hoverImg}
                        />
                      </div>
                      <div className="mxd-cpb-list__content anim-uni-in-up">
                        <h6 className="mxd-cpb-list__title">{item.title}</h6>
                        <div className="mxd-cpb-list__num">
                          <span>/ {item.number}</span>
                        </div>
                      </div>
                      <div className="mxd-cpb-list__image anim-uni-in-up">
                        <img
                          alt="Illustration"
                          loading="lazy"
                          width="300"
                          height="300"
                          decoding="async"
                          data-nimg="1"
                          style={{ color: "transparent" }}
                          src={item.img}
                        />
                      </div>
                      <div className="mxd-cpb-list__divider anim-uni-in-up"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}