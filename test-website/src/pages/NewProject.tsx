import { ClickableTile, Tag } from 'carbon-components-react';
import { Locked } from '@carbon/icons-react';
import './NewProject.css';
import { useNavigate } from 'react-router-dom';
import TilesList from '../components/TilesList';
import React from 'react';

type ProjectTileProps = {
  img: string;
  onClick?: () => void;
  tag: React.ReactNode;
  title: string;
  description: string;
};

function ProjectTile({ img, onClick, tag, title, description }: ProjectTileProps) {
  return (
    <ClickableTile onClick={onClick} style={{ padding: 0, height: '100%' }} disabled={!onClick}>
      <div className="rai-option-tile-image">
        <img
          src={img}
          style={{
            opacity: !onClick ? 0.3 : 1,
          }}
        />
        {!onClick && (
          <div>
            <Locked width={32} height={32} fill="white" />
          </div>
        )}
      </div>
      <div className="rai-option-tile-content">
        <div className="rai-option-tile-tag">{tag}</div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </ClickableTile>
  );
}

export function NewProject() {
  const navigate = useNavigate();

  const newProjectOptions = React.useMemo(
    () => [
      {
        title: 'Product photography',
        description: 'Create a visually appealing advertisements featuring your product image.',
        img: 'product-photo.png',
        tag: <Tag type="purple">New</Tag>,
        onClick: () => navigate('./generate'),
      },
      {
        title: 'Pre-test ads',
        description: 'Predict the Click-Through Rate (CTR) of different image ads.',
        img: 'pre-test-ads.png',
        tag: <Tag type="high-contrast">Available</Tag>,
        onClick: () => navigate('./test'),
      },
      {
        title: 'Upscale image',
        description: 'Create high-quality images from low-quality images.',
        img: 'dog.png',
        tag: <Tag>Coming soon</Tag>,
      },
      {
        title: 'SDXL + LoRa',
        description: 'Create amazing images from prompts with some of our favorite SDXL fine-tunes.',
        img: 'horse.jpeg',
        tag: <Tag>Coming soon</Tag>,
      },
      {
        title: 'Remove background',
        description: 'Instantly remove image backgrounds with our high accuracy tool.',
        img: 'car.png',
        tag: <Tag>Coming soon</Tag>,
      },
    ],
    [],
  );

  return (
    <div className="rai-new-project-container">
      <h2>Create new project</h2>
      <TilesList data={newProjectOptions} renderer={i => <ProjectTile {...i} />}></TilesList>
    </div>
  );
}

export default NewProject;
