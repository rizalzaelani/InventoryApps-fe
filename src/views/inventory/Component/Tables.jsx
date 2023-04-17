// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import CardAction from "@components/card-actions";

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
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
// ** utils
import { selectThemeColors } from "@utils";

// component
import { columns } from "./Columns";

// ** Third Party Components
import {
  ChevronDown,
  Filter,
  Plus,
  PlusCircle,
  RefreshCw,
  Upload,
} from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import SidebarNewInventorys from "./SidebarNewInventory";
import { useNavigate } from "react-router-dom";

const CustomHeader = ({
  toggleSidebar,
  toggleSidebarFilter,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  const navigate = useNavigate();
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
            <Button className=" me-50" color="primary" onClick={toggleSidebar}>
              Add New Inventory
            </Button>
            <Button
              className="btn-icon me-50"
              outline
              color="primary"
              id="btn-import"
              onClick={() => {
                navigate("/inventory/import");
              }}
            >
              <Upload className="font-medium-2" />
            </Button>
            <UncontrolledTooltip target="btn-import" placement="top">
              Import Inventory
            </UncontrolledTooltip>
            <Button
              className=" btn-icon"
              outline
              color="primary"
              onClick={toggleSidebarFilter}
              id="btn-filters"
            >
              <Filter className="font-medium-2" />
            </Button>
            <UncontrolledTooltip target="btn-filters" placement="top">
              Filters Inventory
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

const _Tables = ({
  dispatch,
  listData,
  totalInventory,
  listCompany,
  listCategory,
  listUser,
  defCompanyId = null,
  defCategoryId = null,
  defUserId = null,
  defInventoryId = null,
}) => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("updatedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    inventoryId: "inventoryId",
    userId: null,
    companyId: null,
    categoryId: null,
    inventoryName: "",
    inventoryCode: "",
    qty: "1",
    uom: "",
    description: [
      {
        key: "key",
        value: "value",
      },
    ],
    condition: "",
    status: "",
    additionalDescription: "",
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
    categoryId: defCategoryId ?? currentCategory.value,
    companyId: defCompanyId ?? currentCompany.value,
    inventoryId: defInventoryId ?? "",
    userId: defUserId ?? "",
  };

  useEffect(() => {
    dispatch({
      type: "inventory/reset_datatable",
    });
  }, []);
  const loadDataDatatable = () => {
    dispatch({
      type: "inventory/datatable",
      payload: { params },
    });
  };
  useEffect(() => {}, [
    listData,
    totalInventory,
    listCompany,
    listCategory,
    listUser,
  ]);
  useEffect(() => {
    loadDataDatatable();
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
      type: "inventory/datatable",
      payload: { params },
    });
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    params.perPage = value;
    dispatch({
      type: "inventory/datatable",
      payload: { params },
    });
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    params.q = val;
    dispatch({
      type: "inventory/datatable",
      payload: { params },
    });
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(totalInventory / rowsPerPage));

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
      type: "inventory/datatable",
      payload: { params },
    });
  };

  const setDataForm = (row) => {
    setIsEdit(true);
    let dt = {
      inventoryId: row?.inventoryId,
      userId:
        row?.userId == null
          ? { value: "", label: "Select user" }
          : {
              label: row?.fullname,
              value: row?.userId,
            },
      companyId: {
        label: row?.companyName,
        value: row?.companyId,
      },
      categoryId: {
        label: row?.categoryName,
        value: row?.categoryId,
      },
      inventoryName: row?.inventoryName,
      inventoryCode: row?.inventoryCode,
      qty: row?.qty ?? "1",
      uom: row?.uom ?? "",
      description:
        row?.description == null
          ? [
              {
                key: "key",
                value: "value",
              },
            ]
          : JSON.parse(row?.description),
      condition: {
        label: upperFirstLetter(row?.condition),
        value: row?.condition,
      },
      status: row?.status,
      additionalDescription: row?.additionalDescription ?? "",
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
    setCurrentCompany({ value: "", label: "Select Company" });
    setCurrentCategory({ value: "", label: "Select Category" });
    params.categoryId = defCategoryId ?? "";
    params.companyId = defCompanyId ?? "";
    params.inventoryId = defInventoryId ?? "";
    params.userId = defUserId ?? "";
    dispatch({
      type: "inventory/datatable",
      payload: { params },
    });
    setOpenFilters(false);
  };

  const SidebarFilter = () => {
    return (
      <Sidebar
        size="sm"
        open={openFilters}
        title="Filters Inventory"
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
                    type: "inventory/datatable",
                    payload: { params },
                  });
                  setOpenFilters(false);
                }}
              />
            </Col>
          )}

          {defCategoryId != null ? (
            ""
          ) : (
            <Col className="mb-1" md={"12"}>
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
                    type: "inventory/datatable",
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
      <SidebarNewInventorys
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

const mapStateToProps = ({
  reducerInventory,
  reducerCompany,
  reducerCategory,
  reducerUser,
}) => {
  return {
    listData: reducerInventory.listDataDataTable,
    totalInventory: reducerInventory.totalInventory,
    listCompany: reducerCompany.listData,
    listCategory: reducerCategory.listData,
    listUser: reducerUser.listData,
  };
};

const Tables = connect(mapStateToProps)(_Tables);

export default Tables;
