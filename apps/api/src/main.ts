import * as express from 'express';
import { Message } from '@reddit-text-to-speech/api-interfaces';
import * as path from 'path';

const CLIENT_BUILD_PATH = path.join(__dirname, '../web-client');

const app = express();
app.use(express.static(CLIENT_BUILD_PATH));

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/reddit', (req, res) => {
  res.send('/reddit');
});

app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.port ?? process.env.PORT ?? 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});

server.on('error', console.error);
