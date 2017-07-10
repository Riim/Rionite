var path = require('path');
var webpack = require('webpack');

module.exports = function() {
	var plugins = [
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

		externals: ['cellx'],

		plugins: plugins,

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
