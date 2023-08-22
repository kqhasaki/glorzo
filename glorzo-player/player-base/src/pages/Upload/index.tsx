import { makeStyles } from "@glorzo-player/theme";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useRef } from "react";
import UploadItem, { UploadHeader } from "./UploadItem";
import type { LocalSong as Song } from "@glorzo-player/types/LocalSong";
import { Button } from "@glorzo-player/components/Button";
import { parseSongFromFile } from "@glorzo-player/utils";
import { uploadFile, createSong, songExists } from "@glorzo-player/api/request";
import { useAppSelector, useAppDispatch } from "@glorzo-player/hooks";
import { add, remove } from "@glorzo-player/store/localSongsSlice";
import mime from "mime-types";

const useStyles = makeStyles()((theme) => ({
  mainWrapper: {
    padding: "64px 36px",
  },
  uploader: {
    height: "200px",
    width: "200px",
    borderRadius: "10px",
    color: theme.palette.text.secondary,
    border: `0.5px dashed ${theme.palette.text.secondary}`,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
    },
  },
  dragOver: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
  uploadForm: {
    marginTop: "30px",
  },
  uploaderContainer: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
}));

async function uploadSong(song: Song): Promise<boolean> {
  const exist = await songExists(song.sha256);
  if (exist) {
    console.warn(`Song ${song.tags.title} already exists.`);
    return false;
  }
  const audioUrl = await uploadFile(song.fileName, song.file);
  const pictureUrl = await uploadFile(
    `${song.tags.title}_${song.tags.artist}_cover.${
      mime.extension(song.tags.picture.format) || "jpg"
    }`,
    song.tags.picture.data
  );
  await createSong({
    song,
    pictureUrl,
    audioUrl,
  });
  return true;
}

export default function Upload(): JSX.Element {
  const { classes } = useStyles();
  const uploader = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const songs = useAppSelector((state) => state.localSongs.value);
  const dispatch = useAppDispatch();

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (uploader.current) {
        uploader.current.classList.add(classes.dragOver);
      }
      e.preventDefault();
    },
    [classes]
  );

  const handleDragLeave = useCallback(() => {
    if (uploader.current) {
      uploader.current.classList.remove(classes.dragOver);
    }
  }, [classes]);

  const addLocalSong = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("audio")) {
        return;
      }
      const newSong = await parseSongFromFile(file);
      if (songs.find((item) => item.sha256 === newSong.sha256)) {
        return;
      }
      dispatch(add(newSong));
    },
    [dispatch, songs]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (uploader.current) {
        uploader.current.classList.remove(classes.dragOver);
      }
      files.forEach((file) => void addLocalSong(file));
    },
    [classes.dragOver, addLocalSong]
  );

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files == undefined) {
        return;
      }
      const files = Array.from(e.target.files);
      files.forEach((file) => void addLocalSong(file));
    },
    [addLocalSong]
  );

  const uploadSongs = useCallback(async () => {
    for (const song of songs) {
      const result = await uploadSong(song);
      if (result) {
        dispatch(remove(song.sha256));
      }
    }
  }, [songs, dispatch]);

  return (
    <main className={classes.mainWrapper}>
      <h1>Upload</h1>
      <div className={classes.uploadForm}>
        {songs.length > 0 && <UploadHeader />}
        {songs.map((song, idx) => (
          <UploadItem song={song} key={idx} />
        ))}
      </div>
      <div className={classes.uploaderContainer}>
        <div
          ref={uploader}
          className={classes.uploader}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <AddIcon fontSize="large" />
          <input
            multiple
            style={{ display: "none" }}
            type="file"
            ref={fileInput}
            accept=".mp3"
            onChange={handleFileInputChange}
          />
        </div>
        {songs.length > 0 && (
          <div>
            <Button onClick={uploadSongs}>upload</Button>
          </div>
        )}
      </div>
    </main>
  );
}
