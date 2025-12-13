import { readonly, ref } from 'vue'
import type { View } from '@/types/Calendar'

const currentView = ref<View>('calendar')

export default function() {
  const setCurrentView = (view: View) => {
    currentView.value = view
  }
  
  return {
    currentView: readonly(currentView),
    setCurrentView,
  }
}