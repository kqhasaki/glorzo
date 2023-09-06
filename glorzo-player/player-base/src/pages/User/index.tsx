import { Button } from "@glorzo-player/components/Button";
import { useAppSelector, useAppDispatch } from "@glorzo-player/hooks";
import { makeStyles } from "@glorzo-player/theme";
import { showLoginModal } from "@glorzo-player/store/globalLoginSlice";

const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: "64px 36px",
  },
  content: {
    marginTop: "20px",
    padding: "12px",
  },
}));

export default function User(): JSX.Element {
  const currentUser = useAppSelector((state) => state.userState.value);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  return (
    <div className={classes.wrapper}>
      {currentUser == undefined ? (
        <>
          <h1>您尚未登录</h1>

          <div className={classes.content}>
            <Button onClick={() => dispatch(showLoginModal())}>立即登录</Button>
          </div>
        </>
      ) : (
        <>
          <h1>您好，{currentUser?.name}</h1>
        </>
      )}
    </div>
  );
}
