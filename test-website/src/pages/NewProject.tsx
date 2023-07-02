import { ClickableTile } from 'carbon-components-react';
import { MagicWand, QuadrantPlot } from '@carbon/icons-react';
import './NewProject.css';
import { useNavigate } from 'react-router-dom';

export function NewProject() {
  const navigate = useNavigate();

  return (
    <div className="rai-new-project-container">
      <h2>Create new project</h2>
      <div className="rai-new-project-options">
        <ClickableTile renderIcon={MagicWand} onClick={() => navigate('./generate')}>
          <h3>Generate</h3>
          <p>Create a visually appealing advertisements featuring your product image.</p>
        </ClickableTile>
        <ClickableTile renderIcon={QuadrantPlot} onClick={() => navigate('./test')}>
          <h3>Test</h3>
          <p>
            Predict the Click-Through Rate (CTR) of different images subsequently ranking them based on their projected
            performance.
          </p>
        </ClickableTile>
      </div>
    </div>
  );
}

export default NewProject;
