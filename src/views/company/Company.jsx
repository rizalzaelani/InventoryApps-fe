import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Roles Components
import Cards from "./Component/Cards";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Categories = ({ dispatch, listData, rawData }) => {
  useEffect(() => {}, [listData]);
  useEffect(() => {
    dispatch({
      type: "company/get",
      payload: {},
    });
  }, []);

  return (
    <React.Fragment>
      <Breadcrumbs
        title="Company's List"
        data={[{ title: "Master Data" }, { title: "Company's List" }]}
      />
      <p className="mb-2">This page contains a list of companies.</p>
      <Cards />
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerCategory }) => {
  return { ...reducerCategory };
};

const Categories = connect(mapStateToProps)(_Categories);

export default Categories;
