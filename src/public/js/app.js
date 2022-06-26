const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nicknameForm = document.querySelector('#nickname');

const socket = new WebSocket(`ws://${window.location.host}`);

const generateMessage = (type, payload) => JSON.stringify({ type, payload });

socket.addEventListener('open', () => {
  console.log('Connected to Server ✅');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
  console.log(`"${message.data}" from the Server`);
});

socket.addEventListener('close', (message) => {
  console.log('Disconnected from Server ❌');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(generateMessage('message', input.value));
  input.value = '';
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(generateMessage('nickname', input.value));
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nicknameForm.addEventListener('submit', handleNicknameSubmit);
