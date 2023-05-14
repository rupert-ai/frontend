import { useQuery } from '@tanstack/react-query';
import {
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  ToastNotification,
  Theme,
  ContentSwitcher,
  Switch,
} from 'carbon-components-react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ItemDataTable } from '../components/ItemDataTable';
import { ItemTile } from '../components/ItemTile';
import TilesList from '../components/TilesList';
import { Backend, ResearchItem } from '../services/backend';
import { useAuth } from '../services/useAuth';

export function ItemPage() {
  const { id, itemId } = useParams();
  const location = useLocation();
  const research: ResearchItem | undefined = location.state?.research;
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState('Original');

  const { data } = useQuery(
    ['research', auth?.user?.accessToken, id, research],
    () => {
      return Backend.getResultItem(auth?.user?.accessToken || '', Number(id), Number(itemId));
    },
    {
      enabled: !research || !research.finishedAt,
      refetchInterval: data => {
        return !!data?.finishedAt ? false : 2000;
      },
    },
  );

  const finalData = useMemo(() => {
    return research ?? data;
  }, [research, data]);

  const imageTiles = useMemo(() => {
    const original = { imageUrl: finalData?.imageOriginal, imageName: 'Original' };
    const heatmap = { imageUrl: finalData?.imageHeatmap, imageName: 'Heatmap' };
    const focusMap = { imageUrl: finalData?.imageSaliency, imageName: 'Focus map' };

    return [original, heatmap, focusMap].filter(Boolean);
  }, [finalData]);

  return (
    <div className="rai-runs-page">
      {!finalData && <div>Loading...</div>}
      {!!finalData && (
        <>
          <Breadcrumb className="rai-runs-page-breadcrumbs">
            <BreadcrumbItem>
              <Link to="/projects">Projects</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/projects/${id}`}>{`Test #${id}`}</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <h4>{`${finalData.name}`}</h4>
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
          {!!finalData.finishedAt && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexGrow: 1,
                    padding: '1rem',
                    backgroundColor: 'var(--cds-layer)',
                  }}
                >
                  <span>CTR score</span>
                  <Tag type="blue" size="md" style={{ marginInline: 0 }}>
                    <span style={{ wordBreak: 'keep-all' }}>{Number(finalData.score).toFixed(1)}</span>
                  </Tag>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexGrow: 1,
                    padding: '1rem',
                    backgroundColor: 'var(--cds-layer)',
                  }}
                >
                  <span>Clarity score</span>
                  <Tag type="purple" size="md" style={{ marginInline: 0 }}>
                    <span style={{ wordBreak: 'keep-all' }}>{finalData.clarityScore}</span>
                  </Tag>
                </div>
              </div>
              <TilesList
                data={imageTiles}
                renderer={instance =>
                  instance ? (
                    <ItemTile
                      imageName={instance.imageName}
                      imageUrl={instance.imageUrl}
                      tagText={instance.imageName}
                    />
                  ) : (
                    <></>
                  )
                }
                style={{ gap: '1rem' }}
              />
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--cds-layer)',
                  gap: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h4>Image data</h4>
                <ContentSwitcher onChange={data => setActiveTab(data.name as string)}>
                  <Switch name="Original" text="Original" />
                  <Switch name="Heatmap" text="Heatmap" disabled />
                  <Switch name="Focus map" text="Focus map" disabled />
                  <Switch name="Background" text="Background" disabled />
                </ContentSwitcher>
                {activeTab === 'Original' && <ItemDataTable item={finalData} />}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ItemPage;
