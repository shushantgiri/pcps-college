import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      <NextStudio config={config} />
    </div>
  )
}