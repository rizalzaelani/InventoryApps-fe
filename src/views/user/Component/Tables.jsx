// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import Select from "react-select";
// ** utils
import { selectThemeColors } from "@utils";

// component
import { columns } from "./Columns";
import SidebarNewUsers from "./SidebarNewUsers";

// ** Third Party Components
import { ChevronDown, Filter, RefreshCw } from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomHeader = ({
  toggleSidebar,
  toggleSidebarFilter,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            {/* <label htmlFor="rows-per-page">Entries</label> */}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <div className="d-flex align-items-center me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button className="me-50" color="primary" onClick={toggleSidebar}>
              Add New User
            </Button>
            <Button
              className="btn-icon"
              outline
              color="primary"
              onClick={toggleSidebarFilter}
            >
              <Filter className="font-medium-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const _Tables = ({
  dispatch,
  listData,
  totalUser,
  listCompany,
  defCompanyId = null,
  defRole = null,
}) => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("updatedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    userId: "userId",
    companyId: null,
    role: null,
    email: "",
    phoneNumber: "",
    fullname: "",
  });

  const [currentCompany, setCurrentCompany] = useState({
    value: "",
    label: "Select Company",
  });
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarFilter = () => setOpenFilters(!openFilters);
  const params = {
    sort: sort,
    sortColumn: sortColumn,
    q: searchTerm,
    page: currentPage,
    perPage: rowsPerPage,
    role: defRole ?? currentRole.value,
    companyId: defCompanyId ?? currentCompany.value,
  };

  const loadDataDatatable = () => {
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
  };
  useEffect(() => {
    loadDataDatatable();
    dispatch({
      type: "company/get",
      payload: {},
    });
  }, []);
  useEffect(() => {}, [listData, totalUser, listCompany]);

  // ** User filter options
  const companyOptions = [
    { value: "", label: "Select Company" },
    ...listCompany.map((val, idx) => {
      return {
        value: val.companyId,
        label: val.companyName,
      };
    }),
  ];

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    params.page = page.selected + 1;
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    params.perPage = value;
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    params.q = val;
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(totalUser / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      company: currentCompany.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });
    if (listData.length > 0) {
      return listData;
    } else if (listData.length === 0 && isFiltered) {
      return [];
    } else {
      return listData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    params.sort = sortDirection;
    params.sortColumn = column.sortField;
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
  };

  const setDataForm = (row) => {
    setIsEdit(true);
    let dt = {
      userId: row?.userId,
      fullname: row?.fullname,
      email: row?.email,
      phoneNumber: row?.phoneNumber,
      companyId: {
        label: row?.companyName,
        value: row?.companyId,
      },
      role: {
        label: upperFirstLetter(row?.role),
        value: row?.role,
      },
    };
    setDefaultValues(dt);
    toggleSidebar();
  };

  const upperFirstLetter = (sentence) => {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  };

  const resetFilters = () => {
    setCurrentRole({ value: "", label: "Select Role" });
    setCurrentCompany({ value: "", label: "Select Company" });
    params.role = defRole ?? "";
    params.companyId = defCompanyId ?? "";
    dispatch({
      type: "user/datatable",
      payload: { params },
    });
    setOpenFilters(false);
  };

  const SidebarFilter = () => {
    return (
      <Sidebar
        size="sm"
        open={openFilters}
        title="Filters User"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleSidebarFilter}
        style={{ width: 30 + "%" }}
      >
        <Row>
          {defCompanyId != null ? (
            ""
          ) : (
            <Col className="mb-1" md={"12"}>
              <Label for="company-select">Company</Label>
              <Select
                isClearable={false}
                value={currentCompany}
                options={companyOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentCompany(data);
                  params.companyId = data.value;
                  dispatch({
                    type: "user/datatable",
                    payload: { params },
                  });
                  setOpenFilters(false);
                }}
              />
            </Col>
          )}
          {defRole != null ? (
            ""
          ) : (
            <Col className="mb-1" md={"12"}>
              <Label for="role-select">Role</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data);
                  params.role = data.value;
                  dispatch({
                    type: "user/datatable",
                    payload: { params },
                  });
                  setOpenFilters(false);
                }}
              />
            </Col>
          )}
          <Col md={"12"}>
            <Button
              outline
              color="warning"
              className="w-100"
              onClick={resetFilters}
            >
              <RefreshCw className="font-medium-2" /> Reset Filters
            </Button>
          </Col>
        </Row>
      </Sidebar>
    );
  };

  return (
    <Fragment>
      <Row>
        {/* <Card>
          <CardHeader>
            <CardTitle tag="h4">Filters</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {defCompanyId != null ? (
                ""
              ) : (
                <Col md={defRole == null ? "6" : "12"}>
                  <Label for="company-select">Company</Label>
                  <Select
                    isClearable={false}
                    value={currentCompany}
                    options={companyOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(data) => {
                      setCurrentCompany(data);
                      params.companyId = data.value;
                      dispatch({
                        type: "user/datatable",
                        payload: { params },
                      });
                    }}
                  />
                </Col>
              )}
              {defRole != null ? (
                ""
              ) : (
                <Col
                  className="my-md-0 my-1"
                  md={defCompanyId == null ? "6" : "12"}
                >
                  <Label for="role-select">Role</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={roleOptions}
                    value={currentRole}
                    onChange={(data) => {
                      setCurrentRole(data);
                      params.role = data.value;
                      dispatch({
                        type: "user/datatable",
                        payload: { params },
                      });
                    }}
                  />
                </Col>
              )}
            </Row>
          </CardBody>
        </Card> */}
        <SidebarFilter />
        <Card className="overflow-hidden px-0">
          <div className="react-dataTable">
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns(setDataForm, dispatch, loadDataDatatable)}
              onSort={handleSort}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  searchTerm={searchTerm}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  toggleSidebar={toggleSidebar}
                  toggleSidebarFilter={toggleSidebarFilter}
                />
              }
            />
          </div>
        </Card>
      </Row>
      <SidebarNewUsers
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        loadData={loadDataDatatable}
        resetFormWhenClose={true}
        defaultValues={defaultValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ reducerUser, reducerCompany }) => {
  return {
    listData: reducerUser.listDataDataTable,
    totalUser: reducerUser.totalUser,
    listCompany: reducerCompany.listData,
  };
};

const Tables = connect(mapStateToProps)(_Tables);

export default Tables;
