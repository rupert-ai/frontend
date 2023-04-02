import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RunTile } from '../components/RunTile';
import TilesList from '../components/TilesList';
import { Backend, ResearchResultResponse } from '../services/backend';
import { useAuth } from '../services/useAuth';
import './RunsPage.css';

export function RunsPage() {
  const { id } = useParams();
  const location = useLocation();
  const research: ResearchResultResponse | undefined = location.state?.research;
  const auth = useAuth();

  const { data } = useQuery(
    ['research', auth?.user?.accessToken, id, research],
    () => {
      return Backend.getResult(auth?.user?.accessToken || '', Number(id));
    },
    { enabled: !research },
  );

  const finalData = useMemo(() => {
    return research ?? data;
  }, [research, data]);

  return (
    <div className="rai-runs-page">
      {!finalData && <div>Loading...</div>}
      {!!finalData && (
        <>
          <Breadcrumb className="rai-runs-page-breadcrumbs">
            <BreadcrumbItem>
              <Link to="/projects">Projects</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>{`Test #${finalData.id}`}</BreadcrumbItem>
          </Breadcrumb>
          <h4>{`Test #${finalData.id}`}</h4>
          {!!finalData.items?.length && (
            <TilesList
              data={[...finalData.items].sort((a, b) => (a.score < b.score ? 1 : -1))}
              renderer={(instance, index) => <RunTile instance={instance} index={index + 1} isChamp={index === 0} />}
            />
          )}
        </>
      )}
    </div>
  );
}

export default RunsPage;
