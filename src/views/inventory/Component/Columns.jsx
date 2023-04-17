// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import store from "@store";
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import moment from "moment";
import Swal from "sweetalert2";

// ** Renders Client Columns
const renderClient = (row) => {
  return (
    <Avatar
      initials
      className="me-1"
      color={renderColor(backgroundColor) || "light-primary"}
      content={row.fullname || "John Doe"}
    />
  );
};

const renderColor = (data) => {
  try {
    return Array(data.length)
      .fill(null)
      .map((_, i) => [Math.random(), i])
      .sort(([a], [b]) => a - b)
      .map(([, i]) => data[i])[0];
  } catch (er) {
    return "light-primary";
  }
};

const backgroundColor = [
  "light-warning",
  "light-success",
  "light-primary",
  "light-info",
  "light-danger",
];

const doDelete = (id, dispatch, loadDataDatatable) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      confirmButton: "me-1",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch({
        type: "inventory/delete",
        payload: { id: id ?? "" },
        callback: (res) => {
          return Swal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadDataDatatable();
          });
        },
      });
    }
  });
};

export const columns = (setDataForm, dispatch, loadDataDatatable) => [
  {
    name: "INVENTORY",
    sortable: true,
    minWidth: "250px",
    sortField: "inventoryName",
    selector: (row) => row.inventoryName,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/inventory/${row.inventoryId}`}
          className="text-truncate text-body mb-25"
          style={{ maxWidth: "230px", overflow: "hidden" }}
        >
          <span className="fw-bolder">{row.inventoryName}</span>
        </Link>
        <small
          className="text-truncate text-muted mb-0"
          style={{ maxWidth: "230px", overflow: "hidden" }}
        >
          {row.inventoryCode}
        </small>
      </div>
    ),
  },
  {
    name: "CATEGORY",
    sortable: true,
    minWidth: "100px",
    sortField: "categoryName",
    selector: (row) => row.categoryName,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/category/${row.categoryId}`}
          className="text-truncate text-body mb-25"
          style={{ maxWidth: "80px", overflow: "hidden" }}
        >
          <span className="fw-bolder">{row.categoryName}</span>
        </Link>
        <small
          className="text-truncate text-muted mb-0"
          style={{ maxWidth: "80px", overflow: "hidden" }}
        >
          {row.categoryCode}
        </small>
      </div>
    ),
  },
  {
    name: "PIC (USER)",
    minWidth: "180px",
    sortable: true,
    sortField: "fullname",
    selector: (row) => row.fullname,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/user/${row.userId}`}
          className="text-truncate text-body mb-25"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          <span className="fw-bolder">{row.fullname ?? "-"}</span>
        </Link>
        <small
          className="text-muted text-truncate mb-0"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          {row.userCompany ?? "-"}
        </small>
      </div>
    ),
  },
  {
    name: "INVENTORY OWNER",
    minWidth: "250px",
    sortable: true,
    sortField: "companyName",
    selector: (row) => row.companyName,
    cell: (row) => (
      <Link to={`/company/${row.companyId}`} className="text-body">
        <span className="fw-bolder">{row.companyName ?? "-"}</span>
      </Link>
    ),
  },
  {
    name: "CONDITION & STATUS",
    minWidth: "170px",
    sortable: true,
    sortField: "condition",
    selector: (row) => row.condition,
    cell: (row) => (
      <div className="d-flex flex-column">
        <p className="text-uppercase text-truncate text-body mb-0">
          <b>{row.condition ?? "-"}</b>
        </p>
        <small className="text-uppercase text-truncate text-muted mb-0">
          {row.status ?? "-"}
        </small>
      </div>
    ),
  },
  {
    name: "LAST UPDATED",
    minWidth: "200px",
    sortable: true,
    sortField: "updatedAt",
    selector: (row) => row.updatedAt,
    cell: (row) => moment(row.updatedAt).format("lll"),
  },
  {
    name: "ACTIONS",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/inventory/${row.userId}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                setDataForm(row);
              }}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                doDelete(row?.inventoryId, dispatch, loadDataDatatable);
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
