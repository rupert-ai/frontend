import { useQuery } from '@tanstack/react-query';
import {
  ContentSwitcher,
  DataTable,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PreviewImage from '../components/PreviewImage';
import { ProjectTile } from '../components/ProjectTile';
import TilesList from '../components/TilesList';
import { Backend, ResearchItem, ResearchResultResponse } from '../services/backend';
import { useAuth } from '../hooks/useAuth';
import { findChamp } from '../utils/helpers';
import './ProjectsPage.css';

const tableHeaders = [
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'adAmount',
    header: 'Ad amount',
  },
  {
    key: 'highScore',
    header: 'High score',
  },
  {
    key: 'avgScore',
    header: 'Avg. score',
  },
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [dataView, setDataView] = React.useState<'table' | 'tiles'>('table');
  const projectsMap = React.useRef<Record<string, ResearchResultResponse>>({});

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(
    ['projects', auth.user?.uid],
    async () => {
      const token = await auth.user?.getIdToken();
      return Backend.getResults(token || '');
    },
    { enabled: !!auth.user?.uid },
  );

  const tableData = React.useMemo(() => {
    return (projects ?? []).map(proj => {
      projectsMap.current[String(proj.id)] = proj;
      return {
        id: String(proj.id),
        title: `Test #${proj.id}`,
        date: proj.finishedAt ? new Date(proj.finishedAt).toLocaleString() : undefined,
        adAmount: proj.items?.length ?? 0,
        highScore: !!proj.items?.length
          ? proj.items.reduce((acc, curr) => (acc > (curr.score ?? 0) ? acc : curr.score), 0)?.toFixed(2)
          : undefined,
        avgScore: !!proj.items?.length
          ? (proj.items.reduce((acc, curr) => acc + (curr.score ?? 0), 0) / proj.items.length)?.toFixed(2)
          : undefined,
      };
    });
  }, [projects]);

  return (
    <div className="rai-projects-container">
      <div className="rai-projects-header-row">
        <h4>Projects</h4>
        <ContentSwitcher
          onChange={data => setDataView(data.name as typeof dataView)}
          className="rai-view-type-container"
        >
          <Switch name="table" text="Table" className="rai-view-type-button" />
          <Switch name="tiles" text="Cards" className="rai-view-type-button" />
        </ContentSwitcher>
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Could not fetch researches. Try again later.</div>}
      {!!projects?.length && dataView === 'tiles' && (
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
      {!!projects?.length && dataView === 'table' && (
        <DataTable rows={tableData} headers={tableHeaders} isSortable>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getTableContainerProps,
          }: {
            rows: any;
            headers: any;
            getHeaderProps: any;
            getRowProps: any;
            getTableProps: any;
            getTableContainerProps: any;
          }) => (
            <TableContainer {...getTableContainerProps()} className="rai-table-container">
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    {headers.map((header: any, i: number) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        {console.log(row)}
                        {row.cells.map((cell: any, i: number) =>
                          i === 0 ? (
                            <TableCell key={cell.id}>
                              <Link to={`./${row.id}`} state={{ research: projectsMap.current[row.id] }}>
                                {cell.value}
                              </Link>
                            </TableCell>
                          ) : (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ),
                        )}
                      </TableExpandRow>
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <div className="rai-expanded-content">
                          {projectsMap.current[row.id].items?.map(
                            (item: ResearchItem, i: number) =>
                              !!item.imageOriginal && (
                                <Link to={`./${row.id}/${item.id}`} state={{ research: item }}>
                                  <PreviewImage key={i} image={{ name: item.name, url: item.imageOriginal }} />
                                </Link>
                              ),
                          )}
                        </div>
                      </TableExpandedRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      )}
    </div>
  );
}
