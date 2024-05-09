import { useEffect, useState } from "react"
import { fetchAllMovies } from "../../sanity/services/movieService"
import { fetchAllGenres } from "../../sanity/services/genreService"
import { fetchAllUsers } from "../../sanity/services/userService"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [users, setUsers] = useState([])

    const [spesUser, setSpesUser] = useState(null)

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovies(data)
    };

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenres(data)
    };

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUsers(data)
    };

    useEffect(() => {
        getAllMovies()
        getAllGenres()
        getAllUsers()
    }, []);

    useEffect(() => {
        const name = users.find(user => user.name === "Mia")
        name ? setSpesUser(name) : null
    }, [users])

    return (
        <>
        <h1>Movies</h1>
        <article>
            <h1>{spesUser?.name}</h1>
            {spesUser?.wishlist.map((movie, index) => (
              <div key={index}>
              <h2>{movie.title}</h2>
              <span>{movie.imdb_id}</span>
              </div>
            ))}
        </article>
        </>
    )
}
