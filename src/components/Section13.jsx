'use client';

import { useRef, useEffect, useState } from 'react';
import { PiEye } from 'react-icons/pi';

export default function Section13() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState({});
  const [visibleCards, setVisibleCards] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Create intersection observer for reverse animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            if (entry.isIntersecting) {
              // Element entered viewport - ANIMATE IN
              if (id.startsWith('heading') || id.startsWith('description') || id.startsWith('button')) {
                setVisibleElements((prev) => ({ ...prev, [id]: true }));
              } else if (id.startsWith('card-')) {
                setVisibleCards((prev) => ({ ...prev, [id]: true }));
              }
            } else {
              // Element left viewport - REVERSE ANIMATION (ANIMATE OUT)
              if (id.startsWith('heading') || id.startsWith('description') || id.startsWith('button')) {
                setVisibleElements((prev) => ({ ...prev, [id]: false }));
              } else if (id.startsWith('card-')) {
                setVisibleCards((prev) => ({ ...prev, [id]: false }));
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

    // Observe description
    if (descriptionRef.current) {
      descriptionRef.current.setAttribute('data-id', 'description');
      observer.observe(descriptionRef.current);
    }

    // Observe button
    if (buttonRef.current) {
      buttonRef.current.setAttribute('data-id', 'button');
      observer.observe(buttonRef.current);
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
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
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

  // Hover handlers
  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const blogItems = [
    { 
      title: 'Frontend innovations and user journeys', 
      tags: ['Concept', 'Editorial'], 
      image: 'blog-preview-image-1' 
    },
    { 
      title: 'Branding in creating digital experiences', 
      tags: ['UI/UX', 'Development'], 
      image: 'blog-preview-image-2' 
    },
    { 
      title: 'Elevating digital workshops with engaging design', 
      tags: ['News', 'AI'], 
      image: 'blog-preview-image-3' 
    }
  ];

  return (
    <div className="mxd-section padding-blog add-margin-top" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <h2 
                      className="reveal-type anim-uni-in-up" 
                      ref={headingRef}
                      style={{
                        opacity: visibleElements['heading'] ? 1 : 0,
                        transform: visibleElements['heading'] ? 'translateY(0)' : 'translateY(60px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      Recent insights
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p 
                      className="anim-uni-in-up" 
                      ref={descriptionRef}
                      style={{
                        opacity: visibleElements['description'] ? 1 : 0,
                        transform: visibleElements['description'] ? 'translateY(0)' : 'translateY(60px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
                      }}
                    >
                      Inspiring ideas, creative insights, and the latest in design and tech. Fueling innovation for your digital journey.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div 
                    className="mxd-section-title__hrcontrols anim-uni-in-up" 
                    ref={buttonRef}
                    style={{
                      opacity: visibleElements['button'] ? 1 : 0,
                      transform: visibleElements['button'] ? 'translateY(0)' : 'translateY(60px)',
                      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                    }}
                  >
                    <a className="btn-anim btn btn-default btn-outline slide-right-up" aria-label="All Articles" href="/blog-standard">
                      <span className="btn-caption">
                        <div className="btn-anim__block">All Articles</div>
                        <div className="btn-anim__block" aria-hidden="true">All Articles</div>
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
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {blogItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3"
                    ref={addToCardRef}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      opacity: visibleCards[`card-${index}`] ? 1 : 0,
                      transform: visibleCards[`card-${index}`] ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.9)',
                      transition: `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
                    }}
                  >
                    <a className="mxd-blog-preview__media" href="/blog-article">
                      <div 
                        className={`mxd-blog-preview__image ${item.image} parallax-img-small`}
                        style={{
                          transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      ></div>
                      <div 
                        className="mxd-preview-hover"
                        style={{
                          opacity: hoveredCard === index ? 1 : 0,
                          transition: 'opacity 0.3s ease'
                        }}
                      >
                        <i className="mxd-preview-hover__icon"><PiEye size={38} style={{ height: '21px' }} /></i>
                      </div>
                      <div className="mxd-blog-preview__tags">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag tag-default tag-permanent">{tag}</span>
                        ))}
                      </div>
                    </a>
                    <div className="mxd-blog-preview__data">
                      <a className="anim-uni-in-up" href="/blog-article">{item.title}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}