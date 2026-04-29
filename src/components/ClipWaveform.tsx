import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"

interface ClipWaveformProps {
  audio: Blob | string
  height?: number
}

export function ClipWaveform({ audio, height }: ClipWaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      container: containerRef.current,
      height,
      waveColor: "#888",
      progressColor: "#3b82f6",
      cursorColor: "#3b82f6",
    })

    ws.on("play", () => setIsPlaying(true))
    ws.on("pause", () => setIsPlaying(false))
    ws.on("finish", () => setIsPlaying(false))

    // Load the audio — Blob or URL both work
    if (typeof audio === "string") {
      ws.load(audio)
    } else {
      ws.loadBlob(audio)
    }

    wavesurferRef.current = ws

    // Critical: clean up on unmount or when audio prop changes
    return () => {
      ws.destroy()
      wavesurferRef.current = null
    }
  }, [audio, height])

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  )
}
