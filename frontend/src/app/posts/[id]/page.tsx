// next.js sayfası - Server component (başlangıçta "use client" direktifi yok)
import { Suspense } from "react";
import PostDetailClient from "./PostDetailClient";

// Server component olarak detay sayfası
export default function PostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen bg-black text-white">Yükleniyor...</div>}>
      <PostDetailClient id={id} />
    </Suspense>
  );
} 