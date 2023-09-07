import { ThemeProvider } from "@glorzo-player/theme/ThemeProvider";
import { router } from "@glorzo-player/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { GlobalAudioElementProvider } from "./contexts/GlobalAudioElement";
import { GlobalClickMenuProvider } from "./contexts/GlobalClickMenu";

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalAudioElementProvider>
          <GlobalClickMenuProvider>
            <RouterProvider router={router} />
          </GlobalClickMenuProvider>
        </GlobalAudioElementProvider>
      </ThemeProvider>
    </Provider>
  );
}
