export const ColumnCategory = [
  {
    name: "CATEGORY NAME",
    sortable: true,
    sortField: "categoryName",
    selector: (row) => row.categoryName,
    cell: (row) => <span className="fw-bolder mb-25">{row.categoryName}</span>,
  },
  {
    name: "CATEGORY CODE",
    sortable: true,
    sortField: "categoryCode",
    selector: (row) => row.categoryCode,
    cell: (row) => <span className="fw-bolder mb-25">{row.categoryCode}</span>,
  },
  {
    name: "DESCRIPTION",
    sortable: true,
    sortField: "description",
    selector: (row) => row.description,
    cell: (row) => <span className="fw-bolder mb-25">{row.description}</span>,
  },
];
