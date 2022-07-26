import { toRefs, ref, reactive } from "vue";

export function useFetch(endPoint, options) {
  const data = ref(null);
  const state = reactive({
    error: null,
    loading: false,
  });

  const api = "http://michael-erp.test/api/";

  const fetchData = async () => {
    state.loading = true;
    try {
      const res = await fetch(api + endPoint, options);
      data.value = await res.json();
    } catch (e) {
      state.error = e;
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  fetchData();

  return { data, ...toRefs(state) };
}
