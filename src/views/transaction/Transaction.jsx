import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Users Components
import Tables from "./Component/Tables";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Transactions = ({ dispatch, listData, rawData }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        title="Transaction's List"
        data={[{ title: "Transactions" }, { title: "Transaction's List" }]}
      />
      {/* <h3>Transaction's List</h3> */}
      <p className="mb-2">
        This page contains list transaction like upgrade, repair, or
        non-scheduled audit of an inventory.
      </p>
      <Tables />
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerCategory }) => {
  return { ...reducerCategory };
};

const Transactions = connect(mapStateToProps)(_Transactions);

export default Transactions;
