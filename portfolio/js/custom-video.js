const videoPlayer = document.querySelector('.video-player');
const video = document.querySelector('.video');
const playerControls = document.querySelector('.player-controls');
const progressBar = document.querySelector('.progress');
const progressFill = document.querySelector('.progress-fill');
const playHover = document.querySelector('.play-hover');
const playButton = document.querySelector('.play-button');
const playImg = document.querySelector('.play-img');
const volumeRange = document.querySelector('.volume-range');
const volumeImg = document.querySelector('.volume-img');
const fill = document.querySelector('.fill');
const speedRange = document.querySelector('.speed-range');
const speedFill = document.querySelector('.speed-fill');
const arrowImg = document.querySelectorAll('.arrow-img');
const fullScreenButton = document.querySelector('.fullscreen-button');


playHover.addEventListener('click', startVideo);
video.addEventListener('click', startVideo);
playButton.addEventListener('click', changeMode);
progressBar.addEventListener('click', updateCurrentPosition);
volumeRange.addEventListener('input', updateVolume);
volumeRange.addEventListener('input', setVolumeBar);
volumeImg.addEventListener('click', switchVolume);
speedRange.addEventListener('input', updateSpeed);
speedRange.addEventListener('input', setSpeedBar);
arrowImg.forEach(arrow => arrow.addEventListener('click', makeSkip));
fullScreenButton.addEventListener('click', goFullScreen);


let progression;
let volumeValue = 0.5;
let onSrc = "assets/svg/volume.svg";
let offSrc = "assets/svg/mute.svg";


function changeMode() {
let pauseSrc = "assets/svg/pause.svg";
let playSrc = "assets/svg/play.svg";
  if (video.paused) {
    video.play();
    playImg.setAttribute("src", pauseSrc);
    playHover.classList.add("invisible");
    updateProgress();
    progression = window.setInterval(updateProgress, 10);
  } else {
    video.pause();
    playImg.setAttribute("src", playSrc);
    playHover.classList.remove("invisible");
    clearInterval(progression);
  };
}

function startVideo() {
    playerControls.classList.add("player-visible");
    changeMode();
}

function updateVolume() {
    let volume = this.value;
    volumeValue = volume;
    video.volume = volume;
  if (video.volume === 0) {
    volumeImg.setAttribute("src", offSrc);
  } else {
    volumeImg.setAttribute("src", onSrc);
  }
}

function setVolumeBar() {
    fill.style.width = 100 * volumeRange.value + 1 + "%";
}

function setSpeedBar() {
    speedFill.style.width = (speedRange.value - 0.5) * 100 + 1 + "%";
}

function switchVolume() {
 if (volumeImg.getAttribute("src") === onSrc) {
    volumeImg.setAttribute("src", offSrc);
    video.volume = 0;
    volumeRange.value = 0;
    fill.style.width = "3%";
  } else if (volumeImg.getAttribute("src") === offSrc) {
    volumeImg.setAttribute("src", onSrc);
    volumeRange.value = volumeValue;
    video.volume = volumeValue;
    setVolumeBar();
  }
}

function updateSpeed() {
  let rate = this.value;
  video.playbackRate = rate;
}

function goFullScreen() {
  if (video.webkitSupportsFullscreen) {
      video.webkitEnterFullScreen();
  }
}

function makeSkip() {
  let value = Number(this.dataset.skip);
  video.currentTime = video.currentTime + value;
}

function updateProgress() {
  let progress = video.currentTime / video.duration;
  progressFill.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';
}

function updateCurrentPosition(e) {
  let newProgress = (e.clientX - videoPlayer.offsetLeft) / videoPlayer.clientWidth;
  progressFill.style.flexBasis = Math.floor(newProgress * 1000) / 10 + '%';
  video.currentTime = newProgress * video.duration;
}
