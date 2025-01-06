import { js_beautify, css_beautify } from 'js-beautify';
import { isJSExpression } from '@alilc/lowcode-types';
var js_beautify_config = {
  indent_size: 2,
  indent_empty_lines: true,
  e4x: true
};
var initCode = function initCode(componentSchema) {
  var code = "class Page extends Component {\n    " + initStateCode(componentSchema) + "\n    " + initLifeCycleCode(componentSchema) + "\n    " + initMethodsCode(componentSchema) + "\n  }";
  return js_beautify(code, js_beautify_config);
};
export var schema2JsCode = function schema2JsCode(schema) {
  var _componentSchema$orig;
  var componentSchema = schema.componentsTree[0];
  var code = (_componentSchema$orig = componentSchema === null || componentSchema === void 0 ? void 0 : componentSchema.originCode) !== null && _componentSchema$orig !== void 0 ? _componentSchema$orig : initCode(componentSchema);

  // console.log('当前的code：', code);
  return code;
};
export var schema2CssCode = function schema2CssCode(schema) {
  var _schema$componentsTre;
  return beautifyCSS((_schema$componentsTre = schema.componentsTree[0]) === null || _schema$componentsTre === void 0 ? void 0 : _schema$componentsTre.css);
};
export var beautifyCSS = function beautifyCSS(input) {
  return input ? css_beautify(input, {
    indent_size: 2
  }) : '';
};
function initStateCode(componentSchema) {
  if (componentSchema !== null && componentSchema !== void 0 && componentSchema.state) {
    var statesStr = 'state = {\n';
    Object.keys(componentSchema.state).forEach(function (key) {
      var _componentSchema$stat;
      var state = (_componentSchema$stat = componentSchema.state) === null || _componentSchema$stat === void 0 ? void 0 : _componentSchema$stat[key];
      if (typeof state === 'object' && isJSExpression(state)) {
        statesStr += "\"" + key + "\": " + (state.source || state.value) + ",\n";
      } else {
        statesStr += "\"" + key + "\": " + (typeof state === 'string' ? '"' + state + '"' : state) + ",,\n";
      }
    });
    statesStr += '}';
    return statesStr;
  }
}
function initLifeCycleCode(componentSchema) {
  if (componentSchema !== null && componentSchema !== void 0 && componentSchema.lifeCycles) {
    var lifeCycles = componentSchema.lifeCycles;
    var codeList = [];
    for (var key in lifeCycles) {
      codeList.push(createFunctionCode(key, lifeCycles[key]));
    }
    return codeList.join('');
  } else {
    return '';
  }
}
function initMethodsCode(componentSchema) {
  if (componentSchema !== null && componentSchema !== void 0 && componentSchema.methods && Object.keys(componentSchema.methods).length) {
    var methods = componentSchema.methods;
    var codeList = [];
    for (var key in methods) {
      codeList.push(createFunctionCode(key, methods[key]));
    }
    return codeList.join('');
  } else {
    return "\n      // \u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u7F16\u5199\u51FD\u6570\uFF0C\u5E76\u4E14\u4E0E\u7EC4\u4EF6\u7684\u4E8B\u4EF6\u8FDB\u884C\u7ED1\u5B9A\uFF0C\u652F\u6301JSX\u8BED\u6CD5\n      testFunc() {\n        console.log('test aliLowcode func');\n        return (\n          <div className=\"test-aliLowcode-func\">\n        {this.state.test}\n      </div>\n        );\n      }\n    ";
  }
}
function createFunctionCode(functionName, functionNode) {
  if ((functionNode === null || functionNode === void 0 ? void 0 : functionNode.type) === 'JSExpression' || (functionNode === null || functionNode === void 0 ? void 0 : functionNode.type) === 'JSFunction') {
    // 读取原始代码
    var functionCode = functionNode.source;
    if (functionCode) {
      functionCode = functionCode.replace(/function/, '');
    } else {
      var _functionNode$value;
      // 兼容历史数据
      functionCode = (_functionNode$value = functionNode.value) === null || _functionNode$value === void 0 ? void 0 : _functionNode$value.replace(/function/, functionName);
    }
    return functionCode;
  }
}