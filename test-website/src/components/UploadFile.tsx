import { FileUploaderDropContainer } from "carbon-components-react";
import React from "react";
import "./UploadFile.css";

type UploadFileProps = {
  onFilesAdded: (files: File[]) => void;
};

export function UploadFile({ onFilesAdded }: UploadFileProps) {
  const preventDefault = React.useCallback((e) => {
    e.preventDefault();
  }, []);

  const onAddFiles = React.useCallback(
    (evt: React.DragEvent, { addedFiles }: { addedFiles: File[] }) => {
      const files = addedFiles.filter((f) => f.size <= 1024 * 1024 * 5);
      if (files.length !== addedFiles.length) {
        alert("Some files exceeded 5mb");
      }
      onFilesAdded(files);
    },
    []
  );

  return (
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
  );
}

export default UploadFile;