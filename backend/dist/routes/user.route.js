import { Elysia } from 'elysia';
import { userController } from '../controllers/user.controller.js';
export const userRoutes = new Elysia()
    .use(userController);
