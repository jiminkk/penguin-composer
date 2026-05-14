import { apiRequest } from "./client"
import mime from "mime-types"

export interface GenerateInput {
  inputAudio: Blob
  prompt: string
  duration?: number
}

interface GenerateResponse {
  id: string
  status: string
}

export default function startGeneration(
  input: GenerateInput,
): Promise<GenerateResponse> {
  const { inputAudio, prompt, duration } = input
  const inputFileExt = mime.extension(inputAudio.type)
  console.log(`input extension file: ${inputFileExt}`)

  const form = new FormData()
  form.append("audio", inputAudio, `input.${inputFileExt}`)
  form.append("prompt", prompt)
  if (duration) form.append("duration", String(duration))

  return apiRequest("/generate", {
    method: "POST",
    body: form,
  })
}
