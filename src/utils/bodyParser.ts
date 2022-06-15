import http from 'http';

export async function bodyParser(req: http.IncomingMessage): Promise<unknown> {
  try {
    return await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      });

      req.on('error', () => {
        reject('somethin went wront');
      });
    });
  } catch (message) {
    return console.log(message);
  }
} 