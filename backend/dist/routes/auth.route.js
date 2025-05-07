import { Elysia } from 'elysia';
import { authController } from '../controllers/auth.controller.js';
export const authRoutes = new Elysia()
    .use(authController);
