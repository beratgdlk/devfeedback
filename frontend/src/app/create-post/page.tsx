"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostForm } from "@/components/CreatePostForm";
import { useAuthStore } from "@/lib/auth-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MatrixRain } from "@/components/ui/matrix-effect";

export default function CreatePostPage() {
  const { user, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturum durumunu kontrol et
    checkAuth();
    
    // Kullanıcı giriş yapmadıysa login sayfasına yönlendir
    if (!user) {
      router.push('/login');
    }
  }, [user, checkAuth, router]);

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      <MatrixRain />
      
      <div className="w-full max-w-4xl mx-auto z-20 relative">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="border-[#33FF33] bg-black/80 text-[#33FF33] hover:bg-[#33FF33]/20 font-mono retro-text mb-4 transition-all duration-300 hover:shadow-[0_0_8px_rgba(51,255,51,0.5)] hover:scale-105"
          >
            <Link href="/">
              <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              [ ANA SAYFA ]
            </Link>
          </Button>
        </div>
        
        <CreatePostForm />
      </div>
    </div>
  );
} 