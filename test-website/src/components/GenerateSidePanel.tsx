import {
  Accordion,
  AccordionItem,
  Button,
  HeaderPanel,
  NumberInput,
  Select,
  SelectItem,
  Slider,
  TextArea,
  Toggle,
} from 'carbon-components-react';
import { ReactNode, useEffect, useState } from 'react';
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
  guidance_scale: '7.5',
  num_inference_steps: 20,
  product_size: '0.6 * width',
  scale: 3,
  prompt: '',
};

export function GenerateSidePanel({ initialOptions, onChange, onClose, image, onImageRemove }: GenerateSidePanelProps) {
  const [options, setOptions] = useState<initialOptions>(initialOptions ?? defaultOptions);

  useEffect(() => {
    setOptions(initialOptions ?? defaultOptions);
  }, [initialOptions]);

  const onPropChange = <OptionsKey extends keyof initialOptions>(
    name: OptionsKey,
    value: initialOptions[OptionsKey],
  ) => {
    setOptions(o => ({ ...o, [name]: value }));
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
            size="sm"
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
          defaultValue="Custom"
        >
          <SelectItem value="Custom" text="Custom" />
        </Select>
        <TextArea
          labelText="Negative prompt"
          rows={4}
          id="rai-negative-prompt"
          name="negative_prompt"
          onChange={e => onPropChange('negative_prompt', e.target.value)}
          value={options.negative_prompt}
        />
        <Toggle
          labelA="Prompt Magic"
          labelB="Prompt Magic"
          onToggle={v => onPropChange('regen_prompt', v)}
          toggled={options.regen_prompt}
          id="rai-prompt-magic"
        />
        <NumberInput
          id="rai-variations"
          label="Variations"
          min={1}
          max={4}
          onChange={(_e: unknown, state: { value: string | number }) => onPropChange('image_num', Number(state.value))}
          value={options.image_num}
        />
        <Select
          id="rai-product-size"
          labelText="Product size"
          onChange={e => onPropChange('product_size', e.target.value)}
          value={options.product_size}
        >
          <SelectItem value="Original" text="Original" />
          <SelectItem value="0.6 * width" text="0.6 * width" />
          <SelectItem value="0.5 * width" text="0.5 * width" />
          <SelectItem value="0.4 * width" text="0.4 * width" />
          <SelectItem value="0.3 * width" text="0.3 * width" />
          <SelectItem value="0.2 * width" text="0.2 * width" />
        </Select>
        <div>
          <NumberInput
            id="rai-hd-quality"
            label="Quality"
            min={1}
            max={4}
            value={Number(options.scale)}
            onChange={(_e: unknown, state: { value: string | number }) => onPropChange('scale', Number(state.value))}
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
                value={options.manual_seed}
                onChange={(_e: unknown, state: { value: string | number }) =>
                  onPropChange('manual_seed', Number(state.value))
                }
              />
              <Slider
                style={{ minWidth: '8rem', width: '8rem' }}
                labelText="Prompt guidance"
                name="guidance_scale"
                onChange={val => onPropChange('guidance_scale', String(val.value))}
                value={Number(options.guidance_scale)}
                min={1}
                max={30}
                step={0.5}
              />
              <Slider
                style={{ minWidth: '8rem', width: '8rem' }}
                labelText="Inference steps"
                name="num_inference_steps"
                onChange={val => onPropChange('num_inference_steps', val.value)}
                value={options.num_inference_steps}
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
