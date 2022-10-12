<template>
  <q-input
    v-if="
      including.includes(item.type) &&
      item.showOnForm &&
      (item.needAttribute ? needAttribute(item, columns, value) : true)
    "
    outlined
    :label="item.label"
    :value="value"
    @input="$emit('input', $event)"
    outline
    :type="getType(item.type)"
    :dense="dense"
    :readonly="formMode == 'show'"
    :error-message="error"
    :error="error ? true : false"
    :prefix="item.type == 'currency' ? '₱' : ''"
    :clearable="item.clearable"
    :mask="item.mask"
    :fill-mask="item.fill_mask"
    :lazy-rules="item.formRequired"
    :rules="item.formRequired ? [(val) => !!val || '* Required'] : []"
    :reverse-fill-mask="item.reverse_fill_mask"
    :input-class="item.align == 'right' ? 'text-right' : ''"
  >
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
    <template v-slot:hint> <hint-vue :item="item" /></template>
  </q-input>
  <q-checkbox
    v-else-if="item.type == 'boolean' && item.showOnForm"
    :value="value"
    @input="$emit('input', $event)"
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
  >
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </q-checkbox>
  <q-input
    v-else-if="item.type == 'datetime' && item.showOnForm"
    filled
    :dense="dense"
    :value="value"
    @input="$emit('input', $event)"
    :error-message="error"
    :error="error ? true : false"
  >
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
    <template v-slot:hint> <hint-vue :item="item" /></template>
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :value="value"
            @input="$emit('input', $event)"
            mask="YYYY-MM-DD HH:mm"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            :value="value"
            @input="$emit('input', $event)"
            mask="YYYY-MM-DD HH:mm"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  <select-vue
    v-else-if="
      (item.type == 'select' || item.type == 'reference') &&
      (item.renderIf ? renderIf(item, columns, formData) : true)
    "
    :item="item"
    :customOptions="customOptions"
    :value="value"
    @update="$emit('input', $event)"
    :error="error"
  >
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </select-vue>
  <reference-vue
    :key="item.field"
    v-else-if="
      item.type == 'referenceSSR' &&
      (item.renderIf ? renderIf(item, columns, formData) : false)
    "
    :item="item"
    :value="value"
    :columns="columns"
    @update="$emit('input', $event)"
    :endpoint="item.endpoint"
    :select="item.select"
    :error="error"
  >
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </reference-vue>
  <radio-vue
    v-else-if="item.type == 'radio'"
    :item="item"
    :columns="columns"
    :value="value"
    @update="$emit('input', $event)"
  ></radio-vue>
</template>

<script>
import { ref, watch, toRef } from "vue";
import HintVue from "./Hint.vue";
import SelectVue from "./types/select.vue";
import ReferenceVue from "./types/referenceSSR.vue";
import RadioVue from "./types/radio.vue";
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
// props: ["value", "item", "formError"],
export default {
  components: {
    HintVue,
    SelectVue,
    ReferenceVue,
    RadioVue,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    value: [String, Number, null, Boolean, Array],
    formMode: {
      type: String,
      default: "",
    },
    error: {
      type: [String, null],
      default: null,
    },
    formData: {
      type: Object,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    hasCustomOption: {
      type: Boolean,
      default: false,
    },
    customOptions: {
      type: Object,
    },
  },
  setup(props) {
    // const formData = ref(props.data);
    const formError = ref({});

    const uriKey = ref(props.item.field);

    const setFormError = (error) => {
      formError.value = error;
    };

    const needAttribute = (item, columns, formData) => {
      if (item.needAttribute) {
        let find = columns.find((e) => e.field == item.needAttribute);

        if (find) {
          return true;
        }
        return false;
      }
    };

    const renderIf = (item, columns, formData) => {
      let data = formData[item.renderIfField];
      return data == item.renderIfValue;
    };

    return {
      uriKey,
      formError,
      including,
      setFormError,
      getType,
      needAttribute,
      renderIf,
      testUpdate: (test) => {
        console.log(test);
      },
      // formData,
    };
  },
};
</script>

<style>
</style>