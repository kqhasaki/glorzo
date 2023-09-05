import { Modal } from "@glorzo-player/components/Modal";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { axiosInstance, signUp } from "@glorzo-player/api/request";
import { HttpStatusCode, AxiosResponse } from "axios";
import { Button } from "@glorzo-player/components/Button";
import { makeStyles } from "@glorzo-player/theme";
import { getHashedPassword } from "@glorzo-player/utils";

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
  validationMessage: {
    color: "red",
    fontSize: "14px",
  },
  navLine: {
    textDecoration: "underline",
    fontSize: "13px",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "30px",
  },
}));

type FormValueItem = {
  value: string;
  valid: boolean;
  validMessage: string;
};

function LoginForm(): JSX.Element {
  const { classes } = useStyles();
  const [formData, setFormData] = useState<{
    username: FormValueItem;
    password: FormValueItem;
  }>({
    username: {
      value: "",
      valid: false,
      validMessage: "",
    },
    password: {
      value: "",
      valid: false,
      validMessage: "",
    },
  });

  const canSubmit = useMemo(() => {
    return [...Object.values(formData)].every((item) => item.valid);
  }, [formData]);

  const login = useCallback(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form className={classes.form}>
      <div>
        <label htmlFor="name">用户名：</label>
        <input
          value={formData.username.value}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: {
                valid: e.target.validity.valid,
                value: e.target.value,
                validMessage: e.target.validationMessage,
              },
            }))
          }
          type="text"
          required
        ></input>
        <div className={classes.validationMessage}>{formData.username.validMessage}</div>
      </div>
      <div>
        <label htmlFor="name">密码：</label>
        <input
          value={formData.password.value}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: {
                valid: e.target.validity.valid,
                value: e.target.value,
                validMessage: e.target.validationMessage,
              },
            }))
          }
          type="password"
          required
        ></input>
        <div className={classes.validationMessage}>{formData.password.validMessage}</div>
      </div>

      <Button variant="contained" disabled={!canSubmit} onClick={login}>
        登录
      </Button>
    </form>
  );
}

function SignUpForm(): JSX.Element {
  const { classes } = useStyles();
  const [formData, setFormData] = useState<{
    username: FormValueItem;
    email: FormValueItem;
    password: FormValueItem;
  }>({
    username: {
      value: "",
      valid: false,
      validMessage: "",
    },
    email: {
      value: "",
      valid: false,
      validMessage: "",
    },
    password: {
      value: "",
      valid: false,
      validMessage: "",
    },
  });

  const canSubmit = useMemo(() => {
    return [...Object.values(formData)].every((item) => item.valid);
  }, [formData]);

  const signup = useCallback(async () => {
    const result = await signUp({
      username: formData.username.value,
      email: formData.email.value,
      password: getHashedPassword(formData.password.value),
    });
    console.log(result);
  }, [formData]);

  return (
    <form className={classes.form}>
      <div>
        <label htmlFor="name">用户名：</label>
        <input
          value={formData.username.value}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: {
                valid: e.target.validity.valid,
                value: e.target.value,
                validMessage: e.target.validationMessage,
              },
            }))
          }
          type="text"
          required
        ></input>
        <div className={classes.validationMessage}>{formData.username.validMessage}</div>
      </div>
      <div>
        <label htmlFor="name">邮箱：</label>
        <input
          value={formData.email.value}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: {
                valid: e.target.validity.valid,
                value: e.target.value,
                validMessage: e.target.validationMessage,
              },
            }))
          }
          type="email"
          required
        ></input>
        <div className={classes.validationMessage}>{formData.email.validMessage}</div>
      </div>
      <div>
        <label htmlFor="name">密码：</label>
        <input
          value={formData.password.value}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: {
                valid: e.target.validity.valid,
                value: e.target.value,
                validMessage: e.target.validationMessage,
              },
            }))
          }
          type="password"
          required
        ></input>
        <div className={classes.validationMessage}>{formData.password.validMessage}</div>
      </div>

      <Button variant="contained" disabled={!canSubmit} onClick={signup}>
        注册
      </Button>
    </form>
  );
}

export default function Login(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

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
      {mode === "signin" && (
        <>
          <LoginForm />
          <div className={classes.navLine} onClick={() => setMode("signup")}>
            注册Glorzo账号
          </div>
        </>
      )}
      {mode === "signup" && (
        <>
          <SignUpForm />
          <div className={classes.navLine} onClick={() => setMode("signin")}>
            返回登录
          </div>
        </>
      )}
    </Modal>
  );
}
