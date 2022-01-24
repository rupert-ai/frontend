import { Table } from "@itwin/itwinui-react";
import { useMemo } from "react";
import "./AdsTable.scss";

type AdsTableProps = {
  data: {}[];
};

function AdsTable({ data }: AdsTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "Table",
        columns: [
          {
            id: "name",
            Header: "AD NAME",
            accessor: "name",
            minWidth: 150,
            Cell: (props: any) => (
              <>
                <div className="table-ad-name-cell">
                  <a
                    href="https://d3e4mgdhax5r7d.cloudfront.net/uploads/photos/users/ca62e336-79b3-47e6-87e4-f2e1c551f352/thumb300_3FC4A312-6FD3-4C94-83EF-58B39A701BF5.jpg"
                    download="ImageName"
                  >
                    <img
                      src="https://d3e4mgdhax5r7d.cloudfront.net/uploads/photos/users/ca62e336-79b3-47e6-87e4-f2e1c551f352/thumb300_3FC4A312-6FD3-4C94-83EF-58B39A701BF5.jpg"
                      alt="Ad"
                    />
                  </a>
                  <span>{props.row.original.name}</span>
                </div>
              </>
            ),
            columnClassName: "sticky-name table-header-cell",
            cellClassName: "sticky-name-cell",
          },
          {
            id: "impressions",
            Header: "IMPRESSIONS",
            accessor: "impressions",
            minWidth: 150,
            columnClassName: "table-header-cell",
          },
          {
            id: "amountSpent",
            Header: "AMOUNT SPENT",
            accessor: "amountSpent",
            minWidth: 120,

            columnClassName: "table-header-cell",
          },
          {
            id: "clicks",
            Header: "CLICKS",
            accessor: "clicks",
            width: 150,
            columnClassName: "table-header-cell",
          },
          {
            id: "cpc",
            Header: "CPC",
            accessor: "cpc",
            width: 80,
            columnClassName: "table-header-cell",
          },
          {
            id: "ctr",
            Header: "CTR",
            accessor: "ctr",
            width: 80,
            columnClassName: "table-header-cell",
          },
          {
            id: "engagement",
            Header: "ENGAGEMENT",
            accessor: "engagement",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "postReactions",
            Header: "POST REACTIONS",
            accessor: "postReactions",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "engagementCost",
            Header: "ENGAGEMENT COST",
            accessor: "engagementCost",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "linkClicks",
            Header: "LINK CLICKS",
            accessor: "linkClicks",
            minWidth: 120,
            columnClassName: "table-header-cell",
          },
          {
            id: "outboundClicks",
            Header: "OUTBOUND CLICKS",
            accessor: "outboundClicks",
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
        emptyTableContent="No data."
        isSelectable
        density="condensed"
      />
    </div>
  );
}

export default AdsTable;
