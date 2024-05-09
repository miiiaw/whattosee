import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'movie',
    title: 'Movie',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'imdb_id',
            title: 'IMDB id',
            type: 'string',
        }),
        defineField({
            name: 'genre',
            title: 'Genre',
            type: 'array',
            of: [{
                type: 'reference', 
                to: {
                    type: 'genre'
                }
            }],
        }),
    ],
})