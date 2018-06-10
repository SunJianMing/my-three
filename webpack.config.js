var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'app.js',
        path:path.resolve(__dirname,'./dist'),
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                include:[path.resolve(__dirname,'./src/common')]
            }
        ]
    },
    resolve:{
        modules:[
            path.resolve(__dirname,'./src'),
            'node_modules',
            path.resolve(__dirname,'./src/components')]
    },
    plugins:[new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new webpack.ProvidePlugin({
            THREE:'three',
            Dat:'dat-gui'
        })
    ],
    devtool:'inline-scoure-map',
    devServer:{
        port:8888,
        contentBase:'./src',
        publicPath:'/'
    }
}
