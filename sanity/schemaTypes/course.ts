export default {
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Course Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
      options: {
        list: ['Bachelor', 'Master', 'Diploma', 'Certificate']
      }
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'fees',
      title: 'Fees per Semester (NPR)',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'eligibility',
      title: 'Eligibility',
      type: 'text',
    },
    {
      name: 'affiliatedTo',
      title: 'Affiliated To',
      type: 'string',
    },
  ]
}