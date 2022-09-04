import { api } from "src/boot/axios";

export function getData(endPoint, { tableData, loading, afterGet }) {
  loading.value = true;
  api
    .get(endPoint)
    .then((response) => {
      tableData.value = response.data.data ?? [];
      if (afterGet) afterGet(response.data)
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
    });
}

export function getPostData(endPoint, { tableData, loading, afterGet, payload }) {
  loading.value = true;
  api
    .post(endPoint, payload)
    .then((response) => {
      tableData.value = response.data.data ?? [];
      if (afterGet) afterGet(response.data)
      loading.value = false;
    })
    .catch((error) => {
      console.log(error)
      loading.value = false;
    });
}

export function getPostCustomData(endPoint, data, { loading, afterGet, payload }) {
  loading.value = true;
  api
    .post(endPoint, payload)
    .then((response) => {
      data.value = response.data.data ?? [];
      if (afterGet) afterGet(response.data)
      loading.value = false;
    })
    .catch((error) => {
      console.log(error)
      loading.value = false;
    });
}
