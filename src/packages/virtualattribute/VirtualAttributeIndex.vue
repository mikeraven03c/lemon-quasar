<template>
  <q-page>
    <div class="q-pa-md">
      <LTable
        :custom-pagination="pagination"
        ref="table"
        :title="title"
        :columns="columns"
        :table-data="tableData"
        :visible-columns="visibleColumns"
        editable
        customize-table
        :loading="loading"
        :dense="false"
        @onPopupSave="onPopupSave"
      >
        <template v-slot:header>
          <l-header-action
            hide-export
            @onAdd="openModal('add')"
            @onGet="getTableData"
            @onDelete="onDelete"
          >
            <template v-slot:after>
              <q-btn
                outline
                round
                color="primary"
                icon="arrow_back"
                @click="onBack"
                size="sm"
              /> </template
          ></l-header-action>
        </template>
        <template v-slot:table-menu>
          <l-table-menu
            @onShow="openModal('show', table.selected[0])"
            @onEdit="openModal('edit', table.selected[0])"
            @onDelete="onDelete"
          ></l-table-menu>
        </template>
      </LTable>
    </div>
    <LForm :title="title" @onSubmit="onSubmit" :loading="loading" ref="form">
      <template v-slot:form>
        <form-builder
          :data="formData"
          ref="builder"
          :columns="columns"
          @onMounted="onFormBuilderMounted"
        >
        </form-builder>
      </template>
    </LForm>
  </q-page>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { endpoint, columns as col, visibleColumns } from "./js/config";
import { openModal as open } from "src/lemon/actions/formPage/OpenModal.js";
import { getFormData } from "src/lemon/actions/formPage/GetFormData.js";
import { saveForm } from "src/lemon/actions/formPage/SaveForm.js";
import { getPostData } from "src/lemon/actions/indexPage/GetData";
import { deleteData } from "src/lemon/actions/indexPage/DeleteData";
import { updateTableData } from "src/lemon/actions/indexPage/UpdateTableData";
import { defineAsyncComponent, nextTick, onMounted, onUpdated, ref } from "vue";
export default {
  methods: {},
  components: {
    LTable: defineAsyncComponent(() =>
      import("src/lemon/components/indexPage/TableComponent.vue")
    ),
    LHeaderAction: defineAsyncComponent(() =>
      import("src/lemon/components/indexPage/HeaderActionComponent.vue")
    ),
    LTableMenu: defineAsyncComponent(() =>
      import("src/lemon/components/indexPage/TableMenuComponent.vue")
    ),
    LForm: defineAsyncComponent(() =>
      import("src/lemon/components/formPage/FormComponent.vue")
    ),
    FormBuilder: defineAsyncComponent(() =>
      import("src/lemon/components/formPage/FormBuilderV2.vue")
    ),
  },
  setup() {
    const columns = ref(col);
    const route = useRoute();
    const router = useRouter();
    const modelId = route.params.id;
    const loading = ref(false);
    const tableData = ref([]);
    const table = ref();
    const form = ref();
    const title = ref("");
    const builder = ref();

    const pagination = {
      sortBy: "order",
      descending: false,
      page: 1,
      rowsPerPage: 25,
      // rowsNumber: xx if getting data from a server
    };

    const { formData, formError, formMode } = getFormData();

    const getIndexData = () => {
      getPostData(endpoint + "/get-index-data", {
        loading,
        tableData,
        payload: {
          id: modelId,
        },
        afterGet: (data) => {
          let name = data.model.name;
          title.value = "Virtual Attribute for " + name + " model";
        },
      });
    };

    const getTableData = () => {
      getPostData(endpoint + "/get-table-data", {
        loading,
        tableData,
        payload: {
          id: modelId,
        },
      });
    };

    const openModal = (mode, selected = {}) => {
      open(form, mode, selected, {
        formMode,
        formData,
        formError,
        columns,
      });
    };

    const onSubmit = () => {
      formData.value.virtual_model_id = modelId;
      saveForm(endpoint, {
        formMode,
        formData,
        formError,
        loading,
        onSave({ mode, data }) {
          form.value.closeModal();
          updateTableData(mode, data.data, { tableData });
        },
        onFormError(error) {
          builder.value.setFormError(error);
        },
      });
    };

    const onDelete = () => {
      deleteData(endpoint + "/delete", table.value.getSelectedIds(), {
        tableData,
        loading,
      });
    };

    const onBack = () => {
      router.push({
        name: "virtual-model-id",
        params: {
          id: route.params.id,
        },
      });
    };

    const onFormBuilderMounted = () => {
      let fieldRef = formData.value.field_reference;
      nextTick(() => {
        let item = columns.value.find((e) => e.field == "reference");
        if (formData.value.reference) {
          builder.value.onUpdate(formData.value.reference, item);
          formData.value.field_reference = fieldRef;
        }
      });
    };

    const onPopupSave = (form, popup) => {
      formData.value = form.value;
      formMode.value = "edit";
      // let endpoint = route.fullPath.substring(1);
      saveForm(endpoint, {
        formMode,
        formData,
        formError,
        loading,
        onSave({ mode, data }) {
          updateTableData(mode, data.data, { tableData });
          popup.hide();
        },
        onFormError(error) {
          // builder.value.setFormError(error);
        },
      });
    };

    onMounted(() => {
      getIndexData();
    });

    return {
      table,
      form,
      columns,
      tableData,
      loading,
      formData,
      formError,
      pagination,
      visibleColumns,
      title,
      builder,
      onPopupSave,
      onFormBuilderMounted,
      onDelete,
      onSubmit,
      getTableData,
      openModal,
      onBack,
    };
  },
};
</script>
