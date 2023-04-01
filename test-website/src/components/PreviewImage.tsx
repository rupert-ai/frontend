import React from 'react';
import './PreviewImage.css';

type PreviewImageProps = {
  image: File | { name: string; url: string };
  style?: React.CSSProperties;
};

const isFileType = (image: PreviewImageProps['image']): image is File => {
  return !(image as { name: string; url: string })['url'];
};

export function PreviewImage({ image, style }: PreviewImageProps) {
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    let onDestroy = () => {};
    if (isFileType(image)) {
      const objUrl = URL.createObjectURL(image);
      setUrl(objUrl);
      onDestroy = () => URL.revokeObjectURL(objUrl);
    } else {
      setUrl(image.url);
    }

    return onDestroy;
  }, [image]);

  return <img src={url} alt={`Ad image ${image.name}`} className="rai-preview-image" style={style} />;
}

export default PreviewImage;
