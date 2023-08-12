import { useEffect } from "react";

import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { getAllSongs } from "@glorzo-player/api/request";

export function App(): JSX.Element {
  useEffect(() => {
    void getAllSongs().then((songs) => console.log(songs));
  }, []);

  return (
    <ThemeProvider>
      <div
        style={{
          textAlign: "center",
          height: "100vh",
          width: "100%",
          background: "#333",
          boxSizing: "border-box",
          fontWeight: "bolder",
          paddingTop: 100,
          color: "#f0f0f0",
        }}
      >
        <h1>Glorzo Player</h1>
        <p style={{ fontWeight: "lighter" }}>A music player for your own.</p>
      </div>
    </ThemeProvider>
  );
}
