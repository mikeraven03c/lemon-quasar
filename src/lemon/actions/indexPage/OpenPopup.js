import cloneDeep from "clone-deep";

export function onPopup(selected, formData) {
  formData.value = {};
  selected = cloneDeep(selected)
  formData.value = selected
}