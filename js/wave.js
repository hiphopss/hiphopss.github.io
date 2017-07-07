////////////////////////
// INSTRUMENT TRACKS
////////////////////////
var drums = WaveSurfer.create({
	container: '#waveform-drums',
	waveColor: '#FFFFFF',
	progressColor: '#c0392b',
	normalize: 'true',
	barHeight: '1.5'
 });
var bass = WaveSurfer.create({
	container: '#waveform-bass',
	waveColor: '#FFFFFF',
	progressColor: '#2980b9',
	normalize: 'true',
	barHeight: '1.5'
 });
var vocals = WaveSurfer.create({
	container: '#waveform-vocals',
	waveColor: '#FFFFFF',
	progressColor: '#e67e22',
	normalize: 'true',
	barHeight: '1.5'
 });
var other = WaveSurfer.create({
	container: '#waveform-other',
	waveColor: '#FFFFFF',
	progressColor: '#2ecc71',
	normalize: 'true',
	barHeight: '1.5'
 });

var waves = document.querySelectorAll("wave");
for (var i = waves.length - 1; i >= 0; i--) {
	waves[i].style.overflowX = "hidden";
}

function getProgress(wave){
	return wave.getCurrentTime() / wave.getDuration();
}

////////////////////////////////////////////////////////////
function load(){
	var modelname = document.getElementById("model-sel").value;
	// Load Audio
	drums.load('songs/'+ modelname +'/drums.wav');
	bass.load('songs/'+ modelname +'/bass.wav');
	vocals.load('songs/'+ modelname +'/vocals.wav');
	other.load('songs/'+ modelname +'/other.wav');
}
////////////////////////////////////////////////////////////

this.load("dsd_fft_1024");

// Seek event listeners
drums.on('seek', function() {
	var progress = drums.getCurrentTime() / drums.getDuration();
	if(getProgress(bass) != progress) bass.seekTo(progress);
	if(getProgress(drums) != progress) drums.seekTo(progress);
	if(getProgress(vocals) != progress) vocals.seekTo(progress);
	if(getProgress(other) != progress) other.seekTo(progress);
});
bass.on('seek', function() {
	var progress = bass.getCurrentTime() / bass.getDuration();
	if(getProgress(bass) != progress) bass.seekTo(progress);
	if(getProgress(drums) != progress) drums.seekTo(progress);
	if(getProgress(vocals) != progress) vocals.seekTo(progress);
	if(getProgress(other) != progress) other.seekTo(progress);
});
vocals.on('seek', function() {
	var progress = vocals.getCurrentTime() / vocals.getDuration();
	if(getProgress(bass) != progress) bass.seekTo(progress);
	if(getProgress(drums) != progress) drums.seekTo(progress);
	if(getProgress(vocals) != progress) vocals.seekTo(progress);
	if(getProgress(other) != progress) other.seekTo(progress);
});
other.on('seek', function() {
	var progress = other.getCurrentTime() / other.getDuration();
	if(getProgress(bass) != progress) bass.seekTo(progress);
	if(getProgress(drums) != progress) drums.seekTo(progress);
	if(getProgress(vocals) != progress) vocals.seekTo(progress);
	if(getProgress(other) != progress) other.seekTo(progress);
});

// Playback controls
var playButton = document.getElementById('play-pause-btn');
	playButton.addEventListener('click', function(){
		drums.playPause();
		bass.playPause();
		vocals.playPause();
		other.playPause();
	});
var pauseButton = document.getElementById('pause-btn');
	pauseButton.addEventListener('click', function(){
		drums.pause();
		bass.pause();
		vocals.pause();
		other.pause();
	});
var stopButton = document.getElementById('stop-btn');
	stopButton.addEventListener('click', function(){
		drums.stop();
		bass.stop();
		vocals.stop();
		other.stop();
	});
var backwardButton = document.getElementById('backward-btn');
var forwardButton = document.getElementById('forward-btn');
var downloadButton = document.getElementById('download-btn');

// MUTE
var muteDrums = document.getElementById('mute-drums');
var muteBass = document.getElementById('mute-bass');
var muteVocals = document.getElementById('mute-vocals');
var muteOther = document.getElementById('mute-other');

// SOLO
var soloDrums = document.getElementById('solo-drums');
var soloBass = document.getElementById('solo-bass');
var soloVocals = document.getElementById('solo-vocals');
var soloOther = document.getElementById('solo-other');

// VOLUME
var drumsVolume = document.getElementById('drums-volume-input');
	drumsVolume.addEventListener('input', function(e){
		var x = parseInt(e.target.value);
		drums.setVolume(x/100);
	});
var bassVolume = document.getElementById('bass-volume-input');
	bassVolume.addEventListener('input', function(e){
		var x = parseInt(e.target.value);
		bass.setVolume(x/100);
	});
var vocalsVolume = document.getElementById('vocals-volume-input');
	vocalsVolume.addEventListener('input', function(e){
		var x = parseInt(e.target.value);
		vocals.setVolume(x/100);
	});
var otherVolume = document.getElementById('other-volume-input');
	otherVolume.addEventListener('input', function(e){
		var x = parseInt(e.target.value);
		other.setVolume(x/100);
	});

// PANNING
var drumsPanner = drums.backend.ac.createPanner();
drumsPanner.panningMode = 'equalpower';
drums.backend.setFilter(drumsPanner);
var drumsSlider = document.querySelector('#drums-panner-input');
drumsSlider.addEventListener('input', function (e) {
	var x = Math.sin(parseInt(e.target.value) * (Math.PI / 180));
	var z = 1 - Math.abs(x);
    drumsPanner.setPosition(x, 0, z);
});
drumsPanner.setPosition(0,0,1);

var bassPanner = bass.backend.ac.createPanner();
bassPanner.panningMode = 'equalpower';
bass.backend.setFilter(bassPanner);
var bassSlider = document.querySelector('#bass-panner-input');
bassSlider.addEventListener('input', function (e) {
	var x = Math.sin(parseInt(e.target.value) * (Math.PI / 180));
	var z = 1 - Math.abs(x);
	bassPanner.setPosition(x, 0, z);
});
bassPanner.setPosition(0,0,1);

var vocalsPanner = vocals.backend.ac.createPanner();
vocalsPanner.panningMode = 'equalpower';
vocals.backend.setFilter(vocalsPanner);
var vocalsSlider = document.querySelector('#vocals-panner-input');
vocalsSlider.addEventListener('input', function (e) {
	var x = Math.sin(parseInt(e.target.value) * (Math.PI / 180));
	var z = 1 - Math.abs(x);
    vocalsPanner.setPosition(x, 0, z);
});
vocalsPanner.setPosition(0,0,1);

var otherPanner = other.backend.ac.createPanner();
otherPanner.panningMode = 'equalpower';
other.backend.setFilter(otherPanner);
var otherSlider = document.querySelector('#other-panner-input');
otherSlider.addEventListener('input', function (e) {
	var x = Math.sin(parseInt(e.target.value) * (Math.PI / 180));
	var z = 1 - Math.abs(x);
    otherPanner.setPosition(x, 0, z);
});
otherPanner.setPosition(0,0,1);

function buttonsUpdate() {
	// MUTE
	if(drums.getMute()) muteDrums.style.background = "#ff85f0";
	else muteDrums.style.background = "#f5f5f5";
	// Bass mute
	if(bass.getMute()) muteBass.style.background = "#ff85f0";
	else muteBass.style.background = "#f5f5f5";
	// Vocals mute
	if(vocals.getMute()) muteVocals.style.background = "#ff85f0";
	else muteVocals.style.background = "#f5f5f5";
	// Other mute
	if(other.getMute()) muteOther.style.background = "#ff85f0";
	else muteOther.style.background = "#f5f5f5";

	// SOLO
	if(!drums.getMute() && bass.getMute() && vocals.getMute() && other.getMute())
		soloDrums.style.background = "gold";
	else soloDrums.style.background = "#f5f5f5";
	// Bass solo
	if(drums.getMute() && !bass.getMute() && vocals.getMute() && other.getMute())
		soloBass.style.background = "gold";
	else soloBass.style.background = "#f5f5f5";
	// Vocals solo
	if(drums.getMute() && bass.getMute() && !vocals.getMute() && other.getMute())
		soloVocals.style.background = "gold";
	else soloVocals.style.background = "#f5f5f5";
	// Other solo
	if(drums.getMute() && bass.getMute() && vocals.getMute() && !other.getMute())
		soloOther.style.background = "gold";
	else soloOther.style.background = "#f5f5f5";
}

// function tracksUpdate(){
// 	if(drums.getMute()){
// 		drums.params.waveColor = '#f5f5f5';
// 		drums.params.progressColor = '#f5f5f5';
// 	} else {
// 		drums.params.waveColor = '#FFFFF';
// 		drums.params.progressColor = '#c0392b';
// 	}
// }

function backwardAll(){
	drums.skipBackward(2);
	bass.skipBackward(2);
	vocals.skipBackward(2);
	other.skipBackward(2);
}

function forwardAll() {
	drums.skipForward(2);
	bass.skipForward(2);
	vocals.skipForward(2);
	other.skipForward(2);
}

function mute(wave, status) {
	if(!("undefined" === typeof status)) {
		wave.setMute(status);
	} else if(wave.getMute()){
		wave.setMute(false);
		wave.waveColor = '#808080';
	} else {
		wave.setMute(true);
		wave.waveColor = '#FFFFFF';
	}
	buttonsUpdate();
	// tracksUpdate();
}

function getSolo(wave){
	if(wave == drums) return !wave.getMute() && bass.getMute() && vocals.getMute() && other.getMute();
	if(wave == bass) return !wave.getMute() && drums.getMute() && vocals.getMute() && other.getMute();
	if(wave == vocals) return !wave.getMute() && drums.getMute() && bass.getMute() && other.getMute();
	if(wave == other) return !wave.getMute() && drums.getMute() && bass.getMute() && vocals.getMute();
	return false;
}

function solo(wave){
	var muteState = !getSolo(wave);

	if(wave != drums) mute(drums, muteState);
	if(wave != bass) mute(bass, muteState);
	if(wave != vocals) mute(vocals, muteState);
	if(wave != other) mute(other, muteState);
	// Unmute the selected track!
	mute(wave, false);
	buttonsUpdate();
	// tracksUpdate();
}

function resetPan(){
	drumsSlider.value = 0;
	bassSlider.value = 0;
	vocalsSlider.value = 0;
	otherSlider.value = 0;
}

document.onkeyup = function(e){
    if(e.keyCode == 32) playButton.click();
    if (e.keyCode == 37) backwardButton.click();
    if (e.keyCode == 39) forwardButton.click();
    if (e.keyCode == 13) downloadButton.click();
}
// function setTimeAll(progress){
// 	if(getProgress(bass) != progress) bass.seekTo(progress);
// 	if(getProgress(drums) != progress) drums.seekTo(progress);
// 	if(getProgress(vocals) != progress) vocals.seekTo(progress);
// 	if(getProgress(other) != progress) other.seekTo(progress);
// }