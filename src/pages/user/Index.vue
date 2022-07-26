<template>
  <div class="q-pa-md"></div>
  <!-- <form-page @onSubmit="onSubmit" ref="form"></form-page> -->
</template>

<script>
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Created At",
    field: "created_at",
    sortable: true,
  },
  {
    name: "updated_at",
    label: "Updated At",
    field: "updated_at",
    sortable: true,
  },
];

import { api } from "boot/axios";
// import FormPage from "pages/user/Form.vue";
import { ref, reactive } from "vue";

import { exportFile, useQuasar } from "quasar";
export default {
  methods: {},
  setup() {},
};
</script>
