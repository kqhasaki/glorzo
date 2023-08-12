import * as mysql from "mysql2";
import fs from "fs";
import moment from "moment";

const pool = mysql
  .createPool({
    connectionLimit: 10,
    host: process.env.GLORZO_DB_HOST,
    user: process.env.GLORZO_DB_USER,
    password: process.env.GLORZO_DB_PASSWORD,
    database: process.env.GLORZO_DB_DATABASE,
    ssl: {
      ca: fs.readFileSync(process.env.GLORZO_DB_CA!),
    },
  })
  .promise();

process.on("beforeExit", () => {
  void pool.end();
});

export async function initateTables() {
  // 创建 user 表
  const createUserTable = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createDate DATETIME,
    friends JSON,
    UNIQUE (name)
  );
  `;

  // 创建 song 表
  const createMusicTable = `
  CREATE TABLE IF NOT EXISTS song (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    mp3 VARCHAR(255) NOT NULL,
    uploader INT
  );
  `;
  await pool.query(createUserTable);
  await pool.query(createMusicTable);
}

type UserId = number;

export type User = {
  id: UserId;
  name: string;
  password: string;
  friends: UserId[];
};

type SongId = number;

export type Song = {
  id: SongId;
  name: string;
  artist: string;
  cover: string;
  mp3: string;
  uploader: User;
};

export async function getAllUsers(): Promise<User[]> {
  const [users] = await pool.query(`SELECT * FROM user`);
  return users as User[];
}

export async function createNewUser(
  createUserOptions: Pick<User, "name" | "password">
): Promise<void> {
  const { name, password } = createUserOptions;
  const users = await getAllUsers();
  if (users.find((user) => user.name === name)) {
    throw Error("用户名已经被占用");
  }
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  await pool.query("INSERT INTO user (name, password, createDate, friends) VALUES (?, ?, ?, ?)", [
    name,
    password,
    date,
    "[]",
  ]);
}

export async function getAllSongs(): Promise<Song[]> {
  const [songs] = await pool.query("SElECT * FROM song");
  return songs as Song[];
}

export async function createNewSong(createSongOptions: Omit<Song, "id">): Promise<void> {
  const { mp3, cover, artist, uploader, name } = createSongOptions;
  await pool.query("INSERT INTO song (name, artist, cover, uploader, mp3) VALUES (?, ?, ?, ?, ?)", [
    name,
    artist,
    cover,
    uploader,
    mp3,
  ]);
}
