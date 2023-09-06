import { createHashRouter, RouteObject } from "react-router-dom";
import SongLibrary from "@glorzo-player/pages/SongLibrary";
import Layout from "@glorzo-player/components/Layout";
import Upload from "@glorzo-player/pages/Upload";
import User from "@glorzo-player/pages/User";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export type PageGroup = "app" | "user" | "playlist";

export const routes: Array<
  RouteObject & {
    label: string;
    group: PageGroup;
    icon: typeof MusicNoteIcon;
  }
> = [
  {
    path: "/",
    label: "曲库",
    element: <Layout content={<SongLibrary />} />,
    group: "app",
    icon: MusicNoteIcon,
  },
  {
    path: "/user",
    label: "用户",
    element: <Layout content={<User />} />,
    group: "user",
    icon: PersonIcon,
  },
  {
    path: "/upload",
    label: "上传",
    element: <Layout content={<Upload />} />,
    group: "user",
    icon: FileUploadIcon,
  },
];

export const router = createHashRouter(routes);
