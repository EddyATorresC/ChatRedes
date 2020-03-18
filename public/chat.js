const socket = io('http://localhost:3000'); //possible http://mydoamin.com

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',() => {
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('chat:typing',username.value);
})


socket.on('chat:server_message', (data) => {
  actions.innerHTML = ``;
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:server_typing', (data) => {
  actions.innerHTML += `<p>
    <em>${data} está escribiendo... </em></p>`
});
