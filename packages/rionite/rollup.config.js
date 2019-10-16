import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: './src/index.ts',

	output: {
		file: './dist/rionite.js',
		format: 'umd',
		name: 'rionite',

		globals: {
			'@riim/uid': '@riim/uid',
			cellx: 'cellx'
		}
	},

	external: [
		// '@riim/defer',
		// '@riim/escape-html',
		// '@riim/gettext',
		// '@riim/kebab-case',
		// '@riim/move-content',
		// '@riim/next-tick',
		// '@riim/rionite-snake-case-attribute-name',
		'@riim/uid',
		'cellx'
		// 'escape-string'
	],

	plugins: [
		nodeResolve(/* { browser: true } */),
		commonjs({ include: /node_modules/ }),
		tslint(),
		typescript({ clean: true })
	]
};
