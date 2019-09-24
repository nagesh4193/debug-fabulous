import typescript from 'rollup-plugin-typescript';

// @ts-ignore
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourceMap: true,
    },
    {
      file: pkg.umd,
      format: 'umd',
      sourceMap: true,
      name: 'DebugFabulous',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourceMap: true,
    },
  ],
  plugins: [typescript()],
};
