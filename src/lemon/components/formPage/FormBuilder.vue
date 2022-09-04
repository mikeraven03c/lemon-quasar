<template>
  <div class="row q-col-gutter-sm">
    <span :class="item.size" v-for="(item, index) in columns" :key="index">
      <q-input
        v-if="
          including.includes(item.type) &&
          item.showOnForm &&
          (item.needAttribute ? needAttribute(item, columns, formData) : true)
        "
        outlined
        :label="item.label"
        v-model="formData[item.field]"
        outline
        :type="getType(item.type)"
        :dense="dense"
        :readonly="formMode == 'show'"
        :error-message="formError[item.field]"
        :error="formError[item.field] ? true : false"
        :prefix="item.type == 'currency' ? '₱' : ''"
        :clearable="item.clearable"
        :mask="item.mask"
        :fill-mask="item.fill_mask"
        :lazy-rules="item.formRequired"
        :rules="item.formRequired ? [(val) => !!val || '* Required'] : []"
        :reverse-fill-mask="item.reverse_fill_mask"
        :input-class="item.align == 'right' ? 'text-right' : ''"
      >
        <template v-slot:hint> <hint-vue :item="item" /></template>
      </q-input>
      <q-checkbox
        v-else-if="item.type == 'boolean' && item.showOnForm"
        v-model="formData[item.field]"
        :label="item.label"
        :dense="true"
        :hint="
          item.required || item.formRequired
            ? 'required'
            : item.optional
            ? 'optional'
            : ''
        "
        :mask="item.mask"
      />
      <q-input
        v-else-if="item.type == 'datetime' && item.showOnForm"
        filled
        :dense="dense"
        v-model="formData[item.field]"
        :error-message="formError[item.field]"
        :error="formError[item.field] ? true : false"
      >
        <template v-slot:hint> <hint-vue :item="item" /></template>
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="formData[item.field]" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="formData[item.field]" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <select-vue
        v-else-if="item.type == 'select'"
        :item="item"
        v-model="formData[item.field]"
        :formError="formError"
      />
    </span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import HintVue from "./Hint.vue";
import SelectVue from "./types/select.vue";
const including = [
  "string",
  "integer",
  "number",
  "password",
  "textarea",
  "time",
  "date",
  "currency",
];
const getType = (type) => {
  switch (type) {
    case "integer":
    case "number":
      return "number";
    case "password":
      return "password";
    case "currency":
      return "currency";
    case "textarea":
      return "textarea";
    case "date":
      return "date";
    case "time":
      return "time";
    default:
      return "text";
  }
};

export default {
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
  },
  components: {
    HintVue,
    SelectVue,
  },
  setup(props) {
    const formData = ref(props.data);
    const formError = ref({});

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

    return {
      getType,
      including,
      setFormError,
      getFormData,
      needAttribute,
      formData,
      formError,
    };
  },
};
</script>

<style>
</style>