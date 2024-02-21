import { ArrowRight } from '@carbon/icons-react';
import { ClickableTile } from 'carbon-components-react';
import PreviewImage from '../PreviewImage';
import TilesList from '../TilesList';

const styles = [
  {
    name: 'Citrus Elegance',
    lora_weights: 'https://replicate.delivery/pbxt/HDNeOEquDF2ETaE2MVThzRqvBrzSeeKVy8lPlePmNcrupumHB/trained_model.tar',
    img: 'citrus-elegance.png',
  },
  {
    name: 'Painted Aura',
    lora_weights: 'https://replicate.delivery/pbxt/ldX1oUhpnNIxFt7R5XmfR9V8I1HMzv5Fef8d1ycfxHyoCwnHB/trained_model.tar',
    img: 'painted-aura.png',
  },
  {
    name: 'Forest Whisper',
    lora_weights: 'https://replicate.delivery/pbxt/BnhmcpFT6bZWEZSgnsxXufOinfHaPEb4dmKgJe2zrvsba5zjA/trained_model.tar',
    img: 'forest-whisper.png',
  },
  {
    name: 'Flower Essence',
    lora_weights: 'https://replicate.delivery/pbxt/l0Mn4hXCSi44BlimsYJ2THstOPKfF3KJyyHe4W5GreZsT8zjA/trained_model.tar',
    img: 'flower-essence.png',
  },
  {
    name: 'Glitch Spectrum',
    lora_weights: 'https://replicate.delivery/pbxt/SdYPZFbKSmbxFBRQceJuKjepS5dKdqx5DyCzOLXnDCJycVzRA/trained_model.tar',
    img: 'glitch-spectrum.png',
  },
  {
    name: 'Pastel Prismatics',
    lora_weights: 'https://replicate.delivery/pbxt/Qc4BJuAuKkIlF5OBBHPTqax2l51C4GZTvKNUfY7pXHe87RYSA/trained_model.tar',
    img: 'pastel-prismatics.png',
  },
  {
    name: 'Warm Hues',
    lora_weights: 'https://replicate.delivery/pbxt/iF6YyeNclMWrIi4eAONYIwtaPbQfahlw65eBG5Xt1qDRwHhJB/trained_model.tar',
    img: 'warm-hues.png',
  },
  {
    name: 'Golden Hour',
    lora_weights: 'https://replicate.delivery/pbxt/Lz4ScJXRrVqUJRHt9RQwUFkdZLHzL9XVQG9AdqWJz81dbEmE/trained_model.tar',
    img: 'golden-hour.png',
  },
];

export const StylesList = (props: { onClick: (lora_weights: string) => void }) => {
  return <TilesList data={styles} renderer={i => <StyleTile {...i} onClick={props.onClick} />} />;
};

const StyleTile = (props: (typeof styles)[number] & { onClick: (lora_weights: string) => void }) => {
  return (
    <ClickableTile
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
      }}
      title={props.name}
      onClick={() => props.onClick(props.lora_weights)}
    >
      <PreviewImage
        image={{ name: props.name, url: props.img }}
        style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
      />

      <div style={{ padding: '1rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        {props.name} <ArrowRight />
      </div>
    </ClickableTile>
  );
};
