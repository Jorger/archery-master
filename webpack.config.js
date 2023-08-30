const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Agregado

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production'; // Verifica el modo de ejecución

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin() // Agregado
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: isProduction ? '[id].css' : '[id].[fullhash].css', // Agregado
        ignoreOrder: false // Agregado
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
        watch: true
      },
      port: 3088
    }
  };
};
