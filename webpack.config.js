var path = require('path');
var webpack = require('webpack');

module.exports = function(env) {
	if (!env) {
		env = {};
	}

	var plugins = [
		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,

				babel: {
					presets: ['@riim/babel-preset-2015'],
					plugins: ['transform-flow-comments']
				}
			}
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	];

	return {
		entry: {
			Rionite: [path.join(__dirname, 'src/Rionite.ts')]
		},

		output: {
			library: 'rionite',
			libraryTarget: 'umd',
			path: path.join(__dirname, 'dist'),
			filename: '[name].js'
		},

		externals: ['cellx'],

		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /(?:node_modules|bower_components)/,
					enforce: 'pre',
					loader: 'eslint-loader'
				},
				{
					test: /\.js$/,
					exclude: /(?:node_modules|bower_components)/,
					loader: 'babel-loader'
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

		watch: env.dev,

		node: {
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: false,
			__dirname: false,
			setImmediate: false
		},

		plugins: plugins
	};
};
