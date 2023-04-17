// ** React Imports
import { Link } from "react-router-dom";
import moment from "moment";

export const columns = [
  {
    name: "INVENTORY",
    sortable: true,
    minWidth: "250px",
    sortField: "inventoryName",
    selector: (row) => row.transactionId,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/transaction/${row.transactionId}`}
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
    selector: (row) => row.companyId,
    cell: (row) => (
      <Link
        to={`/company/${row.companyId}`}
        className="text-body"
        // onClick={() => store.dispatch(getUser(row.userId))}
      >
        <span className="fw-bolder">{row.companyName ?? "-"}</span>
      </Link>
    ),
  },
  {
    name: "TYPE",
    minWidth: "150px",
    sortable: true,
    sortField: "type",
    selector: (row) => row.type,
    cell: (row) => (
      <p className="text-uppercase text-truncate text-body fw-bolder mb-0">
        <b>{row.type ?? "-"}</b>
      </p>
    ),
  },
  {
    name: "TRANSACTION DATE",
    minWidth: "210px",
    sortable: true,
    sortField: "transactionDate",
    selector: (row) => row.transactionDate,
    cell: (row) => moment(row.transactionDate).format("lll"),
  },
  {
    name: "CREATED AT",
    minWidth: "200px",
    sortable: true,
    sortField: "createdAt",
    selector: (row) => row.createdAt,
    cell: (row) => moment(row.createdAt).format("lll"),
  },
];
