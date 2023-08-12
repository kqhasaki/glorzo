import { ReactNode } from "react";
import { GlobalStyles } from "tss-react";
import { useTheme } from ".";

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          "html, body": {
            boxSizing: "border-box",
            height: "100%",
            width: "100%",

            // https://github.com/necolas/normalize.css/blob/master/normalize.css#L12
            lineHeight: 1.15,
            background: theme.palette.background.primary,
            color: theme.palette.text.primary,
          },
          "*, *:before, *:after": {
            margin: 0,
            padding: 0,
            boxSizing: "inherit",
            listStyle: "none",
          },
          body: {
            // Prevent scroll "bouncing" since the app workspace is not scrollable. Allows individual
            // scrollable elements to be scrolled without the whole page moving (even if they don't
            // preventDefault on scroll events).
            overscrollBehavior: "none",
          },
        }}
      />
      {children}
    </>
  );
}
