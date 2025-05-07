"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MatrixRain } from "@/components/ui/matrix-effect";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Geçersiz doğrulama bağlantısı. Token bulunamadı.");
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        setStatus("success");
        setMessage(response.message || "Email adresiniz başarıyla doğrulandı.");
        
        // 3 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Doğrulama sırasında bir hata oluştu.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      <MatrixRain />
      
      <div className="w-full max-w-md mx-auto z-20 relative">
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border-2 border-[#33FF33]/50 shadow-[0_0_15px_rgba(51,255,51,0.3)]">
          <div className="text-center mb-6">
            <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center">
              {status === "loading" && (
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#33FF33]"></div>
              )}
              
              {status === "success" && (
                <div className="w-16 h-16 bg-[#33FF33]/20 rounded-full flex items-center justify-center text-[#33FF33]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              {status === "error" && (
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>
            
            <h1 className={`text-2xl font-bold font-mono ${
              status === "loading" ? "text-[#33FF33]" :
              status === "success" ? "text-[#33FF33]" :
              "text-red-500"
            }`}>
              {status === "loading" ? "EMAİL DOĞRULANIYOR..." :
               status === "success" ? "EMAİL DOĞRULANDI" :
               "DOĞRULAMA HATASI"}
            </h1>
            
            <p className="mt-2 text-gray-400 font-mono">{message}</p>
            
            {status === "success" && (
              <p className="mt-2 text-[#33FF33]/70 font-mono text-sm">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            )}
          </div>
          
          <div className="flex justify-center">
            {status === "error" && (
              <Button 
                asChild
                className="bg-[#33FF33] hover:bg-[#33FF33]/80 text-black font-bold font-mono"
              >
                <Link href="/login">GİRİŞ SAYFASINA DÖN</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 