const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {
	let plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	];

	return {
		mode: 'none',

		entry: {
			rionite: './src/index.ts'
		},

		output: {
			path: path.join(__dirname, 'dist'),
			filename: '[name].js',
			library: '[name]',
			libraryTarget: 'umd'
		},

		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /(?:node_modules|bower_components)/,
					enforce: 'pre',
					loader: 'tslint-loader'
				},
				{
					test: /\.ts$/,
					exclude: /(?:node_modules|bower_components)/,
					loader: 'awesome-typescript-loader'
				}
			]
		},

		resolve: {
			extensions: ['.ts', '.js']
		},

		context: __dirname,

		externals: [
			'@riim/defer',
			'@riim/escape-html',
			'@riim/get-uid',
			'@riim/gettext',
			'@riim/is-regexp',
			'@riim/kebab-case',
			'@riim/lower-case-first-word',
			'@riim/map-set-polyfill',
			'@riim/move-content',
			'@riim/next-tick',
			'@riim/next-uid',
			'@riim/rionite-snake-case-attribute-name',
			'@riim/set-attribute',
			'@riim/symbol-polyfill',
			'cellx',
			'escape-string'
		],

		plugins,

		node: {
			console: false,
			global: false,
			process: false,
			__filename: false,
			__dirname: false,
			Buffer: false,
			setImmediate: false
		}
	};
};
