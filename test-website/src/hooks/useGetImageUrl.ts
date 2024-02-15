import React from 'react';

export type ImageType = File | { name: string; url: string };

const isFileType = (image: ImageType): image is File => {
  return !(image as { name: string; url: string })['url'];
};

export const useGetImageUrl = (image: ImageType) => {
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    if (!image) {
      return;
    }
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

  return url;
};
