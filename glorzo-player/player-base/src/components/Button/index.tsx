import { makeStyles, Theme } from "@glorzo-player/theme";
import { ReactNode, useMemo, useRef } from "react";

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
    transition: "200ms",
    display: "inline-flex",
    alignItems: "center",
    border: "none",
    padding: "8px 12px",
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

function getColors(
  color: NonNullable<ButtonPropsType["color"]>,
  theme: Theme
): {
  fontColor: string;
  backgroundColor: string;
  hoverBackGroundColor: string;
  hoverFontColor: string;
} {
  let exhaustiveCheck: never;
  switch (color) {
    case "highlight":
      return {
        fontColor: theme.palette.text.highlight,
        backgroundColor: theme.palette.background.highlight,
        hoverBackGroundColor: theme.palette.background.highlight,
        hoverFontColor: theme.palette.text.highlight,
      };
    case "secondary":
      return {
        fontColor: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.secondary,
        hoverBackGroundColor: theme.palette.background.primary,
        hoverFontColor: theme.palette.text.primary,
      };
    case "primary":
      return {
        fontColor: theme.palette.text.primary,
        backgroundColor: theme.palette.background.primary,
        hoverBackGroundColor: theme.palette.background.primary,
        hoverFontColor: theme.palette.text.primary,
      };
    default:
      exhaustiveCheck = color;
      return exhaustiveCheck;
  }
}

export function Button({
  children,
  variant = "contained",
  color = "highlight",
  disabled = false,
  onClick,
  size = "middle",
}: ButtonPropsType): JSX.Element {
  const { classes, theme, cx, css } = useStyles();
  const button = useRef<HTMLButtonElement>(null);

  const styles: React.CSSProperties = useMemo(() => {
    const padding = size === "large" ? "12px" : size === "middle" ? "8px" : "4px";
    const colors = getColors(color, theme);

    switch (variant) {
      case "contained":
        return {
          color: colors.fontColor,
          border: `1px solid ${colors.fontColor}`,
          background: colors.backgroundColor,
          "&:hover": {
            color: colors.hoverFontColor,
            borderColor: colors.hoverFontColor,
            background: colors.hoverBackGroundColor,
          },
          padding,
        };
      case "link":
        return {
          padding,
          color: colors.fontColor,
          background: "none",
          "&:hover": {
            color: colors.hoverFontColor,
          },
        };
      case "outlined":
        return {
          padding,
          color: colors.fontColor,
          background: colors.backgroundColor,
          "&:hover": {
            color: colors.hoverFontColor,
            background: colors.hoverBackGroundColor,
          },
        };
    }
  }, [variant, color, theme, size]);

  return (
    <button
      type="button"
      ref={button}
      className={cx(css({ ...styles }), classes.wrapper)}
      onClick={
        disabled
          ? (e) => {
              e.preventDefault();
              return false;
            }
          : (e) => onClick?.({ ...e, target: button.current! })
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
