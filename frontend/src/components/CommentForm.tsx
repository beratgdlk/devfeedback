import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostStore } from "@/lib/post-store";

// Yorum formu şeması
const commentSchema = z.object({
  content: z.string().min(5, "Yorum en az 5 karakter olmalıdır").max(500, "Yorum en fazla 500 karakter olabilir"),
});

// Form tipi
type CommentForm = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

export function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const { createComment, isLoading, error, clearError } = usePostStore();
  const [commentSuccess, setCommentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentForm) => {
    try {
      clearError();
      await createComment(postId, data.content);
      setCommentSuccess(true);
      reset();
      
      // Başarılı yorumdan sonra callback çağır
      if (onSuccess) {
        onSuccess();
      }
      
      // Başarı mesajını belirli bir süre sonra gizle
      setTimeout(() => {
        setCommentSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Yorum ekleme hatası:", error);
    }
  };

  return (
    <div className="w-full bg-black/80 backdrop-blur-md p-4 rounded-xl border border-[#33FF33]/50 shadow-[0_0_10px_rgba(51,255,51,0.2)]">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#33FF33] font-mono">YORUM YAP</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content" className="text-[#33FF33] font-mono">
            YORUM
          </Label>
          <Textarea
            id="content"
            placeholder="Gönderiye yorumunuzu yazın..."
            className="min-h-[100px] bg-black/50 border-[#33FF33]/50 text-white focus:border-[#33FF33] focus:ring-[#33FF33]/30 font-mono"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-sm text-red-500 font-mono">{errors.content.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md">
            <p className="text-sm font-mono">{error}</p>
          </div>
        )}
        
        {commentSuccess && (
          <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 rounded-md">
            <p className="text-sm font-mono">Yorumunuz başarıyla eklendi!</p>
          </div>
        )}

        <Button 
          type="submit"
          disabled={isLoading} 
          className="w-full bg-transparent hover:bg-[#33FF33]/10 border border-[#33FF33] text-[#33FF33] font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(51,255,51,0.5)]"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#33FF33]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              YORUM YAPILIYOR...
            </span>
          ) : (
            "YORUM GÖNDER"
          )}
        </Button>
      </form>
    </div>
  );
} 