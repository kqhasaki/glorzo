import { app } from "electron";
import PlayerWindow from "./PlayerWindow";

function main(): void {
  app.on("ready", async () => {
    const initialWindow = new PlayerWindow();
    initialWindow.load();
  });
}

main();
