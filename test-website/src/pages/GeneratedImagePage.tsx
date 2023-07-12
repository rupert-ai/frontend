import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GeneratedTile } from '../components/GeneratedTile';
import { GenerateSidePanel } from '../components/GenerateSidePanel';
import TilesList from '../components/TilesList';
import { useAuth } from '../hooks/useAuth';
import { usePaintImageMutation } from '../hooks/usePaintImageMutation';
import { Backend, Options, PaintImageResponse } from '../services/backend';

const convertUrlToFile = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], 'original.png', { type: 'image/png' });
};

export function GeneratedImagePage() {
  const { id } = useParams();
  const location = useLocation();
  const generatedImage: PaintImageResponse | undefined = location.state?.data;
  const { user } = useAuth();
  const [requiresFetch, setRequiresFetch] = useState(true);

  const { data } = useQuery(
    ['paintedImage', id],
    async () => {
      const token = await user?.getIdToken();
      return Backend.getPaintImage(token ?? '', id ?? '');
    },
    {
      enabled:
        !!user?.uid && !!id && (generatedImage?.jobs.some(job => !job.completedAt) || !generatedImage || requiresFetch),
      refetchInterval: data => {
        return data?.jobs.some(job => !job.completedAt) ? 2000 : false;
      },
      onSuccess: data => {
        if (data.jobs.every(job => job.status === 'succeeded' || job.status === 'failed')) {
          setRequiresFetch(false);
        }
      },
    },
  );

  const { mutate, isLoading } = useMutation(
    ({ token, id, options }: { token: string; id: string; options: Options }) =>
      Backend.regeneratePaintImage(token, id, options),
    {
      onSuccess: () => {
        setRequiresFetch(true);
      },
    },
  );
  const startTest = async (options: Options) => {
    const token = await user?.getIdToken();
    // currentOptions.current = options;
    mutate(
      { token: token ?? '', id: id ?? '', options },
      {
        onSuccess: data => {
          setRequiresFetch(true);
        },
      },
    );
  };

  const mappedData: { prompt?: string; url?: string; isLoading: boolean }[] = useMemo(() => {
    const finalData = data ?? generatedImage;
    return finalData?.jobs.length
      ? [
          { prompt: '', url: finalData?.jobs[0].input.image_path, isLoading: false },
          ...(finalData ?? { jobs: [] }).jobs.flatMap(job =>
            !!job.output?.length
              ? job.output.map(o => ({ prompt: job.prompt, url: o, isLoading: false }))
              : new Array(1 + (job.input.image_num ?? 0)).fill(1).map(() => ({ isLoading: true })),
          ),
        ]
      : [];
  }, [data, generatedImage]);

  const initialOptions = useMemo(() => {
    const validData = generatedImage ?? data;
    return validData?.jobs?.[validData?.jobs.length - 1].input ?? undefined;
  }, [generatedImage, data]);

  return (
    <>
      <div className="rai-test-page">
        {!!mappedData.length && (
          <TilesList
            data={mappedData ?? []}
            renderer={(image, index) => (
              <GeneratedTile
                isLoading={image.isLoading}
                text={index > 1 ? image?.prompt : ''}
                isOriginal={index === 0}
                isTop={index === 1}
                image={{ url: image.url ?? '', name: image.prompt ?? '' }}
              />
            )}
          />
        )}
      </div>
      {!!initialOptions && (
        <GenerateSidePanel
          initialOptions={initialOptions}
          startTest={startTest}
          isDisabled={mappedData?.some(d => d.isLoading) || isLoading}
        />
      )}
    </>
  );
}
