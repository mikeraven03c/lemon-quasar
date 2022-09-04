export default [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    format: (val) => `${val}`,
    sortable: true,

    size: "col-6",
    type: "string",
    showOnForm: "true"
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
    size: "col-6",
    type: "string",
    showOnForm: "true"
  },
  {
    name: "created_at",
    label: "Created At",
    field: "created_at",
    sortable: true,
    type: "string",
  },
  {
    name: "updated_at",
    label: "Updated At",
    field: "updated_at",
    sortable: true,
    type: "string",
  },
];