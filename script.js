// Fetch data
// Fetch JSON and build index
let songData;
fetch('songs.json')
	.then((response) => response.json())
	.then((json) => {
		songData = json;
		buildSorting();
	})

// Build sorting objects
let sortedNames, sortedLengths, sortedBPMs, sortedDates;
function buildSorting() {
	// Names
	sortedNames = Object.entries(songData).sort(([, valueA], [, valueB]) => valueA['alpha'].localeCompare(valueB['alpha']));

	// Length
	sortedLengths = Object.entries(songData).sort(([, valueA], [, valueB]) => valueA['length-sorting'] - valueB['length-sorting']);

	// BPM
	sortedBPMs = Object.entries(songData).sort(([, valueA], [, valueB]) => valueA.bpm - valueB.bpm);

	// Date
	sortedDates = Object.entries(songData).sort(([, valueA], [, valueB]) => valueA['date-sorting'] - valueB['date-sorting']);
}

// Change color on scroll
const root = document.querySelector('html');
const body = document.querySelector('body');
let baseHue = 0;
let percentScrolled = 0;
function setAxes() {
	const scrollTop = body.offsetTop;
	const scrollHeight = body.offsetHeight;
	const scrollPosition = window.scrollY;
	const pixelsScrolled = scrollPosition - scrollTop;

	// Calculate the percent scrolled (0–1)
	percentScrolled = pixelsScrolled/(scrollHeight - window.innerHeight);

	// Correct bounds
	if (percentScrolled < 0) {
		percentScrolled = 0;
	} else if (percentScrolled > 1) {
		percentScrolled = 1;
	}

	// Set CSS variable
	updateColor();
}
body.addEventListener('wheel', setAxes);

// Gradually shift color
function setColor() {
	baseHue++;
	updateColor();
}
setInterval(setColor, 100);

// Update color
function updateColor() {
	root.style.setProperty('--base-hue', Math.round(percentScrolled*document.documentElement.scrollHeight/50)+baseHue + "deg");
}

// Sorting
let currentSorting = ['date', 'descending'];
function setSorting(newSorting) {
	// Reset all sorting
	for (let sortingTab of document.querySelectorAll('.sorting-tab')) {
		sortingTab.dataset.state = 0;
	}

	// Scroll to top
	window.scrollTo(0, 0);
	percentScrolled = 0;
	updateColor();

	// Set active tab
	let sortingTab = document.querySelector(`#sorting-${newSorting}`);
	if (currentSorting[0] == newSorting) {
		if (currentSorting[1] == 'descending') {
			currentSorting[1] = 'ascending';
			sortingTab.dataset.state = 2;
		} else {
			currentSorting[1] = 'descending';
			sortingTab.dataset.state = 1;
		}
	} else {
		currentSorting = [newSorting, 'descending'];
		sortingTab.dataset.state = 1;
	}

	// Actually sort now
	const music = document.querySelector('.music');
	if (currentSorting[0] == "name") {
		if (currentSorting[1] == "descending") {
			for (let entry of sortedNames) {
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		} else {
			for (let i=sortedNames.length-1; i>-1; i--) {
				let entry = sortedNames[i];
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		}

	} else if (currentSorting[0] == "length") {
		if (currentSorting[1] == "descending") {
			for (let entry of sortedLengths) {
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		} else {
			for (let i=sortedLengths.length-1; i>-1; i--) {
				let entry = sortedLengths[i];
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		}

	} else if (currentSorting[0] == "bpm") {
		if (currentSorting[1] == "descending") {
			for (let entry of sortedBPMs) {
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		} else {
			for (let i=sortedBPMs.length-1; i>-1; i--) {
				let entry = sortedBPMs[i];
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		}
		
	} else if (currentSorting[0] == "date") {
		if (currentSorting[1] == "ascending") {
			for (let entry of sortedDates) {
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		} else {
			for (let i=sortedDates.length-1; i>-1; i--) {
				let entry = sortedDates[i];
				let songKey = entry[0];
				let songElement = document.querySelector(`[data-song="${songKey}"]`);
				music.appendChild(songElement);
			}
		}
		
	}
}

// Filter by tag
let filters = [];
function toggleFilter(newFilter) {
	let filterButton = document.querySelector(`#filter-${newFilter}`);
	if (filters.includes(newFilter)) {
		const index = filters.indexOf(newFilter);
		if (index > -1) {
			filters.splice(index, 1);
		}
		filterButton.dataset.active = 0;
	} else {
		filters.push(newFilter);
		filterButton.dataset.active = 1;
	}

	// Scroll to top
	window.scrollTo(0, 0);
	percentScrolled = 0;
	updateColor();

	// Hide/show songs based on active filters
	if (filters.length > 0) {
		for (let song of document.querySelectorAll('.song')) {
			song.dataset.filter = 1;
			for (let filter of filters) {
				if (songData[song.dataset.song]['tags'].includes(filter)) {
					song.dataset.filter = 0;
				}
			}
		}
	} else {
		for (let song of document.querySelectorAll('.song')) {
			song.dataset.filter = 0;
		}
	}

	updateSongTotalCount();
}

// Search
let searchKey = "";
function searchMusic(newSearch) {
	searchKey = newSearch;

	// Scroll to top
	window.scrollTo(0, 0);
	percentScrolled = 0;
	updateColor();

	if (searchKey.length > 0) {
		for (let song of document.querySelectorAll('.song')) {
			song.dataset.search = 1;
			if (songData[song.dataset.song]['name'].toLowerCase().includes(searchKey.toLowerCase())) {
				song.dataset.search = 0;
			}
		}
	} else {
		for (let song of document.querySelectorAll('.song')) {
			song.dataset.search = 0;
		}
	}

	updateSongTotalCount();
}

// Update songs showing count
let totalSongsShowing = 0;
function updateSongTotalCount() {
	totalSongsShowing = 0;
	for (let song of document.querySelectorAll('.song')) {
		if (parseInt(song.dataset.filter) == 0 && parseInt(song.dataset.search) == 0) {
			totalSongsShowing++;
		}
	}

	const playerSongCurrent = document.querySelector('.player-song-current');
	playerSongCurrent.innerText = totalSongsShowing;
}

// Player object
let player = new Audio();
let currentVolume = .8;
player.volume = currentVolume;
let currentTime = 0;
player.addEventListener('ended', () => {
	playing = false;
	const playButton = document.querySelector('#player-playpause');
	playButton.dataset.active = 0;
});
player.addEventListener('timeupdate', () => {
	currentTime = player.currentTime;
	const playbar = document.querySelector('.player-playbar');
	playbar.value = Math.round(currentTime);
	refreshCurrentTime();
});
player.addEventListener('loadeddata', () => {
	const playbar = document.querySelector('.player-playbar');
	playbar.max = Math.round(player.duration);
});

// Format current time for display
function refreshCurrentTime() {
	let minutes = Math.floor(currentTime/60);
	// if (minutes < 10) {
	// 	minutes = "0"+minutes;
	// }

	let seconds = Math.floor(currentTime%60);
	if (seconds < 10) {
		seconds = "0"+seconds;
	}

	const playerTime = document.querySelector('.player-time');
	playerTime.innerText = `${minutes}:${seconds}`;
}

// Play song
let currentSong = "";
let playing = false;
function playSong(songKey) {
	// Update current song
	currentSong = songKey;

	// Show and update player
	const playerElement = document.querySelector('.player');
	playerElement.dataset.active = 1;
	const playerDuration = document.querySelector('.player-duration');
	playerDuration.innerText = songData[songKey]['length'];
	const playerDownload = document.querySelector('#player-download');
	playerDownload.href = 'music/'+songData[songKey]['download'];
	const playerTitle = document.querySelector('.player-song-title');
	playerTitle.innerText = songData[songKey]['name'];
	const playButton = document.querySelector('#player-playpause');
	playButton.dataset.active = 1;

	// Play song
	player.src = 'music/'+songData[songKey]['file'];
	player.play();
	playing = true;

	// Activate current song
	for (let song of document.querySelectorAll('.song')) {
		song.dataset.active = 0;
	}
	let song = document.querySelector(`[data-song="${songKey}"]`);
	song.dataset.active = 1;
}

// Playbar controls
function skipBackwards() {
	player.currentTime = currentTime - 10;
	player.play();
}
function togglePlayPause() {
	const playButton = document.querySelector('#player-playpause');
	if (playing) {
		playing = false;
		player.pause();
		playButton.dataset.active = 0;
	} else {
		playing = true;
		player.play();
		playButton.dataset.active = 1;
	}
}
function skipForwards() {
	player.currentTime = currentTime + 10;
	player.play();
}
function skipToTime(newTime) {
	player.currentTime = newTime;
}

// Volume controls
let playerMuted = false;
function toggleMute() {
	const muteButton = document.querySelector('#player-mute');
	const playerVolume = document.querySelector('.player-volume');
	if (playerMuted) {
		playerMuted = false;
		muteButton.dataset.active = 0;
		player.volume = currentVolume;
		playerVolume.value = currentVolume*100;
	} else {
		playerMuted = true;
		muteButton.dataset.active = 1;
		player.volume = 0;
		playerVolume.value = 0;
	}
}
function changeVolume(newVolume) {
	const muteButton = document.querySelector('#player-mute');
	playerMuted = false;
	muteButton.dataset.active = 0;
	currentVolume = newVolume;
	player.volume = currentVolume;
}

// Show/hide info
let showInfo = false;
function toggleInfo() {
	showInfo = !showInfo;
	const body = document.querySelector('body');
	body.dataset.info = showInfo;
}

// Capture mouse clicks from links on songs
for (let songLink of document.querySelectorAll('.song a')) {
	songLink.addEventListener('click', (e) => {
		e.stopPropagation();
	})
}