import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Unknown user';
  console.log('Connected to Browser ✅');
  socket.on('close', () => console.log('Disconnected from the Browser ❌'));
  socket.on('message', (data) => {
    const { type, payload } = JSON.parse(data);
    if (type === 'message') {
      sockets.forEach((s) => s.send(`${socket.nickname}: ${payload}`));
    }
    if (type === 'nickname') {
      socket['nickname'] = payload;
    }
  });
});

server.listen(3000, handleListen);
