import { makeStyles, useTheme } from "@glorzo-player/theme";
import { ReactNode, useMemo } from "react";

export type ButtonPropsType = {
  variant?: "outlined" | "contained" | "link";
  color?: "primary" | "secondary" | "highlight";
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
};

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
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
  size = "middle",
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

    const padding = size === "middle" ? "8px 12px" : size === "small" ? "4px 4px" : "12px 16px";

    switch (variant) {
      case "outlined":
        return {
          padding,
        };
      case "link":
        return {
          color: textColor,
          padding,
        };
      default:
        return {
          background: bgColor,
          color: textColor,
          padding,
        };
    }
  }, [variant, color, theme, size]);

  return (
    <button
      type="button"
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
