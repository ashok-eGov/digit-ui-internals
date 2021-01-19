import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

import DesktopInbox from "../../../components/DesktopInbox";
import MobileInbox from "../../../components/MobileInbox";

import InboxComposer from "./InboxComposer";

const Inbox = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState({ filters: {}, search: "", sort: {} });

  const handleFilterChange = (filterParam) => {
    // console.log("handleFilterChange", { ...searchParams, filters: filterParam });
    // setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    // setSearchParams({ ...searchParams, search: params });
  };

  // let applications = Digit.Hooks.pgr.useInboxData(searchParams) || [];
  const applications = React.useMemo(
    () => [
      {
        applicationNo: (
          <div>
            <span className="link">
              <Link to={"/digit-ui/employee/fsm/application-details"}>PB-FSM-2019-04-23-898898</Link>
            </span>
            {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
            <br />
            {/* <span style={{ marginTop: "4px", color: "#505A5F" }}>{t(`SERVICEDEFS.${row.row.original["complaintSubType"].toUpperCase()}`)}</span> */}
          </div>
        ),
        applicationDate: "12/08/2020",
        locality: "Alakapuri",
        status: "Pending for Payment",
        slaDaysRemaining: "12",
      },
      {
        applicationNo: (
          <div>
            <span className="link">
              <Link to={"/digit-ui/employee/fsm/application-details"}>PB-FSM-2019-04-23-898898</Link>
            </span>
            {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
            <br />
            {/* <span style={{ marginTop: "4px", color: "#505A5F" }}>{t(`SERVICEDEFS.${row.row.original["complaintSubType"].toUpperCase()}`)}</span> */}
          </div>
        ),
        applicationDate: "12/08/2020",
        locality: "Alakapuri",
        status: "Pending for Payment",
        slaDaysRemaining: "12",
      },
    ],
    []
  );

  let isMobile = window.Digit.Utils.browser.isMobile;
  if (applications.length !== null) {
    if (isMobile) {
      return <MobileInbox data={applications} onFilterChange={handleFilterChange} onSearch={onSearch} />;
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox data={applications} onFilterChange={handleFilterChange} onSearch={onSearch} />
        </div>
      );
    }
  } else {
    return <Loader />;
  }
};

export default Inbox;
