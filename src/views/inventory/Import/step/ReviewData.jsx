// ** React Imports
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

// ** Icons Imports
import { ArrowLeft, ArrowRight, ChevronDown } from "react-feather";
import { connect } from "react-redux";

// ** Reactstrap Imports
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { ColumnInventory } from "./ColumnInventory";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import { ColumnUser } from "./ColumnUser";
import { ColumnCategory } from "./ColumnCategory";
import { ColumnCompany } from "./ColumnCompany";
import Swal from "sweetalert2";

const _ReviewData = ({ stepper, listDataImport, dispatch }) => {
  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const doImport = () => {
    let params = {
      importInventories: listDataImport?.inventory,
      userImportInventories: listDataImport?.user,
      tblmCategories: listDataImport?.category,
      tblmCompanies: listDataImport?.company,
    };
    if (listDataImport?.inventory) {
      Swal.fire({
        title: "Are you sure?",
        text: "The data displayed in the table will be entered as new data!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, import data!",
        customClass: {
          confirmButton: "me-1",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Wait for a minute, the import is in progress!",
            didOpen: () => {
              Swal.showLoading();
            },
          });
          dispatch({
            type: "inventory/import_inventory",
            payload: params,
            callback: (res) => {
              return Swal.fire({
                icon: "success",
                title: res.message,
              }).then((x) => {
                if (x.isConfirmed) {
                  stepper.next();
                }
              });
            },
          });
        }
      });
      return;
    }
    return Swal.fire({
      icon: "warning",
      title: "There's no data to import!",
    });
  };

  return (
    <Fragment>
      <div className="mb-3">
        <div className="content-header mb-2">
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                Inventory
              </NavLink>
            </NavItem>
            <NavItem>
              {listDataImport?.category?.length ? (
                <NavLink
                  active={active === "2"}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  New Category
                </NavLink>
              ) : (
                ""
              )}
            </NavItem>
            <NavItem>
              {listDataImport?.company?.length ? (
                <NavLink
                  active={active === "3"}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  New Company
                </NavLink>
              ) : (
                ""
              )}
            </NavItem>
            <NavItem>
              {listDataImport?.user?.length ? (
                <NavLink
                  active={active === "4"}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  New User
                </NavLink>
              ) : (
                ""
              )}
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              <div className="react-dataTable">
                {listDataImport != undefined ? (
                  <DataTable
                    pagination
                    responsive
                    sortIcon={<ChevronDown />}
                    columns={ColumnInventory}
                    className="react-dataTable"
                    data={listDataImport?.inventory}
                  />
                ) : (
                  ""
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="react-dataTable">
                {listDataImport != undefined ? (
                  <DataTable
                    pagination
                    responsive
                    sortIcon={<ChevronDown />}
                    columns={ColumnCategory}
                    className="react-dataTable"
                    data={listDataImport?.category}
                  />
                ) : (
                  ""
                )}
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="react-dataTable">
                {listDataImport != undefined ? (
                  <DataTable
                    pagination
                    responsive
                    sortIcon={<ChevronDown />}
                    columns={ColumnCompany}
                    className="react-dataTable"
                    data={listDataImport?.company}
                  />
                ) : (
                  ""
                )}
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="react-dataTable">
                {listDataImport != undefined ? (
                  <DataTable
                    pagination
                    responsive
                    sortIcon={<ChevronDown />}
                    columns={ColumnUser}
                    className="react-dataTable"
                    data={listDataImport?.user}
                  />
                ) : (
                  ""
                )}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button
          color="secondary"
          className="btn-prev"
          outline
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => doImport()}>
          <span className="align-middle d-sm-inline-block d-none">Import</span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ reducerInventory }) => {
  return {
    listDataImport: reducerInventory.listDataImport,
    listData: reducerInventory.listData,
  };
};
const ReviewData = connect(mapStateToProps)(_ReviewData);
export default ReviewData;
