import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
  },
}));

const FileUpload = ({ files, setFiles }) => {
  const classes = useStyles();
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, files]);

    // upload file
    const formData = new FormData();
    formData.append(file.name, file, file.name);

    // call api
  };

  return (
    <>
      <div>
        <div className={classes.root}>
          <input
            accept="application/pdf"
            className={classes.input}
            // multiple
            type="file"
            onChange={uploadHandler}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
