 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
   entry: [
      //'webpack/hot/only-dev-server',
      "./src/index.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    historyApiFallback: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:['react','es2015', 'stage-0']
                  }
            },
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
        ]
    },
    devServer: {
      contentBase: path.resolve(__dirname),
      historyApiFallback: true,
      hot: true
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
   ],
   resolve: {
      alias: {
          config: path.join(__dirname, '/config/prod')
      }
   }
};
