export const ColumnCompany = [
  {
    name: "COMPANY NAME",
    sortable: true,
    sortField: "companyName",
    selector: (row) => row.companyName,
    cell: (row) => <span className="fw-bolder mb-25">{row.companyName}</span>,
  },
  {
    name: "DESCRIPTION",
    sortable: true,
    sortField: "description",
    selector: (row) => row.description,
    cell: (row) => <span className="fw-bolder mb-25">{row.description}</span>,
  },
];
