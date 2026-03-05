import type { FunctionComponent } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

const Advert: FunctionComponent = () => {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // Push ad when component mounts
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div className="advert-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '100px' }}
        data-ad-client="ca-pub-5254601488823331"
        data-ad-slot="AUTO"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default Advert
