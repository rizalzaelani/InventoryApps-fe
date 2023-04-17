import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Users Components
import Tables from "./Component/Tables";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Users = ({ dispatch, listData, rawData }) => {
  return (
    <React.Fragment>
      <Breadcrumbs
        title="User's List"
        data={[{ title: "Master Data" }, { title: "User's List" }]}
      />
      <p className="mb-2">
        This page contains a list of users who are responsible for an inventory.
      </p>
      <Tables />
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerUser }) => {
  return { ...reducerUser };
};

const Users = connect(mapStateToProps)(_Users);

export default Users;
