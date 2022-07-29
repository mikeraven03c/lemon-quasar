<template>
  <!-- <q-page class="flex flex-center">

  </q-page>-->

  <!--
    :visible-columns="visibleColumns"
  -->
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
        <div class="col-2 q-table__title">Users</div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            outline
            round
            color="primary"
            icon="add"
            @click="addData"
            size="sm"
          />
          <q-btn
            outline
            round
            color="positive"
            size="sm"
            icon="refresh"
            @click="getData"
          />
          <q-btn
            outline
            round
            color="negative"
            size="sm"
            icon="delete"
            @click="deleteData"
          />
          <q-btn
            outline
            round
            color="accent"
            size="sm"
            icon="file_download"
            @click="exportTable"
          />
        </div>
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
          v-model="visibleColumns"
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
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup @click="editData">
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="deleteData">Delete</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Export</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </template>
    </q-table>
  </div>
  <form-page @onSubmitted="onSubmitted" ref="formPage"></form-page>
</template>

<script>
import { api } from "boot/axios";
import FormPage from "pages/user/Form.vue";
import { ref, reactive, toRef, onMounted } from "vue";

import { exportFile, Dialog, Notify } from "quasar";
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    format: (val) => `${val}`,
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

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  components: {
    FormPage,
  },
  methods: {
    // selectRow(e, row, index) {
    //   this.selected = [];
    //   this.selected.push(row);
    //   this.index = index;
    // },
  },
  setup() {
    const formPage = ref();
    const loading = ref(false);
    const pagination = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    };
    const selected = ref([]);
    const grid = ref(false);
    // const { data, error, loading } = useFetch("user", {});
    const tableData = ref([]);

    const getData = () => {
      loading.value = true;
      api
        .get("user")
        .then((response) => {
          tableData.value = response.data.data ?? [];
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const onSubmitted = (mode, outputData, outputIndex) => {
      if (mode == "edit") {
        if (outputIndex !== -1) {
          let index = tableData.value.findIndex((x) => x.id == outputData.id);
          Object.assign(tableData.value[index], outputData);
        }
      } else {
        tableData.value.unshift(outputData);
      }
    };
    const addData = () => {
      formPage.value.openModal("add");
    };

    const editData = () => {
      formPage.value.openModal("edit", selected.value[0]);
    };

    // const addData

    const deleteData = () => {
      const ids = selected.value.map((x) => x.id);

      if (!ids) return;

      Dialog.create({
        title: "Delete",
        cancel: true,
        message: "Are you sure you want to delete?",
      }).onOk(() => {
        loading.value = true;
        api
          .post("user/delete", ids)
          .then(({ data }) => {
            if (data.status) {
              loading.value = false;
              Notify.create({
                message: data.message,
                color: data.status ? "primary" : "negative",
              });

              tableData.value = tableData.value.filter(
                (x) => !ids.includes(x.id)
              );
            }
          })
          .catch((error) => {
            loading.value = false;
          });
      });
    };

    const selectRow = (e, row) => {
      selected.value = [];
      selected.value.push(row);
    };

    onMounted(() => {
      getData();
    });

    return {
      initialPagination: pagination,
      filter: ref(""),
      grid,
      formPage,
      selected,
      loading,
      columns,
      visibleColumns: ref(["name", "email"]),
      // rows,
      addData,
      editData,
      deleteData,
      getData,
      tableData,
      selectRow,
      onSubmitted,
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${tableData.value.length}`;
      },
      exportTable() {
        // naive encoding to csv format
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            data.value.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("table-export.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
    };
  },
};
</script>
