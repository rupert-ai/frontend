// @ts-ignore
import { Tabs, TabList, Tab, TabPanels, TabPanel, Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import PreviewImage from '../components/PreviewImage';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { Backend, UpscaleImageResponse } from '../services/backend';

export function UpscaledImagePage() {
  const { id } = useParams();
  const auth = useAuth();
  const location = useLocation();
  const image: UpscaleImageResponse | undefined = location.state?.data;

  const { data } = useQuery(
    ['upscaledImage', id],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getUpscaledImage(token ?? '', id ?? '');
    },
    { enabled: !image && !!auth.user?.uid },
  );

  const finalData = image ?? data;

  return (
    <>
      <Breadcrumb className="rai-runs-page-breadcrumbs">
        <BreadcrumbItem>
          <Link to="/upscaled">Upscaled images</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={{ width: 400, marginInline: 'auto' }}>
        <Tabs {...{ defaultSelectedIndex: 1 }}>
          <TabList style={{ flexGrow: 1, marginBottom: '1rem' }} aria-label="Image choice">
            <Tab>Original</Tab>
            <Tab>Upscaled</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {!!finalData?.imageUrl && (
                <PreviewImage
                  image={{ name: 'Original', url: finalData?.imageUrl }}
                  style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
                />
              )}
            </TabPanel>
            <TabPanel>
              {!!finalData?.imageUrl && (
                <PreviewImage
                  image={{ name: 'Upscaled', url: finalData?.upscaledImageUrl }}
                  style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}
