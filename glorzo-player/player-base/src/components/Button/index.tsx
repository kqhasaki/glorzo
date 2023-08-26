import { makeStyles, useTheme } from "@glorzo-player/theme";
import { ReactNode, useMemo } from "react";

export type ButtonPropsType = {
  variant?: "outlined" | "contained" | "link";
  color?: "primary" | "secondary" | "highlight";
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: "inline-block",
    border: "none",
    padding: "8px 12px",
    background: "none",
    cursor: "pointer",
    borderRadius: "4px",
    WebkitAppRegion: "no-drag",
    "&:enabled:active": {
      opacity: 0.9,
    },
    "&:disabled": {
      cursor: "not-allowed",
      filter: "brightness(60%)",
    },
  },
}));

export function Button({
  children,
  variant = "contained",
  color = "highlight",
  disabled = false,
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
        return {
          color: textColor,
        };
      default:
        return {
          background: bgColor,
          color: textColor,
        };
    }
  }, [variant, color, theme]);

  return (
    <button
      style={styles}
      className={classes.wrapper}
      onClick={
        disabled
          ? (e) => {
              e.preventDefault();
              return false;
            }
          : onClick
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
