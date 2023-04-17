import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import CategoryInfoCard from "./CategoryInfoCard";
import CategoryTabs from "./CategoryTabs";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _CategoryDetail = ({ dispatch, categoryDetail }) => {
  const { id } = useParams();

  const loadData = () => {
    // categoryDetail = undefined;
    dispatch({
      type: "category/get_by_id",
      payload: id,
    });
  };
  useEffect(() => {
    loadData();
  }, [id]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return categoryDetail !== null && categoryDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="Category Details"
        data={[
          { title: "Master Data" },
          { title: "Category's List", link: "/category" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the category like detail
        category, and list of inventories.
      </p>
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <CategoryInfoCard
              selectedCategory={categoryDetail}
              loadData={loadData}
              dispatch={dispatch}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <CategoryTabs
              active={active}
              toggleTab={toggleTab}
              categoryId={id}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Alert color="danger">
        <h4 className="alert-heading">Category not found</h4>
        <div className="alert-body">
          Category with id: {id} doesn't exist. Check list of all Category's:{" "}
          <Link to="category">Category's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerCategory }) => {
  return { categoryDetail: reducerCategory.rawData };
};

const CategoryDetail = connect(mapStateToProps)(_CategoryDetail);

export default CategoryDetail;
