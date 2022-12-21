//Todo create functionality to play
//Todo to change song
//Todo to change song backwards
//Todo To loop song
//Todo to inject HTML elements
//Todo to create functionality to change volume

let mousedown = false
let currentIndex = 0;

// DOM elements
const playButton = document.getElementById("playIcon")
const nextLeft = document.getElementById("nextLeftIcon")
const nextRight = document.getElementById("nextRightIcon")
const progressBar = document.getElementById("trackProgress")
const iconElement = document.getElementById("icon")
const artist = document.getElementById("artistName")
const track = document.getElementById("trackName")
const trackImage = document.getElementById("songImage")
const trackVolume = document.getElementById("volumeSlider")
let audioCurrentTimeDOM = document.getElementById("audioCurrentTime")
let audioTotalLenght = document.getElementById("audioTotalLenght")
const destroyButton = document.getElementById("destroyButton")



// Track object
class Track{
    private readonly artist: string;
    private readonly trackName: string;
    public location: string; 
    public playing: boolean; 
    public volume: number;
    private createdTrack: HTMLAudioElement;
    public currentTime: number;
    public imageSRC: string;
    public totalTime: number;

    constructor(artist: string, trackName: string, location: string, imageSRC: string) {
        this.artist = artist;
        this.trackName = trackName;
        this.location = location;
        this.playing = true;
        this.createdTrack = new Audio(this.location)
        this.volume = this.createdTrack.volume;
        this.currentTime = this.createdTrack.currentTime
        this.imageSRC= imageSRC;
        this.totalTime = this.createdTrack.duration
    }

    play(){
        this.createdTrack.play()

        

    }

    pause(){
        this.createdTrack.pause()
    }

    refreshDOM(){
        track.textContent = this.trackName
        artist.textContent = this.artist
        this.updateImage()
        this.updateVolume()
        this.timeUpdate()
        this.seekTo()
        this.refresh()

        

    }

    stop(){
        this.createdTrack.pause()
        this.createdTrack.currentTime = 0
    }

    updateImage(){
        trackImage.src = this.imageSRC;
    }
    

    updateVolume(){
        trackVolume.addEventListener("change", (e) => {
            this.createdTrack.volume = e.currentTarget.value / 100

    })}

    refreshTotalDuration(){
        const audioTotalTime = this.createdTrack.duration
        const secondsToMinutes = Math.floor(audioTotalTime / 60) + ':' + ('0' + Math.floor(audioTotalTime % 60)).slice(-2);
        const audioCurrentTime = this.createdTrack.currentTime
        const secondsToMinutes2 =  Math.floor(audioCurrentTime / 60) + ':' + ('0' + Math.floor(audioCurrentTime % 60)).slice(-2);
        if(Number.isNaN(audioTotalTime)  === true){
        audioTotalLenght.textContent = ""
        audioCurrentTimeDOM.textContent = ""
        } else {
            audioTotalLenght.textContent = secondsToMinutes
            audioCurrentTimeDOM.textContent = secondsToMinutes2
        }
    }

      timeUpdate(){
        this.createdTrack.addEventListener("timeupdate", () => {
            this.refreshTotalDuration()
            this.seekUpdate()

            })
      }

      seekUpdate() {
        let seekPosition = 0;
       
        // Check if the current track duration is a legible number
        if (!isNaN(this.createdTrack.duration)) {
          seekPosition = this.createdTrack.currentTime * (100 /this.createdTrack.duration);
          progressBar.value = seekPosition;
        }}
            
        seekTo() {
            progressBar.addEventListener("change", () => {
                const audioTotalTime = this.createdTrack.duration
                let seekTo = audioTotalTime * (progressBar.value / 100)
                this.createdTrack.currentTime = seekTo;        
            })};

        refresh(){
            this.createdTrack.addEventListener("ended", () => {
                iconElement.classList.toggle("fa-circle-pause")
                this.createdTrack.currentTime = 0
                progressBar.value = 0

            })
        }

/*         finished(){
            this.createdTrack.addEventListener("ended", () => {
                this.stop()
                currentTrack.stop()
                nextTrackIndex()
                console.log(nextTrackIndex())
                checkPlayHandlerStatus()
                currentTrack.refreshDOM()
                iconElement.classList.toggle("fa-circle-pause")
                currentTrack.refresh() */

            }





// existent tracks
const giveIt = new Track("xFran", "Give It", "/dist/resources/GiveIt.mp3", "/dist/resources/giveItImage.jpg");
const euphoria = new Track("xFran", "Euphoria", "/dist/resources/Euphoria.mp3", "/dist/resources/euphoria.jpg")
const colors = new Track("Tobu", "Colors", "/dist/resources/Tobu - Colors (1).mp3","/dist/resources/tobuColorsImage.jpg")

//tracks array
let myTracks = [euphoria, giveIt, colors]

//current track set up using the current index
let currentTrack = myTracks[currentIndex]
let currentTrackVolume = myTracks[currentIndex].volume
currentTrack.refreshDOM()
currentTrack.updateVolume()
currentTrack.refresh()


/* myTracks.forEach(track => {
    let x = document.createElement("p")
    let img = document.createElement("img")
    x.textContent = track.trackName;
    img.src = track.imageSRC
    document.body.appendChild(x)
    document.body.appendChild(img)
}); */

//play button functionalities
const playHandler = (button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        updatePlayHandlerDOM();
        checkPlayHandlerStatus();
        currentTrack.refreshDOM();
        
        
    })
}

const updatePlayHandlerDOM = () => {
        iconElement.classList.toggle("fa-circle-pause")
    }


//depending on the UI's state for now (prone to change)
const checkPlayHandlerStatus = () => {
        if(iconElement.classList.contains("fa-circle-pause")){
        currentTrack.play();
    } else {
        currentTrack.pause();
    }
}

//initialazing the play button
playHandler(playButton)


//next track functionalities
const nextTrackIndex = () => {
    currentTrack = myTracks[++currentIndex]
    if(currentIndex > myTracks.length - 1){
        currentIndex = 0
        currentTrack = myTracks[currentIndex]
        currentTrack.refresh()
}}


const nextTrackHandler = (button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        currentTrack.stop()
        nextTrackIndex()
        currentTrack.refreshDOM()
        checkPlayHandlerStatus()
        currentTrack.refresh()
        progressBar.value = 0
    })
}

//initializing the next track button
nextTrackHandler(nextRight)

//last track functionalities
const pastTrackIndex = () => {
    currentTrack = myTracks[--currentIndex]
    if(currentIndex < 0){
        currentIndex = myTracks.length - 1
        currentTrack = myTracks[currentIndex]
        currentTrack.refresh()
}}

const pastTrackHandler = (button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        currentTrack.stop()
        pastTrackIndex()
        currentTrack.refreshDOM()
        checkPlayHandlerStatus()
        currentTrack.refresh()
        progressBar.value = 0
    })}

pastTrackHandler(nextLeft)

//removed the autoplay function after finishing a track
//because of unexpected behaviour 

destroyButton.addEventListener("click", () => {

})
















