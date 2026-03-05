import type { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'

type ShareProps = {
  name: string
}

const Share: FunctionComponent<ShareProps> = ({ name }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = window.location.href
  const text = `I've outlived ${name}! See who you've outlived:`

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "I'm Not Dead Yet!",
        text: text,
        url: url,
      })
    } catch {
      // User cancelled or error
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = `${text}\n${url}`
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent("I'm Not Dead Yet!")}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
  }

  // Use native share on mobile only
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile && typeof navigator.share === 'function') {
    return (
      <button onClick={handleNativeShare}>Share</button>
    )
  }

  // Desktop fallback with options
  return (
    <div className="share-container">
      <button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? 'Close' : 'Share'}
      </button>
      {showOptions && (
        <div className="share-options">
          <a href={shareLinks.twitter} target="_blank" rel="noopener">Twitter/X</a>
          <a href={shareLinks.facebook} target="_blank" rel="noopener">Facebook</a>
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
          <a href={shareLinks.email}>Email</a>
          <button onClick={handleCopy} className="copy-btn">
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Share
