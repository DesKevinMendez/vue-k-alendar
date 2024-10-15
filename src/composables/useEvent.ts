import type { KEvent } from "@/types";
import { ref } from "vue";

const eventSelected = ref<KEvent>({
  id: '',
  title: '',
  start_date: '',
  description: ''
})



export default function useEvent() {

  return {
    eventSelected
  }
}