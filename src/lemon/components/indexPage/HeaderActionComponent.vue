<template>
  <div class="q-pa-md q-gutter-sm">
    <slot name="before"></slot>
    <q-btn
      v-if="actions.includes('add') && !hideAdd"
      outline
      round
      color="primary"
      icon="add"
      @click="addData"
      size="sm"
    />
    <q-btn
      v-if="actions.includes('get') && !hideGet"
      outline
      round
      color="positive"
      size="sm"
      icon="refresh"
      @click="getData"
    />
    <q-btn
      v-if="actions.includes('delete') && !hideDelete"
      outline
      round
      color="negative"
      size="sm"
      icon="delete"
      @click="deleteData"
    />
    <q-btn
      v-if="actions.includes('export') && !hideExport"
      outline
      round
      color="accent"
      size="sm"
      icon="file_download"
      @click="exportTable"
    />
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: "LHeaderAction",
  props: {
    actions: {
      type: Array,
      default: () => ["add", "get", "delete", "export"],
    },
    hideAdd: {
      type: Boolean,
      default: false,
    },
    hideGet: {
      type: Boolean,
      default: false,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
    hideExport: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const addData = () => {
      emit("onAdd");
    };
    const getData = () => {
      emit("onGet");
    };
    const deleteData = () => {
      emit("onDelete");
    };
    const exportTable = () => {
      emit("onExport");
    };
    return {
      addData,
      getData,
      deleteData,
      exportTable,
    };
  },
};
</script>

<style>
</style>