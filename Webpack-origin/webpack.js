const configFileContent=require('./webpack.config.js')
const path = require('path')
const fs =require('fs')
const parser = require('@babel/parser')
const babel = require('@babel/core')
const {SyncHooks} = require('tapable')
const traverse = require('@babel/traverse').default

const entryPath = configFileContent.entry
const hooks = {
    emit:new SyncHooks()
}
let ID=0;
// 解析单个文件
function createAsset(filename){
    const dependencies=[]
    const finallyEntryPath = path.resolve(__dirname,filename)
    const fileContent = fs.readFileSync(finallyEntryPath,'utf-8')
    let code = ''
    const id=ID++

    if(filename.endsWith('.js')){
        const ast = parser.parse(fileContent,{
            sourceType:'module'
        })
        traverse(ast,{
            ImportDeclaration:({node})=>{
                dependencies.push(node.source.value)
            }
        })
        const es5Code= babel.transformFromAstSync(ast,null,{
            "presets":["@babel/preset-env"]
        })
        code = es5Code.code
    }else if(filename.endsWith('.css')){
        const ruleset = configFileContent.module.rules.find(rule=>{
            console.log(rule,'rulerule')
            return filename.match(rule.test) !== null
        })
        console.log('????',ruleset)
        if(ruleset){
            const  loader= require(ruleset.use)
            code = loader(fileContent)
            console.log('11111111',code)
        }
    }

  
    return {
        id,
        code,
        dependencies,
        filename
    }
}
// 创建整体依赖树
function createGraph(entry){
    const asset = createAsset(entry)
    let assets = [asset];
    // JS的for循环是一个动态循环
    for(const asset of assets){
        const dirname = path.dirname(asset.filename)
        asset.mapping = {};
        asset.dependencies.forEach((relativePath)=>{
            const absolutePath = path.join(dirname,relativePath)
            const childAsset = createAsset(absolutePath)
            asset.mapping[relativePath] =childAsset.id;
            assets.push(childAsset)
        })
    }
    return assets
}
// 从整体文件依赖图 生成最终JS 字符串代码
function bundle(grap){
    let modules = '{';
    grap.forEach((asset)=>{
        modules+=`
            ${asset.id}:[
                function(require,module,exports){
                    ${asset.code}
                },
                ${JSON.stringify(asset.mapping)}
            ],
        `
    })
    modules+='}'
    const result = `
        (function(modules){
            function require(id){
                const [fn,mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath])
                };
                const module={
                    exports:{}
                };
                fn(localRequire,module,module.exports);
                return module.exports;
            }
            require(0);
        })(${modules})
    `
    return result
}
// 写入文件
function writeFile(code){
    const absolutePath = path.resolve(configFileContent.output.path,configFileContent.output.filename);
    // 判断目标目录是否存在
    if(!fs.existsSync(configFileContent.output.path)){
        fs.mkdirSync(configFileContent.output.path)
    }
    fs.writeFileSync(absolutePath,code,'utf-8')
}

function initPlugins(){
    const plugins = configFileContent.plugin;
    plugins.forEach(plugin=>{
        plugin.apply(hooks)
    })
}
initPlugins()
const graph = createGraph(entryPath)

const codeResult = bundle(graph)

writeFile(codeResult)
// eval(codeResult)