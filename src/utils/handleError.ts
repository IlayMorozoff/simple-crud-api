import http from 'http';
import { CustomError } from '../error/error';
import { handle500Error } from './handle500Error';
import { jsonParser } from "./jsonParser";
import { writeHeader } from './writeHeader';

export const handleError = (res: http.ServerResponse, error: unknown) => {
  if (error instanceof CustomError) {
    writeHeader(res, error.status);
    jsonParser(res, { message: error.message});
  } else {
    handle500Error(res);
  }
};