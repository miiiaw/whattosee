import { sanityClient } from "../client";

export async function fetchAllUsers() {
    const data = await sanityClient.fetch(`*[_type == "user"]{
        name,
        favoriteMovies[]->,
        wishlist[]->,
        favoriteGenre[]->}`)
    return data
}