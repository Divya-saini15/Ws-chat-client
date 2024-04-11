const io = require('socket.io-client');
const readline = require('readline');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

socket.on('connect', () => {
  console.log('Connected to the server');
});

// Handle receiving messages from the server
socket.on('receiveMessage', ({ user, message }) => {
  console.log(`${user}: ${message}`);
});

// Handle receiving message history from the server
socket.on('messageHistory', (messages) => {
  messages.forEach(({ user, message }) => {
    console.log(`${user}: ${message}`);
  });
});

// Function to send messages to the server
const sendMessage = (message) => {
  // Sending the message along with the user information
  socket.emit('sendMessage', { user: 'Client', message });
};

console.log('Type your messages and press Enter to send. Type "exit" to quit.');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
    return;
  }

  // When a line of input is received, send it to the server
  sendMessage(input);
});
