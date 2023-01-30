const path=require('path')

module.exports ={
    mode:'production',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:'./loader/style_loader.js'
            }
        ]
    }
}