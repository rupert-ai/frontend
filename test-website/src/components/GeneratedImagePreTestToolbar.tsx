import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'carbon-components-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Backend } from '../services/backend';
import { QuadrantPlot } from '@carbon/icons-react';
import { LoadingModal } from './LoadingModal';
import './GeneratedImagePreTestToolbar.css';

export type CustomImageInstance = {
  prompt?: string;
  url?: string;
  isLoading: boolean;
  selected?: boolean;
};

type GeneratedImagePreTestToolbarProps = {
  selectedItems: CustomImageInstance[];
  data: CustomImageInstance[];
  onCancel: () => void;
  onSelectAll: () => void;
};

export function GeneratedImagePreTestToolbar({
  selectedItems,
  data,
  onCancel,
  onSelectAll,
}: GeneratedImagePreTestToolbarProps) {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentBatchId, setCurrentBatchId] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

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
      <div
        className="pre-test-toolbar"
        style={{
          backgroundColor: selectedItems.length > 0 ? 'var(--cds-button-primary, #0f62fe)' : undefined,
          color: selectedItems.length > 0 ? 'var(--cds-text-on-color, #ffffff)' : undefined,
        }}
      >
        <span>
          {selectedItems.length}/{data.length} item(s) selected
        </span>
        {selectedItems.length > 0 ? (
          <div>
            <Button size="sm" onClick={startTesting} renderIcon={QuadrantPlot} className="pre-test-confirm-button">
              Pre test
            </Button>
            <Button size="sm" onClick={onCancel} className="pre-test-cancel-button">
              Cancel
            </Button>
          </div>
        ) : (
          <Button kind="ghost" size="sm" onClick={onSelectAll}>
            Select all
          </Button>
        )}
      </div>
      {isTesting && (
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
