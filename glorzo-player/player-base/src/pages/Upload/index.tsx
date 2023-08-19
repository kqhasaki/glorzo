import { makeStyles } from "@glorzo-player/theme";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useRef, useState } from "react";
import UploadItem from "./UploadItem";

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
    marginTop: "30px",
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
}));

export default function Upload(): JSX.Element {
  const { classes } = useStyles();
  const uploader = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [songFiles, setSongFiles] = useState<File[]>([]);

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
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (uploader.current) {
        uploader.current.classList.remove(classes.dragOver);
      }

      if (file != undefined && file.type.startsWith("audio")) {
        setSongFiles((prev) => [...prev, file]);
      }
    },
    [classes.dragOver]
  );

  const handleClick = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file != undefined) {
      setSongFiles((prev) => [...prev, file]);
    }
  }, []);

  return (
    <main className={classes.mainWrapper}>
      <h1>Upload</h1>
      <div className={classes.uploadForm}>
        {songFiles.map((songFile, idx) => (
          <UploadItem file={songFile} key={idx} />
        ))}
      </div>
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
    </main>
  );
}
