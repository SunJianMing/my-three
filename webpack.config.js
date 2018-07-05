var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var copyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
module.exports = {
  entry:'./src/main.js',
  output:{
    filename:'app.js',
    path:path.resolve(__dirname,'./dist/'),
    publicPath:'./'
  },
  devtool:'inline-source-map',
  plugins:[
    new htmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html'
  }),
  new webpack.ProvidePlugin({
    THREE:'three',
    Dat:'dat-gui'
  }),
  new copyWebpackPlugin([{
    from:path.resolve(__dirname,'./assets'),
    to:path.resolve(__dirname,'./dist/assets')
  }],{
    ignore:['*']
  })],
  module:{
    rules:[{
      test:/\.js$/,
      use:['babel-loader']
    },{
      test:/\.css$/,
      use:['style-loader',{
        loader:'css-loader',
        options:{
          module:true,
          localIdentName:'[local]-[hash:base64:5]'
        }
      }],
        exclude:['node_modules']
    },{
      test:/\.(png|jpe?g|gif)$/,
      use:[{
        loader:'url-loader',
        options:{
          limit:1024,
          name:'img/[name].[ext]'
        }
      }]
    }]
  },
  resolve:{
    modules:[path.resolve(__dirname,'./src'),path.resolve(__dirname,'./node_modules')]
  },
  devServer:{
    port:5000,
    contentBase:'./src',
    publicPath:'/'
  }
}
