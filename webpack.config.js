const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				use: "eslint-loader",
				resolve: {
					extensions: ['.js', '.jsx']
				}
			},
			{
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],
					presets: ['@babel/preset-env', '@babel/preset-react']
				},
				resolve: {
					extensions: ['.js', '.jsx']
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},
	devServer: {
		open: true
	}
};
