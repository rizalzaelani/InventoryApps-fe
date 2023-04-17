// ** React Imports
import { Link } from "react-router-dom";
import moment from "moment";

export const columns = [
  {
    name: "INVENTORY",
    sortable: true,
    minWidth: "250px",
    sortField: "inventoryName",
    selector: (row) => row.handoverId,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/handover/${row.handoverId}`}
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
    name: "USER BEFORE",
    minWidth: "180px",
    sortable: true,
    sortField: "userBefore",
    selector: (row) => row.userBefore,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/user/${row.userIdBefore}`}
          className="text-truncate text-body mb-25"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          <span className="fw-bolder">{row.userBefore ?? "-"}</span>
        </Link>
        <small
          className="text-muted text-truncate mb-0"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          {row.userBeforeCompany ?? "-"}
        </small>
      </div>
    ),
  },
  {
    name: "USER AFTER",
    minWidth: "180px",
    sortable: true,
    sortField: "userAfter",
    selector: (row) => row.userAfter,
    cell: (row) => (
      <div className="d-flex flex-column">
        <Link
          to={`/user/${row.userIdBefore}`}
          className="text-truncate text-body mb-25"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          <span className="fw-bolder">{row.userAfter ?? "-"}</span>
        </Link>
        <small
          className="text-muted text-truncate mb-0"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          {row.userAfterCompany ?? "-"}
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
      <Link to={`/company/${row.companyId}`} className="text-body">
        <span className="fw-bolder">{row.companyName ?? "-"}</span>
      </Link>
    ),
  },
  {
    name: "CONDITION",
    minWidth: "150px",
    sortable: true,
    sortField: "condition",
    selector: (row) => row.condition,
    cell: (row) => (
      <p className="text-uppercase text-truncate text-body fw-bolder mb-0">
        <b>{row.condition ?? "-"}</b>
      </p>
    ),
  },
  {
    name: "STATUS",
    minWidth: "150px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.status,
    cell: (row) => (
      <p className="text-uppercase text-truncate text-body fw-bolder mb-0">
        <b>{row.status ?? "-"}</b>
      </p>
    ),
  },
  {
    name: "HANDOVER DATE",
    minWidth: "210px",
    sortable: true,
    sortField: "handoverDate",
    selector: (row) => row.handoverDate,
    cell: (row) => moment(row.handoverDate).format("lll"),
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
