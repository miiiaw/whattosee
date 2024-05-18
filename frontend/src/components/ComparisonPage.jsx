import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"
import AListMovieCard from "./AListMovieCard"

export default function ComparisonPage({ users, chosenPerson }) {

    // Fetching the person from the slug. Not to be confused with the logged in user wich is stored in the chosenPerson. I may should have created a bit more different names.
    const {person} = useParams()

    // useStates for all the movies and genres. Using items instead of movies cause the confusion is high. 1 is for the logged in user, 2 is for the friend.
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

    // The A-list. Again using filter and some, to filter out some of the movies. Then using map to open up the array of objects and adding keys and values for user/person and the list.
    // A bit of help from ChatGPT with the idea of using map in this way.
    const newList = favoriteItems1
        ?.filter(item1 => 
        wishlistItems2?.some(item2 => item2.title === item1.title) &&
        !wishlistMoviesList?.some(movie => movie.title === item1.title) &&
        !favoriteMoviesList?.some(movie => movie.title === item1.title))
        ?.map(movie => ({ ...movie, fromUser: chosenPerson, fromList: 'Favorites'}))

    const newList2 = favoriteItems2
        ?.filter(item1 =>
        wishlistItems1?.some(item2 => item2.title === item1.title) &&
        !wishlistMoviesList?.some(movie => movie.title === item1.title) &&
        !favoriteMoviesList?.some(movie => movie.title === item1.title))
        ?.map(movie => ({ ...movie, fromUser: person, fromList: 'Favorites'}))

    // Concatinating the two lists into one
    const theAList = newList.concat(newList2)

    //console.log(theAList)

    return (
        <>
        <h1>Matching movies for {person} and  {chosenPerson}</h1>

        <section className="comparisonPage">
            <h2>The A list</h2>
            {theAList?.map((movie, index) => 
            <AListMovieCard key={index} movie={movie}/>)}
        </section>

        <section className="comparisonPage">
            <h2>Catch up!</h2>
            {wishlistMoviesList?.map((movie, index) => 
            <MovieCard key={index} movie={movie}/>)}
        </section>


        <section className="comparisonPage">
            <h2>Go safe!</h2>
            {favoriteMoviesList?.map((movie, index) => 
            <MovieCard key={index} movie={movie}/>)}
        </section>


        <section className="comparisonPage">
            <h2>Explore</h2>
            <ul>
                {genreList?.map((genre, index) => 
                <li key={index}>
                    <Link to={`/genrePage/${genre.title}` }>{genre.title}</Link>
                </li> )}
            </ul>
        </section>
        </>
    )
}