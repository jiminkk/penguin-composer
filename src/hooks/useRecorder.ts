import { useCallback, useRef, useState } from "react"
import Recorder from "../audio/recorder"

export function useRecorder() {
  const recorderRef = useRef<Recorder | null>(null)
  const [recording, setRecording] = useState<boolean>(false)
  const [lastRecording, setLastRecording] = useState<Blob | null>(null)

  const start = useCallback(async () => {
    if (recorderRef.current) return // something went wrong
    const recorder = new Recorder()
    await recorder.start()
    recorderRef.current = recorder
    setRecording(true)
  }, [])

  const stop = useCallback(async () => {
    if (!recorderRef.current) return
    try {
      const blob = await recorderRef.current.stop()
      setRecording(false)
      setLastRecording(blob)
      recorderRef.current = null
      return blob
    } catch (e) {
      console.log("sth went wrong: ", e)
    }
  }, [])

  const getWaveformData = useCallback(() => {
    return recorderRef.current.getWaveformData()
  }, [])

  return {
    recording,
    lastRecording,
    start,
    stop,
    getWaveformData,
  }
}
