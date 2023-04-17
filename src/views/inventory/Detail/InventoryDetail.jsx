import moment from "moment";
import { Fragment } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const InventoryDetail = ({ selectedInventory }) => {
  const checkIsObject = (str) => {
    try {
      return typeof JSON.parse(str) === "object";
    } catch {
      return false;
    }
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="info-container">
            {selectedInventory !== null ? (
              <Row>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">PIC / User</span>
                    <span>{selectedInventory.fullname ?? "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Name</span>
                    <span>{selectedInventory.inventoryName}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedInventory?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">UoM</span>
                    <span>{selectedInventory?.uom ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Status</span>
                    <span>{selectedInventory?.status ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Created At</span>
                    <span>
                      {moment(selectedInventory?.createdAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Code</span>
                    <span>{selectedInventory.inventoryCode}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedInventory?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Condition</span>
                    <span>{selectedInventory?.condition ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">
                      Additional Description
                    </span>
                    <span>
                      {selectedInventory?.additionalDescription ?? "-"}
                    </span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Last Updated</span>
                    <span>
                      {moment(selectedInventory?.updatedAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25 mb-50">
                      Description / Specification
                    </span>
                    {selectedInventory.description == null ? (
                      ""
                    ) : checkIsObject(selectedInventory.description) ? (
                      <Table className="table">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(selectedInventory.description).map(
                            (val, key) => {
                              return (
                                <tr key={key}>
                                  <th>{val.key}</th>
                                  <td>{val.value}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <span>{selectedInventory.description}</span>
                    )}
                  </div>
                </Col>
              </Row>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default InventoryDetail;
