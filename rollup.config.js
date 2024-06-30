import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
export default {
    input: ['src/script.ts', 'src/comics.ts', 'src/index.ts'],
    output: { dir: 'dist', format: 'esm' },
  plugins: [typescript(), resolve()]
};