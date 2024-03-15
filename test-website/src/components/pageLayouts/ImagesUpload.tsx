import { Button } from 'carbon-components-react';
import UploadFile from '../UploadFile';
import { UploadedFilesList } from '../UploadedFilesList';
import { ChartMultitype } from '@carbon/icons-react';
import { UploadedFilesDesktop } from '../UploadedFilesDesktop';
import React from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import './ImagesUpload.css';

type ImagesUploadProps = {
  title: string;
  description: string;
  actionText: string;
  onAction: (files: File[]) => void;
};

export function ImagesUpload({ title, description, actionText, onAction }: ImagesUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const isMobile = useIsMobile();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles(f => [...f, ...files]);
  }, []);

  const onFileDelete = React.useCallback((fileName: string) => {
    return setFiles(f => f.filter(({ name }) => fileName !== name));
  }, []);

  const action = () => {
    onAction(files);
  };

  return (
    <>
      <div className="rai-test-page">
        <h2>{title}</h2>
        <small>{description} </small>
        <UploadFile onFilesAdded={onFilesAdded} />
        {isMobile && files.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: 8, width: '23rem', justifyContent: 'space-between' }}>
              <h4>Your images ({files.length})</h4>
              <Button kind="ghost" size="sm" onClick={() => setFiles([])}>
                Remove all
              </Button>
            </div>
            <UploadedFilesList files={files} onFileDelete={onFileDelete} />
            <Button
              style={{ width: '100%', position: 'fixed', bottom: 0, maxWidth: 'unset', left: 0 }}
              disabled={files.length === 0}
              onClick={action}
              renderIcon={ChartMultitype}
            >
              {actionText}
            </Button>
          </>
        )}
      </div>
      {!isMobile && (
        <UploadedFilesDesktop
          files={files}
          onFileDelete={onFileDelete}
          onRemoveAll={() => setFiles([])}
          startTest={action}
          actionText={actionText}
        />
      )}
    </>
  );
}
