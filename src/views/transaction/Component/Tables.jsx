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

// ** Third Party Components
import { ChevronDown, Filter, RefreshCw } from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SidebarNewTransactions from "./SidebarNewTransaction";

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
        <div className="d-flex align-items-center p-0">
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
              Add New Transaction
            </Button>
            <Button
              className=" btn-icon"
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
  totalTransaction,
  listCompany,
  listCategory,
  listUser,
  listInventory,
  defInventoryId = null,
  defUserId = null,
}) => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  const [defaultValues, setDefaultValues] = useState({
    transactionId: "transactionId",
    inventoryId: null,
    userId: null,
    item: "",
    type: "",
    description: "",
    transactionDate: new Date(),
  });
  const [currentCompany, setCurrentCompany] = useState({
    value: "",
    label: "Select Company",
  });
  const [currentCategory, setCurrentCategory] = useState({
    value: "",
    label: "Select Category",
  });
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarFilter = () => setOpenFilters(!openFilters);

  const params = {
    sort: sort,
    sortColumn: sortColumn,
    q: searchTerm,
    page: currentPage,
    perPage: rowsPerPage,
    categoryId: currentCategory.value,
    companyId: currentCompany.value,
    inventoryId: defInventoryId ?? "",
    userId: defUserId ?? "",
  };

  const loadDatatable = () => {
    dispatch({
      type: "transaction/datatable",
      payload: { params },
    });
  };
  useEffect(() => {}, [
    listData,
    totalTransaction,
    listCompany,
    listCategory,
    listUser,
    listInventory,
  ]);
  useEffect(() => {
    loadDatatable();
    dispatch({
      type: "company/get",
      payload: {},
    });
    dispatch({
      type: "category/get",
      payload: {},
    });
    dispatch({
      type: "user/get",
      payload: {},
    });
    dispatch({
      type: "inventory/get",
      payload: {},
    });
  }, []);

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
  const categoryOptions = [
    { value: "", label: "Select Category" },
    ...listCategory.map((val, idx) => {
      return {
        value: val.categoryId,
        label: val.categoryName,
      };
    }),
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    params.page = page.selected + 1;
    dispatch({
      type: "transaction/datatable",
      payload: { params },
    });
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    params.perPage = value;
    dispatch({
      type: "transaction/datatable",
      payload: { params },
    });
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    params.q = val;
    dispatch({
      type: "transaction/datatable",
      payload: { params },
    });
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(totalTransaction / rowsPerPage));

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
      category: currentCategory.value,
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
      type: "transaction/datatable",
      payload: { params },
    });
  };

  const resetFilters = () => {
    setCurrentCompany({ value: "", label: "Select Company" });
    setCurrentCategory({ value: "", label: "Select Category" });
    params.categoryId = "";
    params.companyId = "";
    (params.inventoryId = defInventoryId ?? ""),
      (params.userId = defUserId ?? "");
    dispatch({
      type: "transaction/datatable",
      payload: { params },
    });
    setOpenFilters(false);
  };

  const SidebarFilter = () => {
    return (
      <Sidebar
        size="sm"
        open={openFilters}
        title="Filters Transaction"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleSidebarFilter}
        style={{ width: 30 + "%" }}
      >
        <Row>
          <Col className="mb-1" md="12">
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
                  type: "transaction/datatable",
                  payload: { params },
                });
                setOpenFilters(false);
              }}
            />
          </Col>
          <Col className="mb-1" md="12">
            <Label for="role-select">Category</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={categoryOptions}
              value={currentCategory}
              onChange={(data) => {
                setCurrentCategory(data);
                params.categoryId = data.value;
                dispatch({
                  type: "transaction/datatable",
                  payload: { params },
                });
                setOpenFilters(false);
              }}
            />
          </Col>
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
              columns={columns}
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
      <SidebarNewTransactions
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        loadDatatable={loadDatatable}
        listCompany={listCompany}
        listCategory={listCategory}
        listUser={listUser}
        listInventory={listInventory}
        defaultValues={defaultValues}
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  reducerTransaction,
  reducerCompany,
  reducerCategory,
  reducerUser,
  reducerInventory,
}) => {
  return {
    listData: reducerTransaction.listDataDataTable,
    totalTransaction: reducerTransaction.totalTransaction,
    listCompany: reducerCompany.listData,
    listCategory: reducerCategory.listData,
    listUser: reducerUser.listData,
    listInventory: reducerInventory.listData,
  };
};

const Tables = connect(mapStateToProps)(_Tables);

export default Tables;
