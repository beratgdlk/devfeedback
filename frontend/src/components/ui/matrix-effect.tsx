"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { useMatrixStore } from "@/lib/matrix-store";

const createMatrixColumn = (characters: string, length: number) => {

  let column = '';

  const minLength = 5; 

  const actualLength = Math.max(minLength, Math.floor(Math.random() * length));

  

  for (let i = 0; i < actualLength; i++) {

    column += characters.charAt(Math.floor(Math.random() * characters.length));

  }

  

  return column;

};

const MAX_DROPS = 300;

export function MatrixRain({ contained = false }: { contained?: boolean }) {

  const [drops, setDrops] = useState<{ id: number; left: number; delay: number; duration: number; chars: string; size: number; opacity: number }[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  const [isVisible, setIsVisible] = useState(true); 

  const animationFrameRef = useRef<number | null>(null);

  const lastUpdateTimeRef = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  

  

  const isMatrixPaused = useMatrixStore((state) => state.isMatrixPaused);

  

  const initializeDrops = useCallback(() => {

    if (typeof window === 'undefined') return;

    

    

    const characters = '</>{}[]();:/\\|=+-*&^%$#@!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    

    

    const spacing = contained ? 20 : 30; 

    const containerWidth = contained ? 400 : window.innerWidth;

    const numberOfDrops = Math.min(contained ? 40 : 100, Math.floor(containerWidth / spacing));

    

    

    const initialDrops = Array.from({ length: numberOfDrops }, (_, index) => ({

      id: index,

      left: index * spacing, 

      delay: Math.random() * (contained ? 1 : 2), 

      duration: contained ? (3 + Math.random() * 5) : (4 + Math.random() * 8), 

      chars: createMatrixColumn(characters, contained ? 8 : 12), 

      size: contained ? (10 + Math.floor(Math.random() * 2)) : (12 + Math.floor(Math.random() * 2)), 

      opacity: 0.9 + Math.random() * 0.1 

    }));

    

    setDrops(initialDrops);

    setIsInitialized(true);

  }, [contained]);

  

  

  const updateDrops = useCallback((timestamp: number) => {

    

    if (!isVisible || isMatrixPaused) {

      animationFrameRef.current = null;

      return;

    }

    

    

    if (timestamp - lastUpdateTimeRef.current < 1500) {  

      animationFrameRef.current = requestAnimationFrame(updateDrops);

      return;

    }

    

    lastUpdateTimeRef.current = timestamp;

    

    

    const characters = '</>{}[]();:/\\|=+-*&^%$#@!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    

    setDrops(prev => 

      prev.map(drop => ({

        ...drop,

        chars: Math.random() > 0.85 

          ? createMatrixColumn(characters, contained ? 8 : 12)

          : drop.chars

      }))

    );

    

    animationFrameRef.current = requestAnimationFrame(updateDrops);

  }, [contained, isVisible, isMatrixPaused]);

  

  useEffect(() => {

    if (!isInitialized) {

      initializeDrops();

    } else if (isInitialized && !animationFrameRef.current && isVisible && !isMatrixPaused) {

      

      animationFrameRef.current = requestAnimationFrame(updateDrops);

    }

    

    

    const handleResize = () => {

      if (typeof window === 'undefined') return;

      

      const spacing = contained ? 12 : 16;

      const containerWidth = contained ? 400 : window.innerWidth;

      const newNumberOfDrops = Math.min(MAX_DROPS, Math.floor(containerWidth / spacing));

      

      const characters = '</>{}[]();:/\\|=+-*&^%$#@!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      

      const newDrops = Array.from({ length: newNumberOfDrops }, (_, index) => ({

        id: index,

        left: index * spacing,

        delay: Math.random() * (contained ? 1 : 2),

        duration: contained ? (3 + Math.random() * 5) : (4 + Math.random() * 8),

        chars: createMatrixColumn(characters, contained ? 8 : 12),

        size: contained ? (10 + Math.floor(Math.random() * 2)) : (12 + Math.floor(Math.random() * 2)),

        opacity: 0.9 + Math.random() * 0.1

      }));

      

      setDrops(newDrops);

    };

    

    if (typeof window !== 'undefined') {

      window.addEventListener('resize', handleResize);

    }

    

    return () => {

      if (animationFrameRef.current) {

        cancelAnimationFrame(animationFrameRef.current);

      }

      if (typeof window !== 'undefined') {

        window.removeEventListener('resize', handleResize);

      }

    };

  }, [isInitialized, initializeDrops, updateDrops, contained, isVisible, isMatrixPaused]);

  

  

  useEffect(() => {

    if (typeof window === 'undefined' || !containerRef.current) return;

    

    const observer = new IntersectionObserver(

      ([entry]) => {

        

        setIsVisible(entry.isIntersecting);

        

        

        if (entry.isIntersecting && !animationFrameRef.current && isInitialized && !isMatrixPaused) {

          animationFrameRef.current = requestAnimationFrame(updateDrops);

        }

      },

      { threshold: 0.1 } 

    );

    

    observer.observe(containerRef.current);

    

    return () => {

      if (containerRef.current) {

        observer.unobserve(containerRef.current);

      }

    };

  }, [isInitialized, updateDrops, isMatrixPaused]);

  

  if (!isInitialized || drops.length === 0) {

    return null;

  }

  

  

  const containerClass = contained ? "absolute inset-0 overflow-hidden" : "fixed inset-0 z-0 matrix-rain";

  

  return (

    <div ref={containerRef} className={containerClass} style={{ pointerEvents: 'none' }}>

      {!contained && (

        

        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-[#33FF33]/30 rounded-lg shadow-lg shadow-[#33FF33]/20"></div>

      )}

      

      {}

      {isVisible && !isMatrixPaused && drops.map(drop => (

        <div

          key={drop.id}

          className="matrix-drop absolute"

          style={{

            left: `${drop.left}px`,

            animationDelay: `${drop.delay}s`,

            animationDuration: `${drop.duration}s`,

            fontSize: `${drop.size}px`,

            opacity: drop.opacity,

            color: '#33FF33',

            textShadow: '0 0 8px #33FF33, 0 0 12px #33FF33',

            willChange: 'transform, opacity' 

          }}

        >

          {drop.chars.split('').map((char, i) => (

            <div 

              key={i}

              style={{ 

                opacity: 1 - (i * 0.03), 

                textShadow: i === 0 ? '0 0 15px #33FF33, 0 0 20px #33FF33' : undefined, 

                animation: i === 0 ? 'head-flicker 1.8s infinite' : undefined, 

                color: i === 0 ? '#FFFFFF' : undefined 

              }}

            >

              {char}

            </div>

          ))}

        </div>

      ))}

      

      {}

      {isVisible && isMatrixPaused && contained && (

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-[#33FF33] font-mono text-lg retro-text-green text-center">

            [MATRIX SİSTEMİ DURDURULDU]

          </div>

        </div>

      )}

    </div>

  );

}

export function MatrixCardControl({ children, className }: { children: React.ReactNode, className?: string }) {

  

  const isMatrixPaused = useMatrixStore((state) => state.isMatrixPaused);

  const toggleMatrixPause = useMatrixStore((state) => state.toggleMatrixPause);

  

  return (

    <div className={`matrix-card relative overflow-hidden rounded-xl shadow-[0_0_25px_rgba(51,255,51,0.3)] border-2 border-[#33FF33]/50 ${className || ''}`}>

      {}

      <div className="absolute inset-0 z-0 overflow-hidden">

        <MatrixRain contained={true} />

      </div>

      

      {}

      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-1"></div>

      

      {}

      <button 

        onClick={toggleMatrixPause}

        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/80 rounded-full border-2 border-[#33FF33] text-[#33FF33] hover:bg-[#33FF33]/20 transition-all duration-300 shadow-[0_0_10px_rgba(51,255,51,0.5)] backdrop-blur-sm"

        title={isMatrixPaused ? "Animasyonu Başlat" : "Animasyonu Duraklat"}

      >

        {isMatrixPaused ? (

          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

            <polygon points="5 3 19 12 5 21 5 3"></polygon>

          </svg>

        ) : (

          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

            <rect x="6" y="4" width="4" height="16"></rect>

            <rect x="14" y="4" width="4" height="16"></rect>

          </svg>

        )}

      </button>

      

      {}

      <div className="matrix-card-content relative z-10">

        {children}

      </div>

    </div>

  );

}

export function MatrixPauseButton() {

  

  const isMatrixPaused = useMatrixStore((state) => state.isMatrixPaused);

  const toggleMatrixPause = useMatrixStore((state) => state.toggleMatrixPause);

  

  return (

    <button 

      onClick={toggleMatrixPause}

      className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/80 rounded-full border-2 border-[#33FF33] text-[#33FF33] hover:bg-[#33FF33]/20 transition-all duration-300 shadow-[0_0_10px_rgba(51,255,51,0.5)] backdrop-blur-sm"

      title={isMatrixPaused ? "Animasyonu Başlat" : "Animasyonu Duraklat"}

    >

      {isMatrixPaused ? (

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

          <polygon points="5 3 19 12 5 21 5 3"></polygon>

        </svg>

      ) : (

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

          <rect x="6" y="4" width="4" height="16"></rect>

          <rect x="14" y="4" width="4" height="16"></rect>

        </svg>

      )}

    </button>

  );

}

export function MatrixCard({ children }: { children: React.ReactNode }) {

  return (

    <div className="matrix-card">

      {}

      <div className="absolute inset-0 z-0 overflow-hidden">

        <MatrixRain contained={true} />

      </div>

      

      {}

      <div className="matrix-card-content">

        {children}

      </div>

    </div>

  );

}

export function MatrixMarquee({ text }: { text: string }) {

  return (

    <div className="retro-band-fullwidth">

      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">

        <span className="matrix-text px-4 font-mono text-sm">

          {text.repeat(5)}

        </span>

      </div>

    </div>

  );

}

export function MatrixMarqueeTop({ text }: { text: string }) {

  return (

    <div className="retro-band-topwidth">

      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">

        <span className="matrix-text px-4 font-mono text-sm">

          {text.repeat(5)}

        </span>

      </div>

    </div>

  );

}

export function MatrixLoading() {

  return <div className="matrix-loading"></div>;

}