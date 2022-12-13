import {
  Button,
  FileUploaderItem,
  Form,
  FormGroup,
  HeaderPanel,
} from "carbon-components-react";
import React from "react";
import UploadFile from "../components/UploadFile";
import { CubeView, Image } from "@carbon/icons-react";
import PreviewImage from "../components/PreviewImage";
import "./TestPage.css";
import { Backend } from "../services/backend";
import { useAuth } from "../services/useAuth";
import { useNavigate } from "react-router-dom";

export function TestPage() {
  const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const navigate = useNavigate();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles((f) => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles((f) => f.filter(({ name }) => fileName !== name));
  }, []);

  const startTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.target.images);
    // const response = await Backend.upload(auth?.user?.accessToken || "", files);
    const data = await Backend.getResult(
      auth?.user?.accessToken || "",
      // response.batch_id
      2
    );
    console.log(data);
    navigate("../result", { state: data.items });
  };

  return (
    <>
      <div className="rai-test-page">
        <h2>Upload ads to test</h2>
        <small>
          You can test up to 10 Ad images. Max file size is 500kb. Supported
          file types are <i>.jpg</i> and <i>.png</i>.
        </small>
        <UploadFile onFilesAdded={onFilesAdded} />
      </div>
      <HeaderPanel
        aria-label="Uploaded images panel"
        expanded
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "20rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "1rem 1rem 0 1rem",
            }}
          >
            <h5>Your ad images</h5>
            {files.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Image size="128" />
                <div>You have no images uploaded</div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((f, index) => (
              <div
                key={f.name}
                style={{ display: "flex", paddingLeft: "1rem" }}
              >
                <PreviewImage image={f} />
                <FileUploaderItem
                  uuid={`${f.name}-${f.size}-${index}`}
                  name={f.name}
                  status="edit"
                  onDelete={() => onFileDelete(f.name)}
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          style={{ width: "100%" }}
          disabled={files.length === 0}
          onClick={startTest}
        >
          Start testing Ads
        </Button>
      </HeaderPanel>
    </>
  );
}
