import cloneDeep from "clone-deep";

export function openModal(form, mode, selected = {}, { formMode, formData, formError, columns }) {
  if (formMode) {
    formMode.value = mode;
    formData.value = {};
    formError.value = {};

    if (mode != 'add') {
      selected = cloneDeep(selected)

      formData.value = selected
    }

    if (columns) {
      for (let a = 0; columns.value.length > a; a++) {
        let field = columns.value[a].field
        let type = columns.value[a].type
        let def = columns.value[a].default
        if (!formData.value.hasOwnProperty(field)) {
          if (def) {
            formData.value[field] = def
          } else if (type == 'boolean') {
            formData.value[field] = false
          } else {
            formData.value[field] = '';
          }
        }
      }
    }
  }
  form.value.openModal(mode, selected)
}