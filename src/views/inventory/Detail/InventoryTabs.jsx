// ** React Imports
import { Fragment, useEffect } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, GitPullRequest, AlignLeft, Clock } from "react-feather";
import InventoryDetail from "./InventoryDetail";

// ** Table Components
import { default as TableTransaction } from "../../transaction/Component/Tables";
import { default as TableHandover } from "../../handover/Component/Tables";
// import { default as TableInventory } from "../../inventory/Component/Tables";

const InventoryTabs = ({
  active,
  toggleTab,
  inventoryId,
  selectedInventory,
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <AlignLeft className="font-medium-3 me-50" />
            <span className="fw-bold">Detail</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">History Transaction</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Clock className="font-medium-3 me-50" />
            <span className="fw-bold">History Handover</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <InventoryDetail selectedInventory={selectedInventory} />
        </TabPane>
        <TabPane tabId="2">
          <TableTransaction defInventoryId={inventoryId} />
        </TabPane>
        <TabPane tabId="3">
          <TableHandover defInventoryId={inventoryId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default InventoryTabs;
