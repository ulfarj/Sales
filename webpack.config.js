const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  cache: false,
  bail: true,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: ['url-loader?mimetype=application/font-woff'],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.gif$/,
        use: ['url-loader?mimetype=image/png'],
      },
    ],
  },
  plugins: [failPlugin, new webpack.ProgressPlugin()],
  optimization: {
    minimize: true,
  },
  resolve: {
    alias: {
        config: `${__dirname}/config/prod`
    }
  },
};

//             { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
//             { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
//             { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
//             { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
//         ]
//     },
