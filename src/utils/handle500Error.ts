import http from 'http';
import { Messages } from '../model/users';
import { jsonParser } from './jsonParser';
import { STATUS_CODES, writeHeader } from './writeHeader';

export const handle500Error = (res:http.ServerResponse) => {
  writeHeader(res, STATUS_CODES.InternalServerError);
  jsonParser(res, { message:Messages.ServerIternalError })
}