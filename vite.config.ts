import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from "path";
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueKAlendar",
      // the name of the output files when the build is run
      fileName: "vue-k-alendar",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  }
})
