import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Users Components
import Tables from "./Component/Tables";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Handovers = () => {
  return (
    <React.Fragment>
      <Breadcrumbs
        title="Handover's List"
        data={[{ title: "Transactions" }, { title: "Handover's List" }]}
      />
      <p className="mb-2">
        This page contains list information about the transfer of ownership for
        a particular item.
      </p>
      <Tables />
    </React.Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};

const Handovers = connect(mapStateToProps)(_Handovers);

export default Handovers;
