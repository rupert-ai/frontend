import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RunTile } from '../components/RunTile';
import TilesList from '../components/TilesList';
import { Backend, ResearchItem, ResearchResultResponse } from '../services/backend';
import { useAuth } from '../services/useAuth';
import { findChamp } from '../utils/helpers';
import './RunsPage.css';

export function RunsPage() {
  const { id } = useParams();
  const location = useLocation();
  const research: ResearchResultResponse | undefined = location.state?.research;
  const auth = useAuth();

  const { data } = useQuery(
    ['research', auth?.user?.accessToken, id, research],
    () => {
      console.log('query?');
      return Backend.getResult(auth?.user?.accessToken || '', Number(id));
    },
    { enabled: !research },
  );

  const finalData = useMemo(() => {
    return research ?? data;
  }, [research, data]);

  const champ = useMemo(() => {
    if (!finalData) {
      return {} as ResearchItem;
    }
    return findChamp(finalData.items);
  }, [finalData]);

  return (
    <div className="rai-runs-page">
      {!finalData && <div>Loading...</div>}
      {finalData && (
        <>
          <Breadcrumb className="rai-runs-page-breadcrumbs">
            <BreadcrumbItem>
              <Link to="/projects">Projects</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>{`Test #${finalData.id}`}</BreadcrumbItem>
          </Breadcrumb>
          <h4>{`Test #${finalData.id}`}</h4>
          <TilesList
            data={finalData.items}
            renderer={(instance, index) => (
              <RunTile label={`#${index + 1}`} imageUrl={instance.imageOriginal} isChamp={champ.id === instance.id} />
            )}
          />
        </>
      )}
    </div>
  );
}

export default RunsPage;
