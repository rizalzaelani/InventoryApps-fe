import moment from "moment";
import { Fragment } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const TransactionDetailCard = ({ selectedTransaction }) => {
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
          <Row>
            <Col md="6">
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Transaction Date</span>
                <span>
                  {moment(selectedTransaction.transactionDate).format("lll")}
                </span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">PIC / User - Company</span>
                <span>
                  {selectedTransaction.fullname
                    ? selectedTransaction.fullname +
                      " - " +
                      selectedTransaction.userCompany
                    : "-"}
                </span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Type</span>
                <span>{selectedTransaction.type}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Item</span>
                <span>{selectedTransaction.item}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Description</span>
                <span>{selectedTransaction.description}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Created At</span>
                <span>
                  {moment(selectedTransaction.createdAt).format("lll")}
                </span>
              </div>
            </Col>
            <Col md="6">
              <h4>Inventory Details</h4>
              <hr />
              <Row>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Name</span>
                    <span>{selectedTransaction.inventoryName}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Code</span>
                    <span>{selectedTransaction.inventoryCode}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedTransaction.categoryName}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Code</span>
                    <span>{selectedTransaction.categoryCode}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Condition</span>
                    <span>{selectedTransaction?.condition ?? "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Status</span>
                    <span>{selectedTransaction?.status ?? "-"}</span>
                  </div>
                </Col>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">
                      Additional Description
                    </span>
                    <span>
                      {selectedTransaction?.additionalDescription ?? "-"}
                    </span>
                  </div>
                </Col>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Owner</span>
                    <span>{selectedTransaction.companyName}</span>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25 mb-50">
                      Description / Specification
                    </span>
                    {selectedTransaction.inventoryDescription == null ? (
                      ""
                    ) : checkIsObject(
                        selectedTransaction.inventoryDescription
                      ) ? (
                      <Table className="table">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(
                            selectedTransaction.inventoryDescription
                          ).map((val, key) => {
                            return (
                              <tr key={key}>
                                <th>{val.key}</th>
                                <td>{val.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    ) : (
                      <span>{selectedTransaction.inventoryDescription}</span>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <div className="info-container">
            {selectedTransaction !== null ? (
              <Row>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">PIC / User</span>
                    <span>{selectedTransaction.fullname ?? "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Name</span>
                    <span>{selectedTransaction.inventoryName}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedTransaction?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">UoM</span>
                    <span>{selectedTransaction?.uom ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Status</span>
                    <span>{selectedTransaction?.status ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Created At</span>
                    <span>
                      {moment(selectedTransaction?.createdAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Code</span>
                    <span>{selectedTransaction.inventoryCode}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedTransaction?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Condition</span>
                    <span>{selectedTransaction?.condition ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">
                      Additional Description
                    </span>
                    <span>
                      {selectedTransaction?.additionalDescription ?? "-"}
                    </span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Last Updated</span>
                    <span>
                      {moment(selectedTransaction?.updatedAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25 mb-50">
                      Description / Specification
                    </span>
                    {selectedTransaction.description == null ? (
                      ""
                    ) : checkIsObject(selectedTransaction.description) ? (
                      <Table className="table">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(selectedTransaction.description).map(
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
                      <span>{selectedTransaction.description}</span>
                    )}
                  </div>
                </Col>
              </Row>
            ) : null}
          </div> */}
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default TransactionDetailCard;
