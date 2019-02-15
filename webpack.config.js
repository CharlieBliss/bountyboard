const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] },
			},
			{
				test: /(\.scss|\.css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: false,
							importLoaders: 2,
							localIdentName: '[name]__[local]',
						},
					},
				],
				exclude: [
					path.resolve(
						__dirname,
						'node_modules/react-material-layout/dist/react-material-class-layout.min.css',
					),
				],
			},
			{
				test: /(\.css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
				],
				include: [
					path.resolve(
						__dirname,
						'node_modules/react-material-layout/dist/react-material-class-layout.min.css',
					),
					path.resolve(
						__dirname,
						'node_modules/react-dropdown/style.css',
					),

				],
			},
		],
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'static/'),
		port: 3000,
		publicPath: 'http://localhost:3000/dist/',
		hotOnly: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
}
