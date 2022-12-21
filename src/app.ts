// DOM elements
const playButton = document.getElementById("playIcon")
const nextLeft = document.getElementById("nextLeftIcon")
const nextRight = document.getElementById("nextRightIcon")
const progressBar: any = document.getElementById("trackProgress")
const iconElement = document.getElementById("icon")
const artist = document.getElementById("artistName")
const track = document.getElementById("trackName")
const trackImage = document.getElementById("songImage")
const trackVolume = document.getElementById("volumeSlider")
let audioCurrentTimeDOM = document.getElementById("audioCurrentTime")
let audioTotalLenght = document.getElementById("audioTotalLenght")
let volumeIcon = document.getElementById("volumeIcon")
const repeatIcon = document.getElementById("repeatIcon")

//global variables set up
let globalTrack: HTMLAudioElement = document.createElement("audio");
let isPlaying: boolean = false;
let trackIndex: number = 0;
let updateTimer;


interface Track{
    name: string;
    artist: string;
    imagePath: string;
    songPath: string;
}

let trackList: Track[] = [{
    name: "Euphoria",
    artist: "xFran",
    imagePath: "./dist/resources/euphoria.jpg",
    songPath: "./dist/resources/Euphoria.mp3"
}, 
{
    name: "Give It",
    artist: "xFran",
    imagePath: "./dist/resources/giveItImage.jpg",
    songPath: "./dist/resources/GiveIt.mp3"
}, 
{
    name: "Colors",
    artist: "Tobu",
    imagePath: "./dist/resources/tobuColorsImage.jpg",
    songPath: "./dist/resources/Tobu - Colors (1).mp3"
    },
{
  name: "Stronger",
  artist: "TheFatRat",
  imagePath: "./dist/resources/strongerImage.jpg",
  songPath: "./dist/resources/stronger.mp3"
},
{
  name: "Monody",
  artist: "TheFatRat",
  imagePath: "./dist/resources/monody.jpg",
  songPath: "./dist/resources/TheFatRat - Monody (feat. Laura Brehm).mp3"
}
];



function loadTrack (trackIndex) {
    resetValues();

    // Load a new track
    globalTrack.src = trackList[trackIndex].songPath;
    globalTrack.load();
    console.log(globalTrack.src)


    //updating track details
    trackImage.src = trackList[trackIndex].imagePath;
    artist.textContent = trackList[trackIndex].artist;
    track.textContent = trackList[trackIndex].name;
    console.log(trackImage.src, track.textContent, artist.textContent)


    updateTimer = setInterval(seekUpdate, 1000);


    globalTrack.addEventListener("ended", nextTrack);
}






//setting up default values when a new track is loaded
const resetValues = () => {
    audioCurrentTimeDOM.textContent = "00:00";
    audioTotalLenght.textContent = "00:00";
    progressBar.value = 0;
}


//function to play and pause the track
function playpauseTrack(){

    if(!isPlaying)
    
    playTrack();
    else {
        pauseTrack();

    }
}


//play the track
function playTrack() {

    globalTrack.play();
    isPlaying = true;
    playButton.innerHTML = '<i id="icon" class="fa-solid fa-pause-circle"></i>';
}
   
  const pauseTrack = () => {
    globalTrack.pause();
    isPlaying = false;
    playButton.innerHTML = '<i id="icon" class="fa-solid fa-play-circle"></i>';


  }
   
  const nextTrack = () => {
    // Go back to the first track if the
    // current one is the last in the track list
    if (trackIndex < trackList.length - 1)
      trackIndex += 1;
    else trackIndex = 0;
      
    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
    
  }
   
  const prevTrack = () => {
    if (trackIndex > 0)
      trackIndex -= 1;
    else trackIndex = trackList.length - 1;
        // Load and play the new track
        loadTrack(trackIndex);
        playTrack();

  }

//sliders
function seekTo() {
    let seekTo = globalTrack.duration * (progressBar.value / 100);
    globalTrack.currentTime = seekTo;
  }
   
  function setVolume() {
    globalTrack.volume = trackVolume.value / 100;
    if (globalTrack.volume === 0){
        volumeIcon.classList.toggle("fa-volume-xmark")
  } else {
    volumeIcon.classList.remove("fa-volume-xmark")
  }}
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(globalTrack.duration)) {
      seekPosition = globalTrack.currentTime * (100 / globalTrack.duration);
      progressBar.value = seekPosition;

      const audioTotalTime = globalTrack.duration
      const secondsToMinutes = Math.floor(audioTotalTime / 60) + ':' + ('0' + Math.floor(audioTotalTime % 60)).slice(-2);
      const audioCurrentTime = globalTrack.currentTime
      const secondsToMinutes2 =  Math.floor(audioCurrentTime / 60) + ':' + ('0' + Math.floor(audioCurrentTime % 60)).slice(-2);
  
      
  
      audioTotalLenght.textContent = secondsToMinutes
      audioCurrentTimeDOM.textContent = secondsToMinutes2

    } else {
        audioCurrentTimeDOM.textContent = ""
        audioTotalLenght.textContent = ""
    }
}


//laods the first track in the tracklist
loadTrack(trackIndex);


//event listeners
playButton.addEventListener('click', function(){
    playpauseTrack();
})

nextRight.addEventListener("click", function(){
    nextTrack();
})

nextLeft.addEventListener("click", function(){
    prevTrack();
})

progressBar.addEventListener("change", function(){
    seekTo();
});

trackVolume.addEventListener("change", function(){
    setVolume();
});































