const path=require('path')
const HtmlWebpack = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports={
     mode:"production",//模式
     entry: './src/index.js', // 打包入口地址
     output:{
        filename:'bundle.js',//输出文件名
        path:path.join(__dirname,'dist')//输出文件目录
     },
     devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          }, // 静态文件目录
        compress: true, //是否启动压缩 gzip
        port: 8080, // 端口号
        open:true,  // 是否自动打开浏览器
    },
     module: {
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader','postcss-loader'],
        }]
     },
     plugins:[
        new HtmlWebpack({
            template:'./src/index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
          }),
        new CleanWebpackPlugin()// 引入插件
     ]
}