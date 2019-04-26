import typescript from 'rollup-plugin-typescript'

const baseConfig =  {
  input: './src/index.ts',
  plugins: [
    typescript({
      target: "es6"
    }),
  ]
}

let config
if(process.env.NODE_ENV) {
  const devConfig = require(`./build/rollup.${process.env.NODE_ENV}.config`)
  config = Object.assign({}, baseConfig, devConfig)
}

export default config
