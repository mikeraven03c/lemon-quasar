<template>
  <div class="q-pa-md">
    <div
      class="
        col-2
        q-table__title
        text-white text-h5 text-shaddow
        q-pb-sm
        text-shad
      "
    >
      {{ title }}
    </div>
    <q-table
      :grid="grid"
      :filter="filter"
      :dense="dense"
      :rows="tableData"
      :visible-columns="visibleColumnsInTable"
      :columns="columns"
      row-key="id"
      @row-contextmenu="selectRow"
      selection="multiple"
      :pagination="initialPagination"
      v-model:selected="selected"
      :loading="loading"
    >
      <!--
      :selected-rows-label="getSelectedString" -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top="props">
        <!-- <div class="col-2 q-table__title">{{ title }}</div> -->
        <slot name="header"></slot>

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
          debounce="500"
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
      <template v-if="!customizeTable" v-slot:body-cell-name="props">
        <q-td>
          {{ props.value }}
        </q-td>
        <slot name="table-menu"></slot>
      </template>
      <template v-else v-slot:body="props">
        <q-tr :props="props" @click.right="selectRow(null, props.row)">
          <q-td auto-width>
            <q-checkbox :dense="dense" v-model="props.selected" />
          </q-td>
          <q-td
            v-for="item in columns"
            :key="item.name"
            :props="props"
            @click="(e) => showPopup(e, props.row, item)"
          >
            {{ props.row[item.field] }}
          </q-td>
          <slot name="table-menu"></slot>
        </q-tr>
      </template>
    </q-table>
    <q-popup-edit
      v-if="editable"
      ref="popupRef"
      v-model="popupSet.scope"
      :title="popupSet.title"
      :target="targetEdit"
    >
      <dynamic-input
        :key="popupSet.item.field"
        v-model="formData[popupSet.item.field]"
        :item="popupSet.item"
        :columns="columns"
      >
        <template v-slot:after> </template>
      </dynamic-input>
      <div class="q-gutter-sm" vertical align="right">
        <q-btn flat dense v-close-popup round color="secondary" icon="close" />
        <q-btn
          @click="onPopupSave(popupRef)"
          round
          flat
          dense
          color="primary"
          icon="save"
        />
      </div>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-popup-edit>
  </div>
</template>

<script>
import { defineAsyncComponent, nextTick, ref } from "vue";
import { onPopup } from "src/lemon/actions/indexPage/OpenPopup";
import { it } from "node:test";
export default {
  name: "LTable",
  components: {
    DynamicInput: defineAsyncComponent(() =>
      import("src/lemon/components/formPage/DynamicInput.vue")
    ),
  },
  props: {
    // For Data
    title: {
      type: String,
      required: true,
    },
    editable: {
      type: Boolean,
      required: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    customPagination: {
      type: Object,
      default: () => {},
    },
    tableData: {
      type: Array,
      required: true,
    },
    visibleColumns: {
      type: Array,
      default: ($v) => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    customizeTable: {
      type: Boolean,
      default: false,
    },
    // For Design
    dense: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const popupSet = ref({
      title: "",
      item: {},
      scope: [],
    });

    const popupRef = ref();
    const targetEdit = ref(false);
    const grid = ref(false);
    const filter = ref("");
    const selected = ref([]);
    const formData = ref({});
    const pagination = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    };
    const visibleColumnsInTable = ref(
      props.visibleColumns.length
        ? props.visibleColumns
        : props.columns.map((x) => x.name)
    );

    const selectRow = (e, row) => {
      selected.value = [];
      selected.value.push(row);
    };

    const getSelectedIds = () => {
      return selected.value.map((x) => x.id);
    };

    const onBeforeShowPopup = (row) => {
      onPopup(row, formData);
      selected.value = [];
      selected.value.push(row);
    };

    const onPopupSave = (popup) => {
      emit("onPopupSave", formData, popup);
    };

    const showPopup = (evt, row, item) => {
      if (row && props.editable) {
        popupSet.value.item = item;
        popupSet.value.title = item.label;
        popupSet.value.scope = row;

        targetEdit.value = evt.target;

        selected.value = [];
        selected.value.push(row);
        nextTick(() => {
          onPopup(row, formData);
          popupRef.value.show(evt);
          popupRef.value.initialValue = row[item.field];
        });
      }
    };

    return {
      // getLabelFromOptions,
      popupSet,
      showPopup,
      popupRef,
      targetEdit,
      onPopupSave,
      formData,
      onBeforeShowPopup,
      getSelectedIds,
      initialPagination: props.customPagination ?? pagination,
      filter,
      pagination,
      visibleColumnsInTable,
      selected,
      grid,
      selectRow,
    };
  },
};
</script>

<style>
</style>