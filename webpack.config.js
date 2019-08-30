const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './docs'),
  assets: 'assets/',
};

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: 'script.js',
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.ts', '.less', '.pug', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              filters: {
                escape: code => {
                  return code.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                },
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
    new CopyWebpackPlugin([{ from: PATHS.src + '/assets', to: PATHS.dist + '/assets' }]),
  ],
};
