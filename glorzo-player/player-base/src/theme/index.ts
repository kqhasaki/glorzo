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
      highlight: string;
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
      highlight: "rgba(194, 56, 48)",
      transparent: "rgba(44, 33, 31, 0.5)",
    },
    text: {
      primary: "rgba(255, 255, 255)",
      secondary: "rgba(187, 187, 188)",
      highlight: "rgba(250, 250, 250)",
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
      secondary: "rgba(250, 250, 250)",
      transparent: "rgba(255, 255, 255, 0.8)",
      highlight: "rgba(194, 56, 48)",
    },
    text: {
      primary: "rgba(39, 39, 39)",
      secondary: "rgba(129, 129, 129)",
      highlight: "rgba(250, 250, 250)",
    },
    divider: {
      primary: "rgba(192, 189, 188)",
      secondary: "rgba(236, 236, 236)",
    },
  },
};

export const { makeStyles } = createMakeAndWithStyles({
  useTheme,
});
