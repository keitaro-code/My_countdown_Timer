'use strict';
{
  const timer = document.getElementById('timer');
  const min = document.getElementById('min');
  const sec = document.getElementById('sec');
  const reset = document.getElementById('reset');
  const start = document.getElementById('start');
  
  let startTime;
  let timeLeft;
  // let timeToCountDown = 4 * 1000;
  let timeToCountDown = 0;
  let isRunning = false;

  function updateTimer(t) {
    const d = new Date(t);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');    

    let timerString;
    timerString = `${m}:${s}:${ms}`;
    timer.textContent = timerString;
    // timer.textContent = `${m}:${s}:${ms}`;

    document.title = timerString;
  }

  let timeId ;

  function countDown() {
    timeId = setTimeout(function(){
      // let elapsedTime = Date.now() - startTime;
      // timeLeft = timeToCountDown - elapsedTime;
      timeLeft = timeToCountDown - (Date.now() - startTime);
      // console.log(timeLeft);
      if(timeLeft < 0){
        clearTimeout(timeId);
        timeLeft = 0 ;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    },10);   
  }

  start.addEventListener('click', () => {
    if(isRunning === false){
      isRunning = true;
      start.textContent = 'stop' ;
      startTime = Date.now();
      countDown();
    } else {
      isRunning = false ;
      start.textContent = 'start';
      timeToCountDown = timeLeft ;
      clearTimeout(timeId);
    }
  });

  min.addEventListener('click' ,() => {
    if(isRunning === false){
      timeToCountDown += 60 * 1000 ;
      updateTimer(timeToCountDown) ;
    } else {
      return;
    }
    if(timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
  });
  sec.addEventListener('click' ,() => {
    if(isRunning === true){
      return;
    }
    timeToCountDown += 1000 ;
    if(timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown) ;
  });
  reset.addEventListener('click' ,() => {
    timeToCountDown = 0 ;
    updateTimer(timeToCountDown) ;
  });
}