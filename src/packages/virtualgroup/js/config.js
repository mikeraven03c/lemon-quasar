export const title = "VirtualGroup";
export const endpoint = "virtual-group";
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
  },
  {
    name: "label",
    required: true,
    label: "Label",
    align: "left",
    field: "label",
    sortable: true,
    type: "string",
    size: "col-12",
    showOnForm: true,
  },
  {
    name: "priority",
    required: true,
    label: "Priority",
    align: "right",
    field: "priority",
    sortable: true,
    type: "integer",
    size: "col-12",
    showOnForm: true,
  },
];

export const visibleColumns = [
  'name',
  'label',
  'priority',
];