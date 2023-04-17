// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, GitPullRequest } from "react-feather";

// ** Inventory Components
import { default as TableInventory } from "../../inventory/Component/Tables";

const CategoryTabs = ({ active, toggleTab, categoryId }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("2")}>
            <GitPullRequest className="font-medium-3 me-50" />
            <span className="fw-bold">Inventory's</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <TableInventory defCategoryId={categoryId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CategoryTabs;
