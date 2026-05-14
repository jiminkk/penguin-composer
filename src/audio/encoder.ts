
function encodeBlobToDataURI(blob: Blob): string {
  return URL.createObjectURL(blob)
}

export { encodeBlobToDataURI }
