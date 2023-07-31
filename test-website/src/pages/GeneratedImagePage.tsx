import { QuadrantPlot } from '@carbon/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'carbon-components-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GeneratedTile } from '../components/GeneratedTile';
import { GenerateSidePanel } from '../components/GenerateSidePanel';
import { GenerateToolbar } from '../components/GenerateToolbar';
import { LoadingModal } from '../components/LoadingModal';
import TilesList from '../components/TilesList';
import { useAuth } from '../hooks/useAuth';
import { Backend, Options, PaintImageResponse } from '../services/backend';

type CustomImageInstance = {
  prompt?: string;
  url?: string;
  isLoading: boolean;
  selected?: boolean;
};

export function GeneratedImagePage() {
  const { id } = useParams();
  const location = useLocation();
  const generatedImage: PaintImageResponse | undefined = location.state?.data;
  const { user } = useAuth();
  const [requiresFetch, setRequiresFetch] = useState(true);
  const [showPanel, setShowPanel] = useState(true);
  const navigate = useNavigate();
  const [currentOptions, setCurrentOptions] = useState<Options>();
  const [selectedItems, setSelectedItems] = useState<CustomImageInstance[]>([]);
  const [currentBatchId, setCurrentBatchId] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

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

  const startTest = async () => {
    if (!currentOptions) {
      return;
    }

    const token = await user?.getIdToken();
    mutate(
      { token: token ?? '', id: id ?? '', options: currentOptions },
      {
        onSuccess: () => {
          setRequiresFetch(true);
        },
      },
    );
  };

  const mappedData: CustomImageInstance[] = useMemo(() => {
    const finalData = (data ?? generatedImage)?.jobs.filter(j => j.status !== 'failed');
    return finalData?.length
      ? [
          ...(finalData ?? []).flatMap(job =>
            !!job.output?.length
              ? job.output
                  .filter((_, index) => index !== 0)
                  .map(o => ({
                    prompt: job.prompt,
                    url: o,
                    isLoading: false,
                    selected: selectedItems.some(e => e.url === o),
                  }))
              : new Array(1 + (job.input.image_num ?? 0)).fill(1).map(() => ({ isLoading: true })),
          ),
        ]
      : [];
  }, [data, generatedImage, selectedItems]);

  useEffect(() => {
    const validData = generatedImage ?? data;
    setCurrentOptions(validData?.jobs?.[validData?.jobs.length - 1].input);
  }, [generatedImage, data]);

  const generate = (prompt: string) => {
    setCurrentOptions(o => ({ ...o, prompt }));
    startTest();
  };

  const onOptionChange: React.ComponentProps<typeof GenerateSidePanel>['onChange'] = (key, val) => {
    setCurrentOptions(o => ({ ...o, [key]: val }));
  };

  const originalImage = useMemo(() => (data ?? generatedImage)?.jobs?.[0].input, [data, generatedImage]);

  const uploadImagesMutation = useMutation(Backend.uploadGenerated, {
    onSuccess(response) {
      setCurrentBatchId(response.batchId);
    },
    onError() {
      setIsTesting(false);
    },
  });

  useQuery(
    ['Result', currentBatchId],
    async () => {
      const token = await user?.getIdToken();
      return Backend.getResult(token || '', currentBatchId);
    },
    {
      enabled: !!currentBatchId,
      onSuccess: () => {
        setIsTesting(false);
        navigate(`../projects/${currentBatchId}`);
      },
      onError() {
        setIsTesting(false);
      },
    },
  );

  const startTesting = async () => {
    setIsTesting(true);
    const token = await user?.getIdToken();
    uploadImagesMutation.mutate({
      accessToken: token || '',
      files: selectedItems.map(i => i.url ?? ''),
      name: `#${id ?? Math.random()}`,
    });
  };

  return (
    <>
      <div className="rai-test-page" style={{ flexGrow: !showPanel ? '1' : undefined }}>
        <GenerateToolbar
          isLoading={isLoading}
          onGenerate={generate}
          onShowPanel={() => setShowPanel(v => !v)}
          isDisabled={mappedData?.some(d => d.isLoading) || isLoading || !!selectedItems.length}
          onImageChange={() => navigate('/generate')}
          image={originalImage?.image_path}
          initialPrompt={originalImage?.prompt}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedItems.length > 0 ? 'var(--cds-button-primary, #0f62fe)' : undefined,
            color: selectedItems.length > 0 ? 'var(--cds-text-on-color, #ffffff)' : undefined,
            paddingLeft: '1rem',
          }}
        >
          <span>
            {selectedItems.length}/{mappedData.length} item(s) selected
          </span>
          {selectedItems.length > 0 ? (
            <div>
              <Button size="sm" onClick={startTesting} renderIcon={QuadrantPlot} style={{ paddingRight: '3rem' }}>
                Pre test
              </Button>
              <Button size="sm" onClick={() => setSelectedItems([])} style={{ paddingRight: '1rem' }}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button kind="ghost" size="sm" onClick={() => setSelectedItems([...mappedData])}>
              Select all
            </Button>
          )}
        </div>
        {!!mappedData.length && (
          <TilesList
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
      {!!showPanel && (
        <GenerateSidePanel
          initialOptions={currentOptions}
          onChange={onOptionChange}
          onClose={() => setShowPanel(false)}
          image={originalImage?.image_path}
          onImageRemove={() => navigate('/generate')}
        />
      )}
      {isTesting && <LoadingModal heading={currentBatchId.toString()} />}
    </>
  );
}
