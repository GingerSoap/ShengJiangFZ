import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 移除 type="module" 和 crossorigin 以支持 file:// 协议打开
function fixFileProtocol() {
  return {
    name: 'fix-file-protocol',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(/ type="module"/g, ' defer')
        .replace(/ crossorigin/g, '')
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), fixFileProtocol()],
})
