import OSS from "ali-oss";

const store = new OSS({
  accessKeyId: "LTAI5tP3mLpDTvjKxu3Ei2pC",
  accessKeySecret: "fy8VNxoQmbiyxqPI8DXZ4X0ttUspBA",
  region: "oss-cn-shanghai",
  bucket: "dictator-music",
});

export async function listOSSMusics() {
  return (await store.list({ "max-keys": 100 }, {})).objects;
}
