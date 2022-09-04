<template>
  <q-select
    transition-show="jump-up"
    transition-hide="jump-up"
    outlined
    input-debounce="300"
    :label="item.label"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
    v-model="dataValue"
    emit-value
    map-options
    hide-selected
    fill-input
    use-input
    behavior="menu"
    :options="options"
    :error-message="error"
    :error="error ? true : false"
  >
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
import { defineComponent, nextTick, ref, watch } from "vue";
import { getSelectData } from "src/lemon/actions/components/SelectSSR";

export default defineComponent({
  methods: {},
  props: ["value", "item", "error", "endpoint", "select", "columns"],
  setup(props, { emit }) {
    const options = ref([]);
    const dataValue = ref(props.value);

    if (props.item.updateOn) {
      watch(dataValue, (data, oldData) => {
        emit("onUpdate", data, props.item);
        /* ... */
      });
    }

    getSelectData(props.endpoint, props.select, {
      options,
    });

    return {
      options,
      dataValue,
      abortFilterFn() {},
      filterFn(val, update, abort) {
        if (options.value.length > 0) {
          update();
          return;
        }

        update(() => {
          getSelectData(props.endpoint, props.select, {
            options,
          });
        });
      },
    };
  },
});
</script>

<style>
</style>