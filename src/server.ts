import dotenv from 'dotenv';
import { Application } from './app/app';

dotenv.config();

export const PORT = process.env.PORT || 3222;

export const app = new Application();
