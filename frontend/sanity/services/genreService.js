import { sanityClient } from "../client";

export async function fetchAllGenres() {
    const data = await sanityClient.fetch(`*[_type == "genre"]{
        title,
        slug}`)
    return data
}