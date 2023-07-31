import { ArrowLeft, SettingsAdjust, MagicWand } from '@carbon/icons-react';
import { FileUploaderButton, Button, TextInput, Loading } from 'carbon-components-react';
import PreviewImage from './PreviewImage';
import './GenerateToolbar.css';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <div className="rai-generate-toolbar">
      {!files.length && !image ? (
        <FileUploaderButton
          labelText="Upload photo"
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
        placeholder="Enter prompt text"
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
