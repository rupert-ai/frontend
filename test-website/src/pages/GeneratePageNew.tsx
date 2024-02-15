import React, { useRef, useState } from 'react';
import { Options } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { usePaintImageNewMutation } from '../hooks/usePaintImageNewMutation';
import {
  FileUploader,
  ProgressIndicator,
  ProgressStep,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  TextInput,
  Button,
} from 'carbon-components-react';
import './GeneratePage.css';
import CustomLoader from '../components/CustomLoader';
import { ImageCanvas } from '../components/generate/ImageCanvas';
import PreviewImage from '../components/PreviewImage';
import { useRemoveBackground } from '../hooks/useRemoveBackground';
import { useIdentifyImage } from '../hooks/useIdentifyImage';
import { defaultOptions } from '../components/GenerateSidePanel';

// const defaultOptions: NewOptionsInput = {
//   scheduler: 'K_EULER',
//   lora_scale: 0.95,
//   refine_steps: 20,
//   apply_watermark: false,
//   guidance_scale: 7.5,
//   num_inference_steps: 20,
//   condition_scale: 1.1,
//   negative_prompt: 'illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)',
//   prompt: '',
//   regen_prompt: true,
//   num_outputs: 4,
//   seed: -1,
//   lora: 'https://replicate.delivery/pbxt/HDNeOEquDF2ETaE2MVThzRqvBrzSeeKVy8lPlePmNcrupumHB/trained_model.tar',
// };

export function GeneratePageNew() {
  const auth = useAuth();
  const [file, setFile] = React.useState<{ name: string; url: string }>();
  const [title, setTitle] = React.useState<string>();
  const currentOptions = useRef<Options>(defaultOptions);
  const navigate = useNavigate();
  const canvasRef = useRef<{ getImage: () => Promise<File> }>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const { mutate } = usePaintImageNewMutation();

  const { mutate: removeBackground, isLoading: isBackgroundRemoving } = useRemoveBackground();
  const { mutate: identifyImage, isLoading: isIdentifyingImage } = useIdentifyImage();

  const startTest = async () => {
    const token = await auth.user?.getIdToken();
    const image = await canvasRef.current?.getImage();
    currentOptions.current.prompt = `${title}, in the style of TOK,` ?? '';
    currentOptions.current.lora =
      'https://replicate.delivery/pbxt/HDNeOEquDF2ETaE2MVThzRqvBrzSeeKVy8lPlePmNcrupumHB/trained_model.tar';
    mutate(
      { token: token ?? '', file: image ?? new File([], 'image.png'), options: currentOptions.current },
      {
        onSuccess: data => {
          navigate(`../generated/${data.id}`, { state: { data } });
        },
      },
    );
  };

  const uploadImage = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }
    const token = await auth.user?.getIdToken();
    removeBackground(
      { token: token ?? '', file: files[0] },
      {
        onSuccess: res => {
          setFile({ name: files[0].name, url: res.imageUrl });
          setCurrentStep(2);
        },
      },
    );
    identifyImage(
      { token: token ?? '', file: files[0] },
      {
        onSuccess: res => {
          setTitle(res.imageDescription);
        },
      },
    );
  };

  return (
    <>
      <div className="rai-test-page" style={{ flexGrow: '1', gap: '2rem' }}>
        <h2>Product photography</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'center', width: 400 }}>
          <ProgressIndicator>
            <ProgressStep
              label="Upload image"
              current={currentStep === 1 || currentStep === 2}
              complete={currentStep === 3}
              className="rai-progress-step"
            />
            <ProgressStep label="Select style" current={currentStep === 3} className="rai-progress-step" />
          </ProgressIndicator>
          {currentStep === 1 && (
            <>
              {!isBackgroundRemoving && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px dashed rgba(255, 255, 255, 0.50)',
                      height: 200,
                    }}
                  >
                    <FileUploader
                      buttonLabel="Upload product image"
                      buttonKind="secondary"
                      style={{ justifyContent: 'center' }}
                      accept={['.jpg', '.png', '.jpeg']}
                      onChange={e => uploadImage(e.target.files)}
                    />
                  </div>
                  <p className="rai-hint-text">Max file size is 5mb. Supported file types are .jpg and .png.</p>
                </>
              )}
              {isBackgroundRemoving && (
                <>
                  <CustomLoader />
                  <p style={{ alignSelf: 'center' }}>Removing background...</p>
                  <p style={{ alignSelf: 'center' }}>Please wait, this might take few seconds</p>
                </>
              )}
            </>
          )}
          {currentStep === 2 && file && (
            <Tabs {...{ defaultSelectedIndex: 1 }}>
              <TabList style={{ flexGrow: 1 }}>
                <Tab>Original</Tab>
                <Tab>No background</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <PreviewImage image={file} style={{ width: '100%', height: 'unset', objectFit: 'cover' }} />
                </TabPanel>
                <TabPanel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ImageCanvas image={file} ref={canvasRef} />
                    {!isIdentifyingImage && (
                      <>
                        <TextInput
                          id="rai-product-title-input"
                          labelText="Product title"
                          value={title}
                          onInput={e => {
                            setTitle(e.currentTarget.value);
                          }}
                        />
                        <Button onClick={startTest}>Select style</Button>
                      </>
                    )}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}
