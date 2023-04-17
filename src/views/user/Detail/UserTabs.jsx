// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, GitPullRequest } from "react-feather";

// ** Inventory Components
import { default as TableInventory } from "../../inventory/Component/Tables";
import { default as TableTransaction } from "../../transaction/Component/Tables";
import { default as TableHandover } from "../../handover/Component/Tables";

const UserTabs = ({ active, toggleTab, userId }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <GitPullRequest className="font-medium-3 me-50" />
            <span className="fw-bold">Inventory's</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <GitPullRequest className="font-medium-3 me-50" />
            <span className="fw-bold">Transaction's</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <GitPullRequest className="font-medium-3 me-50" />
            <span className="fw-bold">Handover's</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <TableInventory defUserId={userId} />
        </TabPane>
        <TabPane tabId="2">
          <TableTransaction defUserId={userId} />
        </TabPane>
        <TabPane tabId="3">
          <TableHandover defUserId={userId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
