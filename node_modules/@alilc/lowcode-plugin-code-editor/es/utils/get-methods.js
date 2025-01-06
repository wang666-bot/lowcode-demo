import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { transformFromAst as babelTransformFromAst } from '@babel/core';
import { functionDeclaration, identifier } from '@babel/types';
import { transformJS } from './transform';
import { defaultBabelConfig } from '../config/default-babel-config';
/**
 * get all methods from code-editor-pane
 */
export var getMethods = function getMethods(ast) {
  var methods = {};
  var errorsByMethods = {};
  traverse(ast, {
    enter: function enter(path) {
      if (!path.isClassMethod()) {
        return;
      }
      var node = path.node;
      var name = node.key.name;
      var params = node.params;
      var body = node.body;
      // creat empty AST
      var code = parse('');
      code.program.body.push(functionDeclaration(identifier(name), params.map(function (p) {
        if (p.type === 'Identifier') {
          return identifier(p.name);
        } else {
          // 解构语法，或者 ...args
          // 直接返回 ...args，不需要额外的构造
          return p;
        }
      }), body, node.generator, node.async));
      var codeStr = babelTransformFromAst(code).code;
      var _transformJS = transformJS(codeStr, defaultBabelConfig),
        hasError = _transformJS.hasError,
        errorInfo = _transformJS.errorInfo,
        _transformJS$code = _transformJS.code,
        compiledCode = _transformJS$code === void 0 ? '' : _transformJS$code;
      if (hasError && errorInfo) {
        errorsByMethods[name] = errorInfo;
      }
      methods[name] = {
        type: 'JSFunction',
        value: compiledCode,
        source: codeStr
      };
    }
  });
  return {
    methods: methods,
    errorsByMethods: errorsByMethods
  };
};