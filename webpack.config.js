require('dotenv').config();
const { resolve } = require('path');

const BUILD_MODE = process.env.BUILD_MODE;

module.exports = {
  context: __dirname,
  entry: resolve(__dirname, 'src', 'main.ts'),
  devtool: 'inline-source-map',
  mode: BUILD_MODE ?? 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'app', 'assets', 'bundle'),
  },
};
