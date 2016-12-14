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
			library: 'rionite',
			libraryTarget: 'umd',
			path: path.join(__dirname, 'dist'),
			filename: '[name].js'
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
