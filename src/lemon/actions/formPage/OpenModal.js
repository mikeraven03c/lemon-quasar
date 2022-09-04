import cloneDeep from "clone-deep";

export function openModal(form, mode, selected = {}, { formMode, formData, formError }) {
  if (formMode) {
    formMode.value = mode;
    formData.value = {};
    formError.value = {};

    if (mode != 'add') {
      selected = cloneDeep(selected)
    }
  }
  form.value.openModal(mode, selected)
}