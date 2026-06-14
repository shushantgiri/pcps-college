export default {
  name: 'notice',
  title: 'Notices',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Academic', 'Admission', 'Exam', 'Event', 'General']
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
  ]
}