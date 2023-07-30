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
  Toggle,
} from 'carbon-components-react';
import { ReactNode, useRef } from 'react';
import { Options } from '../services/backend';
import { Close } from '@carbon/icons-react';
import './GenerateSidePanel.css';
import { UploadedFilesList } from './UploadedFilesList';
import useIsMobile from '../hooks/useIsMobile';

type initialOptions = Omit<Options, 'prompt'>;

type GenerateSidePanelProps = {
  initialOptions?: initialOptions;
  onChange: <OptionsKey extends keyof initialOptions>(key: OptionsKey, value: initialOptions[OptionsKey]) => void;
  onClose: () => void;
  image?: File | string;
  onImageRemove: () => void;
};

const PanelContainer = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div>{children}</div>
  ) : (
    <HeaderPanel
      aria-label="Generate image panel"
      expanded
      className="rai-settings-panel"
      onClick={e => e.stopPropagation()}
    >
      {children}
    </HeaderPanel>
  );
};

export const defaultOptions: Options = {
  negative_prompt: 'illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)',
  regen_prompt: true,
  image_num: 4,
  manual_seed: -1,
  guidance_scale: '1.0',
  num_inference_steps: 20,
  product_size: 'Original',
  hd_image: false,
  upscale_image: false,
  prompt: '',
};

export function GenerateSidePanel({ initialOptions, onChange, onClose, image, onImageRemove }: GenerateSidePanelProps) {
  const options = useRef<initialOptions>(initialOptions ?? defaultOptions);

  const onPropChange = <OptionsKey extends keyof initialOptions>(
    name: OptionsKey,
    value: initialOptions[OptionsKey],
  ) => {
    options.current[name] = value;
    onChange(name, value);
  };

  return (
    <PanelContainer>
      <div className="rai-settings-panel-content">
        <div className="rai-settings-panel-header">
          <h3>Settings</h3>
          <Button
            className="cds--header__action rai-settings-panel-close-button"
            onClick={onClose}
            kind="tertiary"
            size="small"
          >
            <Close size="20" />
          </Button>
        </div>
        {/* <TextInput
          id="rai-product-title"
          labelText="Product title"
          helperText="Name your product (ex: Shoes)"
          placeholder="ex: Shoes"
          // onChange={(e) =>onPropChange()}
        /> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h5>Uploaded file</h5>
          {!!image && (
            <UploadedFilesList
              files={typeof image === 'string' ? [{ name: '', url: image }] : [image]}
              onFileDelete={onImageRemove}
            />
          )}
        </div>
        <Select
          id="rai-prompt-template"
          labelText="Prompt template"
          // onChange={(e) => onPropChange('prompt', e.target.value)}
          value={'Custom'}
        >
          <SelectItem value="Custom" text="Custom" />
        </Select>
        <TextArea
          labelText="Negative prompt"
          rows={4}
          id="rai-negative-prompt"
          name="negative_prompt"
          onChange={e => onPropChange('negative_prompt', e.target.value)}
          defaultValue={options.current.negative_prompt}
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
                style={{ minWidth: '8rem', width: '8rem' }}
                labelText="Prompt guidance"
                name="guidance_scale"
                onChange={val => onPropChange('guidance_scale', String(val.value))}
                value={Number(options.current.guidance_scale)}
                min={1}
                max={30}
                step={0.5}
              />
              <Slider
                style={{ minWidth: '8rem', width: '8rem' }}
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
    </PanelContainer>
  );
}
