// next.js sayfası - Server component (başlangıçta "use client" direktifi yok)
import { Suspense } from "react";
import Link from "next/link";
import PostDetailClient from "./PostDetailClient";

// Server component olarak detay sayfası
export default function PostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white relative">
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center text-[#33FF33] hover:text-[#33FF33]/80 transition-colors font-mono border border-[#33FF33]/50 px-3 py-1 rounded-md bg-black/80">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            [ ANA SAYFA ]
          </Link>
        </div>
        <div className="text-[#33FF33] text-lg">Yükleniyor...</div>
      </div>
    }>
      <PostDetailClient id={id} />
    </Suspense>
  );
} 