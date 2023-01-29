import { resolve } from 'path';
import { defineConfig } from 'vite';
import { name } from './package.json';

const getPackageName = () => {
  return (name.includes('@') ? name.split('/')[1] : name).replace('.', '-');
};

const NAME = 'BSN';

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
};

export default defineConfig({
  /* add the below to host the app, the run "npx vite" */
  // root: resolve(__dirname, 'docs'),
  // server: {
  //   port: 8080,
  //   host: true,
  //   // hot: true
  // },
  base: './',
  build: {
    emptyOutDir: true,
    lib: {
      // banner: 'BSN',
      entry: resolve(__dirname, 'src/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format: string) => fileName[format],
    },
    target: 'ESNext',
    sourcemap: true,
    minify: true,
  },
});
