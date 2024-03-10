import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  dts: true,
  shims: true,
  clean: true
})
