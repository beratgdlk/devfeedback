import { t } from 'elysia';

export const UserSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  avatar: t.Optional(t.String()),
  role: t.String(),
  createdAt: t.String(),
  updatedAt: t.String()
});

export const UserUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  email: t.Optional(t.String()),
  avatar: t.Optional(t.String())
});

export const UserCreateSchema = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String()
});

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserUpdate = {
  name?: string;
  email?: string;
  avatar?: string;
}; 