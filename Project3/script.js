 const video = document.getElementById('video');
 const play = document.getElementById('play');
 const stop = document.getElementById('stop');
 const progress = document.getElementById('progress');
 const timestamp = document.getElementById('timestamp');

//Clicking on the video
toggleVideoStatus = () => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
} 

updatePlayIcon = () => {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa2x"></i>'
    }
}

updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;
    
    let mins = Math.floor(video.currentTime / 60) * 100;
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`
    //mins + ':' + secs
    
      
}

stopVideo = () => {
    video.currentTime = 0;
    video.pause();
}

setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;
}
 
 // Event listeners for video player
 video.addEventListener('click', toggleVideoStatus);

 video.addEventListener('pause', updatePlayIcon);

 video.addEventListener('play', updatePlayIcon);

 video.addEventListener('timeupdate', updateProgress);


// Event listeners for button

play.addEventListener('click',toggleVideoStatus)

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);