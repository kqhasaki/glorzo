export function arrayBufferToBase64Str(buff: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buff);

  const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), "");

  return btoa(binaryString);
}

export async function getAudioDuration(buff: ArrayBuffer): Promise<number> {
  const audioContext = new AudioContext();
  const mp3Buffer = buff;
  const res = await new Promise<number>((resolve) =>
    audioContext.decodeAudioData(mp3Buffer, (decodedBuffer) => {
      const durationInSeconds = decodedBuffer.duration;
      resolve(durationInSeconds);
    })
  );
  return res;
}
