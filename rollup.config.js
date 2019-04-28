import typescript from 'rollup-plugin-typescript'

const baseConfig =  {
  input: './src/index.ts',
  plugins: [
    typescript(),
  ]
}

let config
if(process.env.NODE_ENV) {
  const envConfig = require(`./build/rollup.${process.env.NODE_ENV}.config`)
  config = Object.assign({}, baseConfig, envConfig)

  // merge plugins
  config.plugins = [].concat(baseConfig.plugins, envConfig.plugins || [])

  console.log(config)
}

export default config
