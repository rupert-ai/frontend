import { Button, HeaderPanel } from 'carbon-components-react';
import { Image } from '@carbon/icons-react';
import { UploadedFilesList } from './UploadedFilesList';

type UploadedFilesDesktopProps = {
  files: File[];
  startTest: () => void;
  onFileDelete: (fileName: string) => void;
  onRemoveAll: () => void;
  actionText: string;
  customSettings?: React.ReactNode;
};

export function UploadedFilesDesktop({
  files,
  startTest,
  onFileDelete,
  onRemoveAll,
  actionText,
  customSettings,
}: UploadedFilesDesktopProps) {
  return (
    <HeaderPanel
      aria-label="Uploaded images panel"
      expanded
      style={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        zIndex: 5000,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem 1rem 0 1rem',
            display: 'flex',
            gap: 8,
            justifyContent: 'space-between',
          }}
        >
          <h4>Your images{!!files.length && ` (${files.length})`}</h4>
          {!!files.length && (
            <Button kind="ghost" size="sm" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </div>
        {files.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
              margin: 'auto 0',
            }}
          >
            {/* @ts-ignore */}
            <Image size="128" />
            <div>No images uploaded</div>
          </div>
        )}
        <UploadedFilesList onFileDelete={onFileDelete} files={files} />
      </div>
      {customSettings}
      <Button style={{ width: '100%' }} disabled={files.length === 0} onClick={startTest}>
        {actionText}
      </Button>
    </HeaderPanel>
  );
}
