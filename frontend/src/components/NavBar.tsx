"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth-store";

export function NavBar() {
  const { user, logout, checkAuth } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  // Oturum durumunu kontrol et
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Scroll durumunu izle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className={`fixed top-[calc(0.5rem*2+1rem)] left-0 right-0 z-50 transition-all duration-300 py-3 px-4 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(51,255,51,0.2)]" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-[#33FF33] font-mono text-xl font-bold tracking-widest">
            DEV<span className="text-[#9900FF]">FEEDBACK</span>
          </span>
        </Link>
        
        <div className="space-x-2 flex items-center">
          {user ? (
            <>
              <Link href="/create-post">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#33FF33] bg-black/80 text-[#33FF33] hover:bg-[#33FF33]/20 font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(51,255,51,0.5)]"
                >
                  <svg 
                    className="w-4 h-4 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  YENİ GÖNDERİ
                </Button>
              </Link>
              
              <div className="relative group">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#9900FF] bg-black/80 text-[#9900FF] hover:bg-[#9900FF]/20 font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(153,0,255,0.5)]"
                >
                  <svg 
                    className="w-4 h-4 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {user.name || 'KULLANICI'}
                </Button>
                
                <div className="absolute right-0 mt-2 w-48 bg-black border border-[#9900FF]/50 rounded-md shadow-lg overflow-hidden transform scale-0 group-hover:scale-100 transition-transform duration-200 origin-top-right z-50">
                  <div className="py-2">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-[#9900FF] hover:bg-[#9900FF]/20 font-mono"
                    >
                      PROFİL
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 font-mono"
                    >
                      ÇIKIŞ YAP
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#ff9900] bg-black/80 text-[#ff9900] hover:bg-[#ff9900]/20 font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,153,0,0.5)]"
                >
                  GİRİŞ YAP
                </Button>
              </Link>
              
              <Link href="/register">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#9900FF] bg-black/80 text-[#9900FF] hover:bg-[#9900FF]/20 font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(153,0,255,0.5)]"
                >
                  KAYIT OL
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 