const fs = require('fs');
const songs = require('./songs.json');

// Sort by date
sortedDates = Object.entries(songs).sort(([, valueA], [, valueB]) => valueB['date-sorting'] - valueA['date-sorting']);

function generateHTML() {
	// Store filters
	let filters = [];

	// Generate songs
	let songsHTML = "";
	for (let arrayItem of sortedDates) {
		let songKey = arrayItem[0];
		let entry = arrayItem[1];

		let tagsHTML = "";
		for (let tag of entry["tags"]) {
			tagsHTML += `<li>${tag}</li>`;
			
			// Add to filters array if not there already
			if (!filters.includes(tag)) {
				filters.push(tag);
			}
		}

		// Fix BPM
		let songBPM = entry['bpm'];
		if (songBPM == 999) {
			songBPM = "N/A";
		}
		songsHTML += `
			<button class="song" onclick="playSong('${songKey}');" data-song="${songKey}" data-filter="0" data-search="0">
				<div class="song-info">
					<h3 class="song-name">${entry['name']}</h3>
					<div class="song-info-subsection">
						<ul class="song-tags">
							${tagsHTML}
						</ul>
						<div class="song-desc">${entry['desc']}</div>
					</div>
				</div>
				<div class="song-length">${entry['length']}</div>
				<div class="song-bpm">${songBPM}</div>
				<div class="song-date">${entry['date']}</div>
			</button>
		`;
	}

	// Sort and generate filters
	let filtersHTML = "";
	for (let filter of filters.sort()) {
		filtersHTML += `<li id="filter-${filter}" onclick="toggleFilter('${filter}');">${filter}</li>`;
	}

	// Generate page
	let pageContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>BGM</title>
		
			<meta name="author" content="Gabriel Drozdov">
			<meta name="keywords" content="HTML, CSS, JavaScript, Music, Songs, Creative Coding, Typography, Royalty-free">
			<meta name="description" content="Royalty-free songs for non-existent video games.">
			<meta property="og:url" content="https://bgm.barcoloudly.com/">
			<meta name="og:title" property="og:title" content="BGM">
			<meta property="og:description" content="Royalty-free songs for non-existent video games.">
			<meta property="og:image" content="./assets/meta/opengraph.jpg">
			<link rel="icon" type="image/png" href="assets/meta/favicon.png" />
		
			<link rel="stylesheet" href="/style.css">
		</head>
		<body data-info="false">
		
			<nav class="nav">
				<header class="header">
					<a class="header-marquee" href="https://barcoloudly.com/" target="_blank">
						<h1>Barco Loudly → BGM →&nbsp;</h1>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
						<div>Barco Loudly → BGM →&nbsp;</div>
					</a>
					<button class="header-info" onclick="toggleInfo();">Licensing Information</button>
				</header>
		
				<div class="controls">
					<div class="controls-section">
						<div class="controls-section-label">Search</div>
						<input type="search" class="controls-search" placeholder="Type here!" oninput="searchMusic(this.value);">
					</div>
		
					<div class="controls-divider"></div>
		
					<div class="controls-section">
						<div class="controls-section-label">Filters</div>
						<ul class="controls-tags">
							${filtersHTML}
						</ul>
					</div>
				</div>
				
				<div class="sorting">
					<div class="sorting-label">Sort</div>
					<button class="sorting-tab" id="sorting-name" data-state="0" onclick="setSorting('name');">
						<span>Name</span>
						<svg width="80" height="60" viewBox="0 0 80 60"><polygon points="80 0 0 0 40.572 60 80 0"/></svg>
					</button>
					<button class="sorting-tab" id="sorting-length" data-state="0" onclick="setSorting('length');">
						<span>Length</span>
						<svg width="80" height="60" viewBox="0 0 80 60"><polygon points="80 0 0 0 40.572 60 80 0"/></svg>
					</button>
					<button class="sorting-tab" id="sorting-bpm" data-state="0" onclick="setSorting('bpm');">
						<span>BPM</span>
						<svg width="80" height="60" viewBox="0 0 80 60"><polygon points="80 0 0 0 40.572 60 80 0"/></svg>
					</button>
					<button class="sorting-tab" id="sorting-date" data-state="1" onclick="setSorting('date');">
						<span>Date</span>
						<svg width="80" height="60" viewBox="0 0 80 60"><polygon points="80 0 0 0 40.572 60 80 0"/></svg>
					</button>
				</div>
			</nav>
		
			<main class="music">
				${songsHTML}
			</main>
			
			<div class="player" data-active="0">
		
				<div class="player-song">
					<span class="player-song-label">Now Playing</span> <span class="player-song-title">Nothing Playing</span>
					<div class="player-song-total"><span>Showing <span class="player-song-current">${Object.keys(songs).length}</span>/${Object.keys(songs).length} songs</span></div>
				</div>
		
				<div class="player-controls">
		
					<div class="player-section">
						<button class="player-button" id="player-back" onclick="skipBackwards();">
							<svg viewBox="0 0 24 24"><path d="M12,.2c-3,0-5.7,1.1-7.9,3.1L1.4.6.1,9.2l8.7-1.1-2.7-2.7c1.6-1.4,3.7-2.2,5.9-2.2,4.9,0,8.8,4,8.8,8.8s-4,8.8-8.8,8.8-6.3-1.8-7.9-4.8l-.3-.5-2.5,1.5.2.4c2,3.9,6,6.3,10.4,6.3,6.5,0,11.8-5.3,11.8-11.8S18.5.2,12,.2Z"/><path d="M8.5,9.1v.2c0,0,0,.2,0,.3,0,0-.1.2-.3.3-.1,0-.2.1-.4.2-.2,0-.3,0-.5,0h-.3s0,1.9,0,1.9h.3c.3,0,.6,0,.8-.1.1,0,.3-.1.4-.2v3.2s2,0,2,0v-5.9h-2ZM8.8,10.9h0s0,0,0,0c0,0,0,0,0,0Z"/><path d="M12.9,14.6c.4.3.9.4,1.4.4s1-.1,1.4-.4c.4-.3.7-.6.9-1.1.2-.5.3-1,.3-1.6s-.1-1.1-.3-1.6c-.2-.5-.5-.8-.9-1.1-.8-.5-2-.5-2.8,0-.4.3-.7.6-.9,1.1-.2.5-.3,1-.3,1.6s.1,1.1.3,1.6c.2.5.5.8.9,1.1ZM13.7,12.7c0-.2,0-.4,0-.7s0-.5,0-.7c0-.2.1-.3.2-.4,0,0,.2-.1.3-.1s.3,0,.3.1c.1,0,.2.2.2.4,0,.2,0,.4,0,.7s0,.5,0,.7c0,.2-.1.3-.2.4h0c-.2.2-.5.2-.7,0-.1,0-.2-.2-.2-.4Z"/></svg>
						</button>
						<button class="player-button" id="player-playpause" onclick="togglePlayPause();" data-active="1">
							<svg viewBox="0 0 24 24" class="player-playpause-1"><path d="M9,22h-5V2h5v20ZM20,2h-5v20h5V2Z"/></svg>
							<svg width="24" height="24" viewBox="0 0 24 24" class="player-playpause-2"><path d="M3 22v-20l18 10-18 10z"/></svg>
						</button>
						<button class="player-button" id="player-forward" onclick="skipForwards();">
							<svg viewBox="0 0 24 24"><path d="M12,.2c3,0,5.7,1.1,7.9,3.1l2.7-2.7,1.2,8.6-8.7-1.1,2.7-2.7c-1.6-1.4-3.7-2.2-5.9-2.2C7.1,3.2,3.1,7.1,3.1,12s4,8.8,8.8,8.8,6.3-1.8,7.9-4.8l.3-.5,2.5,1.5-.2.4c-2,3.9-6,6.3-10.4,6.3C5.5,23.8.2,18.5.2,12S5.5.2,12,.2Z"/><path d="M8.5,9.1v.2c0,0,0,.2,0,.3,0,0-.1.2-.3.3-.1,0-.2.1-.4.2-.2,0-.3,0-.5,0h-.3s0,1.9,0,1.9h.3c.3,0,.6,0,.8-.1.1,0,.3-.1.4-.2v3.2s2,0,2,0v-5.9h-2ZM8.8,10.9h0s0,0,0,0c0,0,0,0,0,0Z"/><path d="M12.9,14.6c.4.3.9.4,1.4.4s1-.1,1.4-.4c.4-.3.7-.6.9-1.1.2-.5.3-1,.3-1.6s-.1-1.1-.3-1.6c-.2-.5-.5-.8-.9-1.1-.8-.5-2-.5-2.8,0-.4.3-.7.6-.9,1.1-.2.5-.3,1-.3,1.6s.1,1.1.3,1.6c.2.5.5.8.9,1.1ZM13.7,12.7c0-.2,0-.4,0-.7s0-.5,0-.7c0-.2.1-.3.2-.4,0,0,.2-.1.3-.1s.3,0,.3.1c.1,0,.2.2.2.4,0,.2,0,.4,0,.7s0,.5,0,.7c0,.2-.1.3-.2.4h0c-.2.2-.5.2-.7,0-.1,0-.2-.2-.2-.4Z"/></svg>
						</button>
					</div>
		
					<div class="player-spacer"></div>
		
					<div class="player-section" id="player-playbar">
						<div class="player-time">0:00</div>
						<input type="range" class="player-playbar" min="0" max="100" value="0" oninput="skipToTime(this.value);">
						<div class="player-duration">0:00</div>
					</div>
		
					<div class="player-spacer"></div>
		
					<div class="player-section" id="player-volume">
						<button class="player-button" id="player-mute" onclick="toggleMute();" data-active="0">
							<svg width="24" height="24" viewBox="0 0 24 24" class="player-mute-1"><path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z"/></svg>
							<svg width="24" height="24" viewBox="0 0 24 24" class="player-mute-2"><path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z"/></svg>
						</button>
						<input type="range" class="player-volume" min="0" max="100" value="80" oninput="changeVolume(this.value/100);">
					</div>
		
					<div class="player-spacer"></div>
		
					<div class="player-section">
						<a class="player-button" id="player-download" href="" download>
							<span>Download</span>
						</a>
					</div>
				</div>
			</div>
		
			<div class="info-container" data-active="0">
				<div class="info-content">
					<p>
						“BGM” is short for background music. That’s what this site is — a whole lot of background music. Music for what? Maybe a movie, video game, or YouTube video that hasn’t been made yet. Whatever it is, that’s up to you. I just make the music.
					</p>
					<p>
						All of this music on this site is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons: By Attribution 4.0 License</a>. That means you are free to use this music however you’d like, as long as you credit Gabriel Drozdov (me!) as its creator.
					</p>
					<p>
						For more web-based musical projects, check out <a href="https://barcoloudly.com/" target="_blank">Barco&nbsp;Loudly</a>. This site is typeset using Limkin by <a href="https://toomuchtype.com/" target="_blank">Too&nbsp;Much&nbsp;Type</a>. For more cool websites (or if you’re looking to make a website with us), check out <a href="https://noreplica.com/" target="_blank">No&nbsp;Replica</a>.
					</p>
					<p>
						<span onclick="toggleInfo();" class="info-close">Go back to the music</span>
					</p>
				</div>
			</div>
		
			<script src="/script.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`index.html`, pageContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generateHTML();