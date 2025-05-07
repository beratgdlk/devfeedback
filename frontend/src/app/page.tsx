"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MatrixMarquee, MatrixMarqueeTop, MatrixRain, MatrixCard, MatrixCardControl } from "@/components/ui/matrix-effect";
import { useState } from "react";

// Coder Logo
const AnimatedLogo = () => {
  return (
    <div className="w-24 h-24 bg-black border-2 border-[#33FF33] rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden retro-border-green">
      {/* Arka plan parlama animasyonu */}
      <div className="absolute inset-0 bg-[#33FF33]/5 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
      
      {/* Çember dalga animasyonu */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full border-2 border-[#33FF33]/20 rounded-full transform scale-50 animate-ping" style={{ animationDuration: '3s' }}></div>
      </div>
      
      {/* Arka planda matrix tarzı animasyon */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 text-[8px] font-mono text-[#33FF33] animate-pulse" style={{ animationDuration: '1.5s' }}>01001</div>
        <div className="absolute top-8 left-8 text-[8px] font-mono text-[#33FF33] animate-pulse" style={{ animationDuration: '2s' }}>10110</div>
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-[#33FF33] animate-pulse" style={{ animationDuration: '1.8s' }}>01101</div>
        <div className="absolute bottom-8 right-8 text-[8px] font-mono text-[#33FF33] animate-pulse" style={{ animationDuration: '2.2s' }}>10010</div>
      </div>
      
      {/* Ana logo */}
      <div className="font-mono text-4xl font-bold flex items-center z-10 relative">
        <span className="text-[#33FF33] relative animate-pulse" style={{ animationDuration: '1.8s' }}>
          &lt;
          <span className="absolute top-0 left-0 w-full h-full text-[#33FF33]/70 blur-[1px] animate-pulse" style={{ animationDuration: '2.2s' }}>&lt;</span>
        </span>
        <span className="text-[#9900FF] mx-1 relative animate-pulse-slow" style={{ animationDuration: '2.2s' }}>
          /
          <span className="absolute top-0 left-0 w-full h-full text-[#9900FF]/70 blur-[2px] animate-pulse" style={{ animationDuration: '1.6s' }}>/</span>
        </span>
        <span className="text-[#33FF33] relative animate-pulse" style={{ animationDuration: '1.8s' }}>
          &gt;
          <span className="absolute top-0 left-0 w-full h-full text-[#33FF33]/70 blur-[1px] animate-pulse" style={{ animationDuration: '2.2s' }}>&gt;</span>
        </span>
      </div>
      
      {/* Parlama animasyonu */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#33FF33]/20 to-transparent animate-pulse-slow -skew-x-12" style={{ animationDuration: '4s' }}></div>
    </div>
  );
};

// Auth buttons komponenti
const AuthButtons = () => (
  <div className="flex justify-center space-x-4 my-6">
    <Link href="/login">
      <div className="retro-pixel-container">
        <Button 
          className="font-mono relative overflow-hidden bg-black hover:bg-[#33FF33]/20 border-2 border-[#33FF33] text-[#33FF33] text-xs px-3 py-1 h-auto"
        >
          <div className="retro-corner-tl"></div>
          <div className="retro-corner-tr"></div>
          <div className="retro-corner-bl"></div>
          <div className="retro-corner-br"></div>
          <span className="relative z-10 matrix-text">[ GİRİŞ ]</span>
        </Button>
      </div>
    </Link>
    <Link href="/register">
      <div className="retro-pixel-container">
        <Button 
          className="font-mono relative overflow-hidden bg-black hover:bg-[#9900FF]/20 border-2 border-[#9900FF] text-[#9900FF] text-xs px-3 py-1 h-auto"
        >
          <div className="retro-corner-tl-pink"></div>
          <div className="retro-corner-tr-pink"></div>
          <div className="retro-corner-bl-pink"></div>
          <div className="retro-corner-br-pink"></div>
          <span className="relative z-10 retro-text-pink">[ KAYIT ]</span>
        </Button>
      </div>
    </Link>
  </div>
);

// Teknoloji ikonları
const TechIcons = ({ onSelectCategory, activeCategory, isVisible = true }: { onSelectCategory: (category: string) => void, activeCategory: string | null, isVisible?: boolean }) => {
  const technologies = [
    { id: 'react', name: 'React', icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></>, color: 'bg-blue-900/30' },
    { id: 'node', name: 'Node.js', icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>, color: 'bg-green-900/30' },
    { id: 'vue', name: 'Vue', icon: <><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" /></>, color: 'bg-emerald-900/30' },
    { id: 'angular', name: 'Angular', icon: <><path d="M9.5 2.672a2.5 2.5 0 0 1 5 0" /><path d="M5 6a5 5 0 0 1 14 0 5 5 0 0 1-4 4.9v6.1a3 3 0 0 1-2 2.9" /><path d="M8.2 13.9a7 7 0 0 0 6.3 6.1" /></>, color: 'bg-red-900/30' },
    { id: 'typescript', name: 'TypeScript', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M10 10.5h3.5V17" /><line x1="7" y1="13.5" x2="17" y2="13.5" /></>, color: 'bg-blue-900/30' },
    { id: 'javascript', name: 'JavaScript', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M7 7.5v8.5h2.5" /><path d="M14 11.5c.6 0 1.1.4 1.2 1 .3 1.4-.7 2.9-2.1 2.9-1.3 0-2.3-1-2.1-2.3" /></>, color: 'bg-yellow-900/30' },
    { id: 'frontend', name: 'Frontend', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 17l6-10" /><path d="M9 7l6 10" /></>, color: 'bg-pink-900/30' },
    { id: 'backend', name: 'Backend', icon: <><path d="M2 2v20" /><path d="M22 12H2" /><path d="M12 22V12" /><path d="M7 7h10" /><path d="M17 17h-5" /></>, color: 'bg-purple-900/30' },
    { id: 'nestjs', name: 'NestJS', icon: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3" /><path d="M12 8v13" /><path d="M17 5.5l-5 3-5-3" /></>, color: 'bg-red-900/30' },
    { id: 'elysia', name: 'Elysia.js', icon: <><path d="M3 3v18h18" /><path d="M7 8h2.5 M11 8h2.5 M15 8h2.5" /><path d="M7 12h2.5 M11 12h2.5 M15 12h2.5" /><path d="M7 16h2.5 M11 16h2.5 M15 16h2.5" /></>, color: 'bg-purple-900/30' },
    { id: 'other', name: 'Diğer', icon: <><circle cx="12" cy="12" r="9" /><line x1="3.6" y1="9" x2="20.4" y2="9" /><line x1="3.6" y1="15" x2="20.4" y2="15" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></>, color: 'bg-gray-900/30' },
  ];

  if (!isVisible) return null;

  return (
    <div className="mb-10 animate-fadeIn">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {technologies.map((tech) => (
          <div 
            key={tech.id}
            className={`flex flex-col items-center cursor-pointer hover:scale-110 transition-transform animate-fadeIn p-2 rounded-lg ${activeCategory === tech.id ? 'bg-[#33FF33]/10 border border-[#33FF33]/50' : ''}`}
            onClick={() => onSelectCategory(tech.id)}
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${activeCategory === tech.id ? 'retro-border bg-black/90' : 'bg-black/60'} flex items-center justify-center mb-2 backdrop-blur-sm`}>
              <svg className={`w-8 h-8 ${activeCategory === tech.id ? 'text-[#33FF33]' : 'text-white/90'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {tech.icon}
              </svg>
            </div>
            <span className={`text-xs text-center font-mono ${activeCategory === tech.id ? 'text-[#33FF33] retro-text' : 'text-white/90'}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      
      {activeCategory && (
        <div className="mt-6 flex justify-center">
          <Button 
            className="bg-transparent hover:bg-[#9900FF]/10 relative border border-[#9900FF] text-[#9900FF] text-xs font-mono retro-text-pink"
            onClick={() => onSelectCategory(activeCategory)}
          >
            FİLTREYİ KALDIR
          </Button>
        </div>
      )}
    </div>
  );
};

// Örnek veri
const posts = [
  {
    id: 1,
    title: "Next.js 15 ile SSR performans sorunları",
    description: "Yeni projemde Next.js 15 kullanıyorum ve SSR sayfalarında beklenmedik performans sorunlarıyla karşılaşıyorum. Özellikle ilk yükleme süresi çok uzun. Benzer sorunla karşılaşan veya çözüm önerisi olan var mı?",
    author: "Ahmet Yılmaz",
    likes: 24,
    comments: 8,
    createdAt: "2 saat önce",
    tag: "React",
    color: "bg-blue-900/30"
  },
  {
    id: 2,
    title: "Tailwind CSS best practices",
    description: "Uzun süredir Tailwind CSS kullanıyorum ancak büyük projelerde stil yönetimi zorlaşıyor. Ekip olarak kullandığınız best practice'ler nelerdir? Özellikle component'lerde stil tekrarını nasıl önlüyorsunuz?",
    author: "Zeynep Kaya",
    likes: 42,
    comments: 15,
    createdAt: "5 saat önce",
    tag: "Frontend",
    color: "bg-pink-900/30"
  },
  {
    id: 3,
    title: "TypeScript type narrowing teknikleri",
    description: "TypeScript ile kompleks tip tanımlamalarında zorlanıyorum. Özellikle union tiplerde type narrowing yaparken verimli yaklaşımlar nelerdir? Kod tabanınızda kullandığınız pattern'ler var mı?",
    author: "Mehmet Demir",
    likes: 18,
    comments: 6,
    createdAt: "1 gün önce",
    tag: "TypeScript",
    color: "bg-purple-900/30"
  },
  {
    id: 4,
    title: "Node.js ile API rate limiting nasıl yapılır?",
    description: "Express tabanlı bir Node.js API'si geliştiriyorum ve DoS saldırılarına karşı rate limiting uygulamak istiyorum. Redis kullanarak nasıl verimli bir şekilde bunu yapabilirim?",
    author: "Emre Can",
    likes: 31,
    comments: 12,
    createdAt: "3 saat önce",
    tag: "Node",
    color: "bg-green-900/30"
  },
  {
    id: 5,
    title: "Vue 3 Composition API ile state management yaklaşımları",
    description: "Vue 3 ile bir proje geliştiriyorum ve Vuex kullanmadan Composition API ile global state yönetimi yapmak istiyorum. Önerilen yaklaşımlar nelerdir?",
    author: "Deniz Yıldız",
    likes: 27,
    comments: 9,
    createdAt: "8 saat önce",
    tag: "Vue",
    color: "bg-emerald-900/30"
  },
  {
    id: 6,
    title: "Angular performans optimizasyonları",
    description: "Büyük bir Angular uygulamasında yaşadığımız performans sorunlarını nasıl çözebiliriz? Change detection optimizasyonu ve lazy loading dışında önerileriniz var mı?",
    author: "Selin Kara",
    likes: 15,
    comments: 7,
    createdAt: "1 gün önce",
    tag: "Angular",
    color: "bg-red-900/30"
  },
  {
    id: 7,
    title: "JavaScript Promise ve async/await ile paralel işlemler",
    description: "JavaScript'te birden fazla API'ye istek atıp sonuçları birleştirmem gerekiyor. Promise.all ve async/await kullanarak bunu en verimli nasıl yapabilirim?",
    author: "Can Demir",
    likes: 33,
    comments: 14,
    createdAt: "6 saat önce",
    tag: "JavaScript",
    color: "bg-yellow-900/30"
  },
  {
    id: 8,
    title: "PostgreSQL veritabanı indexleme stratejileri",
    description: "Backend servislerimizde PostgreSQL kullanıyoruz ve sorgularımız yavaşlamaya başladı. Hangi indexleme stratejilerini kullanmalıyız ve nasıl performans analizi yapabiliriz?",
    author: "Murat Özdemir",
    likes: 29,
    comments: 11,
    createdAt: "1 gün önce",
    tag: "Backend",
    color: "bg-indigo-900/30"
  },
  {
    id: 9,
    title: "Mikrofrontend mimarisi deneyimleri",
    description: "Büyük ölçekli bir projede mikrofrontend mimarisine geçiş yapmak istiyoruz. Bu konuda deneyimi olan var mı? Hangi zorluklar ve çözümlerle karşılaştınız?",
    author: "Berk Tunç",
    likes: 47,
    comments: 22,
    createdAt: "2 gün önce",
    tag: "Frontend",
    color: "bg-pink-900/30"
  },
  {
    id: 10,
    title: "NestJS ile GraphQL API geliştirme",
    description: "NestJS kullanarak GraphQL API geliştiriyorum ve N+1 sorgu problemi ile karşılaşıyorum. DataLoader implementasyonunu NestJS ile nasıl en verimli şekilde yapabilirim?",
    author: "Ali Yılmaz",
    likes: 38,
    comments: 17,
    createdAt: "4 saat önce",
    tag: "NestJS",
    color: "bg-red-900/30"
  },
  {
    id: 11,
    title: "Elysia.js'in Bun runtime üzerinde performansı",
    description: "Elysia.js framework'ünü Bun runtime ile kullanarak bir API geliştiriyorum. Node.js ve Express'e göre performans karşılaştırması yapan var mı? Deneyimlerinizi paylaşır mısınız?",
    author: "Ayşe Kaya",
    likes: 21,
    comments: 8,
    createdAt: "12 saat önce",
    tag: "Elysia",
    color: "bg-purple-900/30"
  }
];

// Retro tarzda Dialog komponenti
const RetroDialog = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur retro-scanlines">
      <div 
        className="w-full max-w-xl bg-black border-2 border-[#33FF33] retro-border p-0 shadow-lg animate-fadeInDown retro-scanlines retro-crt"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#33FF33]/30">
          <h3 className="text-xl font-mono font-bold text-[#33FF33] retro-text">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#33FF33] hover:text-[#9900FF] retro-text"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Yeni gönderi formu
const NewPostForm = () => {
  const [category, setCategory] = useState("");
  const [customTag, setCustomTag] = useState("");
  
  // Özel etiket değiştiğinde "Other" seçeneğini otomatik seç
  const handleCustomTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTag(value);
    
    // Özel etiket alanına bir şey yazıldığında "Other" kategorisini seç
    if (value.trim() !== "") {
      setCategory("other");
    }
  };
  
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#33FF33] font-mono matrix-text">BAŞLIK</label>
        <input 
          type="text" 
          className="w-full h-11 bg-black/80 border-[#33FF33]/60 text-white placeholder:text-[#33FF33]/60 focus:border-[#33FF33] focus:ring-[#33FF33]/50 font-mono rounded p-2"
          placeholder="Gönderi başlığını giriniz" 
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#33FF33] font-mono matrix-text">ETİKET</label>
        <select 
          className="w-full h-11 bg-black/80 border-[#33FF33]/60 text-white focus:border-[#33FF33] focus:ring-[#33FF33]/50 font-mono rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Etiket seçiniz</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="nestjs">NestJS</option>
          <option value="elysia">Elysia.js</option>
          <option value="other">Diğer</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#33FF33] font-mono matrix-text">ÖZEL ETİKET (İSTEĞE BAĞLI)</label>
        <input 
          type="text" 
          className="w-full h-11 bg-black/80 border-[#33FF33]/60 text-white placeholder:text-[#33FF33]/60 focus:border-[#33FF33] focus:ring-[#33FF33]/50 font-mono rounded p-2"
          placeholder="Özel etiket girebilirsiniz"
          value={customTag}
          onChange={handleCustomTagChange}
        />
        {category === "other" && customTag.trim() === "" && (
          <p className="text-[#9900FF] text-xs font-mono mt-1">Diğer seçeneği için özel etiket giriniz.</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#33FF33] font-mono matrix-text">İÇERİK</label>
        <textarea 
          className="w-full h-40 bg-black/80 border-[#33FF33]/60 text-white placeholder:text-[#33FF33]/60 focus:border-[#33FF33] focus:ring-[#33FF33]/50 font-mono rounded p-2"
          placeholder="Gönderinizin içeriğini buraya yazınız..." 
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button 
          type="button"
          className="bg-transparent hover:bg-[#9900FF]/10 relative overflow-hidden group border border-[#9900FF] text-[#9900FF] font-mono retro-text-pink"
        >
          İPTAL
        </Button>
        <Button 
          type="submit"
          className="bg-transparent hover:bg-[#33FF33]/10 relative overflow-hidden group border border-[#33FF33] text-[#33FF33] font-mono matrix-text"
        >
          GÖNDER
        </Button>
      </div>
    </form>
  );
};

// Giriş yapılmadı uyarısı
const LoginRequiredMessage = () => (
  <div className="text-center p-4">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
      <svg className="w-12 h-12 text-[#9900FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-[#9900FF] mb-2 retro-text-pink">Giriş Yapmanız Gerekiyor</h3>
    <p className="text-white mb-6 font-mono">Yeni gönderi oluşturmak için giriş yapmalısınız.</p>
    <div className="flex justify-center space-x-4">
      <Link href="/login">
        <Button className="bg-transparent hover:bg-[#33FF33]/10 relative overflow-hidden group border border-[#33FF33] text-[#33FF33] font-mono matrix-text">
          GİRİŞ YAP
        </Button>
      </Link>
      <Link href="/register">
        <Button className="bg-transparent hover:bg-[#9900FF]/10 relative overflow-hidden group border border-[#9900FF] text-[#9900FF] font-mono retro-text-pink">
          KAYIT OL
        </Button>
      </Link>
    </div>
  </div>
);

export default function Home() {
  // Demo amaçlı, normalde bir auth context veya API çağrısı ile kontrol edilir
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showTechnologies, setShowTechnologies] = useState(false);
  
  const handleNewPostClick = () => {
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  // Demo amaçlı oturum açma/kapatma
  const toggleLogin = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  // Teknolojiler görünürlüğünü değiştir
  const toggleTechnologies = () => {
    setShowTechnologies(prev => !prev);
  };

  // Kategori filtreleme
  const filterByCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null); // Aynı kategoriye tekrar tıklanırsa filtrelemeyi kaldır
    } else {
      setActiveCategory(category);
    }
  };
  
  // Filtrelenmiş gönderiler
  const filteredPosts = activeCategory 
    ? posts.filter(post => post.tag.toLowerCase() === activeCategory.toLowerCase())
    : posts;
  
  const marqueeText = "DEV FEEDBACK - YAZILIMCI GERİ BİLDİRİM PLATFORMU * TÜM YAZILIMCILAR İÇİN PAYLAŞIM ORTAMI * SORULARINIZI PAYLAŞIN, CEVAPLAR ALIN * ";
  const marqueeTopText = "NEXT.JS * REACT * VUE * ANGULAR * NODE * DEVFEEDBACK.SYS * ÇALIŞTIRılıyor * SİSTEM AKTİF * ";

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      {/* Matrix Yağmur Animasyonu - Sadece arkaplan için */}
      <MatrixRain />
      
      <MatrixMarqueeTop text={marqueeTopText} />
      
      {/* Yeni Gönderi Dialog */}
      <RetroDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        title={isLoggedIn ? "YENİ GÖNDERİ OLUŞTUR" : "ERİŞİM REDDEDİLDİ"}
      >
        {isLoggedIn ? <NewPostForm /> : <LoginRequiredMessage />}
      </RetroDialog>
      
      <div className="max-w-4xl mx-auto relative mt-8 mb-20 z-20">
        {/* Ana içeriği içeren tek bir kart yapısı */}
        <MatrixCardControl className="mb-12">
          <div className="p-8">
            {/* Logo ve Başlık */}
            <div className="mb-8 text-center">
              <AnimatedLogo />
              
              <h1 className="text-3xl sm:text-4xl font-bold text-[#33FF33] mb-4 font-mono text-shadow-green">
                DevFeedback – Geliştiriciler için Geri Bildirim Platformu
              </h1>
              <p className="text-lg text-[#33FF33]/90 font-mono bg-black/50 inline-block px-4 py-2 rounded shadow-lg">
                Sorularınızı paylaşın, deneyimli geliştiricilerden geri bildirimler alın
              </p>
              
              {/* Matrix efekti durumu */}
              <div className="mt-4 text-xs text-[#33FF33] font-mono animate-pulse">
                [SİSTEM DURUMU: AKTİF] - SAĞ ÜST BUTONU KULLANARAK MATRIX ANİMASYONUNU KONTROL EDEBİLİRSİNİZ
              </div>
            </div>

            {/* Giriş/Kayıt Butonları */}
            <AuthButtons />

            {/* Teknolojiler Butonu */}
            <div className="flex justify-center mt-6 mb-4">
              <Button 
                className="bg-black hover:bg-[#ff9900]/10 relative overflow-hidden border-2 border-[#ff9900] text-[#ff9900] font-mono px-5 py-2 h-auto text-base retro-text-orange shadow-[0_0_10px_rgba(255,153,0,0.5)]"
                onClick={toggleTechnologies}
              >
                [ TEKNOLOJİLER {showTechnologies ? '▲' : '▼'} ]
              </Button>
            </div>

            {/* Teknolojiler Bölümü - Gizlenebilir */}
            <TechIcons onSelectCategory={filterByCategory} activeCategory={activeCategory} isVisible={showTechnologies} />

            {/* Yeni Gönderi Oluştur Butonu */}
            <div className="flex justify-center mt-6">
              <div className="retro-pixel-container">
                <Button 
                  className="bg-black hover:bg-[#33FF33]/10 relative overflow-hidden group border-2 border-[#33FF33] text-[#33FF33] font-mono px-5 py-2 h-auto text-base"
                  onClick={handleNewPostClick}
                >
                  <div className="retro-corner-tl"></div>
                  <div className="retro-corner-tr"></div>
                  <div className="retro-corner-bl"></div>
                  <div className="retro-corner-br"></div>
                  <span className="relative z-10 matrix-text">[ YENİ GÖNDERİ OLUŞTUR ]</span>
                </Button>
              </div>
            </div>
          </div>
        </MatrixCardControl>

        {/* Gönderiler */}
        <div className="space-y-6 mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#33FF33]/50 to-transparent"></div>
            <h2 className="text-center text-2xl text-[#33FF33] font-mono px-4 retro-text">PAYLAŞIMLAR</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#33FF33]/50 to-transparent"></div>
          </div>
          
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="mb-4">
                <MatrixCard>
                  <Card className="border-[#33FF33] bg-black/80 hover:shadow-lg transition-all duration-300 overflow-hidden backdrop-blur-sm relative z-10">
                    <div className={`h-1 ${post.color}`}></div>
                    <CardHeader className="pb-2 relative">
                      <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full opacity-10 bg-slate-300"></div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${post.color} text-white font-mono font-bold`}>
                          {post.tag}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-semibold text-[#33FF33] font-mono">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-[#33FF33]/80 font-mono">
                        <span>{post.author}</span>
                        <span>●</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="text-white font-mono line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2">
                      <div className="flex items-center space-x-4 text-[#33FF33]">
                        <div className="flex items-center space-x-1">
                          <span role="img" aria-label="beğeni" className="text-sm">👍</span>
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span role="img" aria-label="yorum" className="text-sm">💬</span>
                          <span className="text-sm">{post.comments}</span>
                        </div>
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild 
                          className="relative border border-[#33FF33] bg-black hover:bg-[#33FF33]/10 text-[#33FF33] font-mono px-2 py-0 h-7"
                        >
                          <Link href={`/posts/${post.id}`}>
                            <span className="relative z-10 text-xs">[ DETAYLAR ]</span>
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </MatrixCard>
              </div>
            ))
          ) : (
            <div className="text-center p-10 border border-[#33FF33]/30 rounded-xl bg-black/50">
              <p className="text-[#33FF33] font-mono matrix-text">SEÇİLEN KATEGORİDE GÖNDERİ BULUNAMADI</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12 text-sm text-[#33FF33] animate-pulse-slow font-mono" style={{ animationDelay: '800ms' }}>
          © 2024 DEVFEEDBACK.SYS // RUN v1.0.1 // ALL RIGHTS RESERVED
        </div>
        
        {/* Demo için oturum butonları */}
        <div className="fixed bottom-20 right-6 flex flex-col gap-2">
          <Button 
            className="bg-black hover:bg-[#33FF33]/10 border border-[#33FF33] text-[#33FF33] text-xs px-2 py-1 h-auto font-mono"
            onClick={toggleLogin}
          >
            <span className="matrix-text">[DEMO: {isLoggedIn ? 'ÇIKIŞ YAP' : 'GİRİŞ YAP'}]</span>
          </Button>
          {isLoggedIn && (
            <div className="text-xs text-[#33FF33] font-mono text-center">
              Giriş yapıldı
            </div>
          )}
        </div>
      </div>
      
      <MatrixMarquee text={marqueeText} />
    </div>
  );
}
