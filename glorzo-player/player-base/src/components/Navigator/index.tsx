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
    display: "flex",
    textDecoration: "none",
    alignItems: "center",
    color: theme.palette.text.primary,
    margin: "0px 12px",
    borderRadius: "6px",
    padding: "6px 20px 6px 30px",
    fontSize: "13px",
    "& > span": {
      marginLeft: "8px",
    },
  },
  selectedNavLink: {
    background: theme.palette.background.highlight,
    color: theme.palette.text.highlight,
  },
  title: {
    fontSize: "12px",
    padding: "8px 20px",
    color: theme.palette.text.secondary,
    "&:not(first-child)": {
      marginTop: "24px",
    },
  },
}));

export function Navigator(): JSX.Element {
  const { classes } = useStyles();

  return (
    <ul className={classes.wrapper}>
      <h3 className={classes.title}>现在就听</h3>
      {routes
        .filter((route) => route.group === "app")
        .map((route) => {
          const Icon = route.icon;
          return (
            <NavLink
              draggable={false}
              className={({ isActive }) =>
                clsx({ [classes.selectedNavLink]: isActive, [classes.navLink]: true })
              }
              key={route.path}
              to={route.path!}
            >
              <Icon fontSize="small" />
              <span>{route.label}</span>
            </NavLink>
          );
        })}

      <h3 className={classes.title}>资料库</h3>
      {routes
        .filter((route) => route.group === "user")
        .map((route) => {
          const Icon = route.icon;
          return (
            <NavLink
              className={({ isActive }) =>
                clsx({ [classes.selectedNavLink]: isActive, [classes.navLink]: true })
              }
              key={route.path}
              to={route.path!}
            >
              <Icon fontSize="small" />
              <span>{route.label}</span>
            </NavLink>
          );
        })}
    </ul>
  );
}
