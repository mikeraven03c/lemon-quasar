export const title = "VirtualModel";
export const endpoint = "virtual-model";
export const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
    type: "string",
    size: "col-12",
    showOnForm: true,
    formRequired: true,
  },
  {
    name: "endpoint",
    formRequired: true,
    label: "Endpoint",
    align: "left",
    field: "endpoint",
    sortable: true,
    type: "string",
    size: "col-12",
    showOnForm: true,
  },
  {
    name: "table_name",
    required: false,
    label: "Table name",
    align: "left",
    field: "table_name",
    sortable: true,
    type: "string",
    size: "col-12",
    showOnForm: true,
  },
  {
    name: "virtual_group_id",
    required: false,
    label: "Virtual_group_id",
    align: "left",
    field: "virtual_group_id",
    sortable: true,
    type: "unsignedBigInteger",
    size: "col-12",
    showOnForm: true,
  },
];

export const visibleColumns = [
  'name',
  'endpoint',
  'table_name'
];