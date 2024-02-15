import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CustomImageInstance, GeneratedImagePreTestToolbar } from '../components/GeneratedImagePreTestToolbar';
import { GeneratedTile } from '../components/GeneratedTile';
import { GenerateSidePanel } from '../components/GenerateSidePanel';
import { GenerateToolbar } from '../components/GenerateToolbar';
import TilesList from '../components/TilesList';
import { useAuth } from '../hooks/useAuth';
import useIsMobile from '../hooks/useIsMobile';
import { Backend, NewOptions, Options, PaintImageResponse } from '../services/backend';
import { isOldApi } from '../utils/helpers';

export function GeneratedImagePage() {
  const { id } = useParams();
  const location = useLocation();
  const generatedImage: PaintImageResponse | undefined = location.state?.data;
  const { user } = useAuth();
  const [requiresFetch, setRequiresFetch] = useState(true);
  const isMobile = useIsMobile();
  const [showPanel, setShowPanel] = useState(true);
  const navigate = useNavigate();
  const [currentOptions, setCurrentOptions] = useState<Options>();
  const [selectedItems, setSelectedItems] = useState<CustomImageInstance[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setShowPanel(!isMobile);
  }, [isMobile]);

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
        queryClient.invalidateQueries(['paintedImage', id]);
        setRequiresFetch(true);
      },
    },
  );

  const startTest = async (prompt: string) => {
    if (!currentOptions) {
      return;
    }

    const token = await user?.getIdToken();
    mutate(
      { token: token ?? '', id: id ?? '', options: { ...currentOptions, prompt } },
      {
        onSuccess: () => {
          setRequiresFetch(true);
        },
      },
    );
  };

  const mappedData: CustomImageInstance[] = useMemo(() => {
    const finalData = (data ?? generatedImage)?.jobs.filter(j => j.status !== 'failed');
    const sortedData = [...(finalData ?? [])].sort((a, b) =>
      new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1,
    );
    return sortedData?.length
      ? [
          ...sortedData.flatMap(job =>
            !!job.output?.length
              ? job.output
                  .filter((_, index) => index !== 0)
                  .map(o => ({
                    prompt: job.prompt ?? job.input.prompt,
                    url: o,
                    isLoading: false,
                    selected: selectedItems.some(e => e.url === o),
                  }))
              : new Array(isOldApi(job.input) ? job.input.image_num : job.input.num_outputs ?? 0)
                  .fill(1)
                  .map(() => ({ isLoading: true })),
          ),
        ]
      : [];
  }, [data, generatedImage, selectedItems]);

  useEffect(() => {
    const validData = generatedImage ?? data;
    const lastJob = validData?.jobs?.[validData?.jobs.length - 1];
    if (!!lastJob && isOldApi(lastJob.input)) {
      setCurrentOptions(lastJob?.input);
    }
  }, [generatedImage, data]);

  const onOptionChange: React.ComponentProps<typeof GenerateSidePanel>['onChange'] = (key, val) => {
    setCurrentOptions(o => (o ? { ...o, [key]: val } : { [key]: val }));
  };

  const originalImage = useMemo(() => (data ?? generatedImage)?.jobs?.[0].input, [data, generatedImage]);

  return (
    <>
      <div className="rai-test-page" style={{ flexGrow: !showPanel ? '1' : undefined }}>
        {!originalImage ||
          (isOldApi(originalImage) && (
            <GenerateToolbar
              isLoading={isLoading}
              onGenerate={startTest}
              onShowPanel={() => setShowPanel(v => !v)}
              isDisabled={mappedData?.some(d => d.isLoading) || isLoading || !!selectedItems.length}
              onImageChange={() => navigate('/generate')}
              image={originalImage?.image_path}
              initialPrompt={originalImage?.prompt}
            />
          ))}
        <GeneratedImagePreTestToolbar
          selectedItems={selectedItems}
          data={mappedData}
          onCancel={() => setSelectedItems([])}
          onSelectAll={() => setSelectedItems(mappedData)}
        />
        {!!mappedData.length && (
          <TilesList
            style={isMobile ? { overflow: 'auto', width: 'calc(100% + 1rem)', paddingRight: '1rem' } : undefined}
            data={mappedData ?? []}
            renderer={image => (
              <GeneratedTile
                isLoading={image.isLoading}
                text={image?.prompt}
                image={{ url: image.url ?? '', name: image.prompt ?? '' }}
                selected={image.selected}
                onClick={() =>
                  image.selected
                    ? setSelectedItems(v => [...v.filter(e => e.url != image.url)])
                    : setSelectedItems(v => [...v, image])
                }
              />
            )}
          />
        )}
      </div>
      {!!showPanel && (!originalImage || isOldApi(originalImage)) && (
        <GenerateSidePanel
          initialOptions={currentOptions}
          onChange={onOptionChange}
          onClose={() => setShowPanel(false)}
          image={originalImage?.image_path}
          onImageRemove={() => navigate('/generate')}
        />
      )}
    </>
  );
}
