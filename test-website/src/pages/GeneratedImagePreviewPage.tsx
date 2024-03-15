import React from 'react';
import { Button } from 'carbon-components-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Backend, NewOptionsInput, Options, PaintImageResponse } from '../services/backend';
import PreviewImage from '../components/PreviewImage';
import { Close } from '@carbon/icons-react';
import { isOldApi } from '../utils/helpers';
import './GeneratedImagePreviewPage.css';

export function GeneratedImagePreviewPage() {
  const { id, itemId } = useParams();
  const location = useLocation();
  const generatedImage: PaintImageResponse | undefined = location.state?.data;
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ['paintedImage', id],
    async () => {
      const token = await user?.getIdToken();
      return Backend.getPaintImage(token ?? '', id ?? '');
    },
    {
      enabled: !!user?.uid && !!id && !generatedImage,
    },
  );

  const image = React.useMemo(() => {
    const finalData = (data ?? generatedImage)?.jobs.filter(j => j.status !== 'failed');
    const sortedData = [...(finalData ?? [])].sort((a, b) =>
      new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1,
    );
    const images = sortedData?.length
      ? [
          ...sortedData.flatMap(job =>
            job?.output?.map(o => ({
              prompt: job.prompt ?? job.input.prompt,
              url: o,
              input: job.input,
            })),
          ),
        ]
      : [];

    return images ? images[Number(itemId) ?? 0] : undefined;
  }, [data, generatedImage]);

  const { mutate } = useMutation(
    ({ token, id, options }: { token: string; id: string; options: NewOptionsInput }) =>
      Backend.regeneratePaintImageNew(token, id, options),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['paintedImage', id]);
        navigate('..', { relative: 'path' });
      },
    },
  );

  const { mutate: mutateOld } = useMutation(
    ({ token, id, options }: { token: string; id: string; options: Options }) =>
      Backend.regeneratePaintImage(token, id, options),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['paintedImage', id]);
        navigate('..', { relative: 'path' });
      },
    },
  );

  const startTest = async () => {
    if (!image) {
      return;
    }
    const token = await user?.getIdToken();
    if (isOldApi(image.input)) {
      mutateOld({ token: token ?? '', id: id ?? '', options: image.input });
    } else {
      mutate({ token: token ?? '', id: id ?? '', options: image.input });
    }
  };

  return (
    <>
      {!!image && (
        <div style={{ display: 'flex', height: '100%', marginRight: '-1.8rem', gap: '4rem' }}>
          <div style={{ marginInline: 'auto' }}>
            <PreviewImage
              style={{ height: 'unset', width: '100%', objectFit: 'cover', maxHeight: '100%' }}
              image={{ name: '', url: image.url }}
            />
          </div>
          <div
            style={{
              minWidth: 300,
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ alignSelf: 'flex-end' }} onClick={() => navigate('..', { relative: 'path' })}>
              <Button kind="ghost" hasIconOnly renderIcon={Close} iconDescription="Close" />
            </div>
            <div>
              <p style={{ backgroundColor: '#262626', padding: '0.5rem' }}>{image.prompt}</p>
              <Button kind="secondary" className="rai-action-buttons" onClick={startTest}>
                Generate 2 variations
              </Button>
              <Button disabled className="rai-action-buttons">
                Creative upscale
              </Button>
              <Button disabled className="rai-action-buttons">
                Magic refiner
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
