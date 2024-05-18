import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchAllGenres } from '../../sanity/services/genreService'
import { updateGenres } from '../../sanity/services/userService'


export default function GenresCollection({ chosenPerson, users }) {
    
    // useState for the specified/chosen user - used a useState for this in the Home.jsx too. Changed the names on this one just in case theyd clash.
    const [loggedInUser, setLoggedInUser] = useState(null)
    // useState for the list of genres
    const [genresList, setGenresList] = useState([])
    
    // Fetching all the movie genres from Sanity and putting them in the useState
    useEffect(() => {
        const getAllGenres = async () => {
            const data = await fetchAllGenres()
            setGenresList(data)
        }
        getAllGenres()
    }, [])
    
    // Using .find() to fetch and store the array with the right userinfo
    useEffect(() => {
        const name = users.find(user => user.name === chosenPerson)
        name ? setLoggedInUser(name) : null
    }, [users, chosenPerson])

    // Creating a function for calling the updateGenres from Sanity services, and update the userinfo with the result. Be patient with that one.
    const handleSubmit = async (genreId) => {
        const result = await updateGenres(loggedInUser._id, genreId)

        setLoggedInUser(result[0])
    }

    // Creating a function to check which genres is in the users list, for use later in the button.
    const addedGenre = (genreTitle) => {
        return loggedInUser?.favoriteGenre?.some(g => g.title === genreTitle);
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
                    <button onClick={() => handleSubmit(genre._id)}>
                    {addedGenre(genre.title) ? 'Added' : 'Add to favorites'}
                    </button>
                </article>
                )}
        </section>
        </>
    )
}