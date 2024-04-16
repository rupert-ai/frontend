import { Image as ImageShape } from 'konva/lib/shapes/Image';
import { Transformer as TransformerShape } from 'konva/lib/shapes/Transformer';
import { Stage as StageShape } from 'konva/lib/Stage';
import React, { useRef, useState } from 'react';
import { Layer, Stage, Image, Transformer } from 'react-konva';
import { ImageType, useGetImageUrl } from '../../hooks/useGetImageUrl';
import './ImageCanvas.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

type ImageCanvasProps = {
  image: ImageType;
};

// function downloadURI(uri: string, name: string) {
//   var link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

export const ImageCanvas = React.forwardRef(({ image }: ImageCanvasProps, ref) => {
  const url = useGetImageUrl(image);
  const imageRef = useRef<ImageShape>(null);
  const trRef = useRef<TransformerShape>(null);
  const stageRef = useRef<StageShape>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, []);

  React.useImperativeHandle(ref, () => ({
    getImage: getImageFile,
  }));

  const img = React.useMemo(() => {
    const i = new window.Image();
    if (url) {
      i.onload = () => {
        const scaleX = (CANVAS_WIDTH - 2 * pos.x) / i.width;
        const scaleY = (CANVAS_HEIGHT - 2 * pos.y) / i.height;
        const sc = Math.min(scaleX, scaleY);
        if (sc < 1 && scaleX <= scaleY) {
          setScale(sc);
          setPos({ x: 50, y: (CANVAS_HEIGHT - i.height * sc) / 2 });
        }
        if (sc < 1 && scaleX > scaleY) {
          setScale(sc);
          setPos({ x: (CANVAS_WIDTH - i.width * sc) / 2, y: 50 });
        }
      };
      i.crossOrigin = 'anonymous';
      i.src = url;
    }

    return i;
  }, [url]);

  const getImageFile = async () => {
    if (stageRef.current) {
      setIsLoading(true);
      trRef.current?.setAttr('resizeEnabled', false);
      trRef.current?.setAttr('rotateEnabled', false);
      trRef.current?.setAttr('borderEnabled', false);
      imageRef.current?.setAttr('draggable', false);
      stageRef.current.scale({ x: 2.56, y: 2.56 });
      stageRef.current.setAttr('width', 1024);
      stageRef.current.setAttr('height', 1024);
      const blob = await stageRef.current.toBlob({ mimeType: 'image/png' });
      stageRef.current.scale({ x: 1, y: 1 });
      stageRef.current.setAttr('width', CANVAS_WIDTH);
      stageRef.current.setAttr('height', CANVAS_HEIGHT);
      trRef.current?.setAttr('resizeEnabled', true);
      trRef.current?.setAttr('rotateEnabled', true);
      trRef.current?.setAttr('borderEnabled', true);
      imageRef.current?.setAttr('draggable', true);
      setIsLoading(false);
      return blob;
    }
  };

  return (
    <>
      <Stage
        height={CANVAS_HEIGHT}
        width={CANVAS_WIDTH}
        style={{
          height: CANVAS_HEIGHT,
          width: CANVAS_WIDTH,
          visibility: isLoading ? 'hidden' : 'visible',
        }}
        className="rai-canvas"
        ref={stageRef}
      >
        <Layer>
          <Image
            x={pos.x}
            y={pos.y}
            image={img}
            draggable
            ref={imageRef}
            onDragEnd={e => {
              setPos({ x: e.target.x(), y: e.target.y() });
            }}
            scaleX={scale}
            scaleY={scale}
          />
          <Transformer
            keepRatio
            ref={trRef}
            resizeEnabled
            rotateEnabled
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            onTransformEnd={e => {
              setScale(Math.min(e.target.scaleX(), e.target.scaleY()));
            }}
          />
        </Layer>
      </Stage>
    </>
  );
});
