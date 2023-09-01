import { createHashRouter, RouteObject } from "react-router-dom";
import SongLibrary from "@glorzo-player/pages/SongLibrary";
import Layout from "@glorzo-player/components/Layout";
import Upload from "@glorzo-player/pages/Upload";

export const routes: Array<RouteObject & { label: string }> = [
  {
    path: "/",
    label: "曲库",
    element: <Layout content={<SongLibrary />} />,
  },
  {
    path: "/upload",
    label: "上传",
    element: <Layout content={<Upload />} />,
  },
];

export const router = createHashRouter(routes);
