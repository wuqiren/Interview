https://time.geekbang.org/column/article/140140


### 什么是DOM
从网络进程传给渲染引擎的HTML文件字节流是无法被渲染引擎，所以要将其转化为渲染引擎能够理解的内部结构，这个结构就是DOM。

###### 在渲染引擎洲 DOM一共有三个层面的作用
1 从页面视角来看，DOM是生成页面的基础数据结构

2 从JavaScript脚本视角看，DOM提供给JavaScript脚本操作的接口，通过这个即可，JS可以对DOM进行访问，从而改变DOM的结构和样式和内容

3 从安全角度来看，DOM是一道安全防护线，一些不安全的内容在DOM解析的阶段就被拦截






### DOM树是如何生成
在渲染引擎内部有一个HTML解析器，它的职责就是将HTML字节流转换为DOM结构，HTML解析器并不是等整个文档加载完成之后再解析的，而是网络进程加载了多少数据，HTML解析器便解析多少数据


##### 第一阶段，通过分词器将字节流转换为Token
解析HTML，分词器先将字节流转化为一个个Token，分为TagToken和文本Token，TagToken又分为StartTag和EndTag，比如<body>是StartTag</body>是EndTag

##### 第二阶段和第三阶段是同步进行的，需要将Token解析为DOM节点，并将DOM节点添加到DOM树

HTML解析器维护了一个Token栈结构，该Token栈主要是计算节点之间的父子关系

如果压入到栈中的是 StartTag Token，HTML 解析器会为该 Token 创建一个 DOM 节点，然后将该节点加入到 DOM 树中，它的父节点就是栈中相邻的那个元素生成的节点。如果分词器解析出来是文本 Token，那么会生成一个文本节点，然后将该节点加入到 DOM 树中，文本 Token 是不需要压入到栈中，它的父节点就是当前栈顶 Token 所对应的 DOM 节点。如果分词器解析出来的是 EndTag 标签，比如是 EndTag div，HTML 解析器会查看 Token 栈顶的元素是否是 StarTag div，如果是，就将 StartTag div 从栈中弹出，表示该 div 元素解析完成。




<script>标签之前，所有的解析流程还是和之前介绍的一样，但是解析到<script>标签时，渲染引擎判断这是一段脚本，此时 HTML 解析器就会暂停 DOM 的解析，因为接下来的 JavaScript 可能要修改当前已经生成的 DOM 结构。




如果 JavaScript 文件中没有操作 DOM 相关代码，就可以将该 JavaScript 脚本设置为异步加载，通过 async 或 defer 来标记代码

而 JavaScript 引擎在解析 JavaScript 之前，是不知道 JavaScript 是否操纵了 CSSOM 的，所以渲染引擎在遇到 JavaScript 脚本时，不管该脚本是否操纵了 CSSOM，都会执行 CSS 文件下载，解析操作，再执行 JavaScript 脚本。