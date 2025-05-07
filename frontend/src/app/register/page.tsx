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

const registerSchema = z.object({

  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),

  email: z.string().email("Geçerli bir email adresi giriniz"),

  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),

  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {

  message: "Şifreler eşleşmiyor",

  path: ["confirmPassword"],

});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {

  const router = useRouter();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting },

  } = useForm<RegisterForm>({

    resolver: zodResolver(registerSchema),

  });

  const onSubmit = async (data: RegisterForm) => {

    try {

      clearError();
      await registerUser(data.name, data.email, data.password);
      setRegisterSuccess(true);
      
      // Başarılı kayıttan sonra ana sayfaya yönlendir
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }

  };

  const marqueeText = "NEW ACCOUNT * DEV FEEDBACK * SECURE REGISTRATION * ADMIN ZONE * NEW USER * CREDENTIALS SETUP * ";

  const marqueeTopText = "YENİ KULLANICI KAYDI * KAYIT İŞLEMİ * HESAP OLUŞTUR * YAZILIMCI PORTALI * YETKİLENDİRME * KULLANICI BİLGİLERİ * ";

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

            <div className="w-20 h-20 bg-[#9900FF]/20 rounded-xl mx-auto mb-4 flex items-center justify-center retro-border-pink">
              <svg className="w-10 h-10 text-[#9900FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>

            <CardTitle className="text-3xl font-bold text-center text-[#9900FF] retro-text-pink font-mono">HESAP OLUŞTUR</CardTitle>

            <CardDescription className="text-center text-[#9900FF]/90 font-mono text-lg">

              Yeni bir hesap oluşturmak için bilgilerinizi giriniz

            </CardDescription>

            <MatrixLoading />

          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>

            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label htmlFor="name" className="text-md font-medium text-[#9900FF] font-mono matrix-text">

                  İSİM

                </Label>

                <Input

                  id="name"

                  type="text"

                  placeholder="Adınız Soyadınız"

                  className="h-12 bg-black/80 border-[#9900FF]/60 text-white placeholder:text-[#9900FF]/60 focus:border-[#9900FF] focus:ring-[#9900FF]/50 font-mono"

                  {...register("name")}

                />

                {errors.name && (

                  <p className="text-sm text-[#33FF33] font-mono">{errors.name.message}</p>

                )}

              </div>

              <div className="space-y-2">

                <Label htmlFor="email" className="text-md font-medium text-[#9900FF] font-mono matrix-text">

                  EMAİL

                </Label>

                <Input

                  id="email"

                  type="email"

                  placeholder="ornek@email.com"

                  className="h-12 bg-black/80 border-[#9900FF]/60 text-white placeholder:text-[#9900FF]/60 focus:border-[#9900FF] focus:ring-[#9900FF]/50 font-mono"

                  {...register("email")}

                />

                {errors.email && (

                  <p className="text-sm text-[#33FF33] font-mono">{errors.email.message}</p>

                )}

              </div>

              <div className="space-y-2">

                <Label htmlFor="password" className="text-md font-medium text-[#9900FF] font-mono matrix-text">

                  ŞİFRE

                </Label>

                <Input

                  id="password"

                  type="password"

                  className="h-12 bg-black/80 border-[#9900FF]/60 text-white placeholder:text-[#9900FF]/60 focus:border-[#9900FF] focus:ring-[#9900FF]/50 font-mono"

                  {...register("password")}

                />

                {errors.password && (

                  <p className="text-sm text-[#33FF33] font-mono">{errors.password.message}</p>

                )}

              </div>

              <div className="space-y-2">

                <Label htmlFor="confirmPassword" className="text-md font-medium text-[#9900FF] font-mono matrix-text">

                  ŞİFRE TEKRAR

                </Label>

                <Input

                  id="confirmPassword"

                  type="password"

                  className="h-12 bg-black/80 border-[#9900FF]/60 text-white placeholder:text-[#9900FF]/60 focus:border-[#9900FF] focus:ring-[#9900FF]/50 font-mono"

                  {...register("confirmPassword")}

                />

                {errors.confirmPassword && (

                  <p className="text-sm text-[#33FF33] font-mono">{errors.confirmPassword.message}</p>

                )}

              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md">
                  <p className="text-sm font-mono">{error}</p>
                </div>
              )}
              
              {registerSuccess && (
                <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 rounded-md">
                  <p className="text-sm font-mono">Kayıt başarılı! Yönlendiriliyorsunuz...</p>
                </div>
              )}

            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-4">

              <Button

                type="submit"

                disabled={isSubmitting || isLoading}

                className="w-full h-12 bg-[#9900FF] text-white hover:bg-[#9900FF]/90 font-mono retro-text-pink tracking-widest text-lg transition-all duration-300 hover:shadow-[0_0_8px_rgba(153,0,255,0.5)]"

              >

                {isSubmitting || isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İŞLEM YAPILIYOR...
                  </span>
                ) : (
                  "KAYIT OL"
                )}

              </Button>

              <div className="relative">

                <div className="absolute inset-0 flex items-center">

                  <span className="w-full border-t border-[#9900FF]/30" />

                </div>

                <div className="relative flex justify-center text-xs uppercase">

                  <span className="bg-black px-2 text-[#9900FF]/80 font-mono">

                    VEYA

                  </span>

                </div>

              </div>

              <p className="text-sm text-center text-[#9900FF]/90 font-mono">

                Zaten hesabınız var mı?{" "}

                <Link href="/login" className="text-[#33FF33] hover:text-[#33FF33]/80 hover:underline font-medium transition-colors font-mono">

                  GİRİŞ YAPIN

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