import { CheckBox } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import ComplaintsLink from "./inbox/ComplaintLinks";
import ComplaintTable from "./inbox/ComplaintTable";
import Filter from "./inbox/Filter";
import SearchComplaint from "./inbox/search";

const DesktopInbox = (props) => {
  const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;

  const columns = React.useMemo(
    () => [
      {
        Header: "Complaint no",
        Cell: (row) => {
          return (
            <div>
              <a href="http://google.com">{row.row.original["serviceRequestId"]}</a>
              <br />
              <span style={{ marginTop: "4px", color: "#505A5F" }}>{row.row.original["complaintSubType"]}</span>
            </div>
          );
        },
      },
      {
        Header: "Locality",
        Cell: (row) => {
          return GetCell(row.row.original["locality"]);
        },
      },
      {
        Header: "Status",
        Cell: (row) => {
          return GetCell(row.row.original["applicationStatus"]);
        },
      },
      {
        Header: "Task Owner",
        Cell: (row) => {
          return GetCell(row.row.original["taskOwner"]);
        },
      },
      {
        Header: "SLA Remaining",
        Cell: (row) => {
          return GetCell(row.row.original["businesssServiceSla"]);
        },
      },
    ],
    []
  );

  return (
    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   border: "1px solid black",
      // }}
      className="inbox-container"
    >
      <div className="filters-container">
        <ComplaintsLink />
        <div className="filter">
          <Filter onFilterChange={props.onFilterChange} />
        </div>
      </div>
      <div className="search-container">
        <SearchComplaint onSubmit={props.onSubmit} />
        <div style={{ marginTop: "24px" }}>
          <ComplaintTable
            data={props.data}
            columns={columns}
            getCellProps={(cellInfo) => {
              return {
                style: {
                  padding: "20px 18px",
                  fontSize: "16px",
                  borderTop: "1px solid grey",
                  textAlign: "left",
                  verticalAlign: "middle",
                },
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopInbox;