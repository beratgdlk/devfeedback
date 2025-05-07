"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MatrixRain, MatrixMarquee, MatrixMarqueeTop, MatrixLoading, MatrixCardControl } from "@/components/ui/matrix-effect";
import { useState, useEffect } from "react";
import { useMatrixStore, Comment } from "@/lib/matrix-store";

// Veri tipleri
interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  tag: string;
  color: string;
}

// Özel yorum kartı bileşeni - buton yok
const CommentMatrixCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`matrix-card relative overflow-hidden rounded-xl shadow-[0_0_25px_rgba(51,255,51,0.3)] border-2 border-[#33FF33]/50 ${className || ''}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MatrixRain contained={true} />
      </div>
      
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-1"></div>
      
      <div className="matrix-card-content relative z-10">
        {children}
      </div>
    </div>
  );
};

const posts = [
  {
    id: '1',
    title: "Next.js 15 ile SSR performans sorunları",
    description: "Yeni projemde Next.js 15 kullanıyorum ve SSR sayfalarında beklenmedik performans sorunlarıyla karşılaşıyorum. Özellikle ilk yükleme süresi çok uzun. Benzer sorunla karşılaşan veya çözüm önerisi olan var mı?",
    content: `<p>Merhaba geliştiriciler,</p><p>Son birkaç haftadır Next.js 15 ile yeni bir proje üzerinde çalışıyorum ve SSR (Server Side Rendering) ile ilgili bazı performans sorunlarıyla karşılaşıyorum.</p><p>Özellikle ilk yükleme süresi çok uzun ve sayfa geçişlerinde yaklaşık 1-2 saniyelik gecikmeler oluyor. Aynı veri yapısını kullanarak Next.js 13 ile oluşturduğum önceki bir projede bu sorunlar yoktu.</p>`,
    author: "Ahmet Yılmaz",
    likes: 24,
    comments: [
      { id: 1, author: "Mehmet Demir", content: "Ben de benzer sorunlar yaşadım. React Query kullanmayı deneyebilirsin, SWR yerine daha iyi performans aldım.", date: "2 saat önce" }
    ],
    createdAt: "2 saat önce",
    tag: "Next.js",
    color: "bg-blue-900/30"
  }
];

const AuthButtons = () => (
  <div className="flex justify-center space-x-3 my-8">
    <Link href="/login">
      <Button className="font-mono relative retro-border overflow-hidden bg-transparent hover:bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] retro-text">
        <span className="relative z-10">GİRİŞ</span>
      </Button>
    </Link>
    <Link href="/register">
      <Button className="font-mono relative retro-border-pink overflow-hidden bg-transparent hover:bg-[#ff00ff]/10 border border-[#ff00ff] text-[#ff00ff] retro-text-pink">
        <span className="relative z-10">KAYIT OL</span>
      </Button>
    </Link>
  </div>
);

// Random post bilgileri oluşturma fonksiyonu
const generateRandomPost = (postId: string): Post => {
  const tags = ["React", "Vue", "Angular", "TypeScript", "JavaScript", "Node.js", "Next.js", "Frontend", "Backend", "CSS"];
  const randomTag = tags[Math.floor(Math.random() * tags.length)];
  
  const colors = [
    "bg-blue-900/30", "bg-green-900/30", "bg-purple-900/30", "bg-red-900/30", 
    "bg-yellow-900/30", "bg-pink-900/30", "bg-indigo-900/30", "bg-emerald-900/30"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const authors = ["Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Zeynep Şahin", "Can Öztürk", "Deniz Yıldız"];
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
  
  const randomTitle = `${randomTag} ile ilgili soru ve sorunlar #${postId}`;
  
  // Random içerik oluştur
  const content = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Nullam eget felis euismod, finibus purus in, convallis odio.</p>`;
  
  // Random yorumlar oluştur
  const randomComments: Comment[] = [
    {
      id: 1,
      author: authors[Math.floor(Math.random() * authors.length)],
      content: "Bu konuda deneyimim var, detaylı bilgi için DM atabilirsin.",
      date: "3 saat önce"
    }
  ];
  
  return {
    id: postId,
    title: randomTitle,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    content: content,
    author: randomAuthor,
    likes: Math.floor(Math.random() * 100),
    comments: randomComments,
    createdAt: `${Math.floor(Math.random() * 7) + 1} gün önce`,
    tag: randomTag,
    color: randomColor
  };
};

export default function PostDetailClient({ id }: { id: string }) {
  const matrixStore = useMatrixStore();
  
  // Gönderi durumu için state
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Yerel yorumlar state'i
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Yorum formu için state
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentTechnology, setCommentTechnology] = useState("");

  // Veri yükleme
  useEffect(() => {
    // Tarayıcı tarafında olduğunu kontrol et (localStorage için gerekli)
    if (typeof window === 'undefined') return;
    
    // Oturum durumunu yerel depolamadan al
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      if (storedLoginState === 'true') {
        matrixStore.login();
      } else {
        matrixStore.logout();
      }
    }
    
    // Önce yerel depolamadaki gönderileri kontrol et
    const storedPosts = localStorage.getItem('posts');
    let localPosts: Post[] = [];
    if (storedPosts) {
      try {
        localPosts = JSON.parse(storedPosts);
      } catch (error) {
        console.error('Stored posts parse error:', error);
      }
    }
    
    // Eğer yerel depolamada yeni oluşturulmuş bir gönderi varsa onu kullan
    const foundStoredPost = localPosts.find((p: Post) => p.id === id);
    
    if (foundStoredPost) {
      setPost(foundStoredPost);
      setComments(foundStoredPost.comments || []);
      setIsLoading(false);
      return;
    }
    
    // Yerel depolamada bulunamadı, sabit veri dizisinde arayalım
    const foundPost = posts.find(p => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      setComments(foundPost.comments || []);
      setIsLoading(false);
      return;
    }
    
    // Bulunamadıysa random bir post oluştur
    const randomPost = generateRandomPost(id);
    setPost(randomPost);
    setComments(randomPost.comments || []);
    
    // Random oluşturulan postu localStorage'a kaydet
    localPosts.push(randomPost);
    localStorage.setItem('posts', JSON.stringify(localPosts));
    
    setIsLoading(false);
  }, [id]);
  
  // Beğeni toggling işlevi
  const handleLikePost = () => {
    if (!post) return;
    
    if (matrixStore.isLoggedIn) {
      matrixStore.toggleLike(post.id);
    }
  };
  
  // Giriş/çıkış demo işlevi
  const toggleLogin = () => {
    const newState = !matrixStore.isLoggedIn;
    if (newState) {
      matrixStore.login();
    } else {
      matrixStore.logout();
    }
    // Oturum durumunu yerel depolamaya kaydet
    localStorage.setItem('isLoggedIn', String(newState));
  };
  
  // Yeni yorum eklemek için fonksiyon
  const handleAddComment = () => {
    if (!commentContent.trim()) return;
    
    const newComment: Comment = {
      id: Date.now(),
      author: "Kullanıcı", // Gerçek bir sistemde kullanıcı adı olacak
      content: commentContent,
      date: "Şimdi",
      title: commentTitle || undefined,
      technology: commentTechnology || undefined
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    // Yeni yorumu localStorage'a kaydet
    if (post) {
      const updatedPost = {...post, comments: updatedComments};
      
      // localStorage'daki postları güncelle
      const storedPosts = localStorage.getItem('posts');
      let localPosts: Post[] = [];
      if (storedPosts) {
        try {
          localPosts = JSON.parse(storedPosts);
          const postIndex = localPosts.findIndex(p => p.id === id);
          if (postIndex !== -1) {
            localPosts[postIndex] = updatedPost;
            localStorage.setItem('posts', JSON.stringify(localPosts));
          }
        } catch (error) {
          console.error('Stored posts parse error:', error);
        }
      }
    }
    
    // Formu temizle ve kapat
    setCommentTitle("");
    setCommentContent("");
    setCommentTechnology("");
    setIsCommentFormOpen(false);
  };
  
  // Teknoloji seçenekleri
  const technologies = ["React", "Vue", "Angular", "TypeScript", "JavaScript", "Node.js", "Next.js", "Frontend", "Backend", "CSS"];
  
  const marqueeText = "DEV FEEDBACK - YAZILIMCI GERİ BİLDİRİM PLATFORMU * TÜM YAZILIMCILAR İÇİN PAYLAŞIM ORTAMI * SORULARINIZI PAYLAŞIN, CEVAPLAR ALIN * ";
  const marqueeTopText = "NEXT.JS * REACT * VUE * ANGULAR * NODE * DEVFEEDBACK.SYS * ÇALIŞTIRılıyor * SİSTEM AKTİF * ";

  if (!post && !isLoading) {
    return (
      <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        <MatrixRain />
        <MatrixMarqueeTop text={marqueeTopText} />
        
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto z-20 relative">
          <MatrixCardControl className="w-full mb-16 p-6">
            <CardHeader className="space-y-1">
              <div className="w-20 h-20 bg-[#ff9900]/20 rounded-xl mx-auto mb-4 flex items-center justify-center retro-border-orange">
                <svg className="w-10 h-10 text-[#ff9900]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold text-center text-[#ff9900] retro-text-orange font-mono">404 ERR0R</CardTitle>
              <CardDescription className="text-center text-[#ff9900]/90 font-mono text-lg">
                Gönderi Bulunamadı: ID#{id} veritabanında yer almıyor
              </CardDescription>
              <MatrixLoading />
            </CardHeader>
            <CardFooter className="flex flex-col gap-4 mt-4">
              <Button
                asChild
                className="w-full h-12 bg-transparent hover:bg-[#ff9900]/10 relative overflow-hidden group border border-[#ff9900] text-[#ff9900] font-mono matrix-text text-lg retro-text-orange"
              >
                <Link href="/">
                  <span className="relative z-10">[ ANA SAYFAYA DÖN ]</span>
                  <span className="absolute inset-0 w-0 bg-[#ff9900]/20 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </Button>
            </CardFooter>
          </MatrixCardControl>
        </div>
        
        <MatrixMarquee text={marqueeText} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        <MatrixRain />
        <MatrixMarqueeTop text={marqueeTopText} />
        
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto z-20 relative">
          <MatrixCardControl className="w-full mb-16 p-6">
            <div className="flex flex-col items-center">
              <MatrixLoading />
              <p className="text-[#33FF33] font-mono text-lg mt-4">VERİ YÜKLENİYOR...</p>
            </div>
          </MatrixCardControl>
        </div>
        
        <MatrixMarquee text={marqueeText} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      <MatrixRain />
      
      <MatrixMarqueeTop text={marqueeTopText} />
      
      <div className="max-w-4xl mx-auto relative mt-8 mb-20 z-20">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="border-[#ff9900] bg-black/80 text-[#ff9900] hover:bg-[#ff9900]/20 font-mono retro-text-orange"
          >
            <Link href="/">
              <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              [ ANA SAYFA ]
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#ff9900] bg-black/80 text-[#ff9900] hover:bg-[#ff9900]/20 font-mono retro-text-orange"
              onClick={toggleLogin}
            >
              [ {matrixStore.isLoggedIn ? 'ÇIKIŞ YAP' : 'DEMO GİRİŞ'} ]
            </Button>
            <AuthButtons />
          </div>
        </div>
        
        {post && (
          <MatrixCardControl className="mb-8">
            <div className={`h-1 ${post.color} animate-pulse-slow`}></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${post.color} text-white font-mono font-bold`}>
                  <span>{post.tag}</span>
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-[#33FF33] retro-text font-mono">{post.title}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-[#33FF33]/80 font-mono">
                <span>{post.author}</span>
                <span className="retro-blink">●</span>
                <span>{post.createdAt}</span>
              </div>
            </CardHeader>
            <CardContent className="prose prose-invert prose-slate max-w-none">
              <div className="font-mono text-white/90" dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t border-[#33FF33]/30 pt-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLikePost}
                    disabled={!matrixStore.isLoggedIn}
                    className={`flex items-center gap-2 ${
                      matrixStore.isPostLiked(post.id) 
                        ? 'text-[#ff9900] hover:text-[#ff9900] hover:bg-[#ff9900]/10' 
                        : 'text-[#33FF33] hover:text-[#33FF33] hover:bg-[#33FF33]/10'
                    } font-mono`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{post.likes + (matrixStore.isPostLiked(post.id) ? 1 : 0)} Beğeni</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2 text-[#9900FF] hover:text-[#9900FF] hover:bg-[#9900FF]/10 font-mono"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{comments.length} Yorum</span>
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#ff9900]/30 text-[#ff9900] retro-text-orange hover:bg-[#ff9900]/10 hover:border-[#ff9900]/80 font-mono"
                >
                  PAYLAŞ
                </Button>
              </div>
            </CardFooter>
          </MatrixCardControl>
        )}
        
        <div className="mb-6 mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#33FF33]/50 to-transparent"></div>
            <h2 
              className="text-center text-2xl text-[#33FF33] font-mono px-4 retro-text cursor-pointer hover:text-[#33FF33]/80"
              onClick={() => matrixStore.isLoggedIn && setIsCommentFormOpen(!isCommentFormOpen)}
              title={matrixStore.isLoggedIn ? "Yorum yapmak için tıklayın" : "Yorum yapmak için giriş yapmalısınız"}
            >
              YORUMLAR ({comments.length})
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#33FF33]/50 to-transparent"></div>
          </div>
        </div>
        
        {matrixStore.isLoggedIn && isCommentFormOpen && (
          <MatrixCardControl className="mb-8 p-6">
            <div className="text-[#33FF33] font-mono text-lg mb-4 retro-text">YENİ YORUM EKLE</div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[#33FF33] font-mono mb-2 block">Başlık:</label>
                <input 
                  type="text" 
                  value={commentTitle} 
                  onChange={(e) => setCommentTitle(e.target.value)} 
                  className="w-full bg-black/70 border border-[#33FF33]/50 focus:border-[#33FF33] text-white font-mono p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#33FF33]"
                  placeholder="Yorumunuz için başlık ekleyin (opsiyonel)"
                />
              </div>
              
              <div>
                <label className="text-[#33FF33] font-mono mb-2 block">Teknoloji:</label>
                <select 
                  value={commentTechnology} 
                  onChange={(e) => setCommentTechnology(e.target.value)}
                  className="w-full bg-black/70 border border-[#33FF33]/50 focus:border-[#33FF33] text-white font-mono p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#33FF33]"
                >
                  <option value="">Teknoloji Seçin (opsiyonel)</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-[#33FF33] font-mono mb-2 block">Yorum:</label>
                <textarea 
                  value={commentContent} 
                  onChange={(e) => setCommentContent(e.target.value)} 
                  className="w-full h-32 bg-black/70 border border-[#33FF33]/50 focus:border-[#33FF33] text-white font-mono p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#33FF33]"
                  placeholder="Yorumunuzu buraya yazın..."
                />
              </div>
              
              <div className="flex justify-between">
                <Button 
                  onClick={() => setIsCommentFormOpen(false)}
                  className="bg-transparent hover:bg-[#ff9900]/10 border border-[#ff9900] text-[#ff9900] font-mono"
                >
                  İPTAL
                </Button>
                
                <Button 
                  onClick={handleAddComment}
                  disabled={!commentContent.trim()}
                  className="bg-transparent hover:bg-[#33FF33]/10 border border-[#33FF33] text-[#33FF33] font-mono"
                >
                  YORUM EKLE
                </Button>
              </div>
            </div>
          </MatrixCardControl>
        )}
        
        <div className="space-y-4 mb-8">
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentMatrixCard key={comment.id} className="bg-opacity-70 mb-4 p-0 retro-glitch">
                <CardHeader className="pb-2 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#33FF33] retro-text font-mono mb-1">
                        {comment.title || "Yorum"}
                      </h4>
                      <div className="font-medium text-[#9900FF] retro-text-pink font-mono">{comment.author}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-[#33FF33]/70 font-mono">{comment.date}</div>
                      {comment.technology && (
                        <span className="text-xs px-2 py-1 mt-1 rounded-full bg-purple-900/30 text-white font-mono">
                          {comment.technology}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-white/90 font-mono">{comment.content}</p>
                </CardContent>
              </CommentMatrixCard>
            ))
          ) : (
            <div className="text-center p-4 border border-[#33FF33]/30 rounded-xl bg-black/50">
              <p className="text-[#33FF33] font-mono matrix-text">HENÜZ YORUM BULUNMUYOR</p>
            </div>
          )}
        </div>
        
        {!matrixStore.isLoggedIn && (
          <MatrixCardControl className="mb-8 p-6">
            <div className="text-[#33FF33] font-mono text-lg mb-4 retro-text">YORUM YAPMAK İÇİN GİRİŞ YAPMANIZ GEREKİYOR</div>
            
            <div className="flex space-x-4">
              <Button 
                className="bg-transparent hover:bg-[#33FF33]/10 relative overflow-hidden group border border-[#33FF33] text-[#33FF33] font-mono matrix-text"
                onClick={toggleLogin}
              >
                <span className="relative z-10">[ DEMO GİRİŞ YAP ]</span>
                <span className="absolute inset-0 w-0 bg-[#33FF33]/20 transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </div>
          </MatrixCardControl>
        )}
        
        {matrixStore.isLoggedIn && !isCommentFormOpen && (
          <div className="flex justify-center mb-8">
            <Button 
              onClick={() => setIsCommentFormOpen(true)}
              className="bg-transparent hover:bg-[#33FF33]/10 border border-[#33FF33] text-[#33FF33] font-mono"
            >
              YENİ YORUM EKLE
            </Button>
          </div>
        )}
        
        <div className="text-center mt-12 text-sm text-[#33FF33] animate-pulse-slow font-mono">
          © 2024 DEVFEEDBACK.SYS 
        </div>
      </div>
      
      <MatrixMarquee text={marqueeText} />
    </div>
  );
}
