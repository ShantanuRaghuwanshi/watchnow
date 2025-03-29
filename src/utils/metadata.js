const axios = require('axios'); // Ensure axios is imported

if (!axios) {
  throw new Error('Axios library is not properly initialized');
}

// RapidAPI IMDb configuration
const API_KEY = "b73bf35819mshb05765bbeea1134p163919jsn99a30b9a68f";
if (!API_KEY) {
  throw new Error('RAPIDAPI_KEY is not defined in environment variables');
}
const API_HOST = 'imdb8.p.rapidapi.com';
const BASE_URL = 'https://imdb8.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_HOST
};

// Function to search movies by title
async function searchMovies(title) {
    if (!title) {
        throw new Error('Title parameter is required');
    }

    try {
        const response = await axios.get(`${BASE_URL}/v2/search`, {
            headers,
            params: {
                searchTerm: title,
                type: 'NAME',
                first: 20,
                country: 'US',
                language: 'en-US'
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Search error:', error.response?.data || error.message); // Improved error logging
        throw new Error('Failed to fetch search results');
    }
}

// Function to get top-rated movies
async function getTopMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/title/get-top-rated-movies`, {
      headers
    });

    const movieIds = response.data.slice(0, 10).map(item => item.id.split('/')[2]);
    const metadataPromises = movieIds.map(id => getMovieMetadata(id));
    const movies = await Promise.all(metadataPromises);

    return movies.filter(movie => movie);
  } catch (error) {
    console.error('Top movies error:', error);
    throw new Error('Failed to fetch top movies');
  }
}

// Function to get latest movies
async function getLatestMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/title/get-coming-soon-movies`, {
      headers,
      params: { currentCountry: 'US' }
    });

    const movieIds = response.data.slice(0, 10).map(item => item.id.split('/')[2]);
    const metadataPromises = movieIds.map(id => getMovieMetadata(id));
    const movies = await Promise.all(metadataPromises);

    return movies.filter(movie => movie);
  } catch (error) {
    console.error('Latest movies error:', error);
    throw new Error('Failed to fetch latest movies');
  }
}

// Function to get movie metadata by ID
async function getMovieMetadata(id) {
  if (!id) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/title/get-details`, {
      headers,
      params: { tconst: id }
    });
    return response.data;
  } catch (error) {
    console.error(`Metadata fetch error for ${id}:`, error);
    return null;
  }
}

module.exports = {
  searchMovies,
  getTopMovies,
  getLatestMovies,
  getMovieMetadata
};