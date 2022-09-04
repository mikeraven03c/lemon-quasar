<template>
  <q-page>
    <div class="q-pa-md">
      <LTable
        ref="table"
        :title="title"
        :columns="columns"
        :table-data="tableData"
        :visible-columns="[]"
        :loading="loading"
        :dense="false"
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
          >
            <template v-slot:beforeItems>
              <q-item
                :to="{
                  name: 'virtual-attribute',
                  params: { id: table.selected[0].id },
                }"
                clickable
                v-close-popup
              >
                <q-item-section>Attributes</q-item-section>
              </q-item>
            </template>
          </l-table-menu>
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
      @onCloseModal="onCloseModal"
      @onSubmit="onSubmit"
      :loading="loading"
      ref="form"
    >
      <template v-slot:form>
        <form-builder
          :data="formData"
          ref="builder"
          :columns="columns"
        ></form-builder>
      </template>
    </LForm>
  </q-page>
</template>

<script>
import { title, endpoint, columns, visibleColumns } from "./js/config";
import { openModal as open } from "src/lemon/actions/formPage/OpenModal.js";
import { getFormData } from "src/lemon/actions/formPage/GetFormData.js";
import { saveForm } from "src/lemon/actions/formPage/SaveForm.js";
import { getData } from "src/lemon/actions/indexPage/GetData";
import { deleteData } from "src/lemon/actions/indexPage/DeleteData";
import { updateTableData } from "src/lemon/actions/indexPage/UpdateTableData";
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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
      import("src/lemon/components/formPage/FormBuilder.vue")
    ),
  },
  setup() {
    const loading = ref(false);
    const tableData = ref([]);
    const router = useRouter();
    const table = ref();
    const form = ref();
    const builder = ref();
    const route = useRoute();

    const { formData, formError, formMode } = getFormData();

    const openModal = (mode, selected = {}) => {
      open(form, mode, selected, {
        formMode,
        formData,
        formError,
      });
    };

    const getTableData = () => {
      getData(endpoint, {
        loading,
        tableData,
        afterGet() {
          if (route.params.id) {
            let data = tableData.value.find((e) => e.id == route.params.id);
            openModal("edit", data);
          }
        },
      });
    };

    const onSubmit = () => {
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

    const onCloseModal = () => {
      if (route.params.id) {
        router.push({ name: "virtual-model" });
      }
    };

    onMounted(() => {
      getTableData();
    });

    return {
      visibleColumns,
      title,
      builder,
      formData,
      formError,
      table,
      form,
      columns,
      tableData,
      loading,
      onDelete,
      onSubmit,
      getTableData,
      openModal,
      onCloseModal,
    };
  },
};
</script>
