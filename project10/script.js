const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

const tracks = ['Ertugrul'];

let trackIndex = 1;

loadTrack(tracks[trackIndex]);