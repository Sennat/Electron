
let min = document.getElementById('min');
let start = document.getElementById('start');
let reset = document.getElementById('reset');

start.addEventListener('click', () => {
   let five = 60 * 5;
   start.innerHTML = new CountDown(five, min).startCountdown();
   start.innerHTML = 'Start';
});

/* reset.addEventListener('click', () => {
   let five = 60 * 5;
   new CountDown(five, fiveMin).reset(reset);
}); */


class CountDown {
   constructor(duration, display) {
      this.duration = duration;
      this.display = display;
   }

   startCountdown() {
      let timer = this.duration, minutes, seconds;

      let x = setInterval(() => {
         minutes = parseInt(timer / 60, 10);
         seconds = parseInt(timer % 60, 10);

         minutes = minutes < 10 ? "0" + minutes : minutes;
         seconds = seconds < 10 ? "0" + seconds : seconds;

         this.display.textContent = minutes + " : " + seconds;

         reset.addEventListener('click', () => {
            this.reset();
            clearInterval(x);
         });

         if (--timer < 0) {
            clearInterval(x);
            minutes = '05', seconds = '00';
            this.display.textContent = minutes + " : " + seconds;
            //timer = duration;
         }

      }, 1000);
   }

   reset() {
      let minutes = '05', seconds = '00';
      return this.display.textContent = minutes + " : " + seconds;
      console.log(minutes + " : " + seconds);
   }
}