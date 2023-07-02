import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
  const auth = useAuth();
  const [finalData, setFinalData] = useState<PaintImageResponse[]>(
    generatedImage?.status === 'succeeded' ? [generatedImage] : [],
  );
  const [currentId, setCurrentId] = useState(generatedImage?.status != 'succeeded' ? id : undefined);
  const [requiresFetch, setRequiresFetch] = useState(true);

  const { data } = useQuery(
    ['paintedImage', currentId],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getPaintImage(token ?? '', currentId ?? '');
    },
    {
      enabled: !!auth.user?.uid && !!currentId && generatedImage?.status != 'succeeded' && requiresFetch,
      refetchInterval: data => {
        return data?.status === 'succeeded' || data?.status === 'failed' ? false : 2000;
      },
      onSuccess: data => {
        if (data.status === 'succeeded') {
          setRequiresFetch(false);
          setFinalData(d => [...d, data]);
        }
      },
    },
  );

  // const { mutate, isLoading: mutationLoading } = usePaintImageMutation();

  const startTest = async (options: Options) => {
    console.log('Future enhancement');
    // const token = await auth.user?.getIdToken();
    // const file = await convertUrlToFile(generatedImage?.input.image_path ?? '');
    // // currentOptions.current = options;
    // mutate(
    //   { token: token ?? '', file, options },
    //   {
    //     onSuccess: data => {
    //       setCurrentId(data.id);
    //       setRequiresFetch(true);
    //     },
    //   },
    // );
  };

  return (
    <>
      <div className="rai-test-page">
        {!!finalData.length && (
          <TilesList
            data={[
              { prompt: '', url: finalData[0].input.image_path },
              ...finalData.flatMap(d => (d.output ?? ['']).map(o => ({ prompt: d.input.prompt, url: o }))),
            ]}
            renderer={(image, index) => (
              <GeneratedTile
                isLoading={false}
                text={index > 1 ? image?.prompt : ''}
                isOriginal={index === 0}
                isTop={index === 1}
                image={{ url: image.url, name: image.prompt }}
              />
            )}
          />
        )}
        {!!currentId && data?.status != 'succeeded' && data?.status != 'failed' && (
          <TilesList
            data={new Array(2 + (generatedImage?.input.image_num ?? 0)).fill(1)}
            renderer={() => <GeneratedTile isLoading isOriginal={false} isTop={false} />}
          />
        )}
      </div>
      <GenerateSidePanel initialOptions={generatedImage?.input} startTest={startTest} isDisabled={true} />
    </>
  );
}
