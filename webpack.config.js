var path = require('path');
var webpack = require('webpack');

module.exports = function(env) {
	if (!env) {
		env = {};
	}

	var plugins = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	];

	return {
		entry: {
			rionite: [path.join(__dirname, 'dist/index.js')]
		},

		output: {
			filename: '[name].js',
			path: path.join(__dirname, 'dist'),
			library: 'rionite',
			libraryTarget: 'umd'
		},

		externals: ['cellx'],

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
