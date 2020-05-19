/**
 * @author Luis Angel Garcia (lag1996)
 * 
 * @description
 * Configuration for rollup on dev mode,
 */

import resolve from '@rollup/plugin-node-resolve';

const pluginResolver = resolve({ browser: true });

export default [{
    output: {
        dir: 'build/',
        format: 'es',
        chunkFileNames: '[name].js'
    },
    manualChunks: (id) => {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    },
    input: 'index.js',
    plugins: [pluginResolver]
}];
