import { t } from 'elysia';

export const CommentSchema = t.Object({
  id: t.String(),
  content: t.String(),
  authorId: t.String(),
  postId: t.String(),
  createdAt: t.String(),
  updatedAt: t.String()
});

export const CommentCreateSchema = t.Object({
  content: t.String()
});

export const CommentUpdateSchema = t.Object({
  content: t.String()
});

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentCreate = {
  content: string;
}; 