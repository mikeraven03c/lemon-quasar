<template>
  <q-select
    transition-show="jump-up"
    transition-hide="jump-up"
    outlined
    use-input
    emit-value
    map-options
    input-debounce="300"
    :label="item.label"
    @filter="filterFn"
    behavior="menu"
    v-model="dataValue"
    hide-selected
    fill-input
    :options="
      item.type == 'reference'
        ? customOptions[item.reference]
        : item.hasCustomOption
        ? customOptions[item.field]
        : options
    "
    :error-message="error"
    :error="error ? true : false"
  >
    <!--
    :value="dataValue"
    @update="input($event)"
    stack-label -->
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  methods: {},
  props: ["value", "item", "error", "customOptions"],
  setup(props, { emit }) {
    const dataValue = ref("");
    const getOptions = (options) => {
      // customOptions ? customOptions[item.field] : options
      if (options) {
        let items = options.split("|");

        for (let x = 0; x < items.length; x++) {
          items[x] = items[x].trim();
        }
        return items;
      }
      return [];
    };

    const input = (event) => {
      emit("input", event);
    };

    const stringOptions = getOptions(props.item.options);
    const options = ref(stringOptions);

    return {
      options,
      input,
      dataValue,
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = stringOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
});
</script>

<style>
</style>