import { ArrowLeft, SettingsAdjust, MagicWand, Close } from '@carbon/icons-react';
import { FileUploaderButton, Button, TextInput, Loading } from 'carbon-components-react';
import PreviewImage from './PreviewImage';
import './GenerateToolbar.css';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const LoadingIcon = (props: React.ComponentProps<'div'>) => <Loading withOverlay={false} active small {...props} />;

type GenerateToolbarProps = {
  isLoading: boolean;
  onGenerate: (prompt: string) => void;
  onShowPanel: () => void;
  isDisabled?: boolean;
  onImageChange: (file: File) => void;
  image?: string;
  initialPrompt?: string;
};

export function GenerateToolbar({
  isLoading,
  onGenerate,
  onShowPanel,
  isDisabled,
  onImageChange,
  image,
  initialPrompt,
}: GenerateToolbarProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [prompt, setPrompt] = React.useState<string | undefined>(initialPrompt);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    let addedFiles: File[] = [];
    for (let i = 0; i < e.target.files?.length; i++) {
      const file = e.target.files.item(i);
      if (!file) {
        continue;
      }
      addedFiles.push(file);
    }
    changeImage(addedFiles);
  }, []);

  const changeImage = (files: File[]) => {
    setFiles(files);
    onImageChange(files[0]);
  };

  const goBack = () => {
    setFiles([]);
    if (!image) {
      return;
    }

    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/generated');
    }
  };

  return isMobile ? (
    <>
      {!files.length && !image ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <>
            <h4>Upload product photo</h4>
            <p>
              You can generate up to 4 Ads in one take. Supported file types are <i>.jpg</i> and <i>.png</i>.
            </p>
            <FileUploaderButton
              labelText="Upload product photo"
              buttonKind="primary"
              size="lg"
              accept={['.jpeg', '.jpg', '.png']}
              multiple={false}
              onChange={onChange}
              disableLabelChanges
              style={{ width: '100%', maxWidth: '40rem' }}
            />
          </>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flexGrow: 1 }}>
              <label className="cds--label">Product photo</label>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--cds-field)' }}
              >
                <PreviewImage image={!!files.length ? files[0] : { name: 'Original', url: image ?? '' }} />
                <p className="rai-original-file-name-mobile" title={files?.at(0)?.name ?? 'Original'}>
                  {files?.at(0)?.name ?? 'Original'}
                </p>
                <Button
                  renderIcon={SettingsAdjust}
                  hasIconOnly
                  kind="ghost"
                  iconDescription="Additional settings"
                  onClick={onShowPanel}
                />
                <Button renderIcon={Close} hasIconOnly kind="ghost" iconDescription="Remove" onClick={goBack} />
              </div>
            </div>
            <TextInput
              id="rai-prompt-input"
              labelText="Product title"
              placeholder="Name your product (i.e. Perfume bottle)"
              value={prompt}
              onInput={e => {
                setPrompt(e.currentTarget.value);
              }}
              size="lg"
              style={{ minWidth: '18rem', flexGrow: 1 }}
            />
          </div>
          <Button
            renderIcon={isLoading ? LoadingIcon : MagicWand}
            disabled={(!files.length && !image) || !prompt || isLoading || isDisabled}
            onClick={() => onGenerate(prompt ?? '')}
            className="rai-generate-button-mobile"
            size="xl"
          >
            {isLoading ? 'Starting...' : 'Generate'}
          </Button>
        </>
      )}
    </>
  ) : (
    <div className="rai-generate-toolbar">
      {!files.length && !image ? (
        <FileUploaderButton
          labelText="Upload product photo"
          buttonKind="primary"
          size="lg"
          accept={['.jpeg', '.jpg', '.png']}
          multiple={false}
          onChange={onChange}
          disableLabelChanges
        />
      ) : (
        <>
          <Button renderIcon={ArrowLeft} hasIconOnly kind="ghost" iconDescription="Back" onClick={goBack} />
          <div style={{ display: 'flex' }}>
            <PreviewImage image={!!files.length ? files[0] : { name: 'Original', url: image ?? '' }} />
            <Button
              renderIcon={SettingsAdjust}
              hasIconOnly
              kind="ghost"
              iconDescription="Additional settings"
              onClick={onShowPanel}
            />
          </div>
        </>
      )}
      <TextInput
        id="rai-prompt-input"
        labelText=""
        placeholder="Name your product (i.e. Perfume bottle)"
        value={prompt}
        onInput={e => {
          setPrompt(e.currentTarget.value);
        }}
        size="lg"
      />
      <Button
        renderIcon={isLoading ? LoadingIcon : MagicWand}
        disabled={(!files.length && !image) || !prompt || isLoading || isDisabled}
        onClick={() => onGenerate(prompt ?? '')}
      >
        {isLoading ? 'Starting...' : 'Generate'}
      </Button>
    </div>
  );
}
