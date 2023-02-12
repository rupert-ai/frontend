import {
  Button,
  Modal,
} from "carbon-components-react";
import React from "react";
import UploadFile from "../components/UploadFile";
import PreviewImage from "../components/PreviewImage";
import "./TestPage.css";
import { useTestsContext } from "../hooks/useTestsContext";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import PredictedChampionText from "../components/PredictedChampionText";
import useIsMobile from "../hooks/useIsMobile";
import { UploadedFilesDesktop } from "../components/UploadedFilesDesktop";
import { UploadedFilesList } from "../components/UploadedFilesList";
import { ChartMultitype } from "@carbon/icons-react";

export function TestPage() {
  // const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const [testState, setTestState] = React.useState<"loading" | "done">();
  const { setRuns, runs } = useTestsContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles((f) => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles((f) => f.filter(({ name }) => fileName !== name));
  }, []);

  const startTest = async () => {
    setTestState("loading");
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
    }, 5000);
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
        {isMobile && files.length > 0 && <>
          <div style={{display: "flex", gap: 8, width: "23rem", justifyContent: "space-between" }}>
            <h4>Your ad images ({files.length})</h4>
            <Button kind="ghost" size="sm" onClick={() => setFiles([])}>Remove all</Button>
          </div>
          <UploadedFilesList files={files} onFileDelete={onFileDelete} />
          <Button
            style={{ width: "100%", position: "fixed", bottom: 0, maxWidth: "unset", left: 0 }}
            disabled={files.length === 0}
            onClick={startTest}
            renderIcon={ChartMultitype}
          >
            Start testing Ads
          </Button>
        </>}
      </div>
      {!isMobile && <UploadedFilesDesktop files={files} onFileDelete={onFileDelete} onRemoveAll={() => setFiles([])} startTest={startTest} />}
      {testState === "loading" && (
        <Modal
          open
          modalHeading={`Test #${runs.length + 1}`}
          modalLabel="In progress"
          passiveModal
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p>
              This report present the test results of the image ads, including
              the champion ad that had the highest performance in terms of
              click-through rate, conversion rate, and cost-per-click.
            </p>
            <CustomLoader />
            <div style={{ alignSelf: "center" }}>Testing Ads...</div>
            <small style={{ alignSelf: "center" }}>
              Please wait, this might take few minutes
            </small>
          </div>
        </Modal>
      )}
      {testState === "done" && (
        <Modal
          open
          modalHeading={`Test #${runs.length}`}
          modalLabel="Finished"
          primaryButtonText="See full report"
          secondaryButtonText="Close"
          onRequestClose={() => {
            setTestState(undefined);
            setFiles([]);
          }}
          onRequestSubmit={() =>
            navigate(`./projects/${runs.length - 1}`)
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p>
              This report present the test results of the image ads, including
              the champion ad that had the highest performance in terms of
              click-through rate, conversion rate, and cost-per-click.
            </p>
            <div style={{ alignSelf: "center", display: "flex", flexDirection: "column", gap: 16 }}>
              <PredictedChampionText />
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
