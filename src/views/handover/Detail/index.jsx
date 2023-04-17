import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import HandoverDetailCard from "./HandoverDetailCard";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _HandoverDetail = ({ dispatch, handoverDetail }) => {
  const { id } = useParams();

  const loadData = () => {
    // handoverDetail = undefined;
    dispatch({
      type: "handover/get_by_id",
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

  return handoverDetail !== null && handoverDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="Handover Details"
        data={[
          { title: "Transactions" },
          { title: "Handover's List", link: "/handover" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the transfer of ownership
        for a particular item.
      </p>
      <div>
        <Row>
          <Col md={"12"}>
            <HandoverDetailCard selectedHandover={handoverDetail} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Alert color="danger">
        <h4 className="alert-heading">Handover not found</h4>
        <div className="alert-body">
          Handover with id: {id} doesn't exist. Check list of all Handover's:{" "}
          <Link to="user">Handover's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerHandover }) => {
  return { handoverDetail: reducerHandover.rawData };
};

const HandoverDetail = connect(mapStateToProps)(_HandoverDetail);

export default HandoverDetail;
