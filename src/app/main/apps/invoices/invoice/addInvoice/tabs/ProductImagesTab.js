import { useState } from "react";
import { orange } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FuseUtils from "@fuse/utils";
import { Controller, useFormContext } from "react-hook-form";
import FileUpload from "./FileUpload";

const useStyles = makeStyles((theme) => ({}));

function ProductImagesTab(props) {
  const [files, setFiles] = useState([
    {
      name: "myFile.pdf",
    },
  ]);
  return (
    <>
      <div>
        <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
          <FileUpload files={files} setFiles={setFiles} />
        </div>
      </div>
    </>
  );
}

export default ProductImagesTab;
