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
        :loading="loading"
        :dense="false"
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
    <LForm
      :title="title"
      @onOpen="onOpen"
      @onSubmit="onSubmit"
      :loading="loading"
      ref="form"
    >
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
import { endpoint, columns, visibleColumns } from "./js/config";
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

    const onOpen = (selected) => {
      formData.value = selected;
    };

    const onFormBuilderMounted = () => {
      let fieldRef = formData.value.field_reference;
      nextTick(() => {
        let item = columns.find((e) => e.field == "reference");
        builder.value.onUpdate(formData.value.reference, item);
        formData.value.field_reference = fieldRef;
      });
    };

    onMounted(() => {
      getIndexData();
    });

    return {
      onFormBuilderMounted,
      onOpen,
      pagination,
      visibleColumns,
      title,
      builder,
      onDelete,
      formData,
      formError,
      onSubmit,
      getTableData,
      table,
      form,
      columns,
      openModal,
      tableData,
      loading,
      onBack,
    };
  },
};
</script>
