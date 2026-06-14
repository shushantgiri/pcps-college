export default {
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: ['Computer Science', 'Business', 'Education', 'Science', 'Administration']
      }
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
  ]
}