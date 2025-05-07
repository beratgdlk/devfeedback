"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

import { MatrixRain, MatrixMarquee, MatrixMarqueeTop, MatrixLoading, MatrixCardControl } from "@/components/ui/matrix-effect";

import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({

  email: z.string().email("Geçerli bir email adresi giriniz"),

  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),

});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {

  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting },

  } = useForm<LoginForm>({

    resolver: zodResolver(loginSchema),

  });

  const onSubmit = async (data: LoginForm) => {

    try {

      clearError();
      await login(data.email, data.password);
      setLoginSuccess(true);
      
      // Başarılı girişten sonra ana sayfaya yönlendir
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Giriş hatası:", error);
    }

  };

  const marqueeText = "SYSTEM LOGIN * DEV FEEDBACK * ERROR 404 * ACCESS GRANTED * ROOT ACCESS * ADMIN LOGIN * AUTHENTICATION REQUIRED * ";

  const marqueeTopText = "KULLANICI GİRİŞİ * YETKİLENDİRME * GÜVENLI GİRİŞ * DEV FEEDBACK * SİSTEME GİRİŞ * YETKİ KONTROLÜ * ";

  return (

    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden flex flex-col items-center justify-center">

      <MatrixRain />

      

      <MatrixMarqueeTop text={marqueeTopText} />

      

      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto z-20 relative">

        <div className="absolute top-0 left-0 z-30">

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

        <MatrixCardControl className="w-full mb-16 p-6">

          <CardHeader className="space-y-1">

            <div className="w-20 h-20 bg-[#ff9900]/20 rounded-xl mx-auto mb-4 flex items-center justify-center retro-border-orange">
              <svg className="w-10 h-10 text-[#ff9900]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>

            <CardTitle className="text-3xl font-bold text-center text-[#ff9900] retro-text-orange font-mono">HOŞ GELDİNİZ</CardTitle>

            <CardDescription className="text-center text-[#ff9900]/90 font-mono text-lg">

              Hesabınıza giriş yapmak için bilgilerinizi giriniz

            </CardDescription>

            <MatrixLoading />

          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>

            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label htmlFor="email" className="text-md font-medium text-[#ff9900] font-mono matrix-text">

                  EMAİL

                </Label>

                <Input

                  id="email"

                  type="email"

                  placeholder="ornek@email.com"

                  className="h-12 bg-black/80 border-[#ff9900]/60 text-white placeholder:text-[#ff9900]/60 focus:border-[#ff9900] focus:ring-[#ff9900]/50 font-mono"

                  {...register("email")}

                />

                {errors.email && (

                  <p className="text-sm text-[#9900FF] font-mono">{errors.email.message}</p>

                )}

              </div>

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <Label htmlFor="password" className="text-md font-medium text-[#ff9900] font-mono matrix-text">

                    ŞİFRE

                  </Label>

                  <Link

                    href="/forgot-password"

                    className="text-sm text-[#9900FF] hover:text-[#9900FF]/80 hover:underline transition-colors font-mono retro-text-pink"

                  >

                    Şifremi Unuttum

                  </Link>

                </div>

                <Input

                  id="password"

                  type="password"

                  className="h-12 bg-black/80 border-[#ff9900]/60 text-white placeholder:text-[#ff9900]/60 focus:border-[#ff9900] focus:ring-[#ff9900]/50 font-mono"

                  {...register("password")}

                />

                {errors.password && (

                  <p className="text-sm text-[#9900FF] font-mono">{errors.password.message}</p>

                )}

              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md">
                  <p className="text-sm font-mono">{error}</p>
                </div>
              )}
              
              {loginSuccess && (
                <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 rounded-md">
                  <p className="text-sm font-mono">Giriş başarılı! Yönlendiriliyorsunuz...</p>
                </div>
              )}

            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-4">

              <Button

                type="submit"

                disabled={isSubmitting || isLoading}

                className="w-full h-12 bg-[#ff9900] text-white hover:bg-[#ff9900]/90 font-mono retro-text-orange tracking-widest text-lg transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,153,0,0.5)]"

              >

                {isSubmitting || isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    GİRİŞ YAPILIYOR...
                  </span>
                ) : (
                  "GİRİŞ YAP"
                )}

              </Button>

              <div className="relative">

                <div className="absolute inset-0 flex items-center">

                  <span className="w-full border-t border-[#ff9900]/30" />

                </div>

                <div className="relative flex justify-center text-xs uppercase">

                  <span className="bg-black px-2 text-[#ff9900]/80 font-mono">

                    VEYA

                  </span>

                </div>

              </div>

              <p className="text-sm text-center text-[#ff9900] font-mono">

                Hesabınız yok mu?{" "}

                <Link href="/register" className="text-[#9900FF] hover:text-[#9900FF]/80 hover:underline font-medium transition-colors retro-text-pink">

                  KAYIT OLUN

                </Link>

              </p>

            </CardFooter>

          </form>

        </MatrixCardControl>

      </div>

      

      <MatrixMarquee text={marqueeText} />

    </div>

  );

} 