import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ProjectTile } from '../components/ProjectTile';
import TilesList from '../components/TilesList';
import { Backend } from '../services/backend';
import { useAuth } from '../services/useAuth';
import { findChamp } from '../utils/helpers';

export function ProjectsPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(['projects', auth?.user?.accessToken], () => {
    return Backend.getResults(auth?.user?.accessToken || '');
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <h4>Projects</h4>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Could not fetch researches. Try again later.</div>}
      {!!projects?.length && (
        <TilesList
          data={projects.filter(ins => !!ins.finishedAt && ins.id !== 39).sort((a, b) => (a.id <= b.id ? 1 : -1))}
          renderer={instance => {
            if (!instance.items?.length) {
              return <></>;
            }
            const champ = findChamp(instance.items);
            return (
              <ProjectTile
                label={`Test #${instance.id}`}
                imageUrl={champ.imageOriginal}
                onClick={() => navigate(`./${instance.id}`, { state: { research: instance } })}
              />
            );
          }}
        />
      )}
    </div>
  );
}
