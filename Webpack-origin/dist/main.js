
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
        })({
            0:[
                function(require,module,exports){
                    "use strict";

var _greetinng = _interopRequireDefault(require("./greetinng.js"));
require("./main.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
console.log(_greetinng["default"]);
                },
                {"./greetinng.js":1,"./main.css":2}
            ],
        
            1:[
                function(require,module,exports){
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _langs = require("./langs.js");
var words = "weclome to ".concat(_langs.backend);
var _default = words;
exports["default"] = _default;
                },
                {"./langs.js":3}
            ],
        
            2:[
                function(require,module,exports){
                    
        if(typeof window !== 'undefined'){
            let styleEl = document.createElement("style");
            styleEl.innerHTML ="#msg{\n    color: red;\n}";
            document.head.appendChild(styleEl);
        }
    
                },
                {}
            ],
        
            3:[
                function(require,module,exports){
                    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.front = exports.backend = void 0;
var front = 'JS';
exports.front = front;
var backend = 'GO';
exports.backend = backend;
                },
                {}
            ],
        })
    