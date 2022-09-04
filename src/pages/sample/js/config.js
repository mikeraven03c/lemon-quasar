export const title = "User";
export const endpoint = "user";
export const hasForm = true;

export const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    format: (val) => `${val}`,
    sortable: true,
    type: "string",
    size: "col-6",
    showOnForm: true

  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
    type: "string",
    size: "col-6",
    showOnForm: true,
  },
  {
    name: "created_at",
    label: "Created At",
    field: "created_at",
    sortable: true
  },
  {
    name: "updated_at",
    label: "Updated At",
    field: "updated_at",
    sortable: true
  },
];

export const visibleColumns = [
  'name',
  'email',
];