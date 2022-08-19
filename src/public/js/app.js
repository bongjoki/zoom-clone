const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');
const room = document.querySelector('#room');

room.hidden = true;
let roomName;

function addMessage(msg) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = msg;
  ul.appendChild(li);
}
function handleSubmitRoom(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, () => {
    welcome.hidden = true;
    room.hidden = false;
    const title = room.querySelector('h3');
    title.innerText = `Room: ${roomName}`;
  });
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleSubmitRoom);

socket.on('welcome', () => {
  addMessage('Someone joined!');
});
