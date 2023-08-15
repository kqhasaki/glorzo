import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { router } from "@glorzo-player/router";
import { RouterProvider } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
