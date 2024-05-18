import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Almost the same as the MovieCard. Created a new cache for the movie url. I may regret not having the API call in App.jsx. Too late now.
const AimageCache = {}

export default function AListMovieCard({ movie }) {

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
        if (AimageCache[movie.imdb_id]) {
            setMovieImage(AimageCache[movie.imdb_id])
            return
        }

        try{
            const response = await fetch(url, options)
            const data = await response.json()
            const imageUrl = data.results.primaryImage.url
            AimageCache[movie.imdb_id] = imageUrl
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
                <h3>{`${movie.title} (${movie.year})`}</h3>
                <p>{`from ${movie.fromUser}, and the list ${movie.fromList}`}</p>
            </Link>
        </article>

        </>
    )
}