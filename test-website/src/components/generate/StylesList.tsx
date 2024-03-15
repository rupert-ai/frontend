import { ArrowRight } from '@carbon/icons-react';
import { ClickableTile } from 'carbon-components-react';
import PreviewImage from '../PreviewImage';
import TilesList from '../TilesList';

const styles = [
  {
    name: 'Citrus Elegance',
    lora_weights: 'https://replicate.delivery/pbxt/HDNeOEquDF2ETaE2MVThzRqvBrzSeeKVy8lPlePmNcrupumHB/trained_model.tar',
    img: 'citrus-elegance.png',
    prompt:
      'standing on a platform, pieces of fruit sitting on a flat wooden plate, style of light silver and dark orange, ultraviolet photography, twisted branches, wood, nature-inspired installations,',
  },
  {
    name: 'Painted Aura',
    lora_weights: 'https://replicate.delivery/pbxt/ldX1oUhpnNIxFt7R5XmfR9V8I1HMzv5Fef8d1ycfxHyoCwnHB/trained_model.tar',
    img: 'painted-aura.png',
    prompt:
      'standing on a platform, a splash of orange and yellow paint, style of light magenta and dark cyan, organic sculpting, loose and fluid forms, colorful explosions,',
  },
  {
    name: 'Forest Whisper',
    lora_weights: 'https://replicate.delivery/pbxt/BnhmcpFT6bZWEZSgnsxXufOinfHaPEb4dmKgJe2zrvsba5zjA/trained_model.tar',
    img: 'forest-whisper.png',
    prompt:
      'standing on a platform, a light and darkness on a mossy forest floor, style of floral surrealism, miniature dioramas, junglepunk, smokey background, captures the essence of nature, dark reflections, junglepunk, poetic still life, mist, mysterious jungle,',
  },
  {
    name: 'Flower Essence',
    lora_weights: 'https://replicate.delivery/pbxt/l0Mn4hXCSi44BlimsYJ2THstOPKfF3KJyyHe4W5GreZsT8zjA/trained_model.tar',
    img: 'flower-essence.png',
    prompt:
      'standing on a platform, flowers are sitting down on top of a table against a pink background, light red and dark amber, transparency and opacity, floral accents, matte photo, sabattier effect, vignetting, romantic, elaborate fruit arrangements,',
  },
  {
    name: 'Glitch Spectrum',
    lora_weights: 'https://replicate.delivery/pbxt/SdYPZFbKSmbxFBRQceJuKjepS5dKdqx5DyCzOLXnDCJycVzRA/trained_model.tar',
    img: 'glitch-spectrum.png',
    prompt:
      'standing on a glitchy table, abstract imagery, ater, dark blue and orange, glitchy waves, multimedia installations, selective focus, mingei, dark reflections, reflections and mirroring,',
  },
  {
    name: 'Pastel Prismatics',
    lora_weights: 'https://replicate.delivery/pbxt/Qc4BJuAuKkIlF5OBBHPTqax2l51C4GZTvKNUfY7pXHe87RYSA/trained_model.tar',
    img: 'pastel-prismatics.png',
    prompt:
      'standing on a white countertop in a light pink and azure setting, abstract minimalism appreciator, realistic lighting, crystalcore, bauhaus photography, sunrays shine upon it,',
  },
  {
    name: 'Warm Hues',
    lora_weights: 'https://replicate.delivery/pbxt/iF6YyeNclMWrIi4eAONYIwtaPbQfahlw65eBG5Xt1qDRwHhJB/trained_model.tar',
    img: 'warm-hues.png',
    prompt:
      'sitting on a pedestal of marble, observational photography, vibrant still life, ray tracing, lightbox, emotive lighting, luminous hues,',
  },
  {
    name: 'Golden Hour',
    lora_weights: 'https://replicate.delivery/pbxt/Lz4ScJXRrVqUJRHt9RQwUFkdZLHzL9XVQG9AdqWJz81dbEmE/trained_model.tar',
    img: 'golden-hour.png',
    prompt:
      'sitting on a table with palms, in the style of juxtaposition of light and shadow, dark amber and cyan, photographically detailed portraitures, harmony with nature, sabattier filter, richly layered, green and amber,',
  },
];

export const StylesList = (props: { onClick: (lora_weights: string, prompt: string) => void }) => {
  return <TilesList data={styles} renderer={i => <StyleTile {...i} onClick={props.onClick} />} />;
};

const StyleTile = (props: (typeof styles)[number] & { onClick: (lora_weights: string, prompt: string) => void }) => {
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
      onClick={() => props.onClick(props.lora_weights, props.prompt)}
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
