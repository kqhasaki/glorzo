import { Modal } from "@glorzo-player/components/Modal";
import { useLayoutEffect, useState } from "react";
import { axiosInstance } from "@glorzo-player/api/request";
import { HttpStatusCode, AxiosResponse } from "axios";
import { makeStyles } from "@glorzo-player/theme";

const useStyles = makeStyles()((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    paddingTop: "60px",
    "& input": {
      border: `1px solid ${theme.palette.divider.secondary}`,
      padding: "6px 8px",
      fontSize: "16px",
      width: "240px",
      "&:focus": {
        outline: "none",
      },
    },
    "& > div": {
      display: "block",
      margin: "12px",
    },
    "& label": {
      display: "inline-block",
      width: "100px",
      textAlign: "end",
    },
  },
}));

export default function Login(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const response = error.response as AxiosResponse;
        if (response.status === HttpStatusCode.Unauthorized) {
          setModalOpen(true);
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const { classes } = useStyles();

  return (
    <Modal
      title="请登录您的Glorzo账号"
      height="540px"
      width="600px"
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <form className={classes.form}>
        <div>
          <label htmlFor="name">用户名：</label>
          <input name="name" id="name" type="text" required></input>
        </div>
        <div>
          <label htmlFor="name">邮箱：</label>
          <input name="name" id="name" type="email" required></input>
        </div>
        <div>
          <label htmlFor="name">密码：</label>
          <input type="password" required></input>
        </div>
      </form>
    </Modal>
  );
}
