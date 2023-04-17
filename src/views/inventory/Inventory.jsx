import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Users Components
import Tables from "./Component/Tables";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Inventories = () => {
  return (
    <React.Fragment>
      <Breadcrumbs
        title="Inventory's List"
        data={[{ title: "Master Data" }, { title: "Inventory's List" }]}
      />
      <p className="mb-2">This page contains list of inventories.</p>
      <Tables />
    </React.Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};

const Inventories = connect(mapStateToProps)(_Inventories);

export default Inventories;
