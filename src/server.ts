import dotenv from 'dotenv';
import { Application } from './app/app';

dotenv.config();

const PORT = process.env.PORT || 3222;

const app = new Application();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});