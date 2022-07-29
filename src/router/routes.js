const routes = [
  {
    path: "/login",
    component: () => import("layouts/loginLayout.vue")
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "sample", component: () => import("pages/sample/Index.vue") },
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
