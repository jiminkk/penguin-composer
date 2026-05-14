import { useEffect, useRef } from "react"

interface LiveWaveformProps {
  getWaveformData: () => Uint8Array | null
  width?: number
  height?: number
}

export function LiveWaveform({
  getWaveformData,
  width = 600,
  height = 100,
}: LiveWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const data = getWaveformData()

      // Clear
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, width, height)

      if (data) {
        ctx.lineWidth = 2
        ctx.strokeStyle = "#3b82f6"
        ctx.beginPath()

        const sliceWidth = width / data.length
        let x = 0

        for (let i = 0; i < data.length; i++) {
          // data values are 0-255, with 128 = silence (centered)
          const v = data[i] / 128.0
          const y = (v * height) / 2

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)

          x += sliceWidth
        }

        ctx.lineTo(width, height / 2)
        ctx.stroke()
      } else {
        // Flat line when not recording
        ctx.strokeStyle = "#444"
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(rafRef.current)
  }, [getWaveformData, width, height])

  return <canvas ref={canvasRef} width={width} height={height} />
}
