import http from 'http';
import { jsonParser } from './jsonParser';
import { STATUS_CODES, writeHeader } from './writeHeader';

export const handle500Error = (res:http.ServerResponse) => {
  writeHeader(res, STATUS_CODES.InternalServerError);
  jsonParser(res, { message: '500 - internal server error - something went wrong' })
}