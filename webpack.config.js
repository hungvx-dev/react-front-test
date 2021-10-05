/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const cacheGroups = {
  styles: {
    name: 'style',
    test: /\.scss$/,
    chunks: 'all',
    enforce: true,
  },
}
const cssRegex = /\.(s[ac]ss|css)$/
const jsRegex = /\.([jt]sx|[jt]s)$/
const imageRegex = /\.(png|svg|jpe?g|gif)$/i

const configWebpack = (env, { mode = 'development' }) => {
  const isDev = mode === 'development'
  const config = {
    mode,
    entry: { app: path.resolve(__dirname, 'src/presentations/index.tsx') },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[fullhash:6].min.js',
    },
    target: isDev ? 'web' : 'browserslist',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '~': path.resolve(__dirname, 'shared/src/'),
        '@': path.resolve(__dirname, 'src'),
        Utils: path.resolve(__dirname, 'src/_utils'),
        Constant: path.resolve(__dirname, 'src/_constants'),
        Hooks: path.resolve(__dirname, 'src/presentations/hooks'),
        Layouts: path.resolve(__dirname, 'src/presentations/layouts'),
        Modules: path.resolve(__dirname, 'src/presentations/modules'),
        Components: path.resolve(__dirname, 'src/presentations/components'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        maxAsyncRequests: 7,
        cacheGroups,
      },
      runtimeChunk: 'single',
      removeEmptyChunks: true,
      minimize: !isDev,
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      nodeEnv: mode,
    },
    module: {
      rules: [
        {
          test: jsRegex,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: () => ({
                  before: isDev ? [ReactRefreshTypeScript()] : [],
                }),
                transpileOnly: isDev,
              },
            },
          ],
        },
        {
          test: cssRegex,
          sideEffects: true,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // Parse the css into js
              options: { sourceMap: isDev },
            },
            {
              loader: 'sass-loader', // Convert Scss/sass to css
              options: {
                sourceMap: isDev,
                implementation: require('sass'),
                webpackImporter: false,
                sassOptions: {
                  includePaths: ['./node_modules'],
                },
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: imageRegex,
          include: path.join(__dirname, 'public'),
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: () => (isDev ? '[path][name].[ext]' : '[chunkhash].[ext]'),
              },
            },
          ],
        },
      ],
    },
    // stats: { warningsFilter: /export .* was not found in/ },
    // ignoreWarnings: [/Failed to parse source map/],
    plugins: [
      new Dotenv(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode,
      }),
      new HtmlWebpackPlugin({
        hash: false,
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[fullhash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[fullhash].css',
      }),
      new CleanWebpackPlugin({ verbose: true }),
    ],
    performance: {
      maxEntrypointSize: 800000,
    },
  }

  if (isDev) {
    config.devtool = 'inline-source-map'
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
    ]
    config.devServer = {
      clientLogLevel: 'silent',
      transportMode: 'ws',
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'src'),
      hot: 'only',
      open: true,
      port: 9000,
      overlay: true,
      inline: true,
      compress: true,
      publicPath: '/',
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
        entrypoints: false,
      },
    }
  }

  return config
}

module.exports = configWebpack
