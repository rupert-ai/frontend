import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TilesList from '../components/TilesList';
import { Backend } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { GeneratedTile } from '../components/GeneratedTile';

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
            data={data?.filter(d => d.status === 'succeeded') ?? []}
            renderer={instance => (
              <GeneratedTile
                text={instance.input.prompt}
                image={{ url: instance.input.image_path, name: 'original' }}
                isLoading={false}
                isOriginal
                onClick={() => navigate(`./${instance.id}`, { state: { data: instance } })}
              />
            )}
          />
        </>
      )}
    </div>
  );
}

export default GeneratedImagesPage;
