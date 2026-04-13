'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Section2() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);
  const leftContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth text loading animations
    textRefs.current.forEach((text, index) => {
      if (text) {
        gsap.fromTo(text,
          { 
            y: 80, 
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            }
          }
        );
      }
    });

    // Left-right image animations on scroll
    projectRefs.current.forEach((project, index) => {
      if (project) {
        const isEven = index % 2 === 0;
        
        // Project card animation
        gsap.fromTo(project,
          {
            x: isEven ? -200 : 200,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
              scrub: 0.8,
            }
          }
        );

        // Parallax image movement on scroll
        const image = imageRefs.current[index];
        if (image) {
          gsap.fromTo(image,
            {
              x: isEven ? 80 : -80,
              scale: 1.1,
            },
            {
              x: 0,
              scale: 1,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 80%",
                end: "bottom 40%",
                scrub: 1.2,
              }
            }
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    { id: 1, img: '/img/projects/project-1.jpg', tags: ['UI/UX', 'Web design', 'Illustrations'], title: 'Creative studio', subtitle: 'template for modern agencies' },
    { id: 2, img: '/img/projects/project-2.jpg', tags: ['Sora', 'AI', 'Editorial'], title: 'Interactive concept', subtitle: 'powered by AI' },
    { id: 3, img: '/img/projects/project-3.jpg', tags: ['UI/UX', 'Design', 'Android'], title: 'Mobile app design', subtitle: 'for a cross-platform solution' },
    { id: 4, img: '/img/projects/project-4.jpg', tags: ['Brand identity', 'Style guides'], title: 'NFT project', subtitle: 'branding' },
    { id: 5, img: '/img/projects/project-5.jpg', tags: ['Illustrations', 'Design', 'Packaging'], title: 'Illustrations set', subtitle: 'for digital and print use.' }
  ];

  return (
    <div id="projects" className="mxd-section padding-pre-stack" ref={sectionRef}>
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* Left Side - Sticky Fixed Content */}
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  {/* YAHAN SIRF "sticky-top" CLASS LAGAO */}
                  <div className="sticky-top" style={{ top: '100px' }} ref={leftContentRef}>
                    <div className="mxd-pinned-projects__static-inner no-margin">
                      <div className="mxd-section-title no-margin-desktop">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__title">
                                <h2 className="reveal-type" ref={el => textRefs.current[0] = el}>Featured<br />projects</h2>
                              </div>
                            </div>
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__descr">
                                <p ref={el => textRefs.current[1] = el}>Explore a selection of projects blending<br />creativity with practical design</p>
                              </div>
                            </div>
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__controls">
                                <Link 
                                  className="btn-anim btn btn-anim btn-default btn-outline slide-right-up" 
                                  aria-label="All Works" 
                                  href="/works-simple"
                                  ref={el => textRefs.current[2] = el}
                                >
                                  <span className="btn-caption">
                                    <div className="btn-anim__block">All Works</div>
                                    <div className="btn-anim__block" aria-hidden="true">All Works</div>
                                  </span>
                                  <i className="ph-bold ph-arrow-up-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Scrollable Projects */}
                <div className="col-12 col-xl-7 mxd-pinned-projects__scroll" style={{overflow:"hidden"}}>
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {projects.map((project, idx) => (
                      <div 
                        key={project.id}
                        className="mxd-project-item mb-5"
                        ref={el => projectRefs.current[idx] = el}
                      >
                        <Link className="mxd-project-item__media block group" href="/project-details">
                          <div className={`mxd-project-item__preview preview-image-${project.id} relative overflow-hidden rounded-xl`}>
                            <div className="image-wrapper w-full h-full" ref={el => imageRefs.current[idx] = el}>
                              <Image
                                src={project.img}
                                alt={project.title}
                                fill
                                className="object-fit-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading={idx < 2 ? "eager" : "lazy"}
                              />
                            </div>
                          </div>
                          <div className="mxd-project-item__tags mt-3">
                            {project.tags.map((tag, tagIdx) => (
                              <span 
                                key={tagIdx} 
                                className="tag tag-default tag-permanent inline-block mr-2 transition-all duration-300 hover:translate-x-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                        <div className="mxd-project-item__promo mt-2">
                          <div className="mxd-project-item__name">
                            <Link className="block group" href="/project-details">
                              <span className="inline-block transition-all duration-300 group-hover:translate-x-1">{project.title}</span>
                              <br />
                              <span className="inline-block transition-all duration-300 group-hover:translate-x-1">{project.subtitle}</span>
                            </Link>
                          </div>
                        </div>
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
  );
}