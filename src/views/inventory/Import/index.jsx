import React, { useState } from "react";
import { connect } from "react-redux";
import WizardImport from "./WizardImport";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _InventoryImport = ({ dispatch, inventoryDetail }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        title="Import Inventory"
        data={[
          { title: "Master Data" },
          { title: "Inventory's List", link: "/inventory" },
          { title: "Import" },
        ]}
      />
      <p className="mb-2">
        A role provides access to predefined menus and features depending on the
        assigned role to an administrator that can have access to what he needs.
      </p>
      <WizardImport />
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerInventory }) => {
  return { ...reducerInventory };
};

const InventoryImport = connect(mapStateToProps)(_InventoryImport);

export default InventoryImport;
