<template>
  <div class="row q-col-gutter-sm">
    <span :class="item.size" v-for="(item, index) in columns" :key="index">
      <dynamic-input
        v-model="formData[item.field]"
        :formData="formData"
        :item="item"
        :columns="columns"
        @onUpdate="onUpdate"
        :error="formError[item.field]"
        :hasCustomOption="item.hasCustomOption"
        :customOptions="customOptions ? customOptions : options"
      ></dynamic-input>
    </span>
  </div>
</template>

<script>
import { getCustomSelectData } from "src/lemon/actions/components/SelectSSR";
import { onMounted, ref, toRef } from "vue";
import DynamicInput from "./DynamicInput.vue";

export default {
  methods: {},
  components: {
    DynamicInput,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      default: new Object(),
    },
    formMode: {
      type: String,
      default: "",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    customOptions: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    // const formData = ref(props.data);
    const formData = toRef(props, "data");
    const formError = ref({});
    const options = ref({});

    const setFormError = (error) => {
      formError.value = error;
    };

    const getFormData = () => {
      return formData;
    };

    const needAttribute = (item, columns, formData) => {
      if (item.needAttribute) {
        let find = columns.find((e) => e.field == item.needAttribute);

        if (find) {
          return formData[find.field];
        }
      }
    };

    const onUpdate = (data, item) => {
      if (item.updateOn) {
        formData.value[item.updateOn] = null;

        let f = props.columns.find((e) => e.field == item.updateOn);

        getCustomSelectData(f.endpoint, data, f.field, options);
      }
    };

    onMounted(() => {
      emit("onMounted");
    });

    return {
      onUpdate,
      setFormError,
      getFormData,
      needAttribute,
      formData,
      formError,
      options,
    };
  },
};
</script>

<style>
</style>