import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/Rionite.js',

	external: ['cellx'],
	globals: { cellx: 'cellx' },

	format: 'umd',
	moduleName: 'Rionite',

	dest: 'dist/Rionite.js',

	plugins: [
		eslint(),
		babel({
			exclude: 'node_modules/**'
		})
	]
};
