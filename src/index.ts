import { defineCustomElement } from 'vue'
import KAlendarComponent from "./components/KAlendar.vue";

export const KAlendar = defineCustomElement(KAlendarComponent)

export function register() {
  customElements.define('k-alendar', KAlendar)
}

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    'KAlendar': typeof KAlendar,
  }
}