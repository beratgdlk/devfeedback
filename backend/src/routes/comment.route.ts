import { Elysia } from 'elysia';
import { commentController } from '../controllers/comment.controller.js';

export const commentRoutes = new Elysia()
  .use(commentController);