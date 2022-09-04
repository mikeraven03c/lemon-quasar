<template>
  <q-dialog
    v-model="isShow"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="q-pa-sm" style="width: 700px">
      <q-toolbar class="title">
        <q-toolbar-title>
          {{ mode == "add" ? "create" : "edit" }} user
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="formData.name"
            label="Name"
            :error-message="errorData['name']"
            :error="errorData['name'] ? true : false"
          />
          <q-input
            outlined
            v-model="formData.email"
            label="Email"
            :error-message="errorData['email']"
            :error="errorData['email'] ? true : false"
          />
        </div>
      </q-card-section>
      <q-card-actions vertical align="right">
        <q-btn @click="saveForm" color="primary" flat>{{
          mode == "add" ? "Save" : "Update"
        }}</q-btn>
      </q-card-actions>

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "boot/axios";
import { Notify } from "quasar";
import { isProxy, toRaw } from "vue";
import { ref, defineComponent, reactive } from "vue";
import { getCurrentInstance } from "vue";

export default {
  name: "formPage",
  setup(props, { emit }) {
    const cloneDeep = require("clone-deep");

    const errorData = ref([]);
    const loading = ref(false);
    const isShow = ref(false);
    const formData = ref({});
    const index = ref(0);
    const mode = ref("");
    const openModal = (modalMode, input, inputIndex) => {
      isShow.value = true;
      formData.value = {};
      errorData.value = [];
      mode.value = modalMode;
      if (modalMode == "edit") {
        index.value = inputIndex;
        formData.value = cloneDeep(input);
      }
    };

    const saveForm = () => {
      loading.value = true;
      errorData.value = [];
      const apiType =
        mode.value == "add"
          ? api.post("user", formData.value)
          : api.put("user/" + formData.value.id, formData.value);

      apiType
        .then(({ data }) => {
          loading.value = false;

          if (data.status) {
            emit("onSubmitted", mode.value, data.data, index.value);
            isShow.value = false;

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
              let data = error.response.data;

              errorData.value = data.data;
            }
          }
        });
    };

    return {
      loading,
      index,
      isShow,
      errorData,
      openModal,
      mode,
      formData,
      saveForm,
    };
  },
};
</script>
