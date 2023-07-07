export const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error('Invalid data URL');

  const mime = mimeMatch[1];
  const binaryStr = atob(arr[1]);
  let n = binaryStr.length;
  const uint8Array = new Uint8Array(n);

  while (n--) {
    uint8Array[n] = binaryStr.charCodeAt(n);
  }
  return new Blob([uint8Array], { type: mime });
};
