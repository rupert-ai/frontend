import { FileUploader, FileUploaderButton, FileUploaderDropContainer } from "carbon-components-react";
import React from "react";
import useIsMobile from "../hooks/useIsMobile";
import "./UploadFile.css";

type UploadFileProps = {
  onFilesAdded: (files: File[]) => void;
};

export function UploadFile({ onFilesAdded }: UploadFileProps) {
  const isMobile = useIsMobile();
  const preventDefault = React.useCallback((e) => {
    e.preventDefault();
  }, []);

  const onAddFiles = React.useCallback(
    (_, { addedFiles }: { addedFiles: File[] }) => {
      const files = addedFiles.filter((f) => f.size <= 1024 * 1024 * 5);
      if (files.length !== addedFiles.length) {
        alert("Some files exceeded 5mb");
      }
      onFilesAdded(files);
    },
    []
  );

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    let addedFiles: File[] = [];
    for (let i = 0; i < e.target.files?.length; i++) {
      const file = e.target.files.item(i);
      if (!file) {
        continue;
      }
      addedFiles.push(file);
    }
    onAddFiles(e, { addedFiles })
  }, [])

  return (!isMobile ?
    <FileUploaderDropContainer
      labelText="Drag and drop files here or click to upload"
      accept={[".jpeg", ".jpg", ".png"]}
      multiple
      onAddFiles={onAddFiles}
      onDrop={preventDefault}
      onDragOver={preventDefault}
      style={{ height: "100%", maxWidth: "unset" }}
      className="rai-file-drop-container"
      name="images"
    />
    : <FileUploaderButton 
        accept={[".jpeg", ".jpg", ".png"]}
        multiple
        buttonKind="secondary"
        onChange={onChange}
        labelText="Upload files"
        style={{ width: "100%", maxWidth: "unset" }}
        disableLabelChanges
      />
  );
}

export default UploadFile;
