'use client';

import { useRef, useEffect } from 'react';
import { PiEye } from 'react-icons/pi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section13() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);

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
              scrub: 0.5,
            }
          }
        );
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current,
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
              trigger: descriptionRef.current,
              start: "top 85%",
              end: "bottom 60%",
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
              scrub: 0.5,
            }
          }
        );
      }

      // Animate cards one by one on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Each card triggers when scrolled to its position
          gsap.fromTo(card,
            {
              y: 100,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",  // Jab card 80% visible ho
                end: "top 40%",    // Tab tak animate ho
                scrub: 0.5,
                toggleActions: "play none none reverse",
              }
            }
          );

          // Hover effect on card
          const imageDiv = card.querySelector('.mxd-blog-preview__image');
          if (imageDiv) {
            card.addEventListener('mouseenter', () => {
              gsap.to(imageDiv, { 
                scale: 1.1, 
                duration: 0.4, 
                ease: "power2.out" 
              });
            });
            card.addEventListener('mouseleave', () => {
              gsap.to(imageDiv, { 
                scale: 1, 
                duration: 0.4, 
                ease: "power2.out" 
              });
            });
          }
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && sectionRef.current?.contains(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Function to add cards to refs
  const addToCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
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
                    <h2 className="reveal-type anim-uni-in-up" ref={headingRef}>Recent insights</h2>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up" ref={descriptionRef}>Inspiring ideas, creative insights, and the latest in design and tech. Fueling innovation for your digital journey.</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up" ref={buttonRef}>
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
                  >
                    <a className="mxd-blog-preview__media" href="/blog-article">
                      <div className={`mxd-blog-preview__image ${item.image} parallax-img-small`}></div>
                      <div className="mxd-preview-hover">
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