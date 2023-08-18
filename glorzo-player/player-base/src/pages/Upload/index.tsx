import { makeStyles } from "@glorzo-player/theme";

const useStyles = makeStyles()(() => ({
  mainWrapper: {
    padding: "64px 36px",
  },
}));

export default function Upload(): JSX.Element {
  const { classes } = useStyles();

  return (
    <main className={classes.mainWrapper}>
      <h1>上传</h1>
    </main>
  );
}
