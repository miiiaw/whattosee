import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Create a cache for saved movie image urls
/* The image chache was ChatGPTs idea. I tried without it and everything did work fine, 
and I preferred/wanted to have the API call in the movieCard component -- I admit it seemed most easy,
and I think it makes the code more clean. But on the negative side, making an API call inside a component 
that is rendered A LOT-LOT is not exactly a good thing and I decided I had to change this code before 
all the API calls blacklisted my IP adress. I could have had the API call in App.jsx and store the response in
a useState, then send it down the component tree. BUT it just seemed like a lot of hassle. I could have had
it in Home.jsx, but to be honest -- I tried and although Im sure I wrote all the code right, and the endpoints to
the values in the objects was right, BUT FOR THE LOVE OF EVERYTHING THATS HOLY IT DID NOT WORK. Alas, I turned to ChatGPT
and asked it to give me advice on how to solve this in a clean matter. It suggested to use a cache, and I had to ask 
how the BLEEP does that work. And it turned out that it was much more easy and WHY did I not think of that. */

const imageCache = {}

export default function MovieCard({ movie }) {

    // useState for the Image URL
    const [movieImage, setMovieImage] = useState("")
    // Variables for the API link and keys, got it from the API
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${movie.imdb_id}`;
    const options = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Key': '0300d99748mshf3544bc52011eebp1b82f8jsnbdcae82213fa',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }}

    // Fetching the movie image urls and store them in the cache, IF theyre not already in there
    useEffect(() => {
    const getMovieImage = async() => {
        if (imageCache[movie.imdb_id]) {
            setMovieImage(imageCache[movie.imdb_id])
            return
        }

        try{
            const response = await fetch(url, options)
            const data = await response.json()
            const imageUrl = data.results.primaryImage.url
            imageCache[movie.imdb_id] = imageUrl
            setMovieImage(imageUrl)
        } catch (error) {
          console.error("Upsie, something went wrong!")
        }
      }

      getMovieImage()
      }, [movie.imdb_id])



    return (
        <>
        <article className="movieCard">
            <Link to={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">
                <img src={movieImage} />
                <h3>{movie.title}</h3>
            </Link>
        </article>

        </>
    )
}