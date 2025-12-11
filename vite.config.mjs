import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import netlify from '@netlify/vite-plugin';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    netlify(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
