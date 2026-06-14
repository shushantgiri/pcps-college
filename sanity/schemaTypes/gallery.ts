export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Campus', 'Events', 'Sports', 'Cultural', 'Graduation', 'Other']
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
  ]
}