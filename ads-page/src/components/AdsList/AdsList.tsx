import { Tile } from "@itwin/itwinui-react";
import { useIntersection } from "@itwin/itwinui-react/esm/core/utils";
import { useCallback } from "react";
import { Ad } from "../../services/backend";
import "./AdsList.scss";

type AdsListProps = {
  data: Ad[];
  currentAd?: Ad;
  onAdClick: (ad: Ad) => void;
  onBottomReached: () => void;
};

const AdsList = ({
  data,
  currentAd,
  onAdClick,
  onBottomReached,
}: AdsListProps) => {
  const onIntersection = useCallback(() => {
    console.log("reached");
    onBottomReached();
  }, [onBottomReached]);
  const itemRef = useIntersection(onIntersection, { rootMargin: "300px" });

  return (
    <div className="tiles-wrapper">
      {data.map((el, index) => (
        <div
          ref={index === data.length - 1 ? itemRef : undefined}
          key={`${el.name}-${index}`}
        >
          <Tile
            isActionable
            isSelected={currentAd?.name === el.name}
            name={el.name}
            thumbnail={el.image_url}
            onClick={() => onAdClick(el)}
          />
        </div>
      ))}
    </div>
  );
};

export default AdsList;
