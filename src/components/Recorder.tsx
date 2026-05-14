import styled from "styled-components"
import { useRecorder } from "../hooks/useRecorder"
import { ClipWaveform } from "./ClipWaveform"
import { set } from "idb-keyval"
import startGeneration from "../api/generate"

const RecordButton = styled.button`
  margin-bottom: 24px;
  display: inline-flex;
  border-radius: 6px;
  border: 2px solid transparent;
  background: rgba(139, 92, 246, 0.1);
  padding: 6px 12px;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: 1rem;
  color: #7c3aed;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(139, 92, 246, 0.5);
  }

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
`

export function RecorderComponent() {
  const { recording, lastRecording, start, stop } = useRecorder()

  const toggleRecording = async () => {
    if (!recording) {
      console.log("Recording...!")

      // call MediaRecorder to start recording
      start()

      // show visualization?
    } else {
      const blob = await stop()
      console.log("stopped recording!")

      await set("lastRecording", blob)
    }
  }

  const getVariation = async () => {
    await startGeneration({
      inputAudio: lastRecording,
      prompt:
        "make a next set of harmony in a minor key based on the keys from this input recording",
    })
  }

  return (
    <div>
      <RecordButton type="button" onClick={() => toggleRecording()}>
        {recording ? "Stop" : "Record"}
      </RecordButton>
      <ClipWaveform audio={lastRecording} />

      <button onClick={() => getVariation()}>generate!</button>
      {/* <GeneratedWaveform audio={lastRecording} /> */}
    </div>
  )
}
