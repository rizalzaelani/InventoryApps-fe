// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import renderInitial from "../../../../helpers/renderInitial";

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

export const ColumnUser = [
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
          <span className="fw-bolder mb-25">{row.fullname}</span>
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
      <span className="text-body fw-bolder">{row.companyName}</span>
    ),
  },
];
