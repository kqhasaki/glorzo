import express from "express";
import songRouter from "./routes/song";

export const app = express();
app.use(express.json());
app.use(songRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT);
