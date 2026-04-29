export default class Recorder {
  private stream: MediaStream | null = null
  private mediaRecorder: MediaRecorder | null = null
  private chunks: Blob[] = []
  private analyser: AnalyserNode | null = null
  private audioContext: AudioContext | null = null

  async start(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    // Capture path
    const mimeType = this.pickMimeType()
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType })
    this.chunks = []
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data)
    }
    this.mediaRecorder.start(100) // emit chunks every 100ms

    // Visualization path (optional, but cheap to set up)
    this.audioContext = new AudioContext()
    const source = this.audioContext.createMediaStreamSource(this.stream)
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    source.connect(this.analyser)
  }

  /** Returns recorded audio as a Blob. Does NOT upload. */
  async stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) throw new Error("Not recording")
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, {
          type: this.mediaRecorder!.mimeType,
        })
        this.cleanup()
        resolve(blob)
      }
      this.mediaRecorder.stop()
    })
  }

  /** Read live waveform data for visualization. Call this in a requestAnimationFrame loop. */
  getWaveformData(): Uint8Array | null {
    if (!this.analyser) return null
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(data)
    return data
  }

  private cleanup() {
    this.stream?.getTracks().forEach((t) => t.stop())
    this.audioContext?.close()
    this.stream = null
    this.audioContext = null
    this.analyser = null
    this.mediaRecorder = null
  }

  private pickMimeType(): string {
    const candidates = ["audio/webm", "audio/mp4", "audio/ogg"]
    for (const t of candidates) {
      if (MediaRecorder.isTypeSupported(t)) return t
    }
    return "" // browser default
  }
}
