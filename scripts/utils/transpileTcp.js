const esbuild = require('esbuild')
const paths = require('../../config/paths')

async function tcp(build = false) {
  console.log('Transpiling tcp.js')
  await esbuild.build({
    entryPoints: ['./src/utils/tcp.js'],
    bundle: true,
    outdir: build ? paths.appPublic : paths.appBuild,
    format: 'cjs',
    platform: 'node'
  })
}

module.exports = tcp 