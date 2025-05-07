import { Elysia } from 'elysia';
import { createServer } from 'node:http';
import { authController } from './controllers/auth.controller.js';
const app = new Elysia()
    .use(authController)
    .get('/', () => 'Merhaba Dünya!');
const PORT = 3002;
console.log(`🦊 Server http://localhost:${PORT} üzerinde çalışıyor`);
// Node.js ile çalıştırma için HTTP server oluştur
const server = createServer((req, res) => {
    const result = app.fetch(new Request(`http://localhost${req.url}`));
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
