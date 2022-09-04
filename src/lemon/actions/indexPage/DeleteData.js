import { Dialog, Notify } from "quasar";
import { api } from "src/boot/axios";

export function deleteData(endpoint, ids, { loading, tableData }) {
  if (!ids) return

  const func = () => {
    loading.value = true
    api
      .post(endpoint, ids)
      .then(({ data }) => {
        loading.value = false;

        Notify.create({
          message: data.message,
          color: data.status ? "primary" : "negative",
        });
        if (data.status) {
          tableData.value = tableData.value.filter(
            (x) => !ids.includes(x.id)
          );
        }
      })
      .catch((error) => {
        Notify.create({
          message: error.message,
          color: "negative",
        });
        console.log(error)
        loading.value = false;
      });
  }

  createDialog(func)
}

function createDialog(func) {
  return Dialog.create({
    title: "Delete",
    cancel: true,
    message: "Are you sure you want to delete?",
  }).onOk(() => { func() });
}