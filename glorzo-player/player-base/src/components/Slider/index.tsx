import { makeStyles } from "@glorzo-player/theme";
import { useCallback, useRef, useLayoutEffect, useEffect } from "react";

export type SliderPropsType = {
  value: number;
  onChange: (value: number) => void;
  size?: "small" | "medium" | "large";
};

const useStyles = makeStyles()((theme) => ({
  sliderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
  },
  track: {
    width: "100%",
    background: theme.palette.text.secondary,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  thumb: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "14px",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    background: theme.palette.text.secondary,
    border: `0.5px solid ${theme.palette.text.primary}`,
    transition: "50ms",
  },
  trackFilled: {
    transition: "50ms",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: theme.palette.text.secondary,
    borderRadius: "1px",
  },
}));

export function Slider({ value, onChange, size = "medium" }: SliderPropsType): JSX.Element {
  const { classes } = useStyles();
  const trackStrokeWidth = size === "medium" ? 1 : size === "large" ? 2 : 0.5;
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const cachedBoundingRect = useRef<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }>();

  const handleSliderRatioChange = useCallback(
    (clientX: number) => {
      const { left, right } = cachedBoundingRect.current!;
      const trackWidth = right - left;
      const filledTrackWidth = Math.min(trackWidth, Math.max(0, clientX - left));
      const ratio = filledTrackWidth / trackWidth;
      onChange(ratio);
    },
    [onChange]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleSliderRatioChange(e.clientX);
    },
    [handleSliderRatioChange]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleSliderRatioChange(e.clientX);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp, handleSliderRatioChange]
  );

  const updateCachedBoudingRect = useCallback(() => {
    const sliderWrapper = sliderWrapperRef.current;
    if (sliderWrapper) {
      const boundingRect = sliderWrapper.getBoundingClientRect();
      cachedBoundingRect.current = {
        top: boundingRect.top,
        bottom: boundingRect.bottom,
        left: boundingRect.left,
        right: boundingRect.right,
      };
    }
  }, []);

  useLayoutEffect(() => {
    updateCachedBoudingRect();
  }, [updateCachedBoudingRect]);

  useEffect(() => {
    const sliderWrapper = sliderWrapperRef.current;
    if (sliderWrapper == undefined) {
      return;
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutaion) => {
        if (mutaion.target === sliderWrapper) {
          updateCachedBoudingRect();
        }
      });
    });
    observer.observe(sliderWrapper, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
    };
  }, [updateCachedBoudingRect]);

  return (
    <div ref={sliderWrapperRef} className={classes.sliderWrapper} onMouseDown={handleMouseDown}>
      <div className={classes.track} style={{ height: trackStrokeWidth }} />
      <div className={classes.thumb} style={{ left: `${value * 100}%` }} />
      <div
        className={classes.trackFilled}
        style={{ width: `${value * 100}%`, height: trackStrokeWidth * 2 + 1 }}
      />
    </div>
  );
}
