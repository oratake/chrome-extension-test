import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: "CRX Example",
  version: "1.0.0",
  action: {
    default_popup: "index.html",
  },
  commands: {
    openNewWindow: {
      suggested_key: {
        default: "Ctrl+Alt+H",
        mac: "Command+Option+H",
      },
      description: "Run extension with new window",
      global: true,
    }
  },
  permissions: [
    "storage",
    "tabs",
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
})
