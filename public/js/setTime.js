
const ipc = require('electron').ipcRenderer;

let today = new Date();

window.addEventListener('DOMContentLoaded', () => {
   new UI().display();
   ipc.send('asynchronous-message', 'ping');

});

ipc.on('asynchronous-reply', (event, args) => {
   //console.log(args);
   const message = `Asynchronous message reply: ${args}`
//    document.getElementById('msg').innerHTML = args;
});

//Handle current date and current clock
class SetTime {
   constructor() {
      //this.now = new Date();
      this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];
   }

   createDate() {
      let day = new Date().getDay();
      let dd = new Date().getDate();
      let mm = new Date().getMonth() + 1;
      let yyyy = new Date().getFullYear();

      dd = dd < 10 ? '0' + dd : dd;

      //Concatinate date Example Monday January 01, 2020
      return this.weekdays[day] + ' ' + this.months[mm] + ' ' + dd + ', ' + yyyy;
   }

   createLocalTime() {
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let second = new Date().getSeconds();

      let amPm = hour > 12 ? 'PM' : 'AM';

      hour = hour > 12 ? hour - 12 : hour;
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;

      let display = hour + ' : ' + minute + ' : ' + second + ' ' + amPm;

      //Return the display
      return display;
   }

   startClock() {
      let date = document.getElementById('date');
      let time = document.getElementById('time');
      date.innerHTML = this.createDate();

      setInterval(() => {
         time.innerHTML = this.createLocalTime();
      }, 1000);
   }
}

class UI {
   display() {
      let setTime = new SetTime();
      setTime.startClock();
      /* setInterval(() => {
         console.log(setTime.createLocalTime());
      }, 1000); */
   }
}
