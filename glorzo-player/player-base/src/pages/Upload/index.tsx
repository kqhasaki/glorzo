import { makeStyles } from "@glorzo-player/theme";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useRef, useState } from "react";
import UploadItem, { UploadHeader } from "./UploadItem";
import type { Song } from "@glorzo-player/types/Song";
import { Button } from "@glorzo-player/components/Button";
import { parseSongFromFile } from "@glorzo-player/utils";
import { uploadFile, createSong } from "@glorzo-player/api/request";
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

async function uploadSong(song: Song): Promise<void> {
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
}

export default function Upload(): JSX.Element {
  const { classes } = useStyles();
  const uploader = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);

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

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (uploader.current) {
        uploader.current.classList.remove(classes.dragOver);
      }

      if (file != undefined && file.type.startsWith("audio")) {
        const song = await parseSongFromFile(file);
        setSongs((prev) => [...prev, song]);
      }
    },
    [classes.dragOver]
  );

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  const handleFileInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file != undefined) {
      const song = await parseSongFromFile(file);
      setSongs((prev) => [...prev, song]);
    }
  }, []);

  const uploadSongs = useCallback(() => {
    void Promise.all(
      songs.map(async (song) => {
        await uploadSong(song);
        setSongs((prev) => prev.filter((item) => item === song));
      })
    );
  }, [songs]);

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
