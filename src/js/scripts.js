document.addEventListener('DOMContentLoaded', function () {
  let countdownInterval;
  let remainingTime = 0;
  let isCountdownRunning = false;
  const countdownBubble = document.getElementById('countdownBubble');
  const countdownDisplayBubble = document.getElementById('countdownDisplayBubble');


  
  // Function to create the countdown timer bubble
  function createCountdownBubble() {
    countdownBubble.style.display = 'none';
    countdownBubble.style.transition = 'none';
    countdownBubble.style.opacity = '0';
    countdownBubble.style.transform = 'translateY(100px)';
    countdownBubble.style.display = 'block';

    setTimeout(() => {
      countdownBubble.style.transition = 'opacity 0.3s, transform 0.3s';
      countdownBubble.style.opacity = '1';
      countdownBubble.style.transform = 'translateY(0)';
    }, 100);
  }

  createCountdownBubble(); // Create the bubble when the page loads

  // Countdown timer logic
  const countdownTimeInput = document.getElementById('countdownTime');
  const startCountdownButton = document.getElementById('startCountdown');
  const stopCountdownButton = document.getElementById('stopCountdown');
  const resetCountdownButton = document.getElementById('resetCountdown');

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  startCountdownButton.addEventListener('click', () => {
    if (!isCountdownRunning) {
      const countdownTime = parseInt(countdownTimeInput.value);

      if (isNaN(countdownTime)) {
        alert('Please enter a valid number for countdown time.');
        return;
      }

      if (remainingTime === 0) {
        remainingTime = countdownTime;
      }

      countdownBubble.style.display = 'block';
      startCountdownButton.disabled = true;
      stopCountdownButton.disabled = false;
      resetCountdownButton.disabled = true;

      countdownInterval = setInterval(updateCountdown, 1000);
      isCountdownRunning = true;
    }
  });

  stopCountdownButton.addEventListener('click', () => {
    if (isCountdownRunning) {
      clearInterval(countdownInterval);
      startCountdownButton.disabled = false;
      stopCountdownButton.disabled = true;
      resetCountdownButton.disabled = false;
      isCountdownRunning = false;
    }
  });

  resetCountdownButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    remainingTime = 0;
    countdownDisplayBubble.textContent = 'Time remaining: 00:00';
    startCountdownButton.disabled = false;
    stopCountdownButton.disabled = true;
    resetCountdownButton.disabled = true;
    isCountdownRunning = false;
  });

  function updateCountdown() {
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      countdownDisplayBubble.textContent = "Time's up!";
      startCountdownButton.disabled = false;
      stopCountdownButton.disabled = true;
      resetCountdownButton.disabled = false;
      isCountdownRunning = false;
    } else {
      countdownDisplayBubble.textContent = `Time remaining: ${formatTime(remainingTime)}`;
    }
  }

});

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const images = document.querySelector('.carousel').children;
const totalImages = images.length;
let index = 0;

prev.addEventListener('click', () => {
    nextImage('next');
  })
  next.addEventListener('click', () => {
    nextImage('prev');
  })
  function nextImage(direction) {
    if(direction == 'next') {
      index++;  // increase by 1, Global variable
      if(index == totalImages) {
        index = 0;
      }
    } else {
      if(index == 0) {
        index = totalImages - 1;
      } else {
        index--; // Backwards by 1
      }
    }
    
    for(let i = 0; i < images.length; i++) {
      images[i].classList.remove('main');
    }
    images[index].classList.add('main');
  }
