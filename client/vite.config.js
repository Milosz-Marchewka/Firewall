import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
    server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target:"http://192.168.8.40:5000",
        changeOrigin: true,
        secure: false,
        configure: (proxy)=>{
          proxy.on("proxyReq", (proxyReq, req)=>{
            console.log("PROXY REQ: " , req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req)=>{
            console.log("PROXY RES: " , req.method, req.url, proxyRes.statusCode);
          })
        }
      },
    },
  },
});
