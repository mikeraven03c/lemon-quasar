export function updateTableData(
  mode,
  input,
  {
    tableData
  }
) {
  if (mode == "edit") {
    let index = tableData.value.findIndex((x) => x.id == input.id);
    Object.assign(tableData.value[index], input);
  } else {
    tableData.value.unshift(input);
  }
}