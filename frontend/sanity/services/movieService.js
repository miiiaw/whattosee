import { sanityClient } from "../client";

export async function fetchAllMovies() {
    const data = await sanityClient.fetch(`*[_type == "movie"]{
        title,
        imdb_id,
        year,
        genre[]->}`)
    return data
}