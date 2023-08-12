import express from "express";
import {
  initateTables,
  getAllUsers,
  createNewUser,
  getAllSongs,
  createNewSong,
  Song,
} from "@glorzo-server/db";
import { uploadFile, downloadFile } from "@glorzo-server/oss";
import { JSONResponseSuccessType, ResponseErrorType } from "./types";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

void initateTables();

app.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  try {
    await createNewUser({
      name,
      password,
    });
    const successRes: JSONResponseSuccessType = {
      success: true,
      data: "New user created",
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

app.get("/users", async (_, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

app.get("/songs", async (_, res) => {
  try {
    const songs = await getAllSongs();
    const successRes: JSONResponseSuccessType<Song[]> = {
      success: true,
      data: songs,
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
  const { content, res: result } = await downloadFile(target);
  res.setHeader("Content-Type", (result.headers as any)["content-type"]!);
  res.status(200).write(content);
  res.end();
});

app.post("/createSong", async (req, res) => {
  const { name, artist, cover, uploader, mp3 } = req.body;
  try {
    await createNewSong({ name, artist, cover, uploader, mp3 });
    const successRes: JSONResponseSuccessType = {
      success: true,
      data: "New song added",
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
