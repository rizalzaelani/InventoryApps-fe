import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import CompanyInfoCard from "./CompanyInfoCard";
import CompanyTabs from "./CompanyTabs";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _CompanyDetail = ({ dispatch, companyDetail }) => {
  const { id } = useParams();

  const loadData = () => {
    // companyDetail = undefined;
    dispatch({
      type: "company/get_by_id",
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

  return companyDetail !== null && companyDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="Company Details"
        data={[
          { title: "Master Data" },
          { title: "Company's List", link: "/company" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the company like detail
        company, users, and inventories.
      </p>
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <CompanyInfoCard
              selectedCompany={companyDetail}
              loadData={loadData}
              dispatch={dispatch}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <CompanyTabs active={active} toggleTab={toggleTab} companyId={id} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Alert color="danger">
        <h4 className="alert-heading">Company not found</h4>
        <div className="alert-body">
          Company with id: {id} doesn't exist. Check list of all Company's:{" "}
          <Link to="company">Company's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerCompany }) => {
  return { companyDetail: reducerCompany.rawData };
};

const CompanyDetail = connect(mapStateToProps)(_CompanyDetail);

export default CompanyDetail;
