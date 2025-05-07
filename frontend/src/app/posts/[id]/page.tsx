import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Retro SVG Grid Pattern
const RetroGridPattern = () => (
  <div className="absolute inset-0 -z-10 retro-grid opacity-30">
    <div className="h-full w-full"></div>
  </div>
);

// Synthwave Sun
const SynthwaveSun = () => (
  <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 -z-10">
    <div className="w-[800px] h-[400px] rounded-t-full bg-gradient-to-t from-[#ff00ff] via-[#ff6a00] to-[#ffef00] opacity-10"></div>
  </div>
);

// Blobs
const RetroBlobs = () => (
  <div className="absolute inset-0 -z-5 overflow-hidden">
    <div className="absolute -top-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-[#ff00ff] opacity-10 blur-3xl"></div>
    <div className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-[#00ffff] opacity-10 blur-3xl"></div>
  </div>
);

// Örnek veri
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
  // Burada person'ın tipine göre farklı işlemler yapmak istiyorum
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

// Retro bant komponenti
const RetroBand = () => (
  <div className="w-full bg-black py-2 relative overflow-hidden retro-scanlines border-t border-b border-[#00ffff]">
    <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">
      <span className="text-[#00ffff] retro-text px-4 font-mono text-sm">
        DEV FEEDBACK - YAZILIMCI GERİ BİLDİRİM PLATFORMU * 
        TÜM YAZILIMCILAR İÇİN PAYLAŞIM ORTAMI * 
        SORULARINIZI PAYLAŞIN, CEVAPLAR ALIN * 
        YAZILIM GELİŞTİRME TOPLULUĞUNA KATILIN * 
        NEXT.JS * REACT * VUE * ANGULAR * NODE * 
        DEV FEEDBACK - YAZILIMCI GERİ BİLDİRİM PLATFORMU * 
        TÜM YAZILIMCILAR İÇİN PAYLAŞIM ORTAMI * 
        SORULARINIZI PAYLAŞIN, CEVAPLAR ALIN * 
        YAZILIM GELİŞTİRME TOPLULUĞUNA KATILIN * 
        NEXT.JS * REACT * VUE * ANGULAR * NODE *
      </span>
    </div>
  </div>
);

// Auth buttons komponenti
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

// Server component olarak düzenliyoruz
export default function PostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const post = posts.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center synthwave-bg retro-scanlines relative overflow-hidden">
        <RetroGridPattern />
        <RetroBlobs />
        <RetroBand />
        <AuthButtons />
        
        <Card className="w-full max-w-md shadow-lg border-[#00ffff] retro-border bg-black/80 backdrop-blur-sm animate-fadeInUp retro-crt">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white retro-text">404 ERR0R</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Gönderi Bulunamadı: ID#{id} veritabanında yer almıyor
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-transparent border border-[#00ffff] text-[#00ffff] retro-text hover:bg-[#00ffff]/10 retro-border">
              <Link href="/">[ ANA SAYFAYA DÖN ]</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen synthwave-bg retro-scanlines py-12 px-4 relative overflow-hidden">
      <RetroGridPattern />
      <SynthwaveSun />
      <RetroBlobs />
      <RetroBand />
      <AuthButtons />
      
      <div className="max-w-3xl mx-auto relative mt-8">
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="border-[#00ffff] bg-black/60 text-[#00ffff] hover:bg-[#00ffff]/20 font-mono retro-text"
          >
            <Link href="/">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              [BACK]
            </Link>
          </Button>
        </div>
        
        <Card className="border-[#00ffff] retro-border bg-black/70 backdrop-blur-sm shadow-lg animate-fadeInUp overflow-hidden retro-crt">
          <div className={`h-1 ${post.color} animate-pulse-slow`}></div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full ${post.color} text-black font-mono`}>
                <span className="font-bold">{post.tag}</span>
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-[#00ffff] retro-text">{post.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-slate-400 font-mono">
              <span>{post.author}</span>
              <span className="retro-blink">●</span>
              <span>{post.createdAt}</span>
            </div>
          </CardHeader>
          <CardContent className="prose prose-invert prose-slate max-w-none">
            <div className="font-mono" dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-[#00ffff]/50 pt-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff] hover:bg-[#00ffff]/10 font-mono"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{post.likes} Beğeni</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-[#ff00ff] hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 font-mono"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments.length} Yorum</span>
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-[#00ff00]/30 text-[#00ff00] retro-text-green hover:bg-[#00ff00]/10 hover:border-[#00ff00]/80 font-mono"
              >
                PAYLAŞ
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Yorumlar Bölümü */}
        <h3 className="text-xl font-bold text-[#00ffff] retro-text mt-8 mb-4 font-mono">_YORUMLAR: {post.comments.length}</h3>
        
        <div className="space-y-4 mb-8">
          {post.comments.map(comment => (
            <Card key={comment.id} className="border-[#ff00ff]/50 bg-black/60 backdrop-blur-sm retro-border-pink retro-glitch">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="font-medium text-[#ff00ff] retro-text-pink font-mono">{comment.author}</div>
                  <div className="text-xs text-slate-400 font-mono">{comment.date}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 font-mono">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Retro terminal yorum bölümü */}
        <div className="retro-terminal mb-8 font-mono">
          <div className="mb-3 text-[#33FF33]">YORUM YAPMAK İÇİN GİRİŞ YAPMANIZ GEREKİYOR</div>
          
          <div className="flex space-x-3 mt-4">
            <Link href="/login">
              <Button 
                className="bg-transparent hover:bg-[#33FF33]/20 border border-[#33FF33] text-[#33FF33]"
              >
                _GİRİŞ_YAP
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                className="bg-transparent hover:bg-[#33FF33]/20 border border-[#33FF33] text-[#33FF33]"
              >
                _KAYIT_OL
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center font-mono text-xs text-[#00ffff] mt-12 animate-pulse-slow">
          © 2024 DEVFEEDBACK.SYS // RUN v1.0.1 // ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
} 