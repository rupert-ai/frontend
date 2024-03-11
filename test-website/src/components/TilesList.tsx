import './TilesList.css';

type TilesListProps<T> = {
  data: T[];
  renderer: (instance: T, index: number) => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function TilesList<T>({ data, renderer, className, ...rest }: TilesListProps<T>) {
  return (
    <div className={`rai-tiles-list ${className ?? ''}`} {...rest}>
      {data.map((instance, index) => (
        <div key={index}>{renderer(instance, index)}</div>
      ))}
    </div>
  );
}

export default TilesList;
