import { t } from 'elysia';

export const PostSchema = t.Object({
  id: t.String(),
  title: t.String(),
  description: t.String(),
  authorId: t.String(),
  tag: t.String(),
  createdAt: t.String(),
  updatedAt: t.String()
});

export const PostCreateSchema = t.Object({
  title: t.String(),
  description: t.String(),
  tag: t.String()
});

export const PostUpdateSchema = t.Object({
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
  tag: t.Optional(t.String())
});

export type Post = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCreate = {
  title: string;
  description: string;
  tag: string;
};

export type PostUpdate = {
  title?: string;
  description?: string;
  tag?: string;
}; 