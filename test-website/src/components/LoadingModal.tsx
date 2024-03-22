import { Modal } from 'carbon-components-react';
import CustomLoader from './CustomLoader';

type LoadingModalProps = {
  heading: string;
  text: string;
  eventText: string;
};

export function LoadingModal({ heading, text, eventText }: LoadingModalProps) {
  return (
    <Modal open modalHeading={heading} modalLabel="In progress" passiveModal selectorPrimaryFocus=".cds--modal-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>{text}</div>
        <CustomLoader />
        <div style={{ alignSelf: 'center' }}>{eventText}</div>
        <small style={{ alignSelf: 'center' }}>Please wait, this might take few minutes</small>
      </div>
    </Modal>
  );
}
