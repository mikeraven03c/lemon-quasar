import { api } from 'src/boot/axios';
export function getSelectData(
  endPoint,
  select,
  { options, afterGet }
) {
  api
    .get(endPoint + '/' + select)
    .then((response) => {
      options.value = response.data ?? [];
      if (afterGet) afterGet(response.data)
    })
    .catch((error) => {
    });
}

export function getCustomSelectData(
  endPoint,
  select,
  field,
  options
) {
  api
    .get(endPoint + '/' + select)
    .then((response) => {
      options.value[field] = response.data ?? [];
    })
    .catch((error) => {
    });
}

