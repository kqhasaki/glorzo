/* eslint-disable no-console */
import { sequelize } from "./connection";
import "./song";

async function sync() {
  try {
    await sequelize.sync();
    console.log("数据表同步成功");
  } catch (err) {
    console.error(`数据表同步失败:${err}`);
  }
}

void sync();
