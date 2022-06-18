import dotenv from 'dotenv';
import { Application } from './app/app';

dotenv.config();

export const app = new Application();
