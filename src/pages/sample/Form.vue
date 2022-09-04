<template>
  <LForm title="Sample" :loading="loading" :ref="form">
    <template v-slot:form></template>
  </LForm>
</template>

<script>
import LForm from "src/lemon/components/formPage/FormComponent.vue";
import { defineComponent } from "vue";

export default {
  name: "IndexPage",
  components: {
    LForm,
  },
  setup() {
    const form = ref();
    const loading = ref(false);
    return {
      loading,
      form,
    };
  },
};
</script>
