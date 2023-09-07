import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { makeStyles } from "@glorzo-player/theme";

type CreateClickMenu = (position: { x: number; y: number }, items: ReactNode[]) => void;

const GlobalClickMenuContext = createContext<{
  createGlobalClickMenu: CreateClickMenu;
}>({
  createGlobalClickMenu: () => {},
});

export const useGlobalClickMenu = () => {
  return useContext(GlobalClickMenuContext);
};

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    position: "fixed",
    zIndex: 999,
    userSelect: "none",
    background: theme.palette.background.transparent.primary,
    color: theme.palette.text.secondary,
    fontSize: "14px",
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.palette.divider.secondary}`,
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: `0 0 24px ${theme.palette.background.primary}`,
  },
  item: {
    transition: "200ms",
    cursor: "pointer",
    padding: "10px 14px",
    borderBottom: `1px solid ${theme.palette.divider.secondary}`,
    "&:hover": {
      background: theme.palette.background.primary,
      color: theme.palette.text.primary,
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

export const GlobalClickMenuProvider = (props: { children: ReactNode }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [menuItems, setMenuItems] = useState<ReactNode[]>();
  const wrapper = useRef<HTMLDivElement>(null);
  const { classes } = useStyles();

  useLayoutEffect(() => {
    const wrapperEl = wrapper.current;
    if (wrapperEl && position) {
      wrapperEl.style.left = `${position.x}px`;
      wrapperEl.style.top = `${position.y}px`;
    }
  }, [position]);

  useLayoutEffect(() => {
    const wrapperEl = wrapper.current;
    if (!wrapperEl) {
      return;
    }
    const handler = (e: MouseEvent) => {
      const targetEl = e.target;
      if (targetEl) {
        if (!wrapperEl.contains(targetEl as HTMLElement)) {
          setMenuItems(undefined);
        }
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, []);

  const createGlobalClickMenu: CreateClickMenu = useCallback((pos, items) => {
    setPosition(pos);
    setMenuItems(items);
  }, []);

  return (
    <GlobalClickMenuContext.Provider value={{ createGlobalClickMenu }}>
      {createPortal(
        <div
          className={classes.wrapper}
          ref={wrapper}
          style={{ display: menuItems ? "initial" : "none" }}
        >
          {menuItems &&
            menuItems.map((item, idx) => (
              <div key={idx} className={classes.item}>
                {item}
              </div>
            ))}
        </div>,
        document.body
      )}
      {props.children}
    </GlobalClickMenuContext.Provider>
  );
};
