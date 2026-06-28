export const TMDB = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    BASE_URL: "https://api.themoviedb.org/3",
    IMAGE_URL: "https://image.tmdb.org/t/p/w500",
    headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
        accept: "application/json",
    }
}

async function fetchFromAPI<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${TMDB.BASE_URL}${endpoint}`, {
        headers: TMDB.headers,
        signal,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovies = async (query?: string, signal?: AbortSignal): Promise<Movie[]> => {
    if (query) {
        return fetchFromAPI(`/search/movie?query=${encodeURIComponent(query)}`, signal);
    }
    return fetchFromAPI("/discover/movie?sort_by=popularity.desc", signal);
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB.BASE_URL}/movie/${movieId}?api_key=${TMDB.API_KEY}`, {
            headers: TMDB.headers,
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to get movie details of id ${movieId}');
        const data = await response.json()
        console.log(data);
        return data
    } catch(error) {
        console.log(error);
        throw error
    }
    
}
