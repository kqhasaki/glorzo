import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { router } from "@glorzo-player/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { GlobalAudioElementProvider } from "./contexts/GlobalAudioElement";

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalAudioElementProvider>
          <RouterProvider router={router} />
        </GlobalAudioElementProvider>
      </ThemeProvider>
    </Provider>
  );
}
