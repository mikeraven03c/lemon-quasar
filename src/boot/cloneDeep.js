import { boot } from "quasar/wrappers";

const cloneDeep = require("clone-deep");

export default boot(({ app }) => {
  app.config.globalProperties.$cloneDeep = cloneDeep;
});

export { cloneDeep };
