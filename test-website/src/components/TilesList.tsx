type TilesListProps<T> = {
  data: T[];
  renderer: (instance: T, index: number) => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function TilesList<T>({ data, renderer, style, ...rest }: TilesListProps<T>) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: 24,
        gridTemplateColumns: 'repeat(auto-fill, minmax(MIN(100%, 256px), 1fr))',
        width: '100%',
        ...style,
        paddingBottom: '2rem',
      }}
      {...rest}
    >
      {data.map((instance, index) => (
        <div key={index}>{renderer(instance, index)}</div>
      ))}
    </div>
  );
}

export default TilesList;
