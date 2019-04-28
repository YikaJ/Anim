const { terser } = require('rollup-plugin-terser')

module.exports = {
  output: {
    file: 'dist/anim.js',
    format: 'umd',
    name: 'anim',
  },
  plugins: [
    terser({
      compress: {
        drop_console: true
      }
    }),
  ]
}
