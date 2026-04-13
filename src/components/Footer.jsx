'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef(null);
  const fullwidthTextRef = useRef(null);
  const navItemsRef = useRef([]);
  const footerCardsRef = useRef([]);
  const socialItemsRef = useRef([]);
  const formRef = useRef(null);
  const subscribeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // 1. Fullwidth SVG text animation (slower - bottom to top)
      if (fullwidthTextRef.current) {
        gsap.fromTo(fullwidthTextRef.current,
          {
            y: 250,
            opacity: 0,
            rotationX: 90,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 1.5,
            }
          }
        );
      }

      navItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            {
              y: 80,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              delay: index * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 50%",
                scrub: 1,
              }
            }
          );
        }
      });

      // 3. Footer cards animation (slower - bottom to top)
      footerCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              y: 100,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                scrub: 1.2,
              }
            }
          );
        }
      });

      // 4. Social items animation (slower stagger)
      socialItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            {
              x: -60,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 55%",
                scrub: 0.8,
              }
            }
          );

          // Hover effect for social links
          const link = item.querySelector('a');
          if (link) {
            link.addEventListener('mouseenter', () => {
              gsap.to(link, {
                x: 8,
                color: '#000',
                duration: 0.5,
                ease: "power2.out"
              });
            });
            link.addEventListener('mouseleave', () => {
              gsap.to(link, {
                x: 0,
                color: '#666',
                duration: 0.5,
                ease: "power2.out"
              });
            });
          }
        }
      });

      // 5. Form animation (slower)
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            }
          }
        );
      }

      // 6. Subscribe button animation (slower)
      if (subscribeRef.current) {
        gsap.fromTo(subscribeRef.current,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: subscribeRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            }
          }
        );
      }

    }, footerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to add items to refs
  const addToNavRef = (el) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  const addToCardRef = (el) => {
    if (el && !footerCardsRef.current.includes(el)) {
      footerCardsRef.current.push(el);
    }
  };

  const addToSocialRef = (el) => {
    if (el && !socialItemsRef.current.includes(el)) {
      socialItemsRef.current.push(el);
    }
  };

  return (
    <footer id="mxd-footer" className="mxd-footer" ref={footerRef}>
      <div className="mxd-footer__text-wrap">
        <div className="fullwidth-text__tl-trigger"></div>
        <div className="mxd-footer__fullwidth-text anim-top-to-bottom" ref={fullwidthTextRef}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 80">
            <path d="M18.9,71.9C13,71.9,8.4,70.5,5,67.6c-3.4-2.9-5-6.7-5-11.4c0-5,1.7-8.8,5.1-11.5c3.4-2.7,8.3-4.1,14.8-4.1h15.5v-2 c0-6.2-3.6-9.3-10.8-9.3c-6.1,0-9.8,2.2-11.1,6.6H0.8c1.1-5.4,3.6-9.5,7.7-12.4c4.1-2.8,9.4-4.3,16-4.3c7.4,0,13.1,1.7,17,5 c3.9,3.4,5.8,8.2,5.8,14.7v19.4h6V71H40.4v-8.1h-3.6c-1.7,2.9-4.1,5.1-7.1,6.7C26.9,71.1,23.2,71.9,18.9,71.9z M20.8,62.2 c2.8,0,5.2-0.5,7.4-1.6c2.2-1,3.9-2.4,5.2-4.2c1.3-1.8,1.9-3.8,1.9-6v-1.2H20.6c-5.7,0-8.5,2.1-8.5,6.3c0,2.1,0.8,3.7,2.3,4.9 C15.9,61.6,18,62.2,20.8,62.2z M63.1,71V0h12.6v71H63.1z M111.8,72c-5.4,0-10.1-1.1-14.2-3.3c-4-2.2-7.1-5.2-9.3-9.2 c-2.2-4-3.3-8.7-3.3-14.1c0-5.4,1.1-10.1,3.2-14c2.1-3.9,5.2-6.9,9.1-9c3.9-2.1,8.6-3.2,13.9-3.2c5.2,0,9.6,1,13.4,3 c3.7,2,6.6,4.9,8.6,8.6c2,3.7,3,8.2,3,13.3v4.4H97.2c0.5,4.3,2,7.6,4.5,9.8c2.5,2.3,5.8,3.4,10,3.4c3.1,0,5.6-0.6,7.6-1.7 c1.9-1.2,3.3-2.9,4.1-5.2h12.7c-1.2,5.4-3.9,9.5-8.2,12.5C123.7,70.5,118.3,72,111.8,72z M97.5,40.1h26.7c-0.5-3.5-1.8-6.2-4-8 c-2.2-1.8-5.2-2.7-8.9-2.7c-3.7,0-6.7,0.9-9,2.8C99.9,34,98.3,36.6,97.5,40.1z M138.4,71L158.3,45l-18.9-24.8h14l12.2,16l12.3-16 h13.9L172.9,45L192.8,71h-14.1l-13.1-17.3L152.4,71H138.4z M210.5,71l-16.3-50.7h12.9l10.7,35.1h0.4l12.5-35.1h12.1l12.5,35.1h0.4 l10.7-35.1h12.8L262.9,71h-13.5l-12.5-34.4h-0.3L224,71H210.5z M301,71.9c-5.9,0-10.6-1.4-13.9-4.3c-3.4-2.9-5-6.7-5-11.4 c0-5,1.7-8.8,5.1-11.5c3.4-2.7,8.3-4.1,14.8-4.1h15.5v-2c0-6.2-3.6-9.3-10.8-9.3c-6.1,0-9.8,2.2-11.1,6.6h-12.6 c1.1-5.4,3.6-9.5,7.7-12.4c4.1-2.8,9.4-4.3,16-4.3c7.4,0,13.1,1.7,17,5c3.9,3.4,5.8,8.2,5.8,14.7v19.4h6V71h-12.9v-8.1h-3.6 c-1.7,2.9-4.1,5.1-7.1,6.7C308.9,71.1,305.3,71.9,301,71.9z M302.9,62.2c2.8,0,5.2-0.5,7.4-1.6c2.2-1,3.9-2.4,5.2-4.2 c1.3-1.8,1.9-3.8,1.9-6v-1.2h-14.8c-5.7,0-8.5,2.1-8.5,6.3c0,2.1,0.8,3.7,2.3,4.9C297.9,61.6,300.1,62.2,302.9,62.2z M345.1,71V0 h12.6v71H345.1z M369.9,71V0h12.6v39.9h0.3l21.4-19.6h15.1l-22.1,19.9L421.1,71h-14.9l-17.8-23.1l-5.9,4.8V71H369.9z M449.4,72 c-5.4,0-10.1-1.1-14.2-3.3c-4-2.2-7.1-5.2-9.3-9.2c-2.2-4-3.3-8.7-3.3-14.1c0-5.4,1.1-10.1,3.2-14c2.1-3.9,5.2-6.9,9.1-9 c3.9-2.1,8.6-3.2,13.9-3.2c5.2,0,9.6,1,13.4,3c3.7,2,6.6,4.9,8.6,8.6c2,3.7,3,8.2,3,13.3v4.4h-39.2c0.5,4.3,2,7.6,4.5,9.8 c2.5,2.3,5.8,3.4,10,3.4c3.1,0,5.6-0.6,7.6-1.7c1.9-1.2,3.3-2.9,4.1-5.2h12.7c-1.2,5.4-3.9,9.5-8.2,12.5 C461.3,70.5,455.9,72,449.4,72z M435.1,40.1h26.7c-0.5-3.5-1.8-6.2-4-8c-2.2-1.8-5.2-2.7-8.9-2.7c-3.7,0-6.7,0.9-9,2.8 C437.5,34,435.9,36.6,435.1,40.1z M487,71V32.9h-6.3V20.3h12.9v9.8h3.6c1.4-3.4,3.6-5.9,6.5-7.7c2.9-1.7,6.3-2.6,10.1-2.6h4.2v10.8 h-4.8c-4.6,0-8.1,1.3-10.3,4c-2.3,2.6-3.4,6.2-3.4,10.6V71H487z"></path>
          </svg>
        </div>
      </div>
      
      <div className="mxd-footer__footer-blocks">
        <div className="footer-blocks__column animate-card-3" ref={addToCardRef}>
          <div className="footer-blocks__card fullheight-card">
            <div className="footer-blocks__nav">
              <ul className="footer-nav">
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="Home" href="/home-main">
                    <span className="btn-caption">
                      <div className="btn-anim__block">Home</div>
                      <div className="btn-anim__block" aria-hidden="true">Home</div>
                    </span>
                  </a>
                </li>
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="About us" href="/about-us">
                    <span className="btn-caption">
                      <div className="btn-anim__block">About us</div>
                      <div className="btn-anim__block" aria-hidden="true">About us</div>
                    </span>
                  </a>
                </li>
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="Works" href="/works-simple">
                    <span className="btn-caption">
                      <div className="btn-anim__block">Works</div>
                      <div className="btn-anim__block" aria-hidden="true">Works</div>
                    </span>
                  </a>
                  <p className="footer-nav__counter">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                      <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
                    </svg>
                    <span>10</span>
                  </p>
                </li>
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="Services" href="/services">
                    <span className="btn-caption">
                      <div className="btn-anim__block">Services</div>
                      <div className="btn-anim__block" aria-hidden="true">Services</div>
                    </span>
                  </a>
                </li>
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="Insights" href="/blog-standard">
                    <span className="btn-caption">
                      <div className="btn-anim__block">Insights</div>
                      <div className="btn-anim__block" aria-hidden="true">Insights</div>
                    </span>
                  </a>
                </li>
                <li className="footer-nav__item anim-uni-in-up" ref={addToNavRef}>
                  <a className="btn-anim footer-nav__link btn-anim" aria-label="Contact" href="/contact">
                    <span className="btn-caption">
                      <div className="btn-anim__block">Contact</div>
                      <div className="btn-anim__block" aria-hidden="true">Contact</div>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-blocks__links anim-uni-in-up">
              <a className="btn-anim btn btn-line-xsmall btn-muted slide-right anim-no-delay" aria-label="Privacy Policy" href="#">
                <span className="btn-caption">
                  <div className="btn-anim__block">Privacy Policy</div>
                  <div className="btn-anim__block" aria-hidden="true">Privacy Policy</div>
                </span>
                <i className="ph ph-arrow-right"></i>
              </a>
              <a className="btn-anim btn btn-line-xsmall btn-muted slide-right anim-no-delay" aria-label="Terms &amp; conditions" href="#">
                <span className="btn-caption">
                  <div className="btn-anim__block">Terms &amp;conditions</div>
                  <div className="btn-anim__block" aria-hidden="true">Terms &amp;conditions</div>
                </span>
                <i className="ph ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-blocks__column animate-card-3" ref={addToCardRef}>
          <div className="footer-blocks__card">
            <p className="mxd-point-subtitle anim-uni-in-up">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
              </svg>
              <a href="mailto:example@example.com?subject=Message%20from%20your%20site">hello@rayostudio.com</a>
            </p>
          </div>
          <div className="footer-blocks__card">
            <p className="mxd-point-subtitle anim-uni-in-up">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                <path fill="currentColor" d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"></path>
              </svg>
              <a href="tel:+12127089400">+1 212-708-9400</a>
            </p>
          </div>
          <div className="footer-blocks__card fill-card notify">
            <div className="footer-blocks__title anim-uni-in-up">
              <p className="footer-blocks__title-m">Subscribe to our insights:</p>
            </div>
            <div className="form-container anim-uni-in-up" ref={formRef}>
              <div className="form__reply subscription-ok">
                <span className="reply__text">Done! Thanks for subscribing.</span>
              </div>
              <div className="form__reply subscription-error">
                <span className="reply__text">Ooops! Something went wrong. Please try again later.</span>
              </div>
              <form className="form notify-form form-light">
                <input type="email" placeholder="Your Email" required />
                <button className="btn btn-form btn-absolute-right btn-muted slide-right-up anim-no-delay" type="submit" ref={subscribeRef}>
                  <i className="ph ph-arrow-up-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-blocks__column animate-card-3" ref={addToCardRef}>
          <div className="footer-blocks__card fullheight-card">
            <div className="footer-blocks__block">
              <div className="footer-blocks__title anim-uni-in-up">
                <p className="footer-blocks__title-l">Ecosystem</p>
              </div>
              <div className="footer-blocks__socials">
                <ul className="footer-socials">
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://dribbble.com/" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Dribbble</a>
                  </li>
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://www.behance.net/" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Behance</a>
                  </li>
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://www.instagram.com/" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Instagram</a>
                  </li>
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://github.com/" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Github</a>
                  </li>
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://codepen.io/" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Codepen</a>
                  </li>
                  <li className="footer-socials__item anim-uni-in-up" ref={addToSocialRef}>
                    <a href="https://www.figma.com/community" className="footer-socials__link" target="_blank" rel="noopener noreferrer">Figma Community</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-blocks__links anim-uni-in-up">
              <p className="t-xsmall t-muted">
                <a className="no-effect" href="https://themeforest.net/user/ib-themes/portfolio" target="_blank" rel="noopener noreferrer">ib themes</a>
                <i className="ph-bold ph-copyright"></i>
                2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}