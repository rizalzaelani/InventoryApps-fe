import moment from "moment";
import { Fragment } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const HandoverDetailCard = ({ selectedHandover }) => {
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
                <span className="fw-bolder me-25">Handover Date</span>
                <span>
                  {moment(selectedHandover.handoverDate).format("lll")}
                </span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">
                  PIC / User Before - Company
                </span>
                <span>
                  {selectedHandover.userBefore
                    ? selectedHandover.userBefore +
                      " - " +
                      selectedHandover.userBeforeCompany
                    : "-"}
                </span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">
                  PIC / User After - Company
                </span>
                <span>
                  {selectedHandover.userAfter
                    ? selectedHandover.userAfter +
                      " - " +
                      selectedHandover.userAfterCompany
                    : "-"}
                </span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Condition</span>
                <span>{selectedHandover.condition}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Status</span>
                <span>{selectedHandover.status}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Additional Description</span>
                <span>{selectedHandover.additionalDescription}</span>
              </div>
              <div className="d-flex flex-column mb-1">
                <span className="fw-bolder me-25">Created At</span>
                <span>{moment(selectedHandover.createdAt).format("lll")}</span>
              </div>
            </Col>
            <Col md="6">
              <h4>Inventory Details</h4>
              <hr />
              <Row>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Name</span>
                    <span>{selectedHandover.inventoryName}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Code</span>
                    <span>{selectedHandover.inventoryCode}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedHandover.categoryName}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Code</span>
                    <span>{selectedHandover.categoryCode}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Condition</span>
                    <span>{selectedHandover?.inventoryCondition ?? "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Status</span>
                    <span>{selectedHandover?.inventoryStatus ?? "-"}</span>
                  </div>
                </Col>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">
                      Additional Description
                    </span>
                    <span>
                      {selectedHandover?.inventoryAdditionalDescription ?? "-"}
                    </span>
                  </div>
                </Col>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Owner</span>
                    <span>{selectedHandover.companyName}</span>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25 mb-50">
                      Description / Specification
                    </span>
                    {selectedHandover.inventoryDescription == null ? (
                      ""
                    ) : checkIsObject(selectedHandover.inventoryDescription) ? (
                      <Table className="table">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(
                            selectedHandover.inventoryDescription
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
                      <span>{selectedHandover.inventoryDescription}</span>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <div className="info-container">
            {selectedHandover !== null ? (
              <Row>
                <Col md="12">
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">PIC / User</span>
                    <span>{selectedHandover.fullname ?? "-"}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Name</span>
                    <span>{selectedHandover.inventoryName}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedHandover?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">UoM</span>
                    <span>{selectedHandover?.uom ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Status</span>
                    <span>{selectedHandover?.status ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Created At</span>
                    <span>
                      {moment(selectedHandover?.createdAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Inventory Code</span>
                    <span>{selectedHandover.inventoryCode}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Category Name</span>
                    <span>{selectedHandover?.categoryName ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Condition</span>
                    <span>{selectedHandover?.condition ?? "-"}</span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">
                      Additional Description
                    </span>
                    <span>
                      {selectedHandover?.additionalDescription ?? "-"}
                    </span>
                  </div>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25">Last Updated</span>
                    <span>
                      {moment(selectedHandover?.updatedAt).format("lll") ??
                        "-"}
                    </span>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex flex-column mb-1">
                    <span className="fw-bolder me-25 mb-50">
                      Description / Specification
                    </span>
                    {selectedHandover.description == null ? (
                      ""
                    ) : checkIsObject(selectedHandover.description) ? (
                      <Table className="table">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {JSON.parse(selectedHandover.description).map(
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
                      <span>{selectedHandover.description}</span>
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
export default HandoverDetailCard;
