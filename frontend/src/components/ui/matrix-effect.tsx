"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMatrixStore } from "@/lib/matrix-store";

// Sütun oluşturma yardımcı fonksiyonu
const createMatrixColumn = (characters: string, length: number) => {
  let column = '';
  const minLength = 5; // Minimum sütun uzunluğu
  const actualLength = Math.max(minLength, Math.floor(Math.random() * length));
  
  for (let i = 0; i < actualLength; i++) {
    column += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return column;
};

// Performansı artırmak için damla sayısını sınırlayalım
const MAX_DROPS = 300;

// Temel MatrixRain bileşeni - iki farklı modda çalışabilir: tam ekran veya sınırlı alan
export function MatrixRain({ contained = false }: { contained?: boolean }) {
  const [drops, setDrops] = useState<{ id: number; left: number; delay: number; duration: number; chars: string; size: number; opacity: number }[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Görünürlük durumu
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Global store'dan matrix durumunu al
  const isMatrixPaused = useMatrixStore((state) => state.isMatrixPaused);
  
  const initializeDrops = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Matrix karakterleri - Çince, Japonca ve programlama sembolleri
    const characters = '饺子 馄饨 包子 小笼包 面条 春卷 饺子皮 面粉 肉馅 葱姜蒜 白菜 胡萝卜 料酒 香油 水 盐 胡椒 蒸 煮 煎 炸 酱油 醋 芝麻油 香菜 辣椒 大蒜 酱料 調味料 香料 肉 菜 馅料 プログラミング コード ハッキング システム エラー バグ デバッグ アルゴリズム 関数 変数 オブジェクト クラス メソッド 配列 文字列 数値 </>{}[]();:/\\|=+-*&^%$#@!';
    
    // Daha düzenli ve yoğun bir yerleşim için
    const spacing = contained ? 12 : 16; 
    const containerWidth = contained ? 400 : window.innerWidth;
    const numberOfDrops = Math.min(MAX_DROPS, Math.floor(containerWidth / spacing));
    
    // İlk damlaları oluştur
    const initialDrops = Array.from({ length: numberOfDrops }, (_, index) => ({
      id: index,
      left: index * spacing, // Eşit aralıklarla yerleştir
      delay: Math.random() * (contained ? 1 : 2), // Daha yavaş başlangıç
      duration: contained ? (3 + Math.random() * 5) : (4 + Math.random() * 8), // Daha yavaş düşüş (3-8 saniye arası)
      chars: createMatrixColumn(characters, contained ? 12 : 20), // Biraz daha uzun sütunlar
      size: contained ? (10 + Math.floor(Math.random() * 2)) : (12 + Math.floor(Math.random() * 2)), // Daha okunaklı boyut
      opacity: 0.9 + Math.random() * 0.1 // Daha görünür
    }));
    
    setDrops(initialDrops);
    setIsInitialized(true);
  }, [contained]);
  
  // Performanslı animasyon için requestAnimationFrame kullanalım
  const updateDrops = useCallback((timestamp: number) => {
    // Görünür değilse veya durdurulmuşsa animasyonu durdur
    if (!isVisible || isMatrixPaused) {
      animationFrameRef.current = null;
      return;
    }
    
    // Sadece belirli aralıklarla güncelle (her karede değil)
    if (timestamp - lastUpdateTimeRef.current < 800) {  // 800ms'de bir güncelle (daha nadir karakter değişimi)
      animationFrameRef.current = requestAnimationFrame(updateDrops);
      return;
    }
    
    lastUpdateTimeRef.current = timestamp;
    
    // Matrix karakterleri - Çince, Japonca ve programlama sembolleri
    const characters = '饺子 馄饨 包子 小笼包 面条 春卷 饺子皮 面粉 肉馅 葱姜蒜 白菜 胡萝卜 料酒 香油 水 盐 胡椒 蒸 煮 煎 炸 酱油 醋 芝麻油 香菜 辣椒 大蒜 酱料 調味料 香料 肉 菜 馅料 プログラミング コード ハッキング システム エラー バグ デバッグ アルゴリズム 関数 変数 オブジェクト クラス メソッド 配列 文字列 数値 </>{}[]();:/\\|=+-*&^%$#@!';
    
    setDrops(prev => 
      prev.map(drop => ({
        ...drop,
        chars: Math.random() > 0.9 // Daha az sıklıkta karakter değişimi (%10 olasılık)
          ? createMatrixColumn(characters, contained ? 12 : 20)
          : drop.chars
      }))
    );
    
    animationFrameRef.current = requestAnimationFrame(updateDrops);
  }, [contained, isVisible, isMatrixPaused]);
  
  useEffect(() => {
    if (!isInitialized) {
      initializeDrops();
    } else if (isInitialized && !animationFrameRef.current && isVisible && !isMatrixPaused) {
      // Animasyonu başlat (sadece görünür olduğunda ve duraklatılmamışsa)
      animationFrameRef.current = requestAnimationFrame(updateDrops);
    }
    
    // Pencere boyutu değiştiğinde damlaları yeniden oluştur
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      
      const spacing = contained ? 12 : 16;
      const containerWidth = contained ? 400 : window.innerWidth;
      const newNumberOfDrops = Math.min(MAX_DROPS, Math.floor(containerWidth / spacing));
      
      const characters = '饺子 馄饨 包子 小笼包 面条 春卷 饺子皮 面粉 肉馅 葱姜蒜 白菜 胡萝卜 料酒 香油 水 盐 胡椒 蒸 煮 煎 炸 酱油 醋 芝麻油 香菜 辣椒 大蒜 酱料 調味料 香料 肉 菜 馅料 プログラミング コード ハッキング システム エラー バグ デバッグ アルゴリズム 関数 変数 オブジェクト クラス メソッド 配列 文字列 数値 </>{}[]();:/\\|=+-*&^%$#@!';
      
      const newDrops = Array.from({ length: newNumberOfDrops }, (_, index) => ({
        id: index,
        left: index * spacing,
        delay: Math.random() * (contained ? 1 : 2),
        duration: contained ? (3 + Math.random() * 5) : (4 + Math.random() * 8),
        chars: createMatrixColumn(characters, contained ? 12 : 20),
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
  
  // Görünürlük kontrolü için IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Element görünür olduğunda isVisible true, görünmediğinde false
        setIsVisible(entry.isIntersecting);
        
        // Görünür hale geldiğinde ve animasyon çalışmıyorsa başlat
        if (entry.isIntersecting && !animationFrameRef.current && isInitialized && !isMatrixPaused) {
          animationFrameRef.current = requestAnimationFrame(updateDrops);
        }
      },
      { threshold: 0.1 } // Elementin %10'u görünür olduğunda tetikle
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
  
  // CSS sınıfını contained parametresine göre belirle
  const containerClass = contained ? "absolute inset-0 overflow-hidden" : "fixed inset-0 z-0 matrix-rain";
  
  return (
    <div ref={containerRef} className={containerClass} style={{ pointerEvents: 'none' }}>
      {!contained && (
        // Tam ekran mod için %80 opasiteli kart yapısı arkaplanı (sadece tam ekran modunda)
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-[#33FF33]/30 rounded-lg shadow-lg shadow-[#33FF33]/20"></div>
      )}
      
      {/* Matrix yağmuru - sadece görünür olduğunda render et */}
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
            willChange: 'transform, opacity' // GPU hızlandırma
          }}
        >
          {drop.chars.split('').map((char, i) => (
            <div 
              key={i}
              style={{ 
                opacity: 1 - (i * 0.03), // Daha yavaş solma (daha uzun sütun görüntüsü)
                textShadow: i === 0 ? '0 0 15px #33FF33, 0 0 20px #33FF33' : undefined, // İlk karakter daha parlak
                animation: i === 0 ? 'head-flicker 1.8s infinite' : undefined, // İlk karakter için yanıp sönme efekti
                color: i === 0 ? '#FFFFFF' : undefined // İlk karakter beyaz olsun (daha parlak)
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
      
      {/* Durdurulduğunda gösterilecek statik görünüm */}
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

// Matrix animasyonunu kontrol edilebilir bir kart içinde sunar
export function MatrixCardControl({ children, className }: { children: React.ReactNode, className?: string }) {
  // Global store'dan matrix durumunu ve toggle fonksiyonunu al
  const isMatrixPaused = useMatrixStore((state) => state.isMatrixPaused);
  const toggleMatrixPause = useMatrixStore((state) => state.toggleMatrixPause);
  
  return (
    <div className={`matrix-card relative overflow-hidden rounded-xl shadow-[0_0_25px_rgba(51,255,51,0.3)] border-2 border-[#33FF33]/50 ${className || ''}`}>
      {/* Matrix yağmuru - contained=true ile sınırlı alanda çalışacak */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MatrixRain contained={true} />
      </div>
      
      {/* Opak arkaplan katmanı - matrix efektini içeriğin arkasında tutar */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-1"></div>
      
      {/* Kontrol butonu */}
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
      
      {/* İçerik */}
      <div className="matrix-card-content relative z-10">
        {children}
      </div>
    </div>
  );
}

// Her sayfada kullanılabilecek bağımsız Matrix kontrol butonu
export function MatrixPauseButton() {
  // Global store'dan matrix durumunu ve toggle fonksiyonunu al
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

// Bu bileşen, matrix animasyonunu kartlı bir yapıda sunar
export function MatrixCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="matrix-card">
      {/* Matrix yağmuru - contained=true ile sınırlı alanda çalışacak */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MatrixRain contained={true} />
      </div>
      
      {/* İçerik */}
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