import { ref } from "vue";
export function getFormData() {
  return {
    formData: ref({
      'test': 'test'
    }),
    formError: ref({}),
    formMode: ref('add')
  }
}