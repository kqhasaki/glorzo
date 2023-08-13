import { useEffect, useMemo, useState } from "react";
import { createMakeAndWithStyles } from "tss-react";

type Theme = {
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  palette: {
    background: {
      paper: string;
      primary: string;
      secondary: string;
      transparent: string;
    };
    text: {
      primary: string;
      secondary: string;
      highlight: string;
    };
    divider: {
      primary: string;
      secondary: string;
    };
  };
};

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setIsDark(event.matches);
    });
  }, []);

  const theme = useMemo(() => {
    return isDark ? darkTheme : brightTheme;
  }, [isDark]);

  return theme;
}

const breakpoints = {
  sm: "@media screen and (max-width:500px)",
  md: "@media screen and (max-width:1000px)",
  lg: "@media screen and (max-width:1440px)",
  xl: "@media screen and (min-width:1440px)",
};

const darkTheme: Theme = {
  breakpoints,
  palette: {
    background: {
      paper: "rgb(44, 33, 31)",
      primary: "rgba(32, 32, 32)",
      secondary: "rgba(30, 30, 30)",
      transparent: "rgba(44, 33, 31, 0.8)",
    },
    text: {
      primary: "rgba(118, 107, 104)",
      secondary: "rgba(187, 187, 188)",
      highlight: "rgba(180, 136, 82)",
    },
    divider: {
      primary: "#000",
      secondary: "rgba(55, 45, 52)",
    },
  },
};

const brightTheme: Theme = {
  breakpoints,
  palette: {
    background: {
      paper: "rgba(255, 255, 255)",
      primary: "rgba(245, 245, 245)",
      secondary: "rgba(100, 100, 200)",
      transparent: "rgba(25, 25, 25, 0.5)",
    },
    text: {
      primary: "rgba(30, 30, 30)",
      secondary: "rgba(45, 45, 45)",
      highlight: "rgba(180, 136, 82)",
    },
    divider: {
      primary: "#000",
      secondary: "rgba(32, 32, 32)",
    },
  },
};

export const { makeStyles } = createMakeAndWithStyles({
  useTheme,
});
