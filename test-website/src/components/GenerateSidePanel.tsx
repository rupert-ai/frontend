import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  HeaderPanel,
  NumberInput,
  Select,
  SelectItem,
  Slider,
  TextArea,
  TextInput,
  Toggle,
} from 'carbon-components-react';
import { useRef } from 'react';
import { Options } from '../services/backend';

type GenerateSidePanelProps = {
  startTest: (options: Options) => void;
  isDisabled: boolean;
  initialOptions?: Options;
};

const defaultOptions: Options = {
  prompt: '{Product title}',
  negative_prompt: 'illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)',
  regen_prompt: true,
  image_num: 4,
  manual_seed: -1,
  guidance_scale: '1.0',
  num_inference_steps: 20,
  product_size: 'Original',
  hd_image: false,
  upscale_image: false,
};

export function GenerateSidePanel({ startTest, isDisabled, initialOptions }: GenerateSidePanelProps) {
  const options = useRef<Options>(initialOptions ?? defaultOptions);

  const onPropChange = <OptionsKey extends keyof Options>(name: OptionsKey, value: Options[OptionsKey]) => {
    options.current[name] = value;
  };

  return (
    <HeaderPanel
      aria-label="Generate image panel"
      expanded
      style={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        zIndex: 5000,
        padding: '1rem',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Settings</h3>
        <TextInput
          id="rai-product-title"
          labelText="Product title"
          helperText="Name your product (ex: Shoes)"
          placeholder="ex: Shoes"
          // onChange={(e) =>onPropChange()}
        />
        <Select
          id="rai-prompt-template"
          labelText="Prompt template"
          // onChange={(e) => onPropChange('prompt', e.target.value)}
          value={'Custom'}
        >
          <SelectItem value="Custom" text="Custom" />
        </Select>
        <TextArea
          labelText="Custom prompt"
          rows={4}
          id="rai-custom-prompt"
          onChange={e => onPropChange('prompt', e.target.value)}
          defaultValue={options.current.prompt}
        />
        <Toggle
          labelA="Prompt Magic"
          labelB="Prompt Magic"
          onChange={e => onPropChange('regen_prompt', e.currentTarget.checked)}
          toggled={options.current.regen_prompt}
          id="rai-prompt-magic"
        />
        <NumberInput
          id="rai-variations"
          label="Variations"
          min={1}
          max={4}
          onChange={(_e: unknown, state: { value: string | number }) => onPropChange('image_num', Number(state.value))}
          value={options.current.image_num}
        />
        <Select
          id="rai-product-size"
          labelText="Product size"
          onChange={e => onPropChange('product_size', e.target.value)}
          value={options.current.product_size}
        >
          <SelectItem value="Original" text="Original" />
        </Select>
        <div>
          <Checkbox
            labelText="HD (768 * 768)"
            id="rai-hd-quality"
            onChange={(e: { target: { checked: boolean } }) => onPropChange('hd_image', e.target.checked)}
            defaultChecked={options.current.hd_image}
          />
          <Checkbox
            labelText="Upscale (1536 * 1536)"
            id="rai-upscale-quality"
            onChange={(e: { target: { checked: boolean } }) => onPropChange('upscale_image', e.target.checked)}
            defaultChecked={options.current.upscale_image}
          />
        </div>
        <Accordion>
          <AccordionItem title="Advanced settings" style={{ paddingRight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextArea
                labelText="Negative prompt"
                rows={4}
                id="rai-negative-prompt"
                name="negative_prompt"
                onChange={e => onPropChange('negative_prompt', e.target.value)}
                defaultValue={options.current.negative_prompt}
              />
              <NumberInput
                id="rai-seed"
                label="Seed"
                min={-1}
                max={100}
                value={options.current.manual_seed}
                onChange={(_e: unknown, state: { value: string | number }) =>
                  onPropChange('manual_seed', Number(state.value))
                }
              />
              <Slider
                style={{ width: '100%' }}
                labelText="Prompt guidance"
                name="guidance_scale"
                onChange={val => onPropChange('guidance_scale', val.value)}
                value={options.current.guidance_scale}
                min={1}
                max={30}
                step={0.5}
              />
              <Slider
                labelText="Inference steps"
                name="num_inference_steps"
                onChange={val => onPropChange('num_inference_steps', val.value)}
                value={options.current.num_inference_steps}
                min={1}
                max={50}
                step={1}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <Button style={{ width: '100%' }} onClick={() => startTest(options.current)} disabled={isDisabled}>
        Start testing Ads
      </Button>
    </HeaderPanel>
  );
}
