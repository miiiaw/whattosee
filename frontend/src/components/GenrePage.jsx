import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieCard from "./MovieCard"

export default function Genre({ movies }) {
    // Fetching the movie genre from the slug
    const {movieGenre} = useParams()
    // Creating a useSTate for the genre movies
    const [genreMovies, setGenreMovies] = useState([])

    // Using filter to run through movies, and sort out the movies which has a matching genre title. Not quite sure if some() was the best tool to use, but it works.
    useEffect(() => {
        setGenreMovies(movies?.filter(movie =>
            movie.genre?.some(genre => genre.title === movieGenre)))
    }, [movieGenre, movies])


    return (
        <>
        <h1>Movies in the {movieGenre} genre</h1>
        <section className="genrePageSection">
            <h2>{`List of movies: (${genreMovies.length})`}</h2>
            {genreMovies.length > 0 ? (
                genreMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
                ))
            ) : (
            <p>Upsie! You have no movies added in that genre - yet!</p>)
            }
        </section>
        </>
    )
}