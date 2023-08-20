import { makeStyles, useTheme } from "@glorzo-player/theme";
import { ReactNode, useMemo } from "react";

export type ButtonPropsType = {
  variant?: "outlined" | "contained" | "link";
  color?: "primary" | "secondary" | "highlight";
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: "inline-block",
    border: "none",
    padding: "8px 12px",
    background: "none",
    cursor: "pointer",
    borderRadius: "4px",
    "&:active": {
      opacity: 0.9,
    },
  },
}));

export function Button({
  children,
  variant = "contained",
  color = "highlight",
  onClick,
}: ButtonPropsType): JSX.Element {
  const { classes } = useStyles();
  const theme = useTheme();

  const styles: React.CSSProperties = useMemo(() => {
    const textColor =
      color === "highlight"
        ? theme.palette.text.highlight
        : color === "primary"
        ? theme.palette.text.primary
        : theme.palette.text.secondary;
    const bgColor =
      color === "highlight"
        ? theme.palette.background.highlight
        : color === "primary"
        ? theme.palette.background.primary
        : theme.palette.background.secondary;

    switch (variant) {
      case "outlined":
        return {};
      case "link":
        return {};
      default:
        return {
          background: bgColor,
          color: textColor,
        };
    }
  }, [variant, color, theme]);

  return (
    <button style={styles} className={classes.wrapper} onClick={onClick}>
      {children}
    </button>
  );
}
