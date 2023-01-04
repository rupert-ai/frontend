import React from "react";
import "./PreviewImage.css";

type PreviewImageProps = {
  image: File;
  style?: React.CSSProperties;
};

export function PreviewImage({ image, style }: PreviewImageProps) {
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    const objUrl = URL.createObjectURL(image);
    setUrl(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [image]);

  return (
    <img
      src={url}
      alt={`Ad image ${image.name}`}
      className="rai-preview-image"
      style={style}
    />
  );
}

export default PreviewImage;
