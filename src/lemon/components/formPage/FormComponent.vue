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
          {{
            customTitle.length
              ? customTitle
              : mode == "add"
              ? "create"
              : mode == "show"
              ? ""
              : "edit"
          }}
          {{ customTitle.length ? "" : title }}
        </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="closeModal" />
      </q-toolbar>
      <q-card-section>
        <div class="q-gutter-sm">
          <slot name="form" :mode="mode"></slot>
        </div>
      </q-card-section>
      <q-card-actions v-if="!hideLocalAction" vertical align="right">
        <q-btn @click="onSubmit" color="primary" flat>{{
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
import { ref } from "vue-demi";
export default {
  name: "Lform",
  props: {
    customTitle: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    hideAction: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const hideLocalAction = ref(props.hideAction);
    const isShow = ref(false);
    const mode = ref("");
    const openModal = (modalMode, selected) => {
      isShow.value = true;
      mode.value = modalMode;
      if (modalMode === "show") {
        hideLocalAction.value = true;
      } else {
        hideLocalAction.value = false;
      }

      emit("onOpen", selected, mode, isShow);
    };

    const onSubmit = () => {
      emit("onSubmit", {
        mode: mode.value,
        isShow,
      });
    };

    const closeModal = () => {
      isShow.value = false;
      emit("onCloseModal", {
        mode,
        isShow,
      });
    };
    return {
      mode,
      hideLocalAction,
      closeModal,
      onSubmit,
      openModal,
      isShow,
    };
  },
};
</script>

<style>
</style>
