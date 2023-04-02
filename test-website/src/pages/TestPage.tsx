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
import { useMutation, useQuery } from '@tanstack/react-query';

export function TestPage() {
  const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const [researchState, setResearchState] = useState<'loading' | 'done'>('done');
  const [currentBatchId, setCurrentBatchId] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles(f => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles(f => f.filter(({ name }) => fileName !== name));
  }, []);

  const uploadImagesMutation = useMutation(Backend.upload, {
    onSuccess(response) {
      setCurrentBatchId(response.batchId);
    },
    onError() {
      setResearchState('done');
    },
  });

  const getResultQuery = useQuery(
    ['Result', currentBatchId],
    () => Backend.getResult(auth?.user?.accessToken || '', currentBatchId),
    {
      enabled: !!currentBatchId,
      onSuccess: data => {
        if (!!data.finishedAt) {
          setResearchState('done');
          navigate(`./projects/${currentBatchId}`);
        }
      },
      refetchInterval: data => {
        return !!data?.finishedAt ? false : 2000;
      },
      onError() {
        setResearchState('done');
      },
    },
  );

  const startTest = async () => {
    setResearchState('loading');
    uploadImagesMutation.mutate({ accessToken: auth?.user?.accessToken || '', files });
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
      {researchState === 'loading' && <LoadingModal heading={currentBatchId.toString()} />}
    </>
  );
}
