const ipc = require('electron').ipcRenderer;

let start = document.getElementById('start');
let stop = document.getElementById('stop');
let lap = document.getElementById('lap');
let reset = document.getElementById('reset');
let sub_info = document.getElementById('sub_info');

start.addEventListener("click", function () {
   let ui = new UI();
   ui.startStop();
   sub_info.innerHTML = "<span>Press the &ldquo;Lap&ldquo; button to catch the first lap.</span>";
});

stop.addEventListener("click", function () {
   console.log('I am Stop');
   let stopwatch = new StopWatch();
   //stopwatch.reset();
});

lap.addEventListener("click", function () {
   let stopwatch = new StopWatch();
   stopwatch.lap();
});

reset.addEventListener("click", function () {
   console.log('I am Reset');
   let stopwatch = new StopWatch();
   //stopwatch.reset();
});

class StopWatch {
   constructor() {
      this.x = null;
      this.milisec = 0;
      this.sec = 0;
      this.min = 0;
      this.hour = 0;
      this.lapTime = {};
   }

   timer() {
      setInterval(() => {

         this.milisec = ++this.milisec;
         this.milisec = this.milisec < 10 ? "0" + this.milisec : this.milisec;

         if (this.milisec === 100) {
            this.milisec = 0;
            this.sec = ++this.sec;
            this.sec = this.sec < 10 ? "0" + this.sec : this.sec;
         }

         if (this.sec == 60) {
            this.min = ++this.min;
            this.min = this.min < 10 ? "0" + this.min : this.min;
            this.sec = 0;
         }

         if (this.min == 60) {
            this.min = 0;
            this.hour = ++this.hour;
            this.hour = this.hour < 10 ? "0" + this.hour : this.hour;
         }

         /* this.hour = this.addZero(this.hour);
         this.min = this.addZero(this.min);
         this.sec = this.addZero(this.sec);
         this.milisec = this.addZero(this.milisec); */

         document.getElementById("hour").innerHTML = this.hour;
         document.getElementById("min").innerHTML = this.min;
         document.getElementById("sec").innerHTML = this.sec;
         document.getElementById("milisec").innerHTML = this.milisec;
         //this.lapTime = {"Hour": this.hour, "Minute": this.min, "Second": this.sec, "Millsec": this.milisec};

      }, 10);
   }

   start() {
      this.timer();
   }

   stop() {
      clearInterval();
   }

   lap() {
      let counter = 0;
      document.getElementById("lapTimer").innerHTML = ('<h3 class="text-danger">Lap ' + counter++ + ' : '  + this.lapTime.Hour +' : ' + this.lapTime.Minute +' : ' + this.lapTime.Second +' : ' + this.lapTime.Millsec + '</h3>');
   }

   reset() {
      this.hour = 0;
      this.min = 0;
      this.sec = 0;
      this.milisec = 0;

      document.getElementById("hour").innerHTML = "00";
      document.getElementById("min").innerHTML = "00";
      document.getElementById("sec").innerHTML = "00";
      document.getElementById("milisec").innerHTML = "00";
   }

   addZero(i) {
      i = i < 10 ? "0" + i : i;
      return i;
   }
}

class UI {
   constructor() {
      this.counter = 0;
   }

   /*Toggle StartStop button*/
   startStop() {
      let stopwatch = new StopWatch();
      stopwatch.start();
      /* this.counter = this.counter + 1;

      if (this.counter === 1) {
         stopwatch.start();
         document.getElementById("start").innerHTML = "Stop";
      } else if (this.counter === 2) {
         document.getElementById("start").innerHTML = "Start";
         this.counter = 0;
         stopwatch.stop();
      } */
   }
}
