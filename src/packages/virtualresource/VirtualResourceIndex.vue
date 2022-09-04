<template>
  <q-page>
    <div class="q-pa-md">
      <LTable
        editable
        :dense="false"
        :key="componentKey"
        ref="table"
        :title="title"
        customize-table
        :columns="columns"
        :table-data="tableData"
        :loading="loading"
        @onPopupSave="onPopupSave"
      >
        <template v-slot:header>
          <l-header-action
            hide-export
            @onAdd="openModal('add')"
            @onGet="getTableData"
            @onDelete="onDelete"
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
      @onOpen="
        (selected) => {
          formData = selected;
        }
      "
      @onSubmit="onSubmit"
      :loading="loading"
      ref="form"
    >
      <template v-slot:form>
        <form-builder-v2
          :customOptions="customOptions"
          :data="formData"
          ref="builder"
          :columns="columns"
        ></form-builder-v2>
      </template>
    </LForm>
  </q-page>
</template>

<script>
import { useRoute } from "vue-router";
import { openModal as open } from "src/lemon/actions/formPage/OpenModal.js";
import { getFormData } from "src/lemon/actions/formPage/GetFormData.js";
import { saveForm } from "src/lemon/actions/formPage/SaveForm.js";
import { getData } from "src/lemon/actions/indexPage/GetData";
import { deleteData } from "src/lemon/actions/indexPage/DeleteData";
import { updateTableData } from "src/lemon/actions/indexPage/UpdateTableData";
import {
  computed,
  defineAsyncComponent,
  onMounted,
  ref,
  watch,
  reactive,
} from "vue";
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
    // FormBuilder: defineAsyncComponent(() =>
    //   import("src/lemon/components/formPage/FormBuilder.vue")
    // ),
    FormBuilderV2: defineAsyncComponent(() =>
      import("src/lemon/components/formPage/FormBuilderV2.vue")
    ),
  },
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const resourceName = "Resource: ";
    const title = ref(resourceName);
    const tableData = ref([]);
    const table = ref();
    const columns = ref([]);
    const form = ref();
    const builder = ref();
    const componentKey = ref("");
    const customOptions = ref({});

    const { formData, formError, formMode } = getFormData();

    const getIndexData = () => {
      let endpoint = route.fullPath.substring(1) + "/index";
      getData(endpoint, {
        loading,
        tableData,
        afterGet(data) {
          title.value = resourceName + data.model.name;
          componentKey.value = data.model.name;
          columns.value = data.columns;
          customOptions.value = data.references;

          for (let x = 0; x < data.columns.length; x++) {
            formData.value[data.columns.field] = "";
          }
        },
      });
    };

    const getTableData = () => {
      let endpoint = route.fullPath.substring(1) + "/data";
      getData(endpoint, {
        loading,
        tableData,
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
      let endpoint = route.fullPath.substring(1);
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
      let endpoint = route.fullPath.substring(1);
      deleteData(endpoint + "/delete", table.value.getSelectedIds(), {
        tableData,
        loading,
      });
    };

    const onPopupSave = (form, popup) => {
      formData.value = form.value;
      formMode.value = "edit";
      let endpoint = route.fullPath.substring(1);
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

    watch(
      () => route.params.model,
      async (newModel) => {
        if (newModel) {
          getIndexData();
        }
      }
    );

    return {
      customOptions,
      onPopupSave,
      componentKey,
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
    };
  },
};
</script>
