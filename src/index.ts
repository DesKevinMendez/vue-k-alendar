import KAlendar from "./components/KAlendar.vue";

export { KAlendar };

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    'KAlendar': typeof KAlendar,
  }
}