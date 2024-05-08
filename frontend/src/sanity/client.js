import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: 'pw0hwev7',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
})