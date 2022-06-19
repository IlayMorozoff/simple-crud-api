import http from 'http';
import { handle500Error } from './handle500Error';

export async function bodyParser(req: http.IncomingMessage, res: http.ServerResponse): Promise<unknown> {
  try {
    return await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (error) {
          handle500Error(res)
        }
      });

      req.on('error', () => {
        reject('somethin went wront'); 
      });
    });
  } catch (message) {
    return console.log(message);
  }
} 