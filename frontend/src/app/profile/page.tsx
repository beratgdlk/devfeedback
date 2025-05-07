"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { usePostStore, Post } from "@/lib/post-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MatrixRain } from "@/components/ui/matrix-effect";
import { userAPI, postAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  likedPosts?: Post[];
  posts?: Post[];
}

export default function ProfilePage() {
  const { user, checkAuth, logout } = useAuthStore();
  const { posts } = usePostStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "liked">("posts");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Kullanıcı oturum durumunu kontrol et
        await checkAuth();
        
        if (!user) {
          router.push('/login');
          return;
        }
        
        // Kullanıcı profil bilgilerini getir
        const profileResponse = await userAPI.getUser(user.id);
        setUserProfile(profileResponse.data);
        
        // Kullanıcının gönderilerini getir
        const userPostsResponse = await postAPI.getUserPosts(user.id);
        setUserPosts(userPostsResponse.data || []);
        
        // Kullanıcının beğendiği gönderileri getir
        const likedPostsResponse = await postAPI.getLikedPosts();
        setLikedPosts(likedPostsResponse.data || []);
        
      } catch (error) {
        console.error("Profil yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, checkAuth, router]);

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      <MatrixRain />
      
      <div className="container mx-auto z-20 relative">
        <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl border-2 border-[#33FF33]/50 shadow-[0_0_15px_rgba(51,255,51,0.3)] max-w-4xl mx-auto">
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-[#33FF33]/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-[#33FF33]/20 rounded mb-2"></div>
                <div className="h-3 w-24 bg-[#33FF33]/20 rounded"></div>
              </div>
            </div>
          ) : userProfile ? (
            <>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-[#33FF33]/20 rounded-full mb-4 flex items-center justify-center border-2 border-[#33FF33]/50">
                    {userProfile.avatar ? (
                      <img 
                        src={userProfile.avatar} 
                        alt={userProfile.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-[#33FF33]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-[#33FF33] font-mono mb-1">{userProfile.name}</h1>
                  <p className="text-gray-400 font-mono mb-4">{userProfile.email}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#9900FF] bg-black/80 text-[#9900FF] hover:bg-[#9900FF]/20 font-mono"
                    >
                      DÜZENLE
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={logout}
                      className="border-red-500 bg-black/80 text-red-500 hover:bg-red-500/20 font-mono"
                    >
                      ÇIKIŞ YAP
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div className="bg-black/50 p-4 rounded-lg border border-[#33FF33]/30">
                      <p className="text-2xl font-bold text-[#33FF33] font-mono">{userPosts.length}</p>
                      <p className="text-gray-400 font-mono">GÖNDERİ</p>
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg border border-[#33FF33]/30">
                      <p className="text-2xl font-bold text-[#9900FF] font-mono">{likedPosts.length}</p>
                      <p className="text-gray-400 font-mono">BEĞENİ</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 p-4 rounded-lg border border-[#33FF33]/30">
                    <h3 className="text-lg font-bold text-[#33FF33] font-mono mb-2">HESAP BİLGİLERİ</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">KULLANICI ID:</span>
                        <span className="text-white font-mono">{userProfile.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">YETKİ:</span>
                        <span className="text-white font-mono">{userProfile.role === "ADMIN" ? "YÖNETİCİ" : "KULLANICI"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">HESAP DURUMU:</span>
                        <span className="text-green-500 font-mono">AKTİF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex border-b border-[#33FF33]/30">
                  <button
                    className={`py-2 px-4 font-mono ${activeTab === "posts" ? "text-[#33FF33] border-b-2 border-[#33FF33]" : "text-gray-400"}`}
                    onClick={() => setActiveTab("posts")}
                  >
                    GÖNDERİLERİM
                  </button>
                  <button
                    className={`py-2 px-4 font-mono ${activeTab === "liked" ? "text-[#9900FF] border-b-2 border-[#9900FF]" : "text-gray-400"}`}
                    onClick={() => setActiveTab("liked")}
                  >
                    BEĞENDİKLERİM
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {activeTab === "posts" ? (
                  userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <div key={post.id} className="bg-black/50 p-4 rounded-lg border border-[#33FF33]/30 hover:border-[#33FF33] transition-all">
                        <Link href={`/posts/${post.id}`}>
                          <h3 className="text-lg font-bold text-[#33FF33] font-mono mb-1">{post.title}</h3>
                          <p className="text-gray-400 font-mono text-sm mb-2">{post.description.substring(0, 100)}...</p>
                          <div className="flex justify-between items-center">
                            <span className="bg-[#33FF33]/20 text-[#33FF33] text-xs font-mono px-2 py-1 rounded">{post.tag}</span>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-400 font-mono flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                {post._count.comments}
                              </span>
                              <span className="text-gray-400 font-mono flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {post._count.likes}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 font-mono mb-4">Henüz gönderi oluşturmadınız.</p>
                      <Button 
                        asChild
                        className="bg-[#33FF33] hover:bg-[#33FF33]/80 text-black font-bold font-mono"
                      >
                        <Link href="/create-post">YENİ GÖNDERİ OLUŞTUR</Link>
                      </Button>
                    </div>
                  )
                ) : (
                  likedPosts.length > 0 ? (
                    likedPosts.map((post) => (
                      <div key={post.id} className="bg-black/50 p-4 rounded-lg border border-[#9900FF]/30 hover:border-[#9900FF] transition-all">
                        <Link href={`/posts/${post.id}`}>
                          <h3 className="text-lg font-bold text-[#9900FF] font-mono mb-1">{post.title}</h3>
                          <p className="text-gray-400 font-mono text-sm mb-2">{post.description.substring(0, 100)}...</p>
                          <div className="flex justify-between items-center">
                            <span className="bg-[#9900FF]/20 text-[#9900FF] text-xs font-mono px-2 py-1 rounded">{post.tag}</span>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-gray-400 font-mono">Yazar: {post.author.name}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 font-mono mb-4">Henüz beğendiğiniz gönderi bulunmamaktadır.</p>
                      <Button 
                        asChild
                        className="bg-[#33FF33] hover:bg-[#33FF33]/80 text-black font-bold font-mono"
                      >
                        <Link href="/">GÖNDERİLERİ KEŞFET</Link>
                      </Button>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mono mb-4">Oturum açmanız gerekiyor.</p>
              <Button 
                asChild
                className="bg-[#ff9900] hover:bg-[#ff9900]/80 text-white font-bold font-mono"
              >
                <Link href="/login">GİRİŞ YAP</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 