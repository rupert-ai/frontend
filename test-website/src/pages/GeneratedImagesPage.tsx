import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TilesList from '../components/TilesList';
import { Backend } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { GeneratedProjectTile } from '../components/GeneratedProjectTile';

export function GeneratedImagesPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['generated images', auth.user?.uid],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getPaintImages(token || '');
    },
    {
      enabled: !!auth.user?.uid,
    },
  );

  return (
    <div className="rai-runs-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* <Breadcrumb className="rai-runs-page-breadcrumbs">
            <BreadcrumbItem>
              <Link to="/projects">Projects</Link>
            </BreadcrumbItem>
          </Breadcrumb> */}
          <h4>My generated Ads</h4>
          <TilesList
            data={data?.filter(d => d.jobs.every(job => job.status === 'succeeded')) ?? []}
            renderer={instance => (
              <GeneratedProjectTile
                image={{ url: instance.jobs[0].input.image_path, name: 'original' }}
                onClick={() => navigate(`./${instance.id}`, { state: { data: instance } })}
                index={instance.id}
              />
            )}
          />
        </>
      )}
    </div>
  );
}

export default GeneratedImagesPage;
