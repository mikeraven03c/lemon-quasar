import { api } from "boot/axios";
import { Notify } from "quasar";
export function saveForm(
  endpoint,
  {
    loading,
    formError,
    formData,
    formMode,
    beforeSave,
    onSave,
    onFormError,
  }
) {
  try {
    loading.value = true;
    formError.value = {};

    if (beforeSave) beforeSave()

    const mode = formMode.value;

    const apiType =
      formMode.value == "add"
        ? api.post(endpoint, formData.value)
        : api.put(endpoint + "/" + formData.value.id, formData.value);

    apiType
      .then(({ data }) => {
        loading.value = false;
        if (data.status) {
          if (onSave) onSave({ data, mode })

          formData.value = {};
        }

        Notify.create({
          message: data.message,
          color: data.status ? "primary" : "negative",
        });
      })
      .catch((error) => {
        loading.value = false;
        if (error.response) {
          if (error.response.status == 422) {
            Notify.create({
              message: "something error in the form",
              color: "negative"
            });
            let data = error.response.data;

            formError.value = data.data;

            if (onFormError) onFormError(data.data)
          }
        } else {
          console.log(error)
        }
      });
  } catch (e) {
    console.log(e)
    loading.value = false
    Notify.create({
      message: e.message,
      color: "negative"
    });
  }
};