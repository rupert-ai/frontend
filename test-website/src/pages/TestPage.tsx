import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Backend } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { LoadingModal } from '../components/LoadingModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ImagesUpload } from '../components/pageLayouts/ImagesUpload';

export function TestPage() {
  const auth = useAuth();
  const [researchState, setResearchState] = React.useState<'loading' | 'done'>('done');
  const [currentBatchId, setCurrentBatchId] = React.useState(0);
  const navigate = useNavigate();

  const uploadImagesMutation = useMutation(Backend.upload, {
    onSuccess(response) {
      setCurrentBatchId(response.batchId);
    },
    onError() {
      setResearchState('done');
    },
  });

  useQuery(
    ['Result', currentBatchId],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getResult(token || '', currentBatchId);
    },
    {
      enabled: !!currentBatchId,
      onSuccess: () => {
        setResearchState('done');
        navigate(`../projects/${currentBatchId}`);
      },
      onError() {
        setResearchState('done');
      },
    },
  );

  const startTest = async (files: File[]) => {
    setResearchState('loading');
    const token = await auth.user?.getIdToken();
    uploadImagesMutation.mutate({ accessToken: token || '', files });
  };

  return (
    <>
      <ImagesUpload
        title="Upload ads to test"
        description="You can test up to 10 Ad images. Max file size is 5mb. Supported file types are .jpg and .png."
        actionText="Start testing Ads"
        onAction={startTest}
      />
      {researchState === 'loading' && (
        <LoadingModal
          heading={`Test #${currentBatchId.toString()}`}
          text="This report present the test results of the image ads, including the champion ad that had the highest
          performance in terms of click-through rate, conversion rate, and cost-per-click."
          eventText="Testing Ads..."
        />
      )}
    </>
  );
}
