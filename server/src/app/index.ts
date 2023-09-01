/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { uploadFile, downloadFile } from "@glorzo-server/oss";
import { JSONResponseSuccessType, ResponseErrorType } from "./types";
import { Song } from "@glorzo-server/db/song";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

/**
 * 获取所有的歌曲信息
 */
app.get("/songs", async (_, res) => {
  try {
    const songs = await Song.findAll();
    const successRes: JSONResponseSuccessType<Song[]> = {
      success: true,
      data: songs.map((song) => song.toJSON()),
    };
    res.status(200).json(successRes);
  } catch (err) {
    const errorRes: ResponseErrorType = {
      success: false,
      message: `${err}`,
    };
    res.status(500).json(errorRes);
  }
});

/**
 * 提供OSS文件上传接口
 */
app.post("/uploadFile", (req, res) => {
  if (req.headers["content-type"] !== "application/octet-stream") {
    res.status(400).json({ error: "Invalid content type" });
  }

  const chunks: any[] = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", async () => {
    const dataBuffer = Buffer.concat(chunks);
    const filename = decodeURIComponent((req.headers["x-filename"] ?? "unknown") as string);
    const ossResult = await uploadFile(filename, dataBuffer);
    res.status(200).json({ ...ossResult });
  });
});

/**
 * 提供OSS文件下载接口
 */
app.get("/download", async (req, res) => {
  const target = req.query.target;
  if (typeof target !== "string") {
    const errRes: ResponseErrorType = {
      success: false,
      message: "请在target参数中指定下载对象地址",
    };
    res.status(400).json(errRes);
    return;
  }
  try {
    const { content, res: result } = await downloadFile(target);
    res.setHeader("Content-Type", (result.headers as any)["content-type"]!);
    res.setHeader("Accept-Range", "bytes");
    res.setHeader("Cache-Control", `public, max-age=7200`);
    res.status(200).write(content);
    res.end();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err}`,
    });
  }
});

/**
 * 检查音频文件是否已经存在
 */
app.post("/songExists", async (req, res) => {
  const { sha256 } = req.body;
  try {
    const exists = await Song.findOne({
      where: {
        sha256,
      },
    });
    const successRes: JSONResponseSuccessType = {
      success: true,
      data: exists != undefined,
    };
    res.status(200).json(successRes);
  } catch (err) {
    const errorRes: ResponseErrorType = {
      success: false,
      message: `${err}`,
    };
    res.status(500).json(errorRes);
  }
});

/**
 * 新建歌曲条目
 */
app.post("/createSong", async (req, res) => {
  const { name, artist, pictureUrl, uploader, audioUrl, album, sha256 } = req.body;
  try {
    const newSong = await Song.create({
      album,
      name,
      artist,
      pictureUrl,
      audioUrl,
      uploader,
      sha256,
    });
    const successRes: JSONResponseSuccessType = {
      success: true,
      data: newSong.toJSON(),
    };
    res.status(200).json(successRes);
  } catch (err) {
    const errorRes: ResponseErrorType = {
      success: false,
      message: `${err}`,
    };
    res.status(500).json(errorRes);
  }
});

app.listen(PORT);
