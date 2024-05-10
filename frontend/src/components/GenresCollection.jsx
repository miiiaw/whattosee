import { Link } from 'react-router-dom'
import { fetchAllGenres } from '../../sanity/services/genreService'
import { useEffect, useState } from 'react'

export default function GenresCollection() {
    
    const [genresList, setGenresList] = useState([])
    // fetching all movie genres from Sanity
    const getAllGenres = async () => {
    const data = await fetchAllGenres()
    setGenresList(data)
}

useEffect(() => {
    getAllGenres()
}, [])

    return (
        <>
        <h1>The page for the genre collection</h1>
        <section className="genresPage">
            <h2>Genres:</h2>
            <ul>
                {genresList.map((genre, index) => 
                <Link to={`/genrePage/${genre.title}` } key={index} >
                    <li>{genre.title}</li>
                </Link>
                )}
            </ul>
        </section>
        </>
    )
}