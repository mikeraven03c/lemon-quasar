<template>
  <span :class="item.required || item.formRequired ? 'text-red' : ''">
    {{
      item.required || item.formRequired
        ? "required"
        : item.optional
        ? "optional"
        : ""
    }}
  </span>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
</style>