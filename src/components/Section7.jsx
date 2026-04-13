'use client';

import { useRef, useEffect, useState } from 'react';

export default function Expertise() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const listItemsRef = useRef([]);
  const hoverContentsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, visible: false, activeIndex: null });

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

    // Observe button
    if (buttonRef.current) {
      buttonRef.current.setAttribute('data-id', 'button');
      observer.observe(buttonRef.current);
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
      if (buttonRef.current) observer.unobserve(buttonRef.current);
      listItemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  // Hover effects handlers
  const handleMouseEnter = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setHoverPosition({
      x: x,
      y: y,
      visible: true,
      activeIndex: index
    });
  };

  const handleMouseMove = (index, event) => {
    if (hoverPosition.activeIndex === index && hoverPosition.visible) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      setHoverPosition(prev => ({
        ...prev,
        x: x,
        y: y
      }));
    }
  };

  const handleMouseLeave = (index) => {
    setHoverPosition({
      x: 0,
      y: 0,
      visible: false,
      activeIndex: null
    });
  };

  const addToListRef = (el) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current.push(el);
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
    
    if (type === 'fade-up-slow') {
      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      };
    }
    
    return {};
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
      {/* Hover Content - Fixed Position */}
      {hoverPosition.visible && hoverPosition.activeIndex !== null && (
        <div 
          className="hover-reveal__content hover-reveal-280x340"
          style={{
            position: 'fixed',
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1000,
            width: '280px',
            height: '340px',
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: 1,
            transition: 'left 0.1s ease, top 0.1s ease'
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
            src={expertiseItems[hoverPosition.activeIndex]?.hoverImg}
          />
        </div>
      )}

      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <h2 
                      className="reveal-type reveal-type" 
                      ref={headingRef}
                      style={getAnimationStyle('heading', 0, 'fade-up')}
                    >
                      My expertise
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin"></div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div 
                    className="mxd-section-title__hrcontrols anim-uni-in-up" 
                    ref={buttonRef}
                    style={getAnimationStyle('button', 0.1, 'fade-up')}
                  >
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
                      data-id={`list-${idx}`}
                      onMouseEnter={(e) => handleMouseEnter(idx, e)}
                      onMouseMove={(e) => handleMouseMove(idx, e)}
                      onMouseLeave={() => handleMouseLeave(idx)}
                    >
                      <div 
                        className="mxd-cpb-list__divider anim-uni-in-up"
                        style={getAnimationStyle(`list-${idx}`, idx * 0.1, 'fade-up-slow')}
                      ></div>
                      <div 
                        className="mxd-cpb-list__content anim-uni-in-up"
                        style={getAnimationStyle(`list-${idx}`, idx * 0.1 + 0.05, 'fade-up-slow')}
                      >
                        <h6 className="mxd-cpb-list__title">{item.title}</h6>
                        <div className="mxd-cpb-list__num">
                          <span>/ {item.number}</span>
                        </div>
                      </div>
                      <div 
                        className="mxd-cpb-list__image anim-uni-in-up"
                        style={getAnimationStyle(`list-${idx}`, idx * 0.1 + 0.1, 'fade-up-slow')}
                      >
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
                      <div 
                        className="mxd-cpb-list__divider anim-uni-in-up"
                        style={getAnimationStyle(`list-${idx}`, idx * 0.1 + 0.15, 'fade-up-slow')}
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
  );
}