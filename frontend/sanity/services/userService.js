import { sanityClient, writeClient } from "../client";

export async function fetchAllUsers() {
    const data = await sanityClient.fetch(`*[_type == "user"]{
        _id,
        name,
        favoriteMovies[]->,
        wishlist[]->,
        favoriteGenre[]->}`)
    return data
}

// Tried a lot of different stuff here, oh my lord. Asked ChatGPT for a bit of help. It suggested to run another fetch from Sanity to get the result. It worrrrked.
export async function updateGenres(userId, genreId) {
    try {
        await writeClient
            .patch(userId)
            .setIfMissing({favoriteGenre: []})
            .append("favoriteGenre", [{ _type: 'reference', _ref: genreId }])
            .commit({autoGenerateArrayKeys: true});
        
        const updatedInfo = await sanityClient.fetch(`*[_id == $userId]{
            _id,
            name,
            favoriteMovies[]->,
            wishlist[]->,
            favoriteGenre[]->}`,
            { userId }
        )
        console.log("Update success:", updatedInfo);
        return updatedInfo;
    } catch (error) {
        console.error("Update failed:", error);
        return "Error " + error.message;
    }
}

/* The code that I couldnt get to work properly
export async function updateGenres(userId, genreId) {
    const result = await writeClient
    .patch(userId).setIfMissing({favoriteGenre: []})
    .append("favoriteGenre", [{ _type: 'reference', _ref: genreId }])
    .commit({autoGenerateArrayKeys: true})
    .then(() => {return "Success"})
    .catch((error) => {return "Error:" + error.message})

    return result
}
*/
