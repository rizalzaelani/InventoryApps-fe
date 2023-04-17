import { Info } from "react-feather";
import {
  Button,
  Col,
  PopoverBody,
  PopoverHeader,
  Row,
  Table,
  UncontrolledPopover,
} from "reactstrap";

const checkIsObject = (str) => {
  try {
    if (str == null) return false;
    return typeof JSON.parse(str) === "object";
  } catch {
    return false;
  }
};
const renderDesc = (str, inventoryId) => {
  return JSON.parse(str).map((val, key) => {
    return (
      <div className="mb-25" key={key + "descList" + inventoryId}>
        <p className="mb-0">
          <b>{val.key}</b>
        </p>
        <p className="mb-0">{val.value}</p>
      </div>
    );
  });
};
export const ColumnInventory = [
  {
    name: "INVENTORY",
    sortable: true,
    minWidth: "250px",
    sortField: "inventoryName",
    selector: (row) => row?.inventoryId,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder mb-25">{row?.inventoryName}</span>
        <small
          className="text-truncate text-muted mb-0"
          style={{ maxWidth: "230px", overflow: "hidden" }}
        >
          {row?.inventoryCode}
        </small>
      </div>
    ),
  },
  {
    name: "CATEGORY",
    sortable: true,
    minWidth: "100px",
    sortField: "categoryName",
    selector: (row) => row?.categoryName,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder mb-25">{row?.categoryName}</span>
        <small
          className="text-truncate text-muted mb-0"
          style={{ maxWidth: "80px", overflow: "hidden" }}
        >
          {row?.categoryCode}
        </small>
      </div>
    ),
  },
  {
    name: "PIC (USER)",
    minWidth: "180px",
    sortable: true,
    sortField: "fullname",
    selector: (row) => row?.fullname,
    cell: (row) => (
      <div className="d-flex flex-column">
        <span className="fw-bolder mb-25">{row?.fullname ?? "-"}</span>
        <small
          className="text-muted text-truncate mb-0"
          style={{ maxWidth: "160px", overflow: "hidden" }}
        >
          {row?.userCompany ?? "-"}
        </small>
      </div>
    ),
  },
  {
    name: "INVENTORY OWNER",
    minWidth: "250px",
    sortable: true,
    sortField: "companyName",
    selector: (row) => row?.companyName,
    cell: (row) => <span className="fw-bolder">{row?.companyName ?? "-"}</span>,
  },
  {
    name: "CONDITION & STATUS",
    minWidth: "250px",
    sortable: true,
    sortField: "condition",
    selector: (row) => row?.condition,
    cell: (row) => (
      <div className="d-flex flex-column">
        <p className="text-uppercase text-truncate text-body mb-0">
          <b>{row?.condition ?? "-"}</b>
        </p>
        <small className="text-uppercase text-truncate text-muted mb-0">
          {row?.status ?? "-"}
        </small>
      </div>
    ),
  },
  {
    name: "SATUAN",
    minWidth: "50px",
    sortable: true,
    sortField: "uom",
    selector: (row) => row?.uom,
    cell: (row) => <span>{row?.uom ?? "-"}</span>,
  },
  {
    name: "JUMLAH",
    minWidth: "50px",
    sortable: true,
    sortField: "qty",
    selector: (row) => row?.qty,
    cell: (row) => <span>{row?.qty ?? "-"}</span>,
  },
  {
    name: "DESCRIPTION",
    minWidth: "160px",
    sortable: true,
    sortField: "description",
    selector: (row) => row?.description,
    cell: (row) => (
      <div>
        {checkIsObject(row?.description) ? (
          <div>
            <Button color="primary" outline id={"importInv" + row?.inventoryId}>
              Detail
            </Button>
            <UncontrolledPopover
              trigger="focus"
              placement="top"
              target={"importInv" + row?.inventoryId}
              key={"popover" + row?.inventoryId}
            >
              <PopoverHeader key={"header" + row?.inventoryId}>
                {row?.inventoryName + " - (" + row?.inventoryCode + ")"}
              </PopoverHeader>
              <PopoverBody key={"body" + row?.inventoryId}>
                {renderDesc(row?.description, row.inventoryId)}
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        ) : (
          <span>{row?.description}</span>
        )}
      </div>
    ),
  },
  {
    name: "ADDITIONAL DESCRIPTION",
    minWidth: "250px",
    sortable: true,
    sortField: "additionalDescription",
    selector: (row) => row?.additionalDescription,
    cell: (row) => <span>{row?.additionalDescription}</span>,
  },
];
