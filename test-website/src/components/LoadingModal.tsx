import { Modal } from 'carbon-components-react';
import CustomLoader from './CustomLoader';

type LoadingModalProps = {
  heading: string;
};

export function LoadingModal({ heading }: LoadingModalProps) {
  return (
    <Modal
      open
      modalHeading={`Test #${heading}`}
      modalLabel="In progress"
      passiveModal
      selectorPrimaryFocus=".cds--modal-content"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          This report present the test results of the image ads, including the champion ad that had the highest
          performance in terms of click-through rate, conversion rate, and cost-per-click.
        </div>
        <CustomLoader />
        <div style={{ alignSelf: 'center' }}>Testing Ads...</div>
        <small style={{ alignSelf: 'center' }}>Please wait, this might take few minutes</small>
      </div>
    </Modal>
  );
}
