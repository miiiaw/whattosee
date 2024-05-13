import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchAllGenres } from '../../sanity/services/genreService'
import { updateGenres } from '../../sanity/services/userService'


export default function GenresCollection({ chosenPerson, users }) {
    
    // useState for the specified user - used a useState for this in the Home.jsx too. Changed the names on this one just in case
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [genresList, setGenresList] = useState([])
    
    // fetching all movie genres from Sanity
    useEffect(() => {
        const getAllGenres = async () => {
            const data = await fetchAllGenres()
            setGenresList(data)
        }
        getAllGenres()
    }, [])
    
    // using .find() to fetch and store the array with the right userinfo
    useEffect(() => {
        const name = users.find(user => user.name === chosenPerson)
        name ? setLoggedInUser(name) : null
    }, [users, chosenPerson])


    // Function for updating Sanity
    const handleSubmit = async (genreId) => {
        console.log(genreId)
        if (!loggedInUser) {
            console.error("No logged in user")
            return
        }
        const result = await updateGenres(loggedInUser._id, genreId)
        console.log(result)
    }



    
    return (
        <>
        <h1>The page for the genre collection</h1>
        <section className="genresPage">
            {genresList.map((genre, index) => 
                <article key={index}>
                    <Link to={`/genrePage/${genre.title}` } >
                        <h2>{genre.title}</h2>
                    </Link>
                    <button onClick={() => handleSubmit(genre._id)}>Add genre</button>
                </article>
                )}
        </section>
        </>
    )
}