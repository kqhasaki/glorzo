import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@glorzo-player/theme";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";

type ModalPropsType = {
  height?: number | string;
  width?: number | string;
  onClose: () => void;
  children: ReactNode;
  open: boolean;
  title: ReactNode;
};

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    borderRadius: "8px",
    padding: "12px 16px",
    background: theme.palette.background.paper,
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 999,
    transform: "translate(-50%, -50%)",
    minWidth: "400px",
    minHeight: "300px",
    color: theme.palette.text.primary,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    borderBottom: `1px solid ${theme.palette.divider.secondary}`,
  },
  mask: {
    top: 0,
    left: 0,
    zIndex: 1,
    position: "fixed",
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.8)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
}));

export function Modal({
  open,
  height = "70%",
  width = "60%",
  onClose,
  children,
  title,
}: ModalPropsType): JSX.Element {
  const { classes } = useStyles();
  return createPortal(
    <>
      {open && (
        <>
          <div className={classes.wrapper} style={{ height, width }}>
            <div className={classes.header}>
              <span className={classes.title}>{title}</span>
              <Button variant="link" onClick={onClose} color="primary">
                <CloseIcon />
              </Button>
            </div>
            {children}
          </div>

          <div className={classes.mask} />
        </>
      )}
    </>,
    document.body
  );
}
