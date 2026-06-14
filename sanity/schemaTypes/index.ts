import notice from './notice'
import event from './event'
import course from './course'
import research from './research'
import faculty from './faculty'
import gallery from './gallery'
import collegeInfo from './collegeInfo'

export const schemaTypes = [
  notice,
  event,
  course,
  research,
  faculty,
  gallery,
  collegeInfo,
]

export const schema = {
  types: schemaTypes,
}