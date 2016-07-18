var webpack = require('webpack');

module.exports = {
	output: {
		library: 'Rionite',
		libraryTarget: 'umd'
	},

	externals: ['cellx'],

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint'
			}
		],

		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: [
						'syntax-flow',
						'transform-flow-strip-types'
					]
				}
			}
		]
	},

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
