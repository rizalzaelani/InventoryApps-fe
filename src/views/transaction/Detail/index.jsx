import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import TransactionDetailCard from "./TransactionDetailCard";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _TransactionDetail = ({ dispatch, transactionDetail }) => {
  const { id } = useParams();

  const loadData = () => {
    // transactionDetail = undefined;
    dispatch({
      type: "transaction/get_by_id",
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

  return transactionDetail !== null && transactionDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="Transaction Details"
        data={[
          { title: "Transactions" },
          { title: "Transaction's List", link: "/transaction" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the transaction like
        upgrade, repair, or non-scheduled audit of an inventory.
      </p>
      <div>
        <Row>
          <Col md={"12"}>
            <TransactionDetailCard selectedTransaction={transactionDetail} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Alert color="danger">
        <h4 className="alert-heading">Transaction not found</h4>
        <div className="alert-body">
          Transaction with id: {id} doesn't exist. Check list of all
          Transaction's: <Link to="user">Transaction's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerTransaction }) => {
  return { transactionDetail: reducerTransaction.rawData };
};

const TransactionDetail = connect(mapStateToProps)(_TransactionDetail);

export default TransactionDetail;
