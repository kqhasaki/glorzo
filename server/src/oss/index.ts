import OSS from "ali-oss";
import { isURL } from "@glorzo-server/app/utils";

const songStore = new OSS({
  accessKeyId: process.env.GLORZO_OSS_ACCESSKEYID!,
  accessKeySecret: process.env.GLORZO_OSS_ACCESSKEYSECRET!,
  region: process.env.GLORZO_OSS_REGION!,
  bucket: process.env.GLORZO_OSS_BUCKET!,
});

export async function uploadFile(
  name: string,
  file: Buffer
): Promise<OSS.PutObjectResult> {
  const result = await songStore.put(name, file);
  return result;
}

export async function downloadFile(
  target: string
): Promise<OSS.GetObjectResult> {
  let filename;
  if (isURL(target)) {
    const url = new URL(target);
    filename = decodeURIComponent(url.pathname).slice(1);
  } else {
    filename = decodeURIComponent(target);
  }
  const result = await songStore.get(filename);
  return result;
}
