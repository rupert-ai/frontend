import React, { useRef } from 'react';
import UploadFile from '../components/UploadFile';
// import './GeneratePage.css';
import { Options } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { GenerateSidePanel } from '../components/GenerateSidePanel';
import PreviewImage from '../components/PreviewImage';
import { useNavigate } from 'react-router-dom';
import { usePaintImageMutation } from '../hooks/usePaintImageMutation';

export function GeneratePage() {
  const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const currentOptions = useRef<Options>();
  const navigate = useNavigate();

  const onFilesAdded = React.useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  const { mutate, isLoading: mutationLoading } = usePaintImageMutation();

  const startTest = async (options: Options) => {
    const token = await auth.user?.getIdToken();
    currentOptions.current = options;
    mutate(
      { token: token ?? '', file: files[0], options },
      {
        onSuccess: data => {
          navigate(`./${data.id}`, { state: { data } });
        },
      },
    );
  };

  return (
    <>
      <div className="rai-test-page">
        <h2>Generate</h2>
        <small>
          You can generate up to 4 Ads in one take. Max file size is 500kb. Supported file types are <i>.jpg</i> and{' '}
          <i>.png</i>.
        </small>
        {!files.length ? (
          <UploadFile onFilesAdded={onFilesAdded} multiple={false} />
        ) : (
          <PreviewImage image={files[0]} style={{ width: '50%', objectFit: 'cover', flexGrow: 1 }} />
        )}
      </div>
      <GenerateSidePanel startTest={startTest} isDisabled={!files.length || mutationLoading} />
    </>
  );
}
