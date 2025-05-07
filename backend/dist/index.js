import { Elysia } from 'elysia';
import { createServer } from 'node:http';
import { authRoutes } from './routes/auth.route.js';
import { userRoutes } from './routes/user.route.js';
import { postRoutes } from './routes/post.route.js';
import { commentRoutes } from './routes/comment.route.js';
// CORS ayarları
const corsMiddleware = (req, res) => {
    // Tüm kaynaklardan gelen isteklere izin ver
    res.setHeader('Access-Control-Allow-Origin', '*');
    // İzin verilen HTTP metodları
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // İzin verilen Headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Credentials'a izin ver (cookies, authorization headers)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // OPTIONS isteği ise burada yanıt ver
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return true;
    }
    return false;
};
const app = new Elysia()
    .use(authRoutes)
    .use(userRoutes)
    .use(postRoutes)
    .use(commentRoutes)
    .get('/', () => 'DevFeedback API çalışıyor');
const PORT = 3002;
console.log(`🦊 Server http://localhost:${PORT} üzerinde çalışıyor`);
// Node.js ile çalıştırma için HTTP server oluştur
const server = createServer(async (req, res) => {
    // CORS kontrolü
    if (corsMiddleware(req, res)) {
        return;
    }
    let body = undefined;
    // POST, PUT gibi istekler için body oluştur
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(Buffer.from(chunk));
        }
        body = Buffer.concat(chunks).toString();
    }
    const result = app.fetch(new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: body
    }));
    if (result instanceof Promise) {
        result
            .then((response) => {
            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
                res.setHeader(key, value);
            });
            return response.text();
        })
            .then((body) => {
            res.end(body);
        })
            .catch((err) => {
            res.statusCode = 500;
            res.end('Server hatası');
            console.error(err);
        });
    }
    else {
        // Eğer doğrudan Response döndüyse
        const response = result;
        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        response.text().then((body) => {
            res.end(body);
        });
    }
});
server.listen(PORT);
