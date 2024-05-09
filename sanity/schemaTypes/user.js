import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
        name: 'favoriteMovies',
        title: 'Favorite movies',
        type: 'array',
        of: [{
            type: 'reference', 
            to: {
                type: 'movie'},
        }],
    }),
    defineField({
        name: 'wishlist',
        title: 'Wishlist',
        type: 'array',
        of: [{
            type: 'reference', 
            to: {
                type: 'movie'},
        }],
    }),
    defineField({
      name: 'favoriteGenre',
      title: 'Favorie genres',
      type: 'array',
      of: [{
          type: 'reference', 
          to: {
              type: 'genre'},
      }],
  }),
  ],
})