"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Section2() {
  const sectionRef = useRef(null);
  const [visibleTexts, setVisibleTexts] = useState({});
  const [visibleProjects, setVisibleProjects] = useState({});

  useEffect(() => {
    // Create intersection observer for reverse animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (id) {
            if (entry.isIntersecting) {
              // Element entered viewport
              setVisibleProjects((prev) => ({ ...prev, [id]: true }));
            } else {
              // Element left viewport - REVERSE ANIMATION
              setVisibleProjects((prev) => ({ ...prev, [id]: false }));
            }
          } else {
            // For text elements
            if (entry.isIntersecting) {
              setVisibleTexts((prev) => ({ ...prev, [entry.target.id]: true }));
            } else {
              setVisibleTexts((prev) => ({ ...prev, [entry.target.id]: false }));
            }
          }
        });
      },
      { 
        threshold: 0.3, // 30% visible hone par trigger
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe text elements
    const textElements = document.querySelectorAll(".text-animate");
    textElements.forEach((el) => observer.observe(el));

    // Observe project elements
    const projectElements = document.querySelectorAll(".project-item");
    projectElements.forEach((el) => observer.observe(el));

    return () => {
      textElements.forEach((el) => observer.unobserve(el));
      projectElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const projects = [
    {
      id: 1,
      img: "/img/1400x1400_prv-01.webp",
      tags: ["UI/UX", "Web design", "Illustrations"],
      title: "Creative studio",
      subtitle: "template for modern agencies",
    },
    {
      id: 2,
      img: "/img/1400x1400_prv-02.webp",
      tags: ["Sora", "AI", "Editorial"],
      title: "Interactive concept",
      subtitle: "powered by AI",
    },
    {
      id: 3,
      img: "/img/1400x1400_prv-03.webp",
      tags: ["UI/UX", "Design", "Android"],
      title: "Mobile app design",
      subtitle: "for a cross-platform solution",
    },
    {
      id: 4,
      img: "/img/1400x1400_prv-04.webp",
      tags: ["Brand identity", "Style guides"],
      title: "NFT project",
      subtitle: "branding",
    },
    {
      id: 5,
      img: "/img/1400x1400_prv-05.webp",
      tags: ["Illustrations", "Design", "Packaging"],
      title: "Illustrations set",
      subtitle: "for digital and print use.",
    },
  ];

  return (
    <div
      id="projects"
      className="mxd-section padding-pre-stack"
      ref={sectionRef}
    >
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* Left Side - Sticky Fixed Content */}
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  <div
                    className="sticky-top"
                    style={{ top: "100px" }}
                  >
                    <div className="mxd-pinned-projects__static-inner no-margin">
                      <div className="mxd-section-title no-margin-desktop">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__title">
                                <h2
                                  id="title"
                                  className="reveal-type text-animate"
                                  style={{
                                    opacity: visibleTexts.title ? 1 : 0,
                                    transform: visibleTexts.title 
                                      ? "translateY(0)" 
                                      : "translateY(80px)",
                                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transitionDuration: "1.2s",
                                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                                  }}
                                >
                                  Featured
                                  <br />
                                  projects
                                </h2>
                              </div>
                            </div>
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__descr">
                                <p
                                  id="description"
                                  className="text-animate"
                                  style={{
                                    opacity: visibleTexts.description ? 1 : 0,
                                    transform: visibleTexts.description 
                                      ? "translateY(0)" 
                                      : "translateY(80px)",
                                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transitionDelay: "0.1s",
                                    transitionDuration: "1.2s"
                                  }}
                                >
                                  Explore a selection of projects blending
                                  <br />
                                  creativity with practical design
                                </p>
                              </div>
                            </div>
                            <div className="col-12 mxd-grid-item no-margin">
                              <div className="mxd-section-title__controls">
                                <Link
                                  id="button"
                                  className="btn-anim btn btn-anim btn-default btn-outline slide-right-up text-animate"
                                  aria-label="All Works"
                                  href="/works-simple"
                                  style={{
                                    opacity: visibleTexts.button ? 1 : 0,
                                    transform: visibleTexts.button 
                                      ? "translateY(0)" 
                                      : "translateY(80px)",
                                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transitionDelay: "0.2s",
                                    transitionDuration: "1.2s",
                                    display: "inline-block"
                                  }}
                                >
                                  <span className="btn-caption">
                                    <div className="btn-anim__block">
                                      All Works
                                    </div>
                                    <div
                                      className="btn-anim__block"
                                      aria-hidden="true"
                                    >
                                      All Works
                                    </div>
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
                <div
                  className="col-12 col-xl-7 mxd-pinned-projects__scroll"
                  style={{ overflow: "hidden" }}
                >
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {projects.map((project, idx) => {
                      const isEven = idx % 2 === 0;
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                      
                      // Different animations for mobile and desktop
                      const getTransform = (isVisible) => {
                        if (isMobile) {
                          return isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)";
                        } else {
                          return isVisible 
                            ? "translateX(0) scale(1)" 
                            : isEven 
                              ? "translateX(-200px) scale(0.9)" 
                              : "translateX(200px) scale(0.9)";
                        }
                      };
                      
                      return (
                        <div
                          key={project.id}
                          className="mxd-project-item mb-5 project-item"
                          data-id={project.id}
                          style={{
                            opacity: visibleProjects[project.id] ? 1 : 0,
                            transform: getTransform(visibleProjects[project.id]),
                            transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            transitionDelay: `${idx * 0.1}s`
                          }}
                        >
                          <Link
                            className="mxd-project-item__media block group"
                            href="/project-details"
                          >
                            <div
                              className={`mxd-project-item__preview preview-image-${project.id} relative overflow-hidden rounded-xl`}
                            >
                              <div 
                                className="image-wrapper w-full h-full"
                                style={{
                                  transform: visibleProjects[project.id] 
                                    ? "scale(1) translateX(0)" 
                                    : isEven 
                                      ? "scale(1.1) translateX(80px)" 
                                      : "scale(1.1) translateX(-80px)",
                                  transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                              >
                                <Image
                                  src={project.img}
                                  alt={project.title}
                                  fill
                                  className="object-fit-cover transition-transform duration-700 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  loading={idx < 2 ? "eager" : "lazy"}
                                  priority={idx < 2}
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
                              <Link
                                className="block group"
                                href="/project-details"
                              >
                                <span className="inline-block transition-all duration-300 group-hover:translate-x-1">
                                  {project.title}
                                </span>
                                <br />
                                <span className="inline-block transition-all duration-300 group-hover:translate-x-1">
                                  {project.subtitle}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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