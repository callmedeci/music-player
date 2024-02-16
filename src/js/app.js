'use strict';


const songName = document.getElementById('name-song');
const singer = document.getElementById('singer');

// ===> Audio Player Buttons:: Begin
const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const btnNext = document.getElementById('btn-next');
const btnPrevious = document.getElementById('btn-previous');
const btnAddFav = document.getElementById('btn-add-fav');
// ===> Audio Player Buttons:: End

const likeSvg = document.getElementById('like-svg');

const audio = document.getElementById('audio');
const musicCover = document.getElementById('music-cover');
const progressBar = document.getElementById('prog-bar');

const timer = document.getElementById('timer');

const uploadAudio = document.getElementById('upload-audio');

let mousedownOnSideBar = false;
let currentTrack = 0;
let currentTime = 0;

let songs = [
    {
        Name: "Nazi Naz Kon",
        Singer: "Ebi",
        filePath: "public/assets/music/1.mp3",
        coverPath: "public/assets/image/naziNazKon.jpg",
        is_favorite: false,
    },
    {
        Name: "Gheseh Eshgh",
        Singer: "Ebi",
        filePath: "public/assets/music/2.mp3",
        coverPath: "public/assets/image/GhesehEshgh.jpg",
        is_favorite: false,
    },
    {
        Name: "Shab Zade",
        Singer: "Ebi",
        filePath: "public/assets/music/3.mp3",
        coverPath: "public/assets/image/ShabZade.jpg",
        is_favorite: false,
    },
];

audio.src = songs[currentTrack].filePath;
musicCover.src = songs[currentTrack].coverPath;
songName.innerText = songs[currentTrack].Name;
singer.innerText = songs[currentTrack].Singer;

function classListAdd($var, $value) {
    $var.classList.add($value);
}

function classListRemove($var, $value) {
    $var.classList.remove($value);
}

function handleNext() {

    //CHECK IF THERE IS ANY OTHER SONGS TO GO NEXT 

    if (currentTrack < songs.length - 1) {
        currentTrack++;

        if (currentTrack > songs.length - 1) {
            return;
        }
        else {
            audio.src = songs[currentTrack].filePath;
            musicCover.src = songs[currentTrack].coverPath;
            songName.innerText = songs[currentTrack].Name;
            singer.innerText = songs[currentTrack].Singer;

            audio.load();
            audio.play();

            btnPlay.classList.add('hidden');
            btnPause.classList.remove('hidden');
        }
    }

    // CHECK IF IT IS FAV OR NOT 

    if (songs[currentTrack].is_favorite) {
        classListAdd(likeSvg, 'text-rose-600');
        classListRemove(likeSvg, 'text-zinc-50/50');
        classListRemove(likeSvg, 'hover:text-zinc-50/70');
    } else {
        classListAdd(likeSvg, 'text-zinc-50/50');
        classListAdd(likeSvg, 'hover:text-zinc-50/70');
        classListRemove(likeSvg, 'text-rose-600')('');
    }
}

function handlePrevious() {

    //CHECK IF THERE IS ANY OTHER SONGS TO GO PRE

    if (currentTrack > 0) {
        currentTrack--;
        if (currentTrack < 0) {
            return;
        }
        else {
            audio.src = songs[currentTrack].filePath;
            musicCover.src = songs[currentTrack].coverPath;
            songName.innerText = songs[currentTrack].Name;
            singer.innerText = songs[currentTrack].Singer;

            audio.load();
            audio.play();

            btnPlay.classList.add('hidden');
            btnPause.classList.remove('hidden');
        }
    }

    // CHECK IF IT IS FAV OR NOT 

    if (songs[currentTrack].is_favorite) {
        classListAdd(likeSvg, 'text-rose-600');
        classListRemove(likeSvg, 'text-zinc-50/50');
        classListRemove(likeSvg, 'hover:text-zinc-50/70');
    } else {
        classListAdd(likeSvg, 'text-zinc-50/50');
        classListAdd(likeSvg, 'hover:text-zinc-50/70');
        classListRemove(likeSvg, 'text-rose-600');
    }
}

function handlePlayAction() {
    audio.play();
    audio.currentTime = currentTime;

    btnPlay.classList.add('hidden');
    btnPause.classList.remove('hidden');
}

function handlePuaseAction() {
    audio.pause();
    currentTime = audio.currentTime;

    btnPlay.classList.remove('hidden');
    btnPause.classList.add('hidden');
}

function handleAddRemove() {

    //CHECK IF IT IS SET TO FAV OR NOT 

    if (!songs[currentTrack].is_favorite) {

        classListAdd(likeSvg, 'text-rose-600');
        classListRemove(likeSvg, 'text-zinc-50/50');
        classListRemove(likeSvg, 'hover:text-zinc-50/70');

        songs[currentTrack].is_favorite = true;
    }
    else {
        classListAdd(likeSvg, 'text-zinc-50/50');
        classListAdd(likeSvg, 'hover:text-zinc-50/70');
        classListRemove(likeSvg, 'text-rose-600');

        songs[currentTrack].is_favorite = false;
    }
};

btnPlay.addEventListener('click', handlePlayAction);
btnPause.addEventListener('click', handlePuaseAction);
btnNext.addEventListener('click', handleNext);
btnPrevious.addEventListener('click', handlePrevious);
btnAddFav.addEventListener('click', handleAddRemove);

//PROGRESS BAR :: BEGINS 
audio.addEventListener('loadeddata', () => {
    progressBar.value = 0;
});
audio.addEventListener("timeupdate", () => {
    if (!mousedownOnSideBar) {
        progressBar.value = audio.currentTime / audio.duration * 100;
    }
});
progressBar.addEventListener("change", () => {
    const pct = progressBar.value / 100;
    audio.currentTime = (audio.duration || 0) * pct;
});
progressBar.addEventListener('mousedown', () => {
    mousedownOnSideBar = true;
});
progressBar.addEventListener("mouseup", () => {
    mousedownOnSideBar = false;
});
//PROGRESS BAR :: ENDS

//TIME LINE 
audio.addEventListener('play', () => {

    setInterval(() => {
        let min = Math.floor(audio.currentTime / 60);
        let sec = Math.floor(audio.currentTime % 60);

        if (sec < 10) {
            sec = '0' + String(sec);
        }

        timer.innerText = min + ':' + sec
    }, 10);

});
