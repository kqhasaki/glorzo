import { makeStyles } from "@glorzo-player/theme";
import { routes } from "@glorzo-player/router";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    height: "100%",
    width: "100%",
  },
  navLink: {
    display: "block",
    textDecoration: "none",
    color: theme.palette.text.primary,
    margin: "0px 12px",
    borderRadius: "6px",
    padding: "8px 20px 8px 30px",
    fontSize: "14px",
  },
  selectedNavLink: {
    background: theme.palette.background.highlight,
    color: theme.palette.text.highlight,
  },
  title: {
    fontSize: "12px",
    padding: "8px 20px",
    color: theme.palette.text.secondary,
  },
}));

export function Navigator(): JSX.Element {
  const { classes } = useStyles();

  return (
    <ul className={classes.wrapper}>
      <h3 className={classes.title}>Glorzo Music</h3>
      {routes.map((route) => (
        <NavLink
          className={({ isActive }) =>
            clsx({ [classes.selectedNavLink]: isActive, [classes.navLink]: true })
          }
          key={route.path}
          to={route.path!}
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
}
