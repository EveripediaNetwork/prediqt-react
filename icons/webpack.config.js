const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'CardWrapper.tsx.ts.js',
    library: '@commun/icons',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-export-default-from'],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin('dist', {})],
};
