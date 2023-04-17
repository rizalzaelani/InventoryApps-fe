// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, GitPullRequest } from "react-feather";

// ** User Components
import { default as TableUser } from "../../user/Component/Tables";

// ** Inventory Components
import { default as TableInventory } from "../../inventory/Component/Tables";
import { useParams } from "react-router-dom";

const CompanyTabs = ({ active, toggleTab, companyId }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">User's</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <GitPullRequest className="font-medium-3 me-50" />
            <span className="fw-bold">Inventory's</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <TableUser defCompanyId={companyId} />
        </TabPane>
        <TabPane tabId="2">
          <TableInventory defCompanyId={companyId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CompanyTabs;
