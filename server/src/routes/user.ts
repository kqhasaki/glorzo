import { User } from "@glorzo-server/models/user";
import { JSONResponseSuccessType, ResponseErrorType } from "@glorzo-server/types";
import { Router } from "express";

const userRouter = Router();

/**
 * 用户注册
 */
userRouter.post("/signUp", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      name: username,
      email,
      password,
    });
    const successRes: JSONResponseSuccessType = {
      success: true,
      data: newUser.toJSON(),
    };
    res.status(200).json(successRes);
  } catch (err) {
    const errorRes: ResponseErrorType = {
      success: false,
      message: `${err}`,
    };
    res.status(500).json(errorRes);
  }
});

export default userRouter;
