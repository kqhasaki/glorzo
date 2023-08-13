import { useEffect } from "react";

import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { getAllSongs } from "@glorzo-player/api/request";
import Layout from "./Layout";

export function App(): JSX.Element {
  useEffect(() => {
    void getAllSongs().then((songs) => console.log(songs));
  }, []);

  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
