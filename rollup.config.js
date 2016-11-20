import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
	entry: 'src/Rionite.js',

	external: ['cellx'],
	globals: { cellx: 'cellx' },

	format: 'umd',
	moduleName: 'Rionite',

	dest: 'dist/Rionite.js',

	plugins: [
		eslint({
			include: '**/*.js',
			exclude: 'node_modules/**'
		}),
		babel({
			include: '**/*.js',
			exclude: 'node_modules/**'
		}),
		typescript({
			typescript: require('typescript'),
			include: '**/*.ts',
			exclude: 'node_modules/**'
		})
	]
};
