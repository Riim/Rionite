const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env = {}) => {
	let plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),

		new ESLintPlugin({
			extensions: ['ts', 'js']
			// , fix: true
		}),

		new webpack.optimize.ModuleConcatenationPlugin()
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
					exclude: /node_modules/,
					loader: 'ts-loader'
				}
			]
		},

		resolve: {
			extensions: ['.ts', '.js']
		},

		context: __dirname,

		externals: [
			// '@riim/defer',
			// '@riim/escape-html',
			// '@riim/gettext',
			// '@riim/kebab-case',
			// '@riim/move-content',
			// '@riim/next-tick',
			// '@riim/rionite-snake-case-attribute-name',
			'@riim/next-uid',
			'cellx-collections',
			'cellx',
			// 'escape-string'
		],

		plugins,

		node: {
			global: false,
			__filename: false,
			__dirname: false
		}
	};
};
