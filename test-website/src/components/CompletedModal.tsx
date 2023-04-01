import { Modal } from 'carbon-components-react';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';

type CompletedModalProps = {
  onComplete: () => void;
  onClose: () => void;
  heading: string;
  championImage: { name: string; url: string };
};

export function CompletedModal({ onComplete, onClose, heading, championImage }: CompletedModalProps) {
  return (
    <Modal
      open
      modalHeading={`Test #${heading}`}
      modalLabel="Finished"
      primaryButtonText="See full report"
      secondaryButtonText="Close"
      onRequestClose={onClose}
      onRequestSubmit={() => onComplete()}
      selectorPrimaryFocus=".cds--modal-content"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
          <PredictedChampionText />
          <div style={{ wordBreak: 'break-all' }}>{championImage.name}</div>
          <div style={{ overflow: 'hidden' }}>
            <PreviewImage
              image={championImage}
              style={{ width: 'unset', height: '100%', maxWidth: '100%', aspectRatio: 'unset' }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
