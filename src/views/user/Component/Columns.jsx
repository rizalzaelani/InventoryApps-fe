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
import renderInitial from "../../../helpers/renderInitial";

// ** Renders Client Columns
const renderClient = (row) => {
  return (
    <Avatar
      className="me-1"
      color={renderColor(backgroundColor) || "light-primary"}
      content={renderInitial(row.fullname) || "JD"}
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
        type: "user/delete",
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
    name: "USER",
    sortable: true,
    minWidth: "250px",
    sortField: "fullName",
    selector: (row) => row.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/user/${row.userId}`}
            className="text-truncate text-body mb-25"
            style={{ maxWidth: "180px", overflow: "hidden" }}
          >
            <span className="fw-bolder">{row.fullname}</span>
          </Link>
          <small
            className="text-truncate text-muted mb-0"
            style={{ maxWidth: "180px", overflow: "hidden" }}
          >
            {row.email}
          </small>
        </div>
      </div>
    ),
  },
  {
    name: "ROLE",
    sortable: true,
    // minWidth: "50px",
    sortField: "role",
    selector: (row) => row.role,
    cell: (row) => <span className="text-capitalize">{row.role}</span>,
  },
  {
    name: "PHONE NUMBER",
    minWidth: "190px",
    sortable: true,
    sortField: "phoneNumber",
    selector: (row) => row.phoneNumber,
    cell: (row) => <span className="text-capitalize">{row.phoneNumber}</span>,
  },
  {
    name: "COMPANY",
    minWidth: "250px",
    sortable: true,
    sortField: "companyName",
    selector: (row) => row.status,
    cell: (row) => (
      <Link
        to={"/company/" + row.companyId}
        className="text-truncate text-body mb-25"
        style={{ maxWidth: "180px", overflow: "hidden" }}
      >
        <span className="text-body fw-bolder">{row.companyName}</span>
      </Link>
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
            <DropdownItem tag={Link} className="w-100" to={row.userId}>
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
                doDelete(row?.userId, dispatch, loadDataDatatable);
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
