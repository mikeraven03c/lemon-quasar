const routes = [
  {
    path: "/",
    component: () => import("layouts/OnBoardingLayout.vue")
  },
  {
    path: "/login",
    component: () => import("layouts/loginLayout.vue")
  },
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "resource/:model", component: () => import("src/packages/virtualresource/VirtualResourceIndex.vue") },
      {
        name: 'virtual-attribute', path: "virtual-model/:id/virtual-attribute/", component: () => import("src/packages/virtualattribute/VirtualAttributeIndex.vue")
      },
      { name: 'virtual-model', path: "virtual-model", component: () => import("src/packages/virtualmodel/VirtualModelIndex.vue") },
      { name: 'virtual-model-id', path: "virtual-model/:id", component: () => import("src/packages/virtualmodel/VirtualModelIndex.vue") },
      { path: "virtualgroup", component: () => import("src/packages/virtualgroup/VirtualGroupIndex.vue") },
      { path: "dashboard", component: () => import("pages/dashboard/dashboard.vue") },
      // { path: "sample", component: () => import("pages/sample/Index.vue") },
      { path: "user", component: () => import("pages/user/IndexPage.vue") },
    ],
    // path: "/login",
    // component: () => import("layouts/loginLayout.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
