const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

const tracks = ['Ertugrul', 'Young Stunners'];

let trackIndex = 0;

// loadTrack(tracks[trackIndex]);

loadTrack = (track) => {
    title.innerText = track;
    audio.src = `music/${track}.mp3`;
    albumArt.src = `images/${track}.jpg`
}
loadTrack(tracks[trackIndex]);

playTrack = () => {
    container.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

pauseTrack = () => {
    container.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

prevTrack = () => {
    trackIndex--;
    if ( trackIndex < 0 ) {
        trackIndex = tracks.length -1;
    }
    loadTrack(tracks[trackIndex])
    playTrack();
}

nextTrack = () => {
    trackIndex++;
    if ( trackIndex > tracks.length -1) {
        trackIndex = 0;
    }
    loadTrack(tracks[trackIndex])
    playTrack()
}

updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = currentTime / duration * 100;
    progressBar.style.width = `${progressPercentage}%`

}

// setProgress = (e) => {
//     const width = this.clientWidth;
//     const clickLocation = e.offsetX;
//     const duration = audio.duration;
//     audio.currentTime = clickLocation / width * duration;
// };

function setProgress(e) {
    // Get the overall width in px for progress bar container
    const width = this.clientWidth;
    // Get the x axis px value for the location of click on the progress bar container
    const clickLocation = e.offsetX;
    // Get the total duration of the track
    const duration = audio.duration;
    // Reassign the currentTime of audio track by calculating based on above metrics
    audio.currentTime = clickLocation / width * duration;
};


playBtn.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play');
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
})

previousBtn.addEventListener('click', prevTrack);

nextBtn.addEventListener('click', nextTrack); 

audio.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', setProgress);

audio.addEventListener('ended', nextTrack)