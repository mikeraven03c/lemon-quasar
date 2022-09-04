<template>
  <!-- <q-item clickable :href="`app/` + link"> -->
  <q-item v-ripple clickable :to="{ path: ext + link }">
    <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->

    <q-item-section>
      <q-item-label class="text-body2">{{ title }}</q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    ext: {
      type: String,
      default: "/app/",
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
