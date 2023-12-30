let songIndex = 0;
const songs = ["songs/1.mp3", "songs/2.mp3", "songs/3.mp3", "songs/4.mp3", "songs/5.mp3", "songs/6.mp3", "songs/7.mp3", "songs/8.mp3", "songs/9.mp3", "songs/10.mp3", "songs/11.mp3", "songs/12.mp3", "songs/13.mp3", "songs/14.mp3", "songs/15.mp3" /* add more songs */];
const audioElement = new Audio(songs[songIndex]);
let progressBar = document.querySelector('.progress-bar');
const currentTimeElement = document.querySelector('.current-time');
const totalTimeElement = document.querySelector('.total-time');
const volumeSlider = document.querySelector('.volume-slider');
const toggleIcon = document.getElementById('play').firstElementChild; // Get the first child (the <a> element)
const toggleButton = document.getElementById('play');
const playButtons = document.querySelectorAll('.play');
const nextButton = document.querySelector('.fa-forward-step');
const backButton = document.querySelector('.fa-backward-step');
const shuffleButton = document.querySelector('.fa-shuffle');
const loopButton = document.querySelector('.fa-rotate-left');




// Play and Pause

toggleButton.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (toggleIcon.classList.contains('fa-circle-play')) {
        toggleIcon.classList.remove('fa-circle-play');
        toggleIcon.classList.add('fa-circle-pause');
        audioElement.play();
    } else {
        toggleIcon.classList.remove('fa-circle-pause');
        toggleIcon.classList.add('fa-circle-play');
        audioElement.pause();
    }
}




// Next and previous 

nextButton.addEventListener('click', nextSong);
backButton.addEventListener('click', previousSong);

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    console.log(songIndex);
    audioElement.src = songs[songIndex];
    audioElement.play();
    if (toggleIcon.classList.contains('fa-circle-play')) {  
        togglePlayPause();
    } else {
        audioElement.play();
    }
}

function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    console.log(songIndex);
    audioElement.src = songs[songIndex];
    audioElement.play();
    if (toggleIcon.classList.contains('fa-circle-play')) {  
        togglePlayPause();
    } else {
        audioElement.play();
    }
}




// shuffle

shuffleButton.addEventListener('click', shuffleOpacity);
shuffleButton.addEventListener('dblclick', resetShuffle);

function shuffleOpacity() {
    shuffleButton.style.opacity = 1;
    playRandomSong();
}

function resetShuffle() {
    shuffleButton.style.opacity = 0.6;
    audioElement.pause();
}




// loop

loopButton.addEventListener('click', loopOpacity);
loopButton.addEventListener('dblclick', resetLoop);

function loopOpacity() {
    loopButton.style.opacity = 1;
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex];
    audioElement.play();
}

function resetLoop() {
    loopButton.style.opacity = 0.6;
    audioElement.pause();
}




// Access Playlist

playButtons.forEach((playButton) => {
    playButton.addEventListener('click', playRandomSong);
});

function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    audioElement.src = songs[randomIndex];
    audioElement.play();

    if (toggleIcon.classList.contains('fa-circle-play')) {  
        togglePlayPause();
    } else {
        audioElement.play();
    }
}




// Update Progressbar

// audioElement.addEventListener('timeupdate', () => {
//     let progress = (audioElement.currentTime / audioElement.duration) * 100;
//     progressBar.value = progress;
// });


// progressBar.addEventListener('input', () => {
//     audioElement.currentTime = progressBar.value * audioElement.duration / 100;
// });


audioElement.addEventListener('loadedmetadata', () => {
    totalTimeElement.textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(audioElement.currentTime);
    progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

progressBar.addEventListener('input', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}




// Volume slider

audioElement.volume = volumeSlider.value / 100;

volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value / 100;
    audioElement.volume = volumeValue;
});
