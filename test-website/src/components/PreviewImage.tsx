import React from 'react';
import { ImageType, useGetImageUrl } from '../hooks/useGetImageUrl';
import './PreviewImage.css';

type PreviewImageProps = {
  image: ImageType;
  style?: React.CSSProperties;
};

export function PreviewImage({ image, style }: PreviewImageProps) {
  const url = useGetImageUrl(image);

  return <img src={url} alt={`Ad image ${image.name}`} className="rai-preview-image" style={style} loading="lazy" />;
}

export default PreviewImage;
