import type { FunctionComponent } from 'preact'
import { useRef, useState } from 'preact/hooks'

type ShareCardProps = {
  name: string
  yourDays: number
  celebDays: number
  profession: string
  birthDate: string
}

const ShareCard: FunctionComponent<ShareCardProps> = ({ name, yourDays, celebDays, profession, birthDate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [canShareFiles, setCanShareFiles] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  const drawCornerOrnament = (ctx: CanvasRenderingContext2D, x: number, y: number, flipX: boolean, flipY: boolean) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)

    // Elegant corner flourish
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, 30)
    ctx.quadraticCurveTo(0, 0, 30, 0)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(5, 25)
    ctx.quadraticCurveTo(5, 5, 25, 5)
    ctx.stroke()

    // Small decorative dot
    ctx.fillStyle = '#8b7355'
    ctx.beginPath()
    ctx.arc(12, 12, 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  const generateCard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = 600
    const height = 470
    canvas.width = width
    canvas.height = height

    // Cream/parchment background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#f8f4e8')
    gradient.addColorStop(0.5, '#f5f0e1')
    gradient.addColorStop(1, '#efe9d9')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Subtle paper texture effect (noise pattern)
    ctx.globalAlpha = 0.03
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff'
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1)
    }
    ctx.globalAlpha = 1

    // Elegant double border
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 2
    ctx.strokeRect(25, 25, width - 50, height - 50)
    ctx.strokeStyle = '#c4b59d'
    ctx.lineWidth = 1
    ctx.strokeRect(32, 32, width - 64, height - 64)

    // Corner ornaments
    drawCornerOrnament(ctx, 25, 25, false, false)
    drawCornerOrnament(ctx, width - 25, 25, true, false)
    drawCornerOrnament(ctx, 25, height - 25, false, true)
    drawCornerOrnament(ctx, width - 25, height - 25, true, true)

    // Decorative divider line
    const dividerY = 95
    ctx.strokeStyle = '#c4b59d'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(80, dividerY)
    ctx.lineTo(width / 2 - 60, dividerY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(width / 2 + 60, dividerY)
    ctx.lineTo(width - 80, dividerY)
    ctx.stroke()

    // Small cross/flower in center of divider
    ctx.fillStyle = '#8b7355'
    ctx.beginPath()
    ctx.arc(width / 2, dividerY, 4, 0, Math.PI * 2)
    ctx.fill()

    // "I've outlived" header
    ctx.fillStyle = '#5c5041'
    ctx.font = 'italic 22px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText("I've outlived", width / 2, 75)

    // Celebrity name
    ctx.fillStyle = '#2d2820'
    ctx.font = '36px Georgia, serif'

    // Word wrap for long names
    const maxWidth = width - 100
    if (ctx.measureText(name).width > maxWidth) {
      ctx.font = '28px Georgia, serif'
    }
    ctx.fillText(name, width / 2, 140)

    // Profession
    ctx.fillStyle = '#6b6255'
    ctx.font = 'italic 18px Georgia, serif'
    ctx.fillText(profession, width / 2, 172)

    // Decorative small divider
    ctx.strokeStyle = '#c4b59d'
    ctx.beginPath()
    ctx.moveTo(width / 2 - 40, 195)
    ctx.lineTo(width / 2 + 40, 195)
    ctx.stroke()

    // Their stats
    ctx.fillStyle = '#5c5041'
    ctx.font = '18px Georgia, serif'
    ctx.fillText(`who made it to ${celebDays.toLocaleString()} days`, width / 2, 235)

    // My stats
    ctx.fillStyle = '#2d2820'
    ctx.font = '18px Georgia, serif'
    ctx.fillText("I'm at", width / 2, 280)

    ctx.fillStyle = '#8b6914'
    ctx.font = 'bold 32px Georgia, serif'
    ctx.fillText(`${yourDays.toLocaleString()} days`, width / 2, 320)

    const diff = yourDays - celebDays
    const diffText = diff === 1 ? '1 day' : `${diff.toLocaleString()} days`
    ctx.fillStyle = '#6b6255'
    ctx.font = 'italic 18px Georgia, serif'
    ctx.fillText(`${diffText} ahead`, width / 2, 355)

    // Dates line: birthday and today
    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr)
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    const formattedBirthday = formatDate(birthDate)

    ctx.fillStyle = '#8b7355'
    ctx.font = '14px Georgia, serif'
    ctx.fillText(`Born ${formattedBirthday}  ·  Still alive ${today}`, width / 2, 395)

    // Footer divider
    ctx.strokeStyle = '#c4b59d'
    ctx.beginPath()
    ctx.moveTo(180, 410)
    ctx.lineTo(width - 180, 410)
    ctx.stroke()

    // Footer
    ctx.fillStyle = '#8b7355'
    ctx.font = '14px Georgia, serif'
    ctx.fillText('notdeadyet.uk', width / 2, 435)

    // Generate image URL
    setImageUrl(canvas.toDataURL('image/png'))

    // Check if file sharing is supported (mobile only)
    canvas.toBlob((blob) => {
      if (blob && isMobile) {
        const file = new File([blob], 'test.png', { type: 'image/png' })
        const canShare = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })
        setCanShareFiles(canShare)
      } else {
        setCanShareFiles(false)
      }
    })
  }

  const downloadImage = () => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.download = `in-memoriam-${name.replace(/\s+/g, '-').toLowerCase()}.png`
    link.href = imageUrl
    link.click()
  }

  const shareImage = async () => {
    if (!canvasRef.current) return

    // On mobile with file share support, use native share
    if (canShareFiles) {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return

        const file = new File([blob], 'in-memoriam.png', { type: 'image/png' })
        const url = window.location.href

        try {
          await navigator.share({
            files: [file],
            title: "I'm Not Dead Yet!",
            text: `I've outlived ${name}! ${url}`,
          })
        } catch {
          // User cancelled
        }
      })
    } else {
      // On desktop, toggle share options
      setShowShareOptions(!showShareOptions)
    }
  }

  const url = window.location.href
  const text = `I've outlived ${name}!`
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent("I'm Not Dead Yet!")}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
  }

  return (
    <div className="share-card">
      <canvas ref={canvasRef} style={{ display: imageUrl ? 'none' : 'none' }} />

      {!imageUrl ? (
        <button onClick={generateCard} className="card-btn">
          Create condolences card
        </button>
      ) : (
        <div className="card-preview">
          <img src={imageUrl} alt="Condolences card" />
          <div className="card-actions">
            <button onClick={downloadImage}>Download</button>
            <button onClick={shareImage}>{showShareOptions ? 'Close' : 'Share'}</button>
            <button onClick={() => setImageUrl(null)} className="card-close">×</button>
          </div>
          {showShareOptions && (
            <div className="share-options">
              <a href={shareLinks.twitter} target="_blank" rel="noopener">Twitter/X</a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener">Facebook</a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
              <a href={shareLinks.email}>Email</a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ShareCard
