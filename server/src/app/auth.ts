import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const secretKey = process.env.GLORZO_JWT_SECRET!;

// 校验 JWT 的中间件
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // 从请求头部获取 JWT
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "未提供令牌" });
    return;
  }

  // 验证 JWT 签名
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "令牌验证失败" });
      return;
    }

    // 在请求中添加用户信息（可选）
    res.locals.user = decoded;
    next();
  });
}
