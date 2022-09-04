<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 100px">
      <slot name="beforeItems"></slot>
      <q-item
        v-if="actions.includes('show') && !hideActions.includes('show')"
        clickable
        v-close-popup
        @click="showData"
      >
        <q-item-section>Show</q-item-section>
      </q-item>
      <q-item
        v-if="actions.includes('edit') && !hideActions.includes('edit')"
        clickable
        v-close-popup
        @click="editData"
      >
        <q-item-section>Edit</q-item-section>
      </q-item>
      <q-item
        v-if="actions.includes('delete') && !hideActions.includes('delete')"
        clickable
        v-close-popup
      >
        <q-item-section @click="deleteData">Delete</q-item-section>
      </q-item>
      <q-item
        v-if="actions.includes('export') && !hideActions.includes('export')"
        clickable
        v-close-popup
      >
        <q-item-section>Export</q-item-section>
      </q-item>
      <slot name="afterItems"></slot>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: "LTableMenu",
  props: {
    actions: {
      type: Array,
      default: () => ["edit", "delete", "export", "show"],
    },
    hideActions: {
      type: Array,
      default: () => [""],
    },
  },
  setup(props, { emit }) {
    const editData = () => {
      emit("onEdit");
    };
    const deleteData = () => {
      emit("onDelete");
    };
    const showData = () => {
      emit("onShow");
    };

    return {
      showData,
      editData,
      deleteData,
    };
  },
};
</script>
