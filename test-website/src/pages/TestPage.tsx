import {
  Button,
  FileUploaderItem,
  HeaderPanel,
  Loading,
  Modal,
} from "carbon-components-react";
import React from "react";
import UploadFile from "../components/UploadFile";
import { Image } from "@carbon/icons-react";
import PreviewImage from "../components/PreviewImage";
import "./TestPage.css";
import { Backend } from "../services/backend";
// import { useAuth } from "../services/useAuth";
import { useTestsContext } from "../hooks/useTestsContext";
import { useNavigate } from "react-router-dom";

export function TestPage() {
  // const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const [testState, setTestState] = React.useState<"loading" | "done">();
  const { setRuns, runs } = useTestsContext();
  const navigate = useNavigate();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles((f) => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles((f) => f.filter(({ name }) => fileName !== name));
  }, []);

  const startTest = async (e: React.FormEvent<HTMLFormElement>) => {
    setTestState("loading");
    e.preventDefault();
    // console.log(e.target.images);
    // const response = await Backend.upload(auth?.user?.accessToken || "", files);
    // const data = await Backend.getResult(
    //   auth?.user?.accessToken || "",
    //   // response.batch_id
    //   2
    // );
    // console.log(data);
    setTimeout(() => {
      setRuns((runs) => [...runs, { files }]);
      setTestState("done");
    }, 10000);
  };

  return (
    <>
      <div className="rai-test-page">
        <h2>Upload ads to test</h2>
        <small>
          You can test up to 10 Ad images. Max file size is 5mb. Supported file
          types are <i>.jpg</i> and <i>.png</i>.
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
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1rem 1rem 0 1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5>Your ad images</h5>
          </div>
          {files.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                margin: "auto 0",
              }}
            >
              <Image size="128" />
              <div>No images uploaded</div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              overflow: "overlay",
            }}
          >
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
                  style={{ flexGrow: 1 }}
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
      {testState === "loading" && (
        <Modal
          open
          modalHeading="Test #1"
          modalLabel="In progress"
          passiveModal
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p>
              This report present the test results of the image ads, including
              the champion ad that had the highest performance in terms of
              click-through rate, conversion rate, and cost-per-click.
            </p>
            <Loading
              description="Testing Ads..."
              withOverlay={false}
              style={{ alignSelf: "center" }}
            />
            <small style={{ alignSelf: "center" }}>
              Please wait, this might take few minutes
            </small>
          </div>
        </Modal>
      )}
      {testState === "done" && (
        <Modal
          open
          modalHeading="Test #1"
          modalLabel="Finished"
          primaryButtonText="See full report"
          secondaryButtonText="Close"
          onRequestClose={() => {
            setTestState(undefined);
            setFiles([]);
          }}
          onRequestSubmit={() =>
            navigate("./history", { state: { lastRun: runs.length - 1 } })
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p>Predicted champion</p>
              <p>{files[0].name}</p>
              <PreviewImage
                image={files[0]}
                style={{ width: 150, height: 150 }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
