"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MatrixRain, MatrixMarquee, MatrixMarqueeTop, MatrixLoading, MatrixCardControl } from "@/components/ui/matrix-effect";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

// Yorum şeması
const commentSchema = z.object({
  content: z.string().min(3, "Yorum en az 3 karakter olmalıdır"),
});

type CommentForm = z.infer<typeof commentSchema>;

// Veri tipleri
interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

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

// Yorum formu bileşeni
const CommentForm = ({ onSubmit }: { onSubmit: (data: CommentForm) => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });

  const submitComment = (data: CommentForm) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitComment)}>
      <div className="space-y-3">
        <Textarea
          id="content"
          placeholder="Yorumunuzu buraya yazınız..."
          className="h-24 bg-black/80 border-[#33FF33]/60 text-white placeholder:text-[#33FF33]/60 focus:border-[#33FF33] focus:ring-[#33FF33]/50 font-mono resize-none"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-[#9900FF] font-mono">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-end mt-3">
        <Button
          type="submit"
          className="bg-transparent hover:bg-[#33FF33]/10 relative overflow-hidden group border border-[#33FF33] text-[#33FF33] font-mono matrix-text"
          disabled={isSubmitting}
        >
          <span className="relative z-10">{isSubmitting ? "GÖNDERİLİYOR..." : "YORUM GÖNDER"}</span>
          <span className="absolute inset-0 w-0 bg-[#33FF33]/20 transition-all duration-300 group-hover:w-full"></span>
        </Button>
      </div>
    </form>
  );
};

const posts = [

  {

    id: '1',

    title: "Next.js 15 ile SSR performans sorunları",

    description: "Yeni projemde Next.js 15 kullanıyorum ve SSR sayfalarında beklenmedik performans sorunlarıyla karşılaşıyorum. Özellikle ilk yükleme süresi çok uzun. Benzer sorunla karşılaşan veya çözüm önerisi olan var mı?",

    content: `

      <p>Merhaba geliştiriciler,</p>

      

      <p>Son birkaç haftadır Next.js 15 ile yeni bir proje üzerinde çalışıyorum ve SSR (Server Side Rendering) ile ilgili bazı performans sorunlarıyla karşılaşıyorum.</p>

      

      <p>Özellikle ilk yükleme süresi çok uzun ve sayfa geçişlerinde yaklaşık 1-2 saniyelik gecikmeler oluyor. Aynı veri yapısını kullanarak Next.js 13 ile oluşturduğum önceki bir projede bu sorunlar yoktu.</p>

      

      <p>Projede şunları kullanıyorum:</p>

      <ul>

        <li>Next.js 15.0.0</li>

        <li>React 19.0.0</li>

        <li>Tailwind CSS</li>

        <li>SWR veri çekme için</li>

      </ul>

      

      <p>getServerSideProps kullanarak veri çekiyorum ve Redux ile state yönetimi yapıyorum. Lighthouse testlerinde performans puanı 65 civarında, bu da oldukça düşük.</p>

      

      <p>Denediğim çözümler:</p>

      <ul>

        <li>Resimleri optimize ettim</li>

        <li>Bundle boyutunu azaltmak için code splitting kullandım</li>

        <li>CDN üzerinden asset'leri servis ediyorum</li>

        <li>Cache stratejileri uyguladım</li>

      </ul>

      

      <p>Ancak yine de performans problemim devam ediyor. Benzer bir sorunla karşılaşan veya etkili bir çözüm bulan var mı?</p>

    `,

    author: "Ahmet Yılmaz",

    likes: 24,

    comments: [

      { id: 1, author: "Mehmet Demir", content: "Ben de benzer sorunlar yaşadım. React Query kullanmayı deneyebilirsin, SWR yerine daha iyi performans aldım.", date: "2 saat önce" },

      { id: 2, author: "Zeynep Kaya", content: "getStaticProps ve Incremental Static Regeneration kullanmayı denedin mi? SSR yerine bu yöntemler daha hızlı olabilir senin kullanım senaryonda.", date: "1 saat önce" }

    ],

    createdAt: "2 saat önce",

    tag: "Next.js",

    color: "bg-blue-900/30"

  },

  {

    id: '2',

    title: "Tailwind CSS best practices",

    description: "Uzun süredir Tailwind CSS kullanıyorum ancak büyük projelerde stil yönetimi zorlaşıyor. Ekip olarak kullandığınız best practice'ler nelerdir? Özellikle component'lerde stil tekrarını nasıl önlüyorsunuz?",

    content: `

      <p>Selam,</p>

      

      <p>Yaklaşık 2 yıldır Tailwind CSS kullanıyorum ve genel olarak çok memnunum. Ancak şu anda 50+ geliştirici ile çalıştığımız büyük bir projede bazı zorluklar yaşıyoruz.</p>

      

      <p>En büyük sorunumuz stil tekrarı. Benzer componentlerde tekrar tekrar aynı sınıf adlarını kullanmak durumunda kalıyoruz ve bu kod tekrarına yol açıyor. Ayrıca tutarlılığı sağlamak da giderek zorlaşıyor.</p>

      

      <p>Şu anda uyguladığımız bazı yaklaşımlar:</p>

      <ul>

        <li>@apply direktifini kullanarak özel CSS sınıfları oluşturma</li>

        <li>theme ve tailwind.config.js dosyasında özelleştirmeler</li>

        <li>Reusable component mantığı</li>

      </ul>

      

      <p>Ancak bunların hepsi ideal değil. Özellikle @apply kullanımı Tailwind'in utility-first yaklaşımına aykırı gibi görünüyor.</p>

      

      <p>Benzer ölçekte projelerde Tailwind CSS kullanan ekipler nasıl bir yaklaşım benimsiyor? Stil tekrarını önlemek, tutarlılığı sağlamak ve geliştirici deneyimini iyileştirmek için önerileriniz nelerdir?</p>

    `,

    author: "Zeynep Kaya",

    likes: 42,

    comments: [

      { id: 1, author: "Ayşe Yıldız", content: "Biz bir design system oluşturduk ve tüm componentleri içinde topladık. Tailwind class'larını bir kere tanımlayıp sonra bu componentleri kullanıyoruz.", date: "3 saat önce" },

      { id: 2, author: "Murat Şahin", content: "Tailwind Merge ve clsx kütüphanelerini kullanabilirsin. Conditional styling için çok faydalı oluyorlar ve kod tekrarını azaltıyorlar.", date: "2 saat önce" }

    ],

    createdAt: "5 saat önce",

    tag: "CSS",

    color: "bg-pink-900/30"

  },

  {

    id: '3',

    title: "TypeScript type narrowing teknikleri",

    description: "TypeScript ile kompleks tip tanımlamalarında zorlanıyorum. Özellikle union tiplerde type narrowing yaparken verimli yaklaşımlar nelerdir? Kod tabanınızda kullandığınız pattern'ler var mı?",

    content: `

      <p>Merhaba arkadaşlar,</p>

      

      <p>TypeScript'te type narrowing (tip daraltma) konusunda zorlanıyorum ve bu konuda best practice'leri öğrenmek istiyorum.</p>

      

      <p>Özellikle union tiplerle çalışırken type narrowing nasıl en verimli şekilde yapılabilir? Şöyle bir örnek düşünün:</p>

      

      <pre><code>

type User = {

  type: 'user';

  name: string;

  email: string;

};

type Admin = {

  type: 'admin';

  name: string;

  permissions: string[];

};

type Person = User | Admin;

function handlePerson(person: Person) {

  

}

      </code></pre>

      

      <p>Şu anda genellikle tip bekçileri (type guards) kullanıyorum:</p>

      

      <pre><code>

function isAdmin(person: Person): person is Admin {

  return person.type === 'admin';

}

      </code></pre>

      

      <p>Ancak bu yaklaşım kod tabanında çok fazla type guard fonksiyonu oluşturmama neden oluyor.</p>

      

      <p>Daha karmaşık veri yapılarında ve iç içe union tiplerde daha etkili narrowing teknikleri var mı? Deneyimlerinizi paylaşırsanız çok sevinirim.</p>

    `,

    author: "Mehmet Demir",

    likes: 18,

    comments: [

      { id: 1, author: "Cem Yılmaz", content: "Discriminated unions kullanmak en temiz çözüm. Her tipin ayırt edici bir özelliği olması önemli.", date: "5 saat önce" },

      { id: 2, author: "Deniz Kaya", content: "TypeScript 4.5+ ile gelen 'as const' notasyonu ve 'satisfies' operatörü tip güvenliğini artırmada çok yardımcı oluyor.", date: "4 saat önce" }

    ],

    createdAt: "1 gün önce",

    tag: "TypeScript",

    color: "bg-purple-900/30"

  },

];

const AuthButtons = () => (

  <div className="flex justify-center space-x-3 my-8">

    <Link href="/login">

      <Button 

        className="font-mono relative retro-border overflow-hidden bg-transparent hover:bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] retro-text"

      >

        <span className="relative z-10">GİRİŞ</span>

      </Button>

    </Link>

    <Link href="/register">

      <Button 

        className="font-mono relative retro-border-pink overflow-hidden bg-transparent hover:bg-[#ff00ff]/10 border border-[#ff00ff] text-[#ff00ff] retro-text-pink"

      >

        <span className="relative z-10">KAYIT OL</span>

      </Button>

    </Link>

  </div>

);

export default function PostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  // Gönderi durumu için state
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Kullanıcı oturum durumunu simüle ediyoruz (gerçek projede backend ile kontrol edilir)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Yerel yorumlar state'i
  const [comments, setComments] = useState<Comment[]>([]);

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
    
    // Lorem ipsum paragrafları
    const loremParagraphs = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, finibus purus in, convallis odio. Nullam ut dui porta, finibus libero quis, posuere lacus.",
      "Phasellus at dolor a nibh eleifend rhoncus. Proin feugiat varius sagittis. Integer viverra elit a nisi vulputate, vel luctus odio egestas. Suspendisse potenti.",
      "Cras tempus justo eget metus convallis, ut condimentum nisi rutrum. Duis finibus tellus nec lacus tempor, vel hendrerit lacus fermentum. Nulla facilisi.",
      "Quisque ultrices fringilla nisl ut tincidunt. Mauris id tincidunt quam, a luctus eros. Phasellus euismod pulvinar elit, nec finibus lectus porttitor non."
    ];
    
    // Random içerik oluştur - 2-4 paragraf arası
    const paragraphCount = Math.floor(Math.random() * 3) + 2;
    let content = '';
    for (let i = 0; i < paragraphCount; i++) {
      const randomParagraph = loremParagraphs[Math.floor(Math.random() * loremParagraphs.length)];
      content += `<p>${randomParagraph}</p>`;
    }
    
    // Random yorumlar oluştur - 0-5 yorum arası
    const randomCommentCount = Math.floor(Math.random() * 6);
    const randomComments: Comment[] = [];
    
    for (let i = 0; i < randomCommentCount; i++) {
      randomComments.push({
        id: i + 1,
        author: authors[Math.floor(Math.random() * authors.length)],
        content: loremParagraphs[Math.floor(Math.random() * loremParagraphs.length)].substring(0, 100) + "...",
        date: `${Math.floor(Math.random() * 24)} saat önce`
      });
    }
    
    return {
      id: postId,
      title: randomTitle,
      description: loremParagraphs[0].substring(0, 150) + "...",
      content: content,
      author: randomAuthor,
      likes: Math.floor(Math.random() * 100),
      comments: randomComments,
      createdAt: `${Math.floor(Math.random() * 7) + 1} gün önce`,
      tag: randomTag,
      color: randomColor
    };
  };

  // Veri yükleme
  useEffect(() => {
    // Tarayıcı tarafında olduğunu kontrol et (localStorage için gerekli)
    if (typeof window === 'undefined') return;
    
    // Oturum durumunu yerel depolamadan al
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      setIsLoggedIn(storedLoginState === 'true');
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

  // Yorum gönderme işlevi
  const handleCommentSubmit = (data: CommentForm) => {
    if (!post) return;
    
    const newComment: Comment = {
      id: comments.length + 1,
      author: "Demo Kullanıcı", // Backend bağlandığında gerçek kullanıcı bilgisi gelecek
      content: data.content,
      date: "Şimdi"
    };
    
    const newComments = [...comments, newComment];
    setComments(newComments);
    
    // Yerel depolamayı güncelleyelim
    const storedPosts = localStorage.getItem('posts');
    let localPosts: Post[] = [];
    if (storedPosts) {
      try {
        localPosts = JSON.parse(storedPosts);
      } catch (error) {
        console.error('Stored posts parse error:', error);
      }
    }
    
    // Post değişkeni burada null olmayacak, çünkü başta kontrol ettik (if (!post) return)
    // Ancak TypeScript bunu bilmiyor, bu yüzden post değişkeninin null olmadığını kesin olarak belirtiyoruz
    const currentPost = post as Post; // TypeScript'e post'un null olmadığını açıkça belirtiyoruz
    
    // Post'un güncel halini oluşturalım
    const updatedPost = {...currentPost, comments: newComments};
    
    // Eğer post yerel depolamada varsa güncelleyelim, yoksa ekleyelim
    const postIndex = localPosts.findIndex((p: Post) => p.id === currentPost.id);
    if (postIndex !== -1) {
      localPosts[postIndex] = updatedPost;
    } else {
      localPosts.push(updatedPost);
    }
    
    // Güncellenmiş post listesini yerel depolamaya kaydedelim
    localStorage.setItem('posts', JSON.stringify(localPosts));
    
    // Backend bağlandığında burada API çağrısı yapılacak
    console.log("Yorum gönderildi:", newComment);
  };
  
  // Giriş/çıkış demo işlevi
  const toggleLogin = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    // Oturum durumunu yerel depolamaya kaydet
    localStorage.setItem('isLoggedIn', String(newState));
  };
  
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

          {/* Demo login butonu - gerçek projede silinecek */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#ff9900] bg-black/80 text-[#ff9900] hover:bg-[#ff9900]/20 font-mono retro-text-orange"
              onClick={toggleLogin}
            >
              [ {isLoggedIn ? 'ÇIKIŞ YAP' : 'DEMO GİRİŞ'} ]
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
                    className="flex items-center gap-2 text-[#33FF33] hover:text-[#33FF33] hover:bg-[#33FF33]/10 font-mono"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{post.likes} Beğeni</span>
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
            <h2 className="text-center text-2xl text-[#33FF33] font-mono px-4 retro-text">YORUMLAR ({comments.length})</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#33FF33]/50 to-transparent"></div>
          </div>
        </div>
        
        {/* Yorum formu - oturum açılmışsa göster */}
        {isLoggedIn && (
          <MatrixCardControl className="mb-8 p-6">
            <h3 className="text-lg text-[#33FF33] font-mono mb-3 retro-text">YORUM YAZ</h3>
            <CommentForm onSubmit={handleCommentSubmit} />
          </MatrixCardControl>
        )}
        
        {/* Yorumlar */}
        <div className="space-y-4 mb-8">
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentMatrixCard key={comment.id} className="bg-opacity-70 mb-4 p-0 retro-glitch">
                <CardHeader className="pb-2 p-4">
                  <div className="flex justify-between">
                    <div className="font-medium text-[#9900FF] retro-text-pink font-mono">{comment.author}</div>
                    <div className="text-xs text-[#33FF33]/70 font-mono">{comment.date}</div>
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
        
        {/* Giriş yapmamış kullanıcılar için */}
        {!isLoggedIn && (
          <MatrixCardControl className="mb-8 p-6">
            <div className="text-[#33FF33] font-mono text-lg mb-4 retro-text">YORUM YAPMAK İÇİN GİRİŞ YAPMANIZ GEREKİYOR</div>
            
            <div className="flex space-x-4">
              <Link href="/login">
                <Button 
                  className="bg-transparent hover:bg-[#33FF33]/10 relative overflow-hidden group border border-[#33FF33] text-[#33FF33] font-mono matrix-text"
                >
                  <span className="relative z-10">[ GİRİŞ YAP ]</span>
                  <span className="absolute inset-0 w-0 bg-[#33FF33]/20 transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  className="bg-transparent hover:bg-[#9900FF]/10 relative overflow-hidden group border border-[#9900FF] text-[#9900FF] font-mono retro-text-pink"
                >
                  <span className="relative z-10">[ KAYIT OL ]</span>
                  <span className="absolute inset-0 w-0 bg-[#9900FF]/20 transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </Link>
            </div>
          </MatrixCardControl>
        )}
        
        <div className="text-center mt-12 text-sm text-[#33FF33] animate-pulse-slow font-mono">
          © 2024 DEVFEEDBACK.SYS 
        </div>
      </div>
      
      <MatrixMarquee text={marqueeText} />
    </div>
  );
} 