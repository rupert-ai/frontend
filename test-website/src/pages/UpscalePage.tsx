import { useMutation } from '@tanstack/react-query';
import { ImagesUpload } from '../components/pageLayouts/ImagesUpload';
import { Backend } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoadingModal } from '../components/LoadingModal';

export function UpscalePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const uploadImagesMutation = useMutation(Backend.upscale, {
    onSuccess(data) {
      navigate(`${data.id}`, { state: { data } });
    },
  });

  const upscale = async (files: File[]) => {
    const token = await auth.user?.getIdToken();
    uploadImagesMutation.mutate({ accessToken: token || '', file: files[0], options: { scale: 2, faceEnhance: true } });
  };

  return (
    <>
      <ImagesUpload
        title="Upload image to upscale"
        description="Max file size is 5mb. Supported file types are .jpg and .png."
        actionText="Start upscale"
        onAction={upscale}
      />
      {uploadImagesMutation.isLoading && (
        <LoadingModal
          heading="Upscale"
          text="This will upscale the image to the best quality possible."
          eventText="Upscaling..."
        />
      )}
    </>
  );
}
