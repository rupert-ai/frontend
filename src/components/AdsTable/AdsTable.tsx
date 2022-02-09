import { Table } from "@itwin/itwinui-react";
import { useMemo } from "react";
import { Ad } from "../../services/backend";
import "./AdsTable.scss";
import { CellProps } from "react-table";

type AdsTableProps = {
  data: Ad[];
  isLoading: boolean;
};

function AdsTable({ data, isLoading }: AdsTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Table",
        columns: [
          {
            id: "name",
            Header: "AD NAME",
            accessor: "name",
            minWidth: 180,
            Cell: (props: CellProps<Ad>) => (
              <>
                <div className="table-ad-name-cell">
                  <a
                    href={props.row.original.image_url}
                    download="ImageName"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.row.original.image_url && (
                      <img src={props.row.original.image_url} alt="Ad" />
                    )}
                  </a>
                  <span>{props.row.original.name}</span>
                </div>
              </>
            ),
            columnClassName: "sticky-name table-header-cell",
            cellClassName: "sticky-name-cell",
          },
          {
            id: "clarityScore",
            Header: "CLARITY SCORE",
            accessor: "clarity_score",
            minWidth: 120,

            columnClassName: "table-header-cell",
          },
          {
            id: "impressions",
            Header: "IMPRESSIONS",
            accessor: "impressions",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "amountSpent",
            Header: "AMOUNT SPENT",
            accessor: "amount_spent",
            minWidth: 120,

            columnClassName: "table-header-cell",
          },
          {
            id: "clicks",
            Header: "CLICKS",
            accessor: "clicks",
            width: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "cpc",
            Header: "CPC",
            accessor: "cpc",
            width: 100,
            columnClassName: "table-header-cell",
          },
          {
            id: "ctr",
            Header: "CTR",
            accessor: "ctr",
            width: 100,
            columnClassName: "table-header-cell",
          },
          // {
          //   id: "engagement",
          //   Header: "ENGAGEMENT",
          //   accessor: "engagement",
          //   minWidth: 120,
          //   columnClassName: "table-header-cell",
          // },
          // {
          //   id: "postReactions",
          //   Header: "POST REACTIONS",
          //   accessor: "postReactions",
          //   minWidth: 120,
          //   columnClassName: "table-header-cell",
          // },
          // {
          //   id: "engagementCost",
          //   Header: "ENGAGEMENT COST",
          //   accessor: "engagementCost",
          //   minWidth: 120,
          //   columnClassName: "table-header-cell",
          // },
          {
            id: "reach",
            Header: "REACH",
            accessor: "reach",
            minWidth: 80,
            columnClassName: "table-header-cell",
          },
          {
            id: "objective",
            Header: "OBJECTIVE",
            accessor: "objective",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "linkClicks",
            Header: "LINK CLICKS",
            accessor: "inline_link_clicks",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "outboundClicks",
            Header: "OUTBOUND CLICKS",
            accessor: "outbound_clicks",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
        ],
      },
    ],
    []
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        style={{ minWidth: 1600 }}
        columns={columns}
        data={data}
        emptyTableContent="There is no ads data available."
        isSelectable
        isLoading={isLoading}
        density="condensed"
      />
    </div>
  );
}

export default AdsTable;
