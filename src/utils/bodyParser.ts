import http from 'http';
import { jsonParser } from './jsonParser';
import { STATUS_CODES, writeHeader } from './writeHeader';

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
          writeHeader(res, STATUS_CODES.InternalServerError);
          jsonParser(res, { message: 'internal server error - something went wrong' })
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