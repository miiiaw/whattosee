import { sanityClient } from "../client";

export async function fetchAllGenres() {
    const data = await sanityClient.fetch(`*[_type == "genre"]{
        _id,
        title,
        slug}`)
    return data
}