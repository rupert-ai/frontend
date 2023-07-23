import { FileUploaderItem } from 'carbon-components-react';
import useIsMobile from '../hooks/useIsMobile';
import PreviewImage from './PreviewImage';

type UploadedFilesListProps = {
  files: File[] | { name: string; url: string }[];
  onFileDelete: (fileName: string) => void;
};

export function UploadedFilesList({ files, onFileDelete }: UploadedFilesListProps) {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflow: 'overlay',
        paddingLeft: !isMobile ? '1rem' : undefined,
        marginBottom: isMobile ? '1.5rem' : undefined,
      }}
    >
      {files.map((f, index) => (
        <div key={f.name} style={{ display: 'flex' }}>
          <PreviewImage image={f} />
          <FileUploaderItem
            uuid={`${f.name}-${index}`}
            name={f.name}
            status="edit"
            onDelete={() => onFileDelete(f.name)}
            style={{ flexGrow: 1 }}
          />
        </div>
      ))}
    </div>
  );
}
