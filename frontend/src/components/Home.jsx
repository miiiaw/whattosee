import { useEffect, useState } from "react"
import { fetchAllMovies } from "../../sanity/services/movieService"
import { fetchAllGenres } from "../../sanity/services/genreService"
import { fetchAllUsers } from "../../sanity/services/userService"

export default function Home() {

    const [movies, setMovies] = useState(null)
    const [genres, setGenres] = useState(null)
    const [users, setUsers] = useState(null)


    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovies(data)
    }

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenres(data)
    }

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUsers(data)
    }

    useEffect(() => {
        getAllMovies()
        getAllGenres()
        getAllUsers()
    }, [])


    console.log(movies)

    return (
        <>
        <h1>Movies</h1>
        {movies?.map((movie, index) =>
        <article key={index}>
            <h1>{movie.title}</h1>
            <h3>{movie.imdb_id}</h3>
        </article>)}
        </>
    )
}