import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
    }};

    // Fetching the movie url images
    const getMovieImage = async() => {
        try{
            const response = await fetch(url, options)
            const data = await response.json()
            setMovieImage(data.results.primaryImage.url)
        } catch (error) {
          console.error("Upsie, something went wrong!")
        }
      }

      useEffect(() => {
          getMovieImage();
      }, [])

      console.log(movieImage)



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