import { Button } from 'carbon-components-react';
import React, { useState } from 'react';
import UploadFile from '../components/UploadFile';
import './TestPage.css';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { UploadedFilesDesktop } from '../components/UploadedFilesDesktop';
import { UploadedFilesList } from '../components/UploadedFilesList';
import { ChartMultitype } from '@carbon/icons-react';
import { Backend } from '../services/backend';
import { useAuth } from '../services/useAuth';
import { LoadingModal } from '../components/LoadingModal';
import { CompletedModal } from '../components/CompletedModal';

export function TestPage() {
  const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const [testState, setTestState] = React.useState<'loading' | 'done'>();
  const [currentBatchId, setCurrentBatchId] = useState(0);
  const [championImage, setChampionImage] = useState<{ name: string; url: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles(f => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles(f => f.filter(({ name }) => fileName !== name));
  }, []);

  const startTest = async () => {
    setTestState('loading');
    const response = await Backend.upload(auth?.user?.accessToken || '', files);
    setCurrentBatchId(response.batchId);
    const int = window.setInterval(async () => {
      const data = await Backend.getResult(auth?.user?.accessToken || '', response.batchId);
      if (!!data.finishedAt) {
        const bestItem = data.items.reduce((prev, curr) => (prev.score >= curr.score ? prev : curr));
        setChampionImage({ name: bestItem.name, url: bestItem.imageOriginal });
        window.clearInterval(int);
        setTestState('done');
      }
    }, 2000);
  };

  return (
    <>
      <div className="rai-test-page">
        <h2>Upload ads to test</h2>
        <small>
          You can test up to 10 Ad images. Max file size is 5mb. Supported file types are <i>.jpg</i> and <i>.png</i>.
        </small>
        <UploadFile onFilesAdded={onFilesAdded} />
        {isMobile && files.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: 8, width: '23rem', justifyContent: 'space-between' }}>
              <h4>Your ad images ({files.length})</h4>
              <Button kind="ghost" size="sm" onClick={() => setFiles([])}>
                Remove all
              </Button>
            </div>
            <UploadedFilesList files={files} onFileDelete={onFileDelete} />
            <Button
              style={{ width: '100%', position: 'fixed', bottom: 0, maxWidth: 'unset', left: 0 }}
              disabled={files.length === 0}
              onClick={startTest}
              renderIcon={ChartMultitype}
            >
              Start testing Ads
            </Button>
          </>
        )}
      </div>
      {!isMobile && (
        <UploadedFilesDesktop
          files={files}
          onFileDelete={onFileDelete}
          onRemoveAll={() => setFiles([])}
          startTest={startTest}
        />
      )}
      {testState === 'loading' && <LoadingModal heading={currentBatchId.toString()} />}
      {testState === 'done' && !!championImage && (
        <CompletedModal
          onComplete={() => navigate(`./projects/${currentBatchId}`)}
          onClose={() => {
            setTestState(undefined);
            setFiles([]);
          }}
          heading={currentBatchId.toString()}
          championImage={championImage}
        />
      )}
    </>
  );
}
