import http from 'http';

export const jsonParser = (res: http.ServerResponse, data: unknown) => {
  res.end(JSON.stringify(data));
}