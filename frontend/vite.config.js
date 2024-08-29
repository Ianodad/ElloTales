import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  define: {
    'process.env.VITE_BACKEND_URL': JSON.stringify(
      process.env.VITE_BACKEND_URL
    ),
  },
  // base: '/',
  // resolve: {
  //   alias: {
  //     '@components': path.resolve(__dirname, './src/components'),
  //   },
  //   extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  // },
});
