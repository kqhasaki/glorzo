import { makeStyles } from "@glorzo-player/theme";
import { Navigator } from "@glorzo-player/components/Navigator";
import { ReactNode } from "react";

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
  header: {
    zIndex: 99,
    height: "52px",
    position: "fixed",
    top: 0,
    width: "100%",
    background: theme.palette.background.transparent,
    borderBottom: `0.5px solid ${theme.palette.divider.secondary}`,
    backdropFilter: "blur(30px)",
  },
}));

export default function Layout({ content }: { content: ReactNode }): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navbar}>
        <Navigator />
      </div>
      <div className={classes.main}>
        <div className={classes.header}></div>
        <div className={classes.content}>{content}</div>
      </div>
    </div>
  );
}
