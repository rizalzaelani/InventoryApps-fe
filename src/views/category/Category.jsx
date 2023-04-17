import React, { useEffect } from "react";
import { connect } from "react-redux";

// ** Roles Components
import Cards from "./Component/Cards";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _Categories = ({ dispatch, listData }) => {
  useEffect(() => {}, [listData]);

  useEffect(() => {
    dispatch({
      type: "category/get",
      payload: {},
    });
  }, []);

  return (
    <React.Fragment>
      <Breadcrumbs
        title="Category's List"
        data={[{ title: "Master Data" }, { title: "Category's List" }]}
      />
      <p className="mb-2">This page contains list category of an inventory.</p>
      <Cards />
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerCategory }) => {
  return { ...reducerCategory };
};

const Categories = connect(mapStateToProps)(_Categories);

export default Categories;
