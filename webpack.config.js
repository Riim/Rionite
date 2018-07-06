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
			filename: env.es6 ? '[name].es6.js' : '[name].js',
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
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: env.es6 ? 'tsconfig.es6.json' : 'tsconfig.json'
					}
				}
			]
		},

		resolve: {
			extensions: ['.ts', '.js']
		},

		context: __dirname,

		externals: [
			'@riim/clear-node',
			'@riim/defer',
			'@riim/escape-html',
			'@riim/get-uid',
			'@riim/gettext',
			'@riim/is-regexp',
			'@riim/kebab-case',
			'@riim/logger',
			'@riim/lower-case-first-word',
			'@riim/map-set-polyfill',
			'@riim/mixin',
			'@riim/move-content',
			'@riim/next-tick',
			'@riim/next-uid',
			'@riim/rionite-snake-case-attribute-name',
			'@riim/set-attribute',
			'@riim/symbol-polyfill',
			'cellx',
			'escape-string',
			'html-to-fragment',
			'nelm-parser'
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
