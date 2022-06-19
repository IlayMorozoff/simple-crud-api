import http from 'http';

export const enum STATUS_CODES {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500
}

export const writeHeader = (res: http.ServerResponse, statusCode: STATUS_CODES) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json'});
};