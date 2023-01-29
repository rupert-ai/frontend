type TilesListProps<T> = {
  data: T[];
  renderer: (instance: T, index: number) => React.ReactNode;
}

export function TilesList<T>({data, renderer}: TilesListProps<T>) {
  return <div
  style={{
    display: "grid",
    gridGap: 24,
    gridTemplateColumns:
      "repeat(auto-fill, minmax(MIN(100%, 256px), 1fr))",
    width: "100%"
  }}
>
  {data.map((instance, index) => (
    <div key={index}>
      {renderer(instance, index)}
      {/* <Tile
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          width: "100%",
        }}
      >
        {index === 0 ? <PredictedChampionText /> : <p>`#${index + 1}`</p>}
        <PreviewImage
          image={instance.image}
          style={{ width: "auto", height: "auto" }}
        />
      </Tile> */}
    </div>
  ))}
</div>
}

export default TilesList;