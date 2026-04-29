import { useState } from "react"
import styled from "styled-components"
import { useRecorder } from "../hooks/useRecorder"
import { ClipWaveform } from "./ClipWaveform"

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
  const { recording, lastRecording, start, stop, getWaveformData } =
    useRecorder()

  const toggleRecording = async () => {
    if (!recording) {
      console.log("Recording...!")

      // call MediaRecorder to start recording
      start()

      // show visualization?
    } else {
      const blob = await stop()

      console.log("stopped recording!")
      console.log("blob: ", blob)

      // update state to show finished visualization and a button to press upload / generate variations.
    }
  }

  return (
    <div>
      <RecordButton type="button" onClick={() => toggleRecording()}>
        {recording ? "Stop" : "Record"}
      </RecordButton>
      <ClipWaveform audio={lastRecording} />
    </div>
  )
}
