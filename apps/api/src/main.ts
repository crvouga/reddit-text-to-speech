import * as express from 'express';
import { Message } from '@reddit-text-to-speech/api-interfaces';
import { environment } from './environments/environment';

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/reddit', (req, res) => {
  res.send('/reddit');
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
