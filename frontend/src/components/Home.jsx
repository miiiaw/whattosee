import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"

export default function Home({ users, chosenPerson }) {

    // useState for the specified user
    const [spesUser, setSpesUser] = useState(null)
    // using .find() to fetch and store the array with the right userinfo
    useEffect(() => {
        const name = users.find(user => user.name === chosenPerson)
        name ? setSpesUser(name) : null
    }, [users])


    return (
        <>
        <h1>Hello, {chosenPerson}</h1>
        <section className="homePageSection">
            <h2>Who do you want to watch with?</h2>
            <ul>
            {users?.filter(user => user.name !== chosenPerson).map((user, index) => (
                <Link to="" key={index}>
                <li>{user.name}</li>
                </Link>
            ))}
            </ul>
        </section>
        <section className="homePageSection">
            <h2>Your favorite movies</h2>
            {spesUser?.favoriteMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </section>
        <section className="homePageSection">
            <h2>Your wishlist</h2>
            {spesUser?.wishlist.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </section>
        </>
    )
}
