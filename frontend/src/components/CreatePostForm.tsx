import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePostStore } from "@/lib/post-store";
import { useRouter } from "next/navigation";

// Gönderi oluşturma formu şeması
const postSchema = z.object({
  title: z.string().min(5, "Başlık en az 5 karakter olmalıdır").max(100, "Başlık en fazla 100 karakter olabilir"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır").max(500, "Açıklama en fazla 500 karakter olabilir"),
  tag: z.string().min(1, "Bir etiket seçmelisiniz"),
});

// Form tipi
type PostForm = z.infer<typeof postSchema>;

export function CreatePostForm() {
  const router = useRouter();
  const { createPost, isLoading, error, clearError } = usePostStore();
  const [postSuccess, setPostSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostForm) => {
    try {
      clearError();
      await createPost(data);
      setPostSuccess(true);
      reset();
      
      // Başarılı gönderiden sonra ana sayfaya yönlendir
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Gönderi oluşturma hatası:", error);
    }
  };

  // Select değişikliği için özel işleyici
  const handleTagChange = (value: string) => {
    setValue("tag", value);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-black/80 backdrop-blur-md p-6 rounded-xl border-2 border-[#33FF33]/50 shadow-[0_0_15px_rgba(51,255,51,0.3)]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#33FF33] font-mono">YENİ GÖNDERİ OLUŞTUR</h2>
        <p className="text-gray-400 font-mono">Yazılım dünyası hakkında düşüncelerinizi paylaşın</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[#33FF33] font-mono">
            BAŞLIK
          </Label>
          <Input
            id="title"
            placeholder="Gönderiniz için başlık yazın..."
            className="bg-black/50 border-[#33FF33]/50 text-white focus:border-[#33FF33] focus:ring-[#33FF33]/30 font-mono"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500 font-mono">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-[#33FF33] font-mono">
            AÇIKLAMA
          </Label>
          <Textarea
            id="description"
            placeholder="Gönderiniz hakkında detaylı açıklama yazın..."
            className="min-h-[120px] bg-black/50 border-[#33FF33]/50 text-white focus:border-[#33FF33] focus:ring-[#33FF33]/30 font-mono"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500 font-mono">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tag" className="text-[#33FF33] font-mono">
            ETİKET
          </Label>
          <Select onValueChange={handleTagChange}>
            <SelectTrigger className="bg-black/50 border-[#33FF33]/50 text-white focus:border-[#33FF33] focus:ring-[#33FF33]/30 font-mono">
              <SelectValue placeholder="Bir etiket seçin" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-[#33FF33]/50 text-white">
              <SelectItem value="React">React</SelectItem>
              <SelectItem value="Vue">Vue</SelectItem>
              <SelectItem value="Angular">Angular</SelectItem>
              <SelectItem value="Next.js">Next.js</SelectItem>
              <SelectItem value="Node.js">Node.js</SelectItem>
              <SelectItem value="TypeScript">TypeScript</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="CSS">CSS</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("tag")} />
          {errors.tag && (
            <p className="text-sm text-red-500 font-mono">{errors.tag.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md">
            <p className="text-sm font-mono">{error}</p>
          </div>
        )}
        
        {postSuccess && (
          <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 rounded-md">
            <p className="text-sm font-mono">Gönderi başarıyla oluşturuldu! Yönlendiriliyorsunuz...</p>
          </div>
        )}

        <Button 
          type="submit"
          disabled={isLoading} 
          className="w-full bg-[#33FF33] hover:bg-[#33FF33]/80 text-black font-bold font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(51,255,51,0.5)]"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              İŞLEM YAPILIYOR...
            </span>
          ) : (
            "GÖNDERİYİ OLUŞTUR"
          )}
        </Button>
      </form>
    </div>
  );
} 