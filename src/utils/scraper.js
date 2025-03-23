const axios = require('axios');

const IMDB_GRAPHQL_URL = 'https://graph.imdbapi.dev/v1';

async function fetchGraphQLData(query, variables = {}) {
    console.log('Fetching data from IMDb GraphQL API...');
    try {
        const { data } = await axios.post(IMDB_GRAPHQL_URL, {
            query,
            variables,
        });
        console.log('Data fetched successfully:', data);
        return data.data;
    } catch (error) {
        console.error('Error fetching data from IMDb GraphQL API:', error);
        throw error;
    }
}

async function getTopMovies() {
    console.log('Fetching top-rated movies...');
    const query = `
        query {
            topRatedMovies {
                results {
                    id
                    title
                    year
                    rating
                }
            }
        }
    `;
    const data = await fetchGraphQLData(query);
    console.log('Top-rated movies fetched:', data.topRatedMovies.results);
    return data.topRatedMovies.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
    }));
}

async function getLatestMovies() {
    const query = `
        query {
            latestMovies {
                results {
                    id
                    title
                    year
                }
            }
        }
    `;
    const data = await fetchGraphQLData(query);
    return data.latestMovies.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
    }));
}

async function getLatestSeries() {
    const query = `
        query {
            latestSeries {
                results {
                    id
                    title
                    year
                }
            }
        }
    `;
    const data = await fetchGraphQLData(query);
    return data.latestSeries.results.map(series => ({
        id: series.id,
        title: series.title,
        year: series.year,
    }));
}

async function searchMovies(queryString) {
    const query = `
        query($queryString: String!) {
            searchMovies(query: $queryString) {
                results {
                    id
                    title
                    year
                }
            }
        }
    `;
    const variables = { queryString };
    const data = await fetchGraphQLData(query, variables);
    return data.searchMovies.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
    }));
}

module.exports = {
    getTopMovies,
    getLatestMovies,
    searchMovies,
    getLatestSeries,
};