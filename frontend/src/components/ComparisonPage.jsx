import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieCard from "./MovieCard"

export default function ComparisonPage({ users, chosenPerson }) {

    // Fetch the slug
    const {person} = useParams()

    // useStates for all the movie items and genres
    const [favoriteItems1, setFavoriteItems1] = useState([])
    const [favoriteItems2, setFavoriteItems2] = useState([])

    const [wishlistItems1, setWishlistItems1] = useState([])
    const [wishlistItems2, setWishlistItems2] = useState([])

    const [genreItems1, setGenreItems1] = useState([])
    const [genreItems2, setGenreItems2] = useState([])


    useEffect(() => {
        // Fetching the userinfo array for each user
        const user1 = users.find(user => user.name === chosenPerson)
        const user2 = users.find(user => user.name === person)

        // Saving the items in their states for later comparison
        setFavoriteItems1(user1?.favoriteMovies)
        setFavoriteItems2(user2?.favoriteMovies)

        setWishlistItems1(user1?.wishlist)
        setWishlistItems2(user2?.wishlist)

        setGenreItems1(user1?.favoriteGenre)
        setGenreItems2(user2?.favoriteGenre)
    }, [users, chosenPerson, person])


    // Checking the movies and genres, filtering out the matching ones and storing them for later use
    const favoriteMoviesList = favoriteItems1?.filter(item1 =>
        favoriteItems2?.some(item2 => item2.title === item1.title))

    const wishlistMoviesList = wishlistItems1?.filter(item1 =>
        wishlistItems2?.some(item2 => item2.title === item1.title))

    const genreList = genreItems1?.filter(item1 =>
        genreItems2?.some(item2 => item2.title === item1.title))


    return (
        <>
        <h1>Matching movies for {person} and  {chosenPerson}</h1>

        <section>
            <h2>Favorite movies</h2>
            {favoriteMoviesList?.map((movie, index) => 
            <MovieCard key={index} movie={movie}/>)}
        </section>

        <section>
            <h2>Movies on the wishlist</h2>
            {wishlistMoviesList?.map((movie, index) => 
            <MovieCard key={index} movie={movie}/>)}
        </section>

        <section>
            <h2>Favorite genres</h2>
            <ul>
            {genreList?.map((genre, index) => 
            <li key={index}>{genre.title}</li> )}
            </ul>
        </section>
        </>
    )
}