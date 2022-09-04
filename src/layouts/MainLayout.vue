<template>
  <q-layout view="hHh lpR fFf" class="my-background2 my-background">
    <!-- <q-layout view="lHh Lpr lFf" class="my-background2 my-background"> -->
    <q-header elevated>
      <q-toolbar class="bg-white text-yellow-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Lemon Store - ERP </q-toolbar-title>

        <q-btn flat round color="yellow-9" icon="person">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="option" label="Use Mobile Data" />
                <q-toggle v-model="option" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px" color="primary">
                  <span style="color: white">{{ name.charAt(0) }}</span>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ name }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  @click="logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-grey-1"
      v-model="leftDrawerOpen"
      :width="230"
      :breakpoint="500"
      show-if-above
      elevated
    >
      <q-list class="q-pa-md">
        <!-- <q-item-label header> Essential Links </q-item-label> -->
        <div class="q-pl-sm text-body1 text-grey-9">Resources</div>
        <EssentialLink
          v-for="link in resourceMenu"
          :key="link.title"
          ext="/app/resource/"
          v-bind="link"
        />
        <span class="q-pl-sm text-body1 text-grey-9">Menu</span>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <EssentialLink
          v-for="link in extendLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

import { menuList } from "src/router/menu";
import { menuExtendList } from "src/router/menu-extended";
import { Loading, QSpinnerFacebook, LoadingBar } from "quasar";
import { api } from "boot/axios";
import { onMounted } from "vue";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const name = ref("");
    const option = ref(false);
    const loading = ref(false);
    const leftDrawerOpen = ref(false);
    const resourceMenu = ref([]);

    const logout = () => {
      window.location.href = "/logout";
    };

    const onLoad = () => {
      LoadingBar.start();
      Loading.show({
        spinner: QSpinnerFacebook,
        message: "Loading Your App...",
      });
      api.get("auth").then(({ data }) => {
        LoadingBar.stop();
        Loading.hide();
        loading.value = false;
        resourceMenu.value = data.resources;
        name.value = data.user.name;
      });
    };

    onMounted(() => {
      onLoad();
    });
    return {
      name,
      loading,
      resourceMenu,
      essentialLinks: menuList,
      extendLinks: menuExtendList,
      leftDrawerOpen,
      option,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
