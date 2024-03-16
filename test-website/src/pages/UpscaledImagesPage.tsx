import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Backend } from '../services/backend';
import TilesList from '../components/TilesList';
import { GeneratedProjectTile } from '../components/GeneratedProjectTile';

export function UpscaledImagesPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['upscaled images', auth.user?.uid],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getUpscaledImages(token || '');
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
          <h4>My upscaled images</h4>
          {!!data?.length ? (
            <TilesList
              data={data}
              renderer={(instance, index) => (
                <GeneratedProjectTile
                  image={{ url: instance.imageUrl, name: 'original' }}
                  onClick={() => navigate(`./${instance.id}`, { state: { data: instance } })}
                  index={index + 1}
                />
              )}
            />
          ) : (
            <div>No upscaled images yet.</div>
          )}
        </>
      )}
    </div>
  );
}

export default UpscaledImagesPage;
