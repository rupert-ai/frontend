import { Breadcrumb, BreadcrumbItem, ToastNotification, Theme } from 'carbon-components-react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RunTile } from '../components/RunTile';
import TilesList from '../components/TilesList';
import { Backend, ResearchResultResponse } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import './RunsPage.css';

export function RunsPage() {
  const { id } = useParams();
  const location = useLocation();
  const research: ResearchResultResponse | undefined = location.state?.research;
  const auth = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery(
    ['research', auth.user?.uid, id, research],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getResult(token || '', Number(id));
    },
    {
      enabled: (!research || !research.finishedAt) && !!auth.user?.uid,
      refetchInterval: data => {
        return !!data?.finishedAt ? false : 2000;
      },
    },
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
          </Breadcrumb>
          <h4>{`Test #${finalData.id}`}</h4>
          {!finalData.finishedAt && (
            <Theme theme="white">
              <ToastNotification
                title="Analyzing your Ads..."
                subtitle="We're processing your images, and we appreciate your patience. Due to the complexity of the analysis and the number of images submitted, it may take a bit longer than usual."
                notificationType="inline"
                kind="info"
                style={{ width: '100%' }}
                role="alert"
                hideCloseButton
              />
            </Theme>
          )}
          {!!finalData.items?.length && (
            <TilesList
              data={[...finalData.items].sort((a, b) => (a.score < b.score ? 1 : -1))}
              renderer={(instance, index) => (
                <RunTile
                  isLoading={!finalData.finishedAt}
                  instance={instance}
                  index={index + 1}
                  isChamp={index === 0}
                  onClick={() => {
                    !!finalData.finishedAt
                      ? navigate(`./${instance.id}`, { state: { research: instance } })
                      : undefined;
                  }}
                />
              )}
            />
          )}
        </>
      )}
    </div>
  );
}

export default RunsPage;
