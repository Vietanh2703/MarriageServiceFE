import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

function LoadingScreen({ onLoadingComplete}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const flowersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always use light mode
    if (containerRef.current) {
      containerRef.current.className = 'loading-screen light-mode';
    }
  }, []);

  useEffect(() => {
    // Create timeline for entrance animation
    const tl = gsap.timeline();

    // Animate the background
    tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
    );

    // Animate the wedding rings
    tl.fromTo(
        ring1Ref.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2"
    );

    tl.fromTo(
        ring2Ref.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8"
    );

    // Animate the heart
    tl.fromTo(
        heartRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
    );

    // Animate the flowers
    tl.fromTo(
        flowersRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
    );

    // Continuous animations
    gsap.to(heartRef.current, {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut"
    });

    gsap.to([ring1Ref.current, ring2Ref.current], {
      rotation: "+=360",
      repeat: -1,
      duration: 8,
      ease: "none"
    });

    // Set timer to hide loading screen after 5 seconds
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onLoadingComplete
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
      <div className="loading-screen light-mode" ref={containerRef}>
        <div className="loading-container">
          <div className="wedding-ring ring1" ref={ring1Ref}></div>
          <div className="wedding-ring ring2" ref={ring2Ref}></div>
          <div className="heart" ref={heartRef}>❤️</div>
          <div className="flowers" ref={flowersRef}>
            <span className="flower">C</span>
            <span className="flower">ư</span>
            <span className="flower">ớ</span>
            <span className="flower">i</span>
            <span className="flower"> </span>
            <span className="flower">đ</span>
            <span className="flower">i</span>
            <span className="flower">❤️</span>
          </div>
        </div>
      </div>
  );
}

export default LoadingScreen;