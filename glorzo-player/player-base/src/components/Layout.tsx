import { makeStyles } from "@glorzo-player/theme";
import { Navigator } from "@glorzo-player/components/Navigator";
import { ReactNode, useRef } from "react";
import { useCallback } from "react";
import { ipcRenderer } from "electron";
import { clsx } from "clsx";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    minHeight: "400px",
    minWidth: "600px",
    userSelect: "none",
  },
  navbar: {
    width: "216px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    borderRight: `1px solid ${theme.palette.divider.primary}`,
    paddingTop: "60px",
  },
  main: {
    background: theme.palette.background.paper,
    position: "fixed",
    height: "100%",
    left: "216px",
    right: 0,
  },
  content: {
    paddingTop: "52px",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.secondary,
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-trak": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
  },
  hideScrollbar: {
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
  },
  header: {
    zIndex: 99,
    height: "52px",
    position: "fixed",
    top: 0,
    width: "100%",
    background: theme.palette.background.transparent,
    borderBottom: `0.5px solid ${theme.palette.divider.secondary}`,
    backdropFilter: "blur(30px)",
    WebkitAppRegion: "drag",
  },
  navbarHeader: {
    zIndex: 99,
    height: "52px",
    position: "fixed",
    top: 0,
    width: "100%",
    WebkitAppRegion: "drag",
  },
}));

export default function Layout({ content }: { content: ReactNode }): JSX.Element {
  const { classes } = useStyles();
  const mainWrapper = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (!mainWrapper.current) {
      return;
    }
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    mainWrapper.current.classList.remove(classes.hideScrollbar);
    scrollTimeout.current = setTimeout(() => {
      if (mainWrapper.current) {
        mainWrapper.current.classList.add(classes.hideScrollbar);
      }
    }, 1000);
  }, [classes.hideScrollbar]);

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <div className={classes.navbarHeader}></div>
        <Navigator />
      </div>
      <div className={classes.main}>
        <div className={classes.header}></div>
        <div
          ref={mainWrapper}
          onScroll={handleScroll}
          className={clsx({ [classes.hideScrollbar]: true, [classes.content]: true })}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
