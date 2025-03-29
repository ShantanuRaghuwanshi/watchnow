import { getTopMovies, getLatestMovies, getLatestSeries, searchMovies } from '../utils/metadata.js';

const videoContainer = document.getElementById('video-container');
const videoList = document.getElementById('video-list');

// Function to fetch movie metadata from the scraper
async function fetchMovieMetadata() {
    console.log('Fetching movie metadata...');
    const response = await fetch('/api/movies'); // Assuming there's an API endpoint to get movie data
    const movies = await response.json();
    console.log('Movie metadata fetched:', movies);
    return movies;
}

    for (const movie of movies) {
        const listItem = document.createElement('li');
        listItem.innerText = movie.title;
        listItem.onclick = () => playVideo(movie.id);
        videoList.appendChild(listItem);
    }

// Function to play video using vidsrc
function playVideo(videoId) {
    console.log('Playing video with ID:', videoId);
    const videoSrc = `https://vidsrc.me/watch/${videoId}`; // Construct video source URL
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    videoContainer.innerHTML = `<iframe src="${videoSrc}" frameborder="0" allowfullscreen onload="document.getElementById('loader').style.display = 'none'; console.log('Video loaded successfully.');"></iframe>`;
}

// Initialize the application
async function init() {
    const movies = await fetchMovieMetadata();
    renderVideoList(movies);
}

init();

async function displayLatestMovies() {
    const latestMovies = await getLatestMovies();
    const latestMoviesList = document.getElementById('latest-movies');
    latestMoviesList.innerHTML = latestMovies.map(movie => `<li>${movie.title} (${movie.year})</li>`).join('');
}

async function displayLatestSeries() {
    const latestSeries = await getLatestSeries();
    const latestSeriesList = document.getElementById('latest-series');
    latestSeriesList.innerHTML = latestSeries.map(series => `<li>${series.title} (${series.year})</li>`).join('');
}

async function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        console.log('Search query is empty.');
        return;
    }
    console.log('Searching for movies with query:', query);
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    const results = await searchMovies(query);s
    loader.style.display = 'none';
    console.log('Search results:', results);
    const searchResultsList = document.getElementById('search-results');
    searchResultsList.innerHTML = results.map(result => `<li>${result.title} (${result.year})</li>`).join('');
}

document.getElementById('search-button').addEventListener('click', handleSearch);

function highlightListItem(event) {
    const listItems = document.querySelectorAll('li');
    for (const item of listItems) {
        item.style.backgroundColor = ''; // Reset all items
    }
    event.target.style.backgroundColor = '#dcdde1'; // Highlight selected item
}

for (const ul of document.querySelectorAll('ul')) {
    ul.addEventListener('click', highlightListItem);
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    displayLatestMovies();
    displayLatestSeries();
    console.log('Application initialized.');
});

document.getElementById('imdb-search-button').addEventListener('click', async () => {
    console.log('IMDb search button clicked.');
    const imdbId = document.getElementById('imdb-id-input').value.trim();
    if (imdbId) {
        console.log('IMDb ID provided:', imdbId);
        try {
            const metadata = await getMovieMetadata(imdbId);
            console.log('Fetched metadata:', metadata);
            const container = document.getElementById('metadata-container');
            container.innerHTML = `<pre>${JSON.stringify(metadata, null, 2)}</pre>`;
        } catch (error) {
            console.error('Error fetching metadata:', error);
        }
        const iframe = document.getElementById('video-player');
        const loader = document.getElementById('loader');
        loader.classList.remove('hidden');
        console.log('Fetching video for IMDb ID:', imdbId);
        iframe.src = `https://vidbinge.dev/embed/movie/${imdbId}`;
        iframe.onload = () => {
            loader.classList.add('hidden');
            console.log('Video loaded successfully.');
        };
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('scrolling', 'no');
    } else {
        console.log('No IMDb ID provided.');
    }
});

document.getElementById('name-search-button').addEventListener('click', async () => {
    console.log('Name search button clicked.');
    const movieName = document.getElementById('movie-name-input').value.trim();
    if (movieName) {
        console.log('Movie name provided:', movieName);
        try {
            const results = await searchMovies(movieName);
            console.log('Search results:', results);
            alert(`Found ${results.length} results. Check console for details.`);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    } else {
        console.log('No movie name provided.');
    }
});

document.getElementById('imdb-search-button').addEventListener('click', () => {
    const imdbId = document.getElementById('imdb-id-input').value.trim();
    if (imdbId) {
        const videoUrl = `https://vidsrc.dev/embed/movie/${imdbId}`;
        const videoPlayer = document.getElementById('video-player');
        videoPlayer.src = videoUrl;
    } else {
        alert('Please enter a valid IMDb ID.');
    }
});