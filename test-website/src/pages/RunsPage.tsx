
import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { RunTile } from "../components/RunTile";
import TilesList from "../components/TilesList";
import { useTestsContext } from "../hooks/useTestsContext";
import "./RunsPage.css"

export function RunsPage() {
  const { runs  } = useTestsContext();
  const { id } = useParams();

  const data: {file: File}[] = React.useMemo(() => {
    return runs[Number(id)].files.map((file) => ({file}))
  }, [runs, id]);

  return (
    <div className="rai-runs-page">
      <Breadcrumb className="rai-runs-page-breadcrumbs">
        <BreadcrumbItem>
          <Link to="/projects">Projects</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>{`Test #${Number(id) + 1}`}</BreadcrumbItem>
      </Breadcrumb>
      <h4>{`Test #${Number(id) + 1}`}</h4>
      <TilesList<{file: File}> data={data} renderer={(instance, index) => <RunTile label={`#${index + 1}`} image={instance.file} isChamp={index === 0} />} />
    </div>
  );
}

export default RunsPage;
