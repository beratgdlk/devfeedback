import { Elysia } from 'elysia';
import { postController } from '../controllers/post.controller.js';

export const postRoutes = new Elysia()
  .use(postController); 