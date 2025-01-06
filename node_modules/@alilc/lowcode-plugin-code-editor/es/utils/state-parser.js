import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { parse } from '@babel/parser';
import { transformFromAst as babelTransformFromAst } from '@babel/core';
import { transformJS } from './transform';
import { defaultBabelConfig } from '../config/default-babel-config';
export var stateParser = function stateParser(ast) {
  var state = {};
  traverse(ast, {
    enter: function enter(path) {
      // get state identifier or literal
      if (path.isIdentifier({
        name: 'state'
      }) || path.isLiteral({
        value: 'state'
      })) {
        var _path$container, _path$container$value;
        var properties = (_path$container = path.container) === null || _path$container === void 0 ? void 0 : (_path$container$value = _path$container.value) === null || _path$container$value === void 0 ? void 0 : _path$container$value.properties;
        if (properties) {
          properties.forEach(function (property) {
            // creat empty AST
            var code = parse('');
            code.program.body.push(t.variableDeclaration('var', [t.variableDeclarator(t.identifier('name'), property.value)]));
            var codeStr = babelTransformFromAst(code).code;
            var compiledCode = transformJS(codeStr, defaultBabelConfig).code;
            if (compiledCode) {
              var _property$key$name;
              state[(_property$key$name = property.key.name) !== null && _property$key$name !== void 0 ? _property$key$name : property.key.extra.rawValue] = {
                type: 'JSExpression',
                value: compiledCode.replace('var name = ', '').replace(/;$/, '')
                // 这里的 originalCode 直接放在全局，不挂在局部
                // originCode: codeStr.replace('var name = ', '').replace(/;$/, ''),
              };
            }
          });
        }
      }
    }
  });

  return state;
};