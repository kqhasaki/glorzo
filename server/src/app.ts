import express from "express";
import songRouter from "./routes/song";
import userRouter from "./routes/user";

export const app = express();
app.use(express.json());
app.use(songRouter);
app.use(userRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT);
