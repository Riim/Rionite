import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: './src/index.ts',

	output: {
		file: './dist/rionite.js',
		format: 'umd',
		name: 'rionite',

		globals: {
			'@riim/next-uid': '@riim/next-uid',
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
		'@riim/next-uid',
		'cellx-collections',
		'cellx'
		// 'escape-string'
	],

	plugins: [
		nodeResolve({ browser: true }),
		commonjs({ include: /node_modules/ }),
		typescript({ clean: true })
	]
};
