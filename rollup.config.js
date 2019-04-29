import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const baseConfig =  {
  input: './src/index.ts',
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs({
      include: /node_modules/
    })
  ]
}

let config
if(process.env.NODE_ENV) {
  const envConfig = require(`./build/rollup.${process.env.NODE_ENV}.config`)
  config = Object.assign({}, baseConfig, envConfig)

  // merge plugins
  config.plugins = [].concat(baseConfig.plugins, envConfig.plugins || [])
}

export default config
