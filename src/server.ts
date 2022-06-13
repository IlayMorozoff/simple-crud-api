import http from 'http';
import dotenv from 'dotenv';
import { Router, emiter } from './router/router.js'

dotenv.config();

const router = new Router()

const PORT = process.env.PORT || 3222;



router.get('/user', (req, res) => {
  console.log(req.url)
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // // res.end(`Hello, World!\n ${ req.url}`);
  res.end('DSADSADSA /USERS')
  // // res.end('dsadasdasdsa')
  // console.log('231312321')
})

const server = http.createServer((req, res) => {
  console.log(`(${req.url})===(${req.method})`)
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end(`Hello, World!\n ${ req.url}`);
  // `(${path})===(${method})`
  emiter.emit(`(${req.url})===(${req.method})`, req, res);

  // if (re)
}); 

const startApp = () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();