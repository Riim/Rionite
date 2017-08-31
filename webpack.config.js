let path = require('path');
let webpack = require('webpack');

module.exports = () => {
	let plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	];

	return {
		entry: {
			rionite: './src/index.ts'
		},

		output: {
			filename: '[name].js',
			path: path.join(__dirname, 'dist'),
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
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},

		externals: [
			'@riim/error-logger',
			'@riim/escape-html',
			'@riim/gettext',
			'@riim/map-set-polyfill',
			'@riim/mixin',
			'@riim/next-tick',
			'@riim/symbol-polyfill',
			'cellx',
			'escape-string',
			'html-to-fragment',
			'nelm'
		],

		plugins,

		node: {
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: false,
			__dirname: false,
			setImmediate: false
		}
	};
};
