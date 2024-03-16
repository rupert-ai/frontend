import { useMutation } from '@tanstack/react-query';
import { ImagesUpload } from '../components/pageLayouts/ImagesUpload';
import { Backend } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoadingModal } from '../components/LoadingModal';
import { Slider, Toggle } from 'carbon-components-react';
import React from 'react';

export function UpscalePage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const options = React.useRef({ scale: 2, faceEnhance: true });

  const uploadImagesMutation = useMutation(Backend.upscale, {
    onSuccess(data) {
      navigate(`/upscaled/${data.id}`, { state: { data } });
    },
  });

  const upscale = async (files: File[]) => {
    const token = await auth.user?.getIdToken();
    uploadImagesMutation.mutate({ accessToken: token || '', file: files[0], options: options.current });
  };

  return (
    <>
      <ImagesUpload
        title="Upload image to upscale"
        description="Max file size is 5mb. Supported file types are .jpg and .png."
        actionText="Start upscale"
        onAction={upscale}
        customSettings={
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Slider
              style={{ minWidth: '8rem', width: '8rem' }}
              labelText="Scale"
              name="scale"
              onChange={val => (options.current.scale = val.value)}
              value={options.current.scale}
              min={0}
              max={10}
              step={1}
            />
            <Toggle
              labelA="Face enhance"
              labelB="Face enhance"
              onToggle={v => (options.current.faceEnhance = v)}
              defaultToggled={options.current.faceEnhance}
              id="rai-face-enhance-toggle"
            />
          </div>
        }
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
