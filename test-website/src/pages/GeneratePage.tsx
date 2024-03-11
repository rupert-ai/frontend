import React, { useRef, useState } from 'react';
import { Options } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { usePaintImageMutation } from '../hooks/usePaintImageMutation';
import { defaultOptions, GenerateSidePanel } from '../components/GenerateSidePanel';
import { GenerateToolbar } from '../components/GenerateToolbar';

export function GeneratePage() {
  const auth = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);
  const currentOptions = useRef<Options>(defaultOptions);
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);

  const { mutate, isLoading: mutationLoading } = usePaintImageMutation();

  const startTest = async () => {
    const token = await auth.user?.getIdToken();
    mutate(
      { token: token ?? '', file: files[0], options: currentOptions.current },
      {
        onSuccess: data => {
          navigate(`../generated/${data.id}`, { state: { data } });
        },
      },
    );
  };

  const generate = (prompt: string) => {
    currentOptions.current.prompt = prompt;
    startTest();
  };

  const onOptionChange: React.ComponentProps<typeof GenerateSidePanel>['onChange'] = (key, val) => {
    // @ts-ignore
    currentOptions.current[key] = val;
  };

  return (
    <>
      <div className="rai-test-page" style={{ flexGrow: !showPanel ? '1' : undefined }}>
        <h2>Product photography</h2>
        <GenerateToolbar
          isLoading={mutationLoading}
          onGenerate={generate}
          onShowPanel={() => setShowPanel(v => !v)}
          onImageChange={f => setFiles([f])}
        />
        {showPanel && (
          <GenerateSidePanel
            onChange={onOptionChange}
            onClose={() => setShowPanel(false)}
            image={files[0]}
            onImageRemove={() => setFiles([])}
          />
        )}
      </div>
    </>
  );
}
