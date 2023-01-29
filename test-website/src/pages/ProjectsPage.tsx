
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProjectTile } from "../components/ProjectTile";
import TilesList from "../components/TilesList";
import { useTestsContext } from "../hooks/useTestsContext";

export function ProjectsPage() {
  const { runs } = useTestsContext();
  const navigate = useNavigate();

  const projects: {image: File}[] = React.useMemo(() => {
    return runs.map((r) => ({image: r.files[0]}))
  }, [runs]);

  return (
    <>
      <TilesList<{image: File}> data={projects} renderer={(instance, index) => <ProjectTile label={`Test #${index + 1}`} image={instance.image} onClick={() => navigate(`./${index}`)} />} />
    </>
  );
}
