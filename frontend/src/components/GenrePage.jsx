import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieCard from "./MovieCard"

export default function Genre({ movies }) {

    const {movieGenre} = useParams()

    const [genreMovies, setGenreMovies] = useState([])

    useEffect(() => {
        setGenreMovies(movies?.filter(movie =>
            movie.genre?.some(genre => genre.title === movieGenre)))
    }, [movieGenre])


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