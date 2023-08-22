import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { router } from "@glorzo-player/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}
