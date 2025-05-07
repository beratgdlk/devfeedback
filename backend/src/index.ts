import { Elysia } from 'elysia';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { authController } from './controllers/auth.controller.js';

const app = new Elysia()
  .use(authController)
  .get('/', () => 'Merhaba Dünya!');

const PORT = 3002;
console.log(`🦊 Server http://localhost:${PORT} üzerinde çalışıyor`);

// Node.js ile çalıştırma için HTTP server oluştur
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const result = app.fetch(new Request(`http://localhost${req.url}`));
  
  if (result instanceof Promise) {
    result
      .then((response: Response) => {
        res.statusCode = response.status;
        response.headers.forEach((value: string, key: string) => {
          res.setHeader(key, value);
        });
        return response.text();
      })
      .then((body: string) => {
        res.end(body);
      })
      .catch((err: Error) => {
        res.statusCode = 500;
        res.end('Server hatası');
        console.error(err);
      });
  } else {
    // Eğer doğrudan Response döndüyse
    const response = result;
    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });
    response.text().then((body: string) => {
      res.end(body);
    });
  }
});

server.listen(PORT); 