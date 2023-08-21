import { BrowserWindow, BrowserWindowConstructorOptions, app } from "electron";
import path from "path";
import { GLORZO_PRODUCT_NAME } from "../common/webpackDefines";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const isProduction = process.env.NODE_ENV === "production";
const rendererPath = MAIN_WINDOW_WEBPACK_ENTRY;

class PlayerWindow {
  private browserWindow: BrowserWindow;

  public constructor() {
    this.browserWindow = newPlayerWindow();
  }

  public load(): void {
    this.browserWindow
      .loadURL(rendererPath)
      .then(() => {
        // eslint-disable-next-line no-console
        console.info("window URL loaded");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("loadURL error", err);
      });
  }
}

function newPlayerWindow(): BrowserWindow {
  const preloadPath = path.join(app.getAppPath(), "main", "preload.js");

  const windowOptions: BrowserWindowConstructorOptions = {
    height: 800,
    width: 1200,
    minWidth: 980,
    minHeight: 600,
    autoHideMenuBar: true,
    title: GLORZO_PRODUCT_NAME,
    titleBarStyle: "hidden",
    webPreferences: {
      contextIsolation: true,
      sandbox: false, // Allow preload script to access Node builtins
      preload: preloadPath,
      nodeIntegration: false,
      webSecurity: isProduction,
    },
    vibrancy: "sidebar",
    visualEffectState: "followWindow",
  };

  const browserWindow = new BrowserWindow(windowOptions);

  // Forward full screen events to the renderer
  browserWindow.addListener("enter-full-screen", () =>
    browserWindow.webContents.send("enter-full-screen")
  );
  browserWindow.addListener("leave-full-screen", () =>
    browserWindow.webContents.send("leave-full-screen")
  );
  browserWindow.addListener("maximize", () => browserWindow.webContents.send("maximize"));

  browserWindow.addListener("unmaximize", () => browserWindow.webContents.send("unmaximize"));

  browserWindow.webContents.once("dom-ready", () => {
    if (!isProduction) {
      browserWindow.webContents.openDevTools();
    }
    browserWindow.webContents.send(browserWindow.isMaximized() ? "maximize" : "unmaximize");
  });

  return browserWindow;
}

export default PlayerWindow;
