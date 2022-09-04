<template>
  <div class="q-pa-md">
    <q-table
      :grid="grid"
      :filter="filter"
      dense
      :rows="tableData"
      :visible-columns="visibleColumns"
      :columns="columns"
      row-key="id"
      @row-contextmenu="selectRow"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :pagination="initialPagination"
      v-model:selected="selected"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top="props">
        <slot name="header"></slot>
        <div class="col-2 q-table__title">{{ title }}</div>
        <q-space />
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
        <q-select
          v-model="visibleColumnsInTable"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>
      <template v-slot:body-cell-name="props">
        <q-td>
          {{ props.value }}
        </q-td>
        <q-menu touch-position context-menu>
          <slot name="menu-list"></slot>
        </q-menu>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "LTable",
  props: {
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    visibleColumns: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const grid = ref(false);
    const filter = ref("");
    const selected = ref([]);
    // const visibleColumns = ref(["name", "email"]);
    const pagination = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    };
    const visibleColumnsInTable = ref(props.visibleColumns);

    const selectRow = (e, row) => {
      selected.value = [];
      selected.value.push(row);
    };

    const getSelectedString = () => {
      return selected.value.length === 0
        ? ""
        : `${selected.value.length} record${
            selected.value.length > 1 ? "s" : ""
          } selected of ${tableData.value.length}`;
    };

    return {
      initialPagination: pagination,
      filter,
      pagination,
      visibleColumnsInTable,
      selected,
      grid,
      selectRow,
      getSelectedString,
    };
  },
};
</script>

<style>
</style>