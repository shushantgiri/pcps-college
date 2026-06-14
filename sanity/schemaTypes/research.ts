export default {
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Computer Science', 'Business', 'Education', 'Science', 'Other']
      }
    },
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'pdf',
      title: 'PDF File',
      type: 'file',
    },
  ]
}