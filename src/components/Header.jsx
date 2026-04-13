'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // Add this for scroll speed
  useEffect(() => {
    const handleScroll = () => {
      const scrollingElements = document.querySelectorAll('.creative-developer-text');
      scrollingElements.forEach((element) => {
        const scrollSpeed = Math.min(window.scrollY / 100, 3);
        const newDuration = Math.max(20 / (1 + scrollSpeed), 5);
        element.style.animationDuration = `${newDuration}s`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      applyDarkTheme();
    } else {
      setIsDark(false);
      applyLightTheme();
    }
  }, []);

  // Handle video playback when menu opens/closes
  useEffect(() => {
    if (isMenuOpen && videoRef.current && !videoError) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(e => {
            console.log('Video play error:', e);
            setVideoError(true);
          });
        }
      }, 100);
    } else if (!isMenuOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isMenuOpen, videoError]);

  // Apply active_menu class to nav and menu wrapper when menu opens/closes
  useEffect(() => {
    if (!isMounted) return;
    
    const navWrap = document.querySelector('.mxd-nav__wrap');
    const menuWrapper = document.querySelector('.mxd-menu__wrapper');
    
    if (isMenuOpen) {
      if (navWrap) {
        navWrap.classList.add('active_menu');
      }
      if (menuWrapper) {
        menuWrapper.classList.add('active_menu');
        menuWrapper.style.visibility = 'visible';
        menuWrapper.style.opacity = '1';
        menuWrapper.style.pointerEvents = 'all';
      }
      document.body.style.overflow = 'hidden';
      document.body.classList.add('videoModal__bodyOpen');
    } else {
      if (navWrap) {
        navWrap.classList.remove('active_menu');
      }
      if (menuWrapper) {
        menuWrapper.classList.remove('active_menu');
        menuWrapper.style.visibility = '';
        menuWrapper.style.opacity = '';
        menuWrapper.style.pointerEvents = '';
      }
      document.body.style.overflow = '';
      document.body.classList.remove('videoModal__bodyOpen');
    }
    
    return () => {
      if (navWrap) {
        navWrap.classList.remove('active_menu');
      }
      if (menuWrapper) {
        menuWrapper.classList.remove('active_menu');
      }
      document.body.style.overflow = '';
      document.body.classList.remove('videoModal__bodyOpen');
    };
  }, [isMenuOpen, isMounted]);

  const applyLightTheme = () => {
    document.documentElement.style.setProperty('--background', '#faf7f6');
    document.documentElement.style.setProperty('--foreground', '#161616');
    document.documentElement.style.setProperty('--base', '#faf7f6');
    document.documentElement.style.setProperty('--base-rgb', '250, 247, 246');
    document.documentElement.style.setProperty('--base-tint', '#fff');
    document.documentElement.style.setProperty('--base-shade', '#e0dddb');
    document.documentElement.style.setProperty('--base-opp', '#161616');
    document.documentElement.style.setProperty('--base-opp-tint', '#1c1c1c');
    document.documentElement.style.setProperty('--accent', '#9f8be7');
    document.documentElement.style.setProperty('--accent-rgb', '159, 139, 231');
    document.documentElement.style.setProperty('--additional', '#ddf160');
    document.documentElement.style.setProperty('--additional-rgb', '221, 241, 96');
    document.documentElement.style.setProperty('--neutral-transparent', '#ffffff4d');
    document.documentElement.style.setProperty('--st-bright', '#161616');
    document.documentElement.style.setProperty('--st-medium', '#7c7c7c');
    document.documentElement.style.setProperty('--st-muted', '#e0dddb');
    document.documentElement.style.setProperty('--st-opp-bright', '#fff');
    document.documentElement.style.setProperty('--fw-regular', '400');
    document.documentElement.style.setProperty('--fw-medium', '600');
    document.documentElement.style.setProperty('--fw-semibold', '700');
    document.documentElement.style.setProperty('--fw-bold', '800');
    document.documentElement.style.setProperty('--fw-regular-opp', '300');
    document.documentElement.style.setProperty('--fw-medium-opp', '500');
    document.documentElement.style.setProperty('--t-bright', '#161616');
    document.documentElement.style.setProperty('--t-medium', '#303030');
    document.documentElement.style.setProperty('--t-muted', '#585858');
    document.documentElement.style.setProperty('--t-muted-extra', '#b2aead');
    document.documentElement.style.setProperty('--t-opp-bright', '#fff');
    document.documentElement.style.setProperty('--t-opp-medium', '#acacac');
    document.documentElement.style.setProperty('--t-opp-muted', '#838383');
  };

  const applyDarkTheme = () => {
    document.documentElement.style.setProperty('--background', '#161616');
    document.documentElement.style.setProperty('--foreground', '#faf7f6');
    document.documentElement.style.setProperty('--base', '#161616');
    document.documentElement.style.setProperty('--base-rgb', '22, 22, 22');
    document.documentElement.style.setProperty('--base-tint', '#1c1c1c');
    document.documentElement.style.setProperty('--base-shade', '#0a0a0a');
    document.documentElement.style.setProperty('--base-opp', '#faf7f6');
    document.documentElement.style.setProperty('--base-opp-tint', '#fff');
    document.documentElement.style.setProperty('--accent', '#ddf160');
    document.documentElement.style.setProperty('--accent-rgb', '221, 241, 96');
    document.documentElement.style.setProperty('--additional', '#9f8be7');
    document.documentElement.style.setProperty('--additional-rgb', '159, 139, 231');
    document.documentElement.style.setProperty('--neutral-transparent', '#0000004d');
    document.documentElement.style.setProperty('--st-bright', '#fff');
    document.documentElement.style.setProperty('--st-medium', '#646464');
    document.documentElement.style.setProperty('--st-muted', '#252525');
    document.documentElement.style.setProperty('--st-opp-bright', '#0f0f0f');
    document.documentElement.style.setProperty('--fw-regular', '300');
    document.documentElement.style.setProperty('--fw-medium', '500');
    document.documentElement.style.setProperty('--fw-semibold', '600');
    document.documentElement.style.setProperty('--fw-bold', '700');
    document.documentElement.style.setProperty('--fw-regular-opp', '400');
    document.documentElement.style.setProperty('--fw-medium-opp', '600');
    document.documentElement.style.setProperty('--t-bright', '#fff');
    document.documentElement.style.setProperty('--t-medium', '#acacac');
    document.documentElement.style.setProperty('--t-muted', '#838383');
    document.documentElement.style.setProperty('--t-muted-extra', '#535151');
    document.documentElement.style.setProperty('--t-opp-bright', '#161616');
    document.documentElement.style.setProperty('--t-opp-medium', '#303030');
    document.documentElement.style.setProperty('--t-opp-muted', '#969696');
  };

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      applyLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: (custom) => ({
      rotate: custom === 0 ? 0 : -45,
      y: custom === 0 ? 8 : -0
    })
  };

  return (
    <>
      <motion.nav 
        className="mxd-nav__wrap" 
        data-lenis-prevent=""
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mxd-nav__contain ">
          <motion.a 
            href="#" 
            className={`mxd-nav__hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleMenu();
            }}
            animate={isMenuOpen ? "open" : "closed"}
            variants={hamburgerVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="hamburger__base"
              variants={lineVariants}
              custom={0}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="hamburger__line"
              variants={lineVariants}
              custom={1}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="hamburger__line"
              variants={lineVariants}
              custom={2}
              animate={isMenuOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>

        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div 
              className="mxd-menu__wrapper"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit" 
            >
              <motion.div 
                className="mxd-menu__base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }} 
              />
              <div className="mxd-menu__contain">
                <div className="mxd-menu__inner">
                  <div className="mxd-menu__left">
                    <motion.p 
                      className="mxd-menu__caption fade-in-elm" 
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.4 }}
                    >
                      🦄 Innovative design
                      <br />
                      and cutting-edge development
                    </motion.p>
                    <div className="main-menu">
                      <nav className="main-menu__content">
                        <ul id="main-menu" className="main-menu__accordion">
                          <li className="main-menu__item fade-in-up-elm" style={{ transitionDelay: '0s' }}>
                            <div className="main-menu__toggle">
                              <span className="btn-anim main-menu__link btn btn-anim" aria-label="Home">
                                <span className="btn-caption">
                                  <div className="btn-anim__block">
                                    <span className="btn-anim__letter">H</span>
                                    <span className="btn-anim__letter">o</span>
                                    <span className="btn-anim__letter">m</span>
                                    <span className="btn-anim__letter">e</span>
                                  </div>
                                  <div className="btn-anim__block" aria-hidden="true">
                                    <span className="btn-anim__letter">H</span>
                                    <span className="btn-anim__letter">o</span>
                                    <span className="btn-anim__letter">m</span>
                                    <span className="btn-anim__letter">e</span>
                                  </div>
                                </span>
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul className="submenu" style={{ height: '0', paddingTop: '0', transition: 'all 0.3s ease' }}>
                              <li className="submenu__item">
                                <Link href="/home-main" onClick={closeMenu}>Main home</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-software-development-company" onClick={closeMenu}>Software development company</Link>
                              </li>
                              <li className="submenu__item active">
                                <Link href="/home-freelancer-portfolio" onClick={closeMenu}>Freelancer portfolio</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-digital-agency" onClick={closeMenu}>Digital agency</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-creative-design-studio" onClick={closeMenu}>Creative design studio</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-personal-portfolio" onClick={closeMenu}>Personal portfolio</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-web-agency" onClick={closeMenu}>Web agency</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-creative-developer" onClick={closeMenu}>Creative developer</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-designer" onClick={closeMenu}>Designer</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="main-menu__item fade-in-up-elm" style={{ transitionDelay: '0.1s' }}>
                            <div className="main-menu__toggle">
                              <span className="btn-anim main-menu__link btn btn-anim" aria-label="Works">
                                <span className="btn-caption">
                                  <div className="btn-anim__block">
                                    <span className="btn-anim__letter">W</span>
                                    <span className="btn-anim__letter">o</span>
                                    <span className="btn-anim__letter">r</span>
                                    <span className="btn-anim__letter">k</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                  <div className="btn-anim__block" aria-hidden="true">
                                    <span className="btn-anim__letter">W</span>
                                    <span className="btn-anim__letter">o</span>
                                    <span className="btn-anim__letter">r</span>
                                    <span className="btn-anim__letter">k</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                </span>
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul className="submenu" style={{ height: '0', paddingTop: '0', transition: 'all 0.3s ease' }}>
                              <li className="submenu__item">
                                <Link href="/works-simple" onClick={closeMenu}>Portfolio</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/works-masonry" onClick={closeMenu}>Works masonry</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/project-details" onClick={closeMenu}>Project details</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="main-menu__item fade-in-up-elm" style={{ transitionDelay: '0.2s' }}>
                            <div className="main-menu__toggle">
                              <span className="btn-anim main-menu__link btn btn-anim" aria-label="Pages">
                                <span className="btn-caption">
                                  <div className="btn-anim__block">
                                    <span className="btn-anim__letter">P</span>
                                    <span className="btn-anim__letter">a</span>
                                    <span className="btn-anim__letter">g</span>
                                    <span className="btn-anim__letter">e</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                  <div className="btn-anim__block" aria-hidden="true">
                                    <span className="btn-anim__letter">P</span>
                                    <span className="btn-anim__letter">a</span>
                                    <span className="btn-anim__letter">g</span>
                                    <span className="btn-anim__letter">e</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                </span>
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul className="submenu" style={{ height: '0', paddingTop: '0', transition: 'all 0.3s ease' }}>
                              <li className="submenu__item">
                                <Link href="/about-me" onClick={closeMenu}>About me</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/about-us" onClick={closeMenu}>About us</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/services" onClick={closeMenu}>Services</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/team" onClick={closeMenu}>Our team</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/pricing" onClick={closeMenu}>Pricing</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/faq" onClick={closeMenu}>FAQ page</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/404" onClick={closeMenu}>404 error page</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/home-2" onClick={closeMenu}>Landing page</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="main-menu__item fade-in-up-elm" style={{ transitionDelay: '0.3s' }}>
                            <div className="main-menu__toggle">
                              <span className="btn-anim main-menu__link btn btn-anim" aria-label="Insights">
                                <span className="btn-caption">
                                  <div className="btn-anim__block">
                                    <span className="btn-anim__letter">I</span>
                                    <span className="btn-anim__letter">n</span>
                                    <span className="btn-anim__letter">s</span>
                                    <span className="btn-anim__letter">i</span>
                                    <span className="btn-anim__letter">g</span>
                                    <span className="btn-anim__letter">h</span>
                                    <span className="btn-anim__letter">t</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                  <div className="btn-anim__block" aria-hidden="true">
                                    <span className="btn-anim__letter">I</span>
                                    <span className="btn-anim__letter">n</span>
                                    <span className="btn-anim__letter">s</span>
                                    <span className="btn-anim__letter">i</span>
                                    <span className="btn-anim__letter">g</span>
                                    <span className="btn-anim__letter">h</span>
                                    <span className="btn-anim__letter">t</span>
                                    <span className="btn-anim__letter">s</span>
                                  </div>
                                </span>
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4Z" />
                              </svg>
                            </div>
                            <ul className="submenu" style={{ height: '0', paddingTop: '0', transition: 'all 0.3s ease' }}>
                              <li className="submenu__item">
                                <Link href="/blog-standard" onClick={closeMenu}>Blog standard</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/blog-creative" onClick={closeMenu}>Blog creative</Link>
                              </li>
                              <li className="submenu__item">
                                <Link href="/blog-article" onClick={closeMenu}>Single post</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="main-menu__item fade-in-up-elm" style={{ transitionDelay: '0.4s' }}>
                            <Link className="btn-anim main-menu__link btn btn-anim" aria-label="Contact" href="/contact" onClick={closeMenu}>
                              <span className="btn-caption">
                                <div className="btn-anim__block">
                                  <span className="btn-anim__letter">C</span>
                                  <span className="btn-anim__letter">o</span>
                                  <span className="btn-anim__letter">n</span>
                                  <span className="btn-anim__letter">t</span>
                                  <span className="btn-anim__letter">a</span>
                                  <span className="btn-anim__letter">c</span>
                                  <span className="btn-anim__letter">t</span>
                                </div>
                                <div className="btn-anim__block" aria-hidden="true">
                                  <span className="btn-anim__letter">C</span>
                                  <span className="btn-anim__letter">o</span>
                                  <span className="btn-anim__letter">n</span>
                                  <span className="btn-anim__letter">t</span>
                                  <span className="btn-anim__letter">a</span>
                                  <span className="btn-anim__letter">c</span>
                                  <span className="btn-anim__letter">t</span>
                                </div>
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="mxd-menu__right">
                    <div className="menu-promo">
                      <div className="menu-promo__content">
                        <motion.p 
                          className="menu-promo__caption"
                          variants={fadeInVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.4 }}
                        >
                          👋 New Rayo template is here!
                          <br />
                          Showcase your projects, services and expertise with impact.
                        </motion.p>
                        <motion.div 
                          className="menu-promo__img"
                          variants={fadeInUpVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.3 }}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            backgroundColor: 'var(--base-shade)',
                            borderRadius: '30px',
                            overflow: 'hidden'
                          }}
                        >
                          {!videoError ? (
                            <video 
                              ref={videoRef}
                              className="menu-img" 
                              preload="auto" 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              poster="/img/menu-video-poster.jpg" 
                              style={{
                                width: '100%',
                                height: 'auto', 
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                console.error('Video failed to load:', e.target.error);
                                setVideoError(true);
                              }}
                              onCanPlay={() => {
                                console.log('Video can play');
                                setVideoError(false);
                              }}
                            >
                              <source src="/img/menu-video.mp4" type="video/mp4" />
                              <source src="/menu-video.mp4" type="video/mp4" />
                              <source src="img/menu-video.mp4" type="video/mp4" /> 
                            </video>
                          ) : (
                            <div style={{
                              width: '300px',
                              height: '300px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'var(--base-shade)',
                              borderRadius: '12px',
                              textAlign: 'center',
                              padding: '20px'
                            }}>
                              <p style={{ color: 'var(--t-muted)', marginBottom: '10px' }}>
                                ⚠️ Video failed to load
                              </p>
                              <p style={{ color: 'var(--t-muted-extra)', fontSize: '12px' }}>
                                Please check if menu-video.mp4 exists in /public/img/
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="mxd-menu__data"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <p className="t-xsmall">
                      Made with <i className="ph-fill ph-heart t-additional" /> by
                      <a className="no-effect" href="https://themeforest.net/user/ib-themes/portfolio" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                        ib themes
                      </a>
                    </p>
                    <p className="t-xsmall">
                      <i className="ph ph-copyright" /> 2025
                    </p>
                  </motion.div>
                </div>
                <div className="hamburger__parking-slot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.header 
        id="header" 
        className="mxd-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mxd-header__logo ">
          <Link className="mxd-logo" href="/home-main" onClick={closeMenu}>
            <motion.svg 
              className="mxd-logo__image" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg" 
              x="0px" 
              y="0px" 
              viewBox="0 0 56 56" 
              enableBackground="new 0 0 56 56" 
              xmlSpace="preserve"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <style>{`
                .mxd-logo__bg {
                  fill: var(--base-opp);
                }
                .mxd-logo__cat {
                  clip-path: url(#mxd-logo__id);
                  fill: var(--base);
                }
              `}</style>
              <path 
                className="mxd-logo__bg" 
                d="M56,28c0,11.1-2.9,28-28,28S0,39.1,0,28S2.9,0,28,0S56,16.9,56,28z"
              />
              <g>
                <defs>
                  <path 
                    id="mxd-logo__clippath" 
                    d="M28,0C2.9,0,0,16.9,0,28s2.9,28,28,28s28-16.9,28-28S53.1,0,28,0z"
                  />
                </defs>
                <clipPath id="mxd-logo__id">
                  <use href="#mxd-logo__clippath" style={{ overflow: 'visible' }} />
                </clipPath>
                <path 
                  className="mxd-logo__cat" 
                  d="M33.6,34.5h0.9 c0.5,0,0.9,0.4,0.9,0.9v3.7c0,0.5-0.4,0.9-0.9,0.9h-0.9c-0.5,0-0.9-0.4-0.9-0.9v-3.7C32.7,34.9,33.1,34.5,33.6,34.5z M20.5,37.3 v1.9c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-3.7c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9,0.4-0.9,0.9V37.3L20.5,37.3z M39.2,21.5v0.9c0,0.5-0.4,0.9-0.9,0.9h-0.9c-0.5,0-0.9-0.4-0.9-0.9v-0.9c0-0.5,0.4-0.9,0.9-0.9h0.9C38.8,20.5,39.2,21,39.2,21.5z M34.5,26.1h0.9c0.5,0,0.9-0.4,0.9-0.9v-0.9c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9,0.4-0.9,0.9v0.9C33.6,25.7,34,26.1,34.5,26.1z M28,26.1h-4.7c-0.5,0-0.9,0.4-0.9,0.9V28c0,0.5,0.4,0.9,0.9,0.9h9.3c0.5,0,0.9-0.4,0.9-0.9v-0.9c0-0.5-0.4-0.9-0.9-0.9H28L28,26.1 z M19.6,24.3v0.9c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-0.9c0-0.5-0.4-0.9-0.9-0.9h-0.9C20,23.3,19.6,23.8,19.6,24.3z M16.8,21.5v0.9c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-0.9c0-0.5-0.4-0.9-0.9-0.9h-0.9C17.2,20.5,16.8,21,16.8,21.5z M14,26.1v4.7c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-6.5c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9,0.4-0.9,0.9V26.1 L14,26.1z M11.2,34.5v1.9c0,0.5-0.4,0.9-0.9,0.9H7.5c-0.5,0-0.9,0.4-0.9,0.9v0.9c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9,0.4,0.9,0.9 V42c0,0.5-0.4,0.9-0.9,0.9H7.5c-0.5,0-0.9,0.4-0.9,0.9v0.9c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9,0.4,0.9,0.9V56 c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-6.5c0-0.5,0.4-0.9,0.9-0.9h3.7c0.5,0,0.9-0.4,0.9-0.9v-0.9 c0-0.5-0.4-0.9-0.9-0.9h-3.7c-0.5,0-0.9-0.4-0.9-0.9v-6.5c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9-0.4,0.9-0.9v-3.7c0-0.5-0.4-0.9-0.9-0.9 h-0.9c-0.5,0-0.9,0.4-0.9,0.9L11.2,34.5L11.2,34.5z M42,26.1v-1.9c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9,0.4-0.9,0.9v6.5 c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9V26.1L42,26.1z M49.5,39.2v-0.9c0-0.5-0.4-0.9-0.9-0.9h-2.8 c-0.5,0-0.9-0.4-0.9-0.9v-3.7c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9,0.4-0.9,0.9v3.7c0,0.5,0.4,0.9,0.9,0.9c0.5,0,0.9,0.4,0.9,0.9 v6.5c0,0.5-0.4,0.9-0.9,0.9h-3.7c-0.5,0-0.9,0.4-0.9,0.9v0.9c0,0.5,0.4,0.9,0.9,0.9h3.7c0.5,0,0.9,0.4,0.9,0.9V56 c0,0.5,0.4,0.9,0.9,0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-9.3c0-0.5,0.4-0.9,0.9-0.9h0.9c0.5,0,0.9-0.4,0.9-0.9v-0.9 c0-0.5-0.4-0.9-0.9-0.9h-0.9c-0.5,0-0.9-0.4-0.9-0.9v-0.9c0-0.5,0.4-0.9,0.9-0.9h0.9C49,40.1,49.5,39.7,49.5,39.2L49.5,39.2z"
                />
              </g>
            </motion.svg>
            <span className="mxd-logo__text">
              rayo
              <br />
              template
            </span>
          </Link>
        </div>
        <div className="mxd-header__controls ">
          <motion.button 
            className="mxd-color-switcher" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '8px',
              WebkitFontSmoothing: 'antialiased',
              fontSize: '24px',
              color: 'var(--t-bright)'
            }}
          >
            <motion.i 
              className={`ph ${isDark ? 'ph-sun' : 'ph-moon'}`}
              initial={{ rotate: 0 }}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '24px' }}
            />
          </motion.button>
          <motion.a 
            className="btn-anim btn btn-anim btn-default btn-mobile-icon btn-outline slide-right" 
            aria-label="Say Hello" 
            href="/contact"
            onClick={closeMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="btn-caption">
              <div className="btn-anim__block">Say Hello</div>
              <div className="btn-anim__block" aria-hidden="true">Say Hello</div>
            </span>
            <i className="ph-bold ph-arrow-up-right"></i>
          </motion.a>
        </div>
      </motion.header>
    </>
  );
}