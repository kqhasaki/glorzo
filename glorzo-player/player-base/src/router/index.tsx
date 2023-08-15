import { createHashRouter, RouteObject } from "react-router-dom";
import Layout from "@glorzo-player/components/Layout";

export const routes: Array<RouteObject & { label: string }> = [
  {
    path: "/",
    label: "所有歌曲",
    element: <Layout content={<h1>曲库</h1>} />,
  },
  {
    path: "/upload",
    label: "歌曲上传",
    element: <Layout content={<h1>上传</h1>} />,
  },
];

export const router = createHashRouter(routes);
