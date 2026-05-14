const BASE_URL = import.meta.env.VITE_API_URL

if (!BASE_URL) {
  throw new Error("VITE_API_URL is not set")
}

export class ApiError extends Error {
  name: string

  constructor(status: number, statusText: string, body: string) {
    super(`API ${status}: ${statusText} — ${body}`)
    this.name = "ApiError"
  }
}

interface RequestOptions {
  method?: "GET" | "POST"
  body?: unknown
  signal?: AbortSignal
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, signal } = options
  const isFormData = body instanceof FormData
  const headers: Record<string, string> = {}
  if (body && !isFormData) headers["Content-Type"] = "application/json"

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    signal,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new ApiError(res.status, res.statusText, text)
  }

  return res.json() as Promise<T>
}
