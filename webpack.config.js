// module.exports= {
//     entry: './src/app.js',
//     output: {
//         filename: './dist/app.bundle.js'
//     }
// }

var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var VENDOR_LIBS = [
    'react','react-dom','react-router-dom'
];
var BUILD_DIR = path.join(__dirname,'dist');
var APP_DIR = path.join(__dirname,'src');

var config = {
   // entry: APP_DIR + "/index.js",
    entry:{
        bundle: APP_DIR + "/index.js",
        vendor: VENDOR_LIBS
    },
    output: {
        // path: BUILD_DIR,
        // filename: "[name].[hash].js" //chunkhash
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                //include: APP_DIR,
                exclude: /node_modules/,
               // use: "babel-loader"
               loader: "babel-loader",
               options: {
                   babelrc: false,
                   presets: ["babel-preset-env","stage-2","react"],
                   plugins: ["syntax-dynamic-import"]
               }
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/i,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase:[BUILD_DIR, path.join(__dirname,"assets")],
        compress: true,
        port: 9000,
        disableHostCheck: false,
        headers: {
            "X-Custom-header": "custom"
        },
        open: true,
        hot: true


      },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

module.exports = config;