<template>
  <div class="q-gutter-sm">
    <q-radio
      v-for="(option, index) in options"
      :key="index"
      :val="option"
      :label="option"
      @update:model-value="$emit('update', $event)"
      v-model="dataValue"
    />
  </div>
</template>

<script>
import { defineComponent, ref, toRef, watch } from "vue";

export default defineComponent({
  methods: {},
  props: ["value", "item", "error", "customOptions"],
  setup(props, { emit }) {
    // console.log(props.value);
    const dataValue = ref(null);
    const getOptions = (options) => {
      if (options) {
        let items = options.split("|");

        for (let x = 0; x < items.length; x++) {
          items[x] = items[x].trim();
        }
        return items;
      }
      return [];
    };

    watch(dataValue, (data, oldData) => {
      // console.log(dataValue);
      /* ... */
    });

    const options = getOptions(props.item.options);

    return {
      options,
      dataValue,
      onUpdate: (e) => {
        emit("update", e);
      },
    };
  },
});
</script>

<style>
</style>