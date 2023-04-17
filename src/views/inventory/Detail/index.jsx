import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import InventoryInfoCard from "./InventoryInfoCard";
import InventoryTabs from "./InventoryTabs";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _InventoryDetail = ({ dispatch, inventoryDetail }) => {
  const { id } = useParams();

  const loadData = () => {
    // inventoryDetail = undefined;
    dispatch({
      type: "inventory/get_by_id",
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

  return inventoryDetail !== null && inventoryDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="Inventory Details"
        data={[
          { title: "Master Data" },
          { title: "Inventory's List", link: "/inventory" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the inventory such as
        currently user, transaction history, and handover history.
      </p>
      <div className="app-inventory-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <InventoryInfoCard
              selectedInventory={inventoryDetail}
              loadData={loadData}
              dispatch={dispatch}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <InventoryTabs
              active={active}
              toggleTab={toggleTab}
              inventoryId={id}
              selectedInventory={inventoryDetail}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Alert color="danger">
        <h4 className="alert-heading">Inventory not found</h4>
        <div className="alert-body">
          Inventory with id: {id} doesn't exist. Check list of all Inventory's:{" "}
          <Link to="inventory">Inventory's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerInventory }) => {
  return { inventoryDetail: reducerInventory.rawData };
};

const InventoryDetail = connect(mapStateToProps)(_InventoryDetail);

export default InventoryDetail;
