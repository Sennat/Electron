
const ipc = require('electron').ipcRenderer;

const date = document.getElementById('date')
const time = document.getElementById('time')

/* window.addEventListener('DOMContentLoaded', () => {
   ipc.send('asynchronous-message', 'ping');

});

ipc.on('asynchronous-reply', (event, args) => {
   console.log(args);
   const message = `Asynchronous message reply: ${args}`
   document.getElementById('msg').innerHTML = args;
}); */
