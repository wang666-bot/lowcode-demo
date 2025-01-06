import _Tab from "@alifd/next/es/tab";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _Dialog from "@alifd/next/es/dialog";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { PureComponent } from 'react';
import MonacoEditor from '@alilc/lowcode-plugin-base-monaco-editor';
import { ErrorTip } from '../ErrorTip';
import { defaultBabelConfig, defaultCode, WORDS, TAB_KEY } from '../../config';
import { transformJS, transformAst, stateParser, getMethods } from '../../utils';
import './JsEditor.less';
var LIFECYCLES_FUNCTION_MAP = {
  react: ['constructor', 'render', 'componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'componentDidCatch']
};
export var JsEditor = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(JsEditor, _PureComponent);
  function JsEditor() {
    var _this$props$jsCode;
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      errorInfo: null,
      hasError: false,
      code: (_this$props$jsCode = _this.props.jsCode) !== null && _this$props$jsCode !== void 0 ? _this$props$jsCode : defaultCode
    };
    _this.monaco = void 0;
    _this.monacoEditor = void 0;
    _this.lastErrorDecoration = void 0;
    _this.disposeProvider = void 0;
    return _this;
  }
  var _proto = JsEditor.prototype;
  // get schema from code
  _proto.getSchemaFromCode = function getSchemaFromCode() {
    var _this$monacoEditor$ge, _this$monacoEditor, _this$monacoEditor$ge2;
    var code = (_this$monacoEditor$ge = (_this$monacoEditor = this.monacoEditor) === null || _this$monacoEditor === void 0 ? void 0 : (_this$monacoEditor$ge2 = _this$monacoEditor.getModel()) === null || _this$monacoEditor$ge2 === void 0 ? void 0 : _this$monacoEditor$ge2.getValue()) !== null && _this$monacoEditor$ge !== void 0 ? _this$monacoEditor$ge : this.state.code;
    var ast = transformAst(code);
    var _getMethods = getMethods(ast),
      methods = _getMethods.methods,
      errorsByMethods = _getMethods.errorsByMethods;
    var lifeCycles = {};
    var newMethods = {};
    Object.keys(methods).forEach(function (method) {
      if (LIFECYCLES_FUNCTION_MAP.react.indexOf(method) >= 0) {
        lifeCycles[method] = methods[method];
      } else {
        newMethods[method] = methods[method];
      }
    });
    if (Object.keys(errorsByMethods).length > 0) {
      _Dialog.alert({
        title: WORDS.title,
        content: /*#__PURE__*/React.createElement(React.Fragment, null, WORDS.functionParseError, Object.entries(errorsByMethods).map(function (_ref, index) {
          var key = _ref[0],
            err = _ref[1];
          return /*#__PURE__*/React.createElement("p", {
            key: index
          }, key, ": ", err);
        }))
      });
    }
    return {
      state: stateParser(ast),
      methods: newMethods,
      lifeCycles: lifeCycles,
      originCode: code
    };
  };
  _proto.editorDidMount = /*#__PURE__*/function () {
    var _editorDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(monaco, editor) {
      var _this$disposeProvider,
        _this$disposeProvider2,
        _this2 = this;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.monacoEditor = editor;
            this.monaco = monaco;
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: false,
              noSyntaxValidation: false,
              noSuggestionDiagnostics: true
            });
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
              target: monaco.languages.typescript.ScriptTarget.ES6,
              allowNonTsExtensions: true,
              moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
              module: monaco.languages.typescript.ModuleKind.CommonJS,
              noEmit: true,
              esModuleInterop: true,
              jsx: monaco.languages.typescript.JsxEmit.React,
              reactNamespace: "React",
              allowJs: true,
              typeRoots: ["node_modules/@types"]
            });

            // 将 babel 报错提示在这里
            (_this$disposeProvider = this.disposeProvider) === null || _this$disposeProvider === void 0 ? void 0 : (_this$disposeProvider2 = _this$disposeProvider.dispose) === null || _this$disposeProvider2 === void 0 ? void 0 : _this$disposeProvider2.call(_this$disposeProvider);
            this.disposeProvider = monaco.languages.registerHoverProvider('javascript', {
              provideHover: function provideHover(model, position) {
                var _this2$state$errorLoc;
                if (((_this2$state$errorLoc = _this2.state.errorLocation) === null || _this2$state$errorLoc === void 0 ? void 0 : _this2$state$errorLoc.line) === position.lineNumber) {
                  var _this2$state$errorLoc2, _this2$state$errorLoc3, _this2$state$errorLoc4;
                  return {
                    range: new monaco.Range(position.lineNumber, (_this2$state$errorLoc2 = _this2.state.errorLocation) === null || _this2$state$errorLoc2 === void 0 ? void 0 : _this2$state$errorLoc2.column, position.lineNumber, ((_this2$state$errorLoc3 = (_this2$state$errorLoc4 = _this2.state.errorLocation) === null || _this2$state$errorLoc4 === void 0 ? void 0 : _this2$state$errorLoc4.column) !== null && _this2$state$errorLoc3 !== void 0 ? _this2$state$errorLoc3 : 0) + 1),
                    contents: [{
                      value: "**" + _this2.state.errorInfo + "**",
                      supportHtml: true,
                      isTrusted: true
                    }]
                  };
                }
                return null;
              }
            });

            // monaco.languages.typescript.typescriptDefaults.addExtraLib(
            //   ReactType,
            //   `file:///node_modules/@react/types/index.d.ts`
            // );

            monaco.languages.typescript.javascriptDefaults.addExtraLib("\n        declare class Component {\n          state?: Record<string, any>;\n          setState(input: Record<string, any>, fn?: (...args: any[]) => any): void;\n          componentDidMount(): void;\n          constructor(props: Record<string, any>, context: any);\n          render(): void;\n          componentDidUpdate(prevProps: Record<string, any>, prevState: Record<string, any>, snapshot: Record<string, any>): void;\n          componentWillUnmount(): void;\n          componentDidCatch(error: Error, info: any): void;\n        }\n      ", "ts:/component.tsx");
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function editorDidMount(_x, _x2) {
      return _editorDidMount.apply(this, arguments);
    }
    return editorDidMount;
  }();
  _proto.focusByFunctionName = function focusByFunctionName(_ref2) {
    var _monacoEditor$getMode, _monacoEditor$getMode2;
    var functionName = _ref2.functionName;
    var monacoEditor = this.monacoEditor;
    var matchedResult = monacoEditor === null || monacoEditor === void 0 ? void 0 : (_monacoEditor$getMode = monacoEditor.getModel()) === null || _monacoEditor$getMode === void 0 ? void 0 : (_monacoEditor$getMode2 = _monacoEditor$getMode.findMatches("^\\s*(?:async)?\\s*" + functionName + "\\s*\\([\\s\\S]*\\)[\\s\\S]*\\{", false, true)) === null || _monacoEditor$getMode2 === void 0 ? void 0 : _monacoEditor$getMode2[0];
    if (matchedResult) {
      setTimeout(function () {
        monacoEditor.revealLineInCenter(matchedResult.range.startLineNumber);
        monacoEditor.setPosition({
          column: matchedResult.range.endColumn,
          lineNumber: matchedResult.range.endLineNumber
        });
        monacoEditor.focus();
      }, 100);
    }
  };
  _proto.addFunction = function addFunction(params) {
    var _monacoEditor$getMode3;
    var monacoEditor = this.monacoEditor,
      monaco = this.monaco;
    if (!monacoEditor || !monaco) {
      return;
    }

    // 找到最后一个 }，在他前面插入新的 function 字符串
    var matches = (_monacoEditor$getMode3 = monacoEditor.getModel()) === null || _monacoEditor$getMode3 === void 0 ? void 0 : _monacoEditor$getMode3.findMatches('}');
    var range = {};
    if (matches && matches.length > 0) {
      var _matches;
      var _ref3 = ((_matches = matches[matches.length - 1]) === null || _matches === void 0 ? void 0 : _matches.range) || {},
        startLineNumber = _ref3.startLineNumber,
        startColumn = _ref3.startColumn;
      range = new monaco.Range(startLineNumber, startColumn, startLineNumber, startColumn);
    }
    var functionCode = params.template ? params.template : "\n\t" + params.functionName + "(){\n\t}\n";
    monacoEditor.executeEdits('log-source', [{
      identifier: 'event_id',
      range: range,
      text: functionCode,
      forceMoveMarkers: true
    }]);
    params.functionName && this.focusByFunctionName(params);
  };
  _proto.render = function render() {
    var _this3 = this;
    var _this$state = this.state,
      code = _this$state.code,
      hasError = _this$state.hasError,
      errorInfo = _this$state.errorInfo;
    var _this$props = this.props,
      jsCode = _this$props.jsCode,
      currentTab = _this$props.currentTab,
      onTabChange = _this$props.onTabChange;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Tab, {
      size: "small",
      shape: "wrapped",
      activeKey: currentTab
    }, /*#__PURE__*/React.createElement(_Tab.Item, {
      className: hasError ? 'tab-with-error' : '',
      title: /*#__PURE__*/React.createElement(React.Fragment, null, code !== jsCode ? '* ' : '', "index.js"),
      key: TAB_KEY.JS,
      onClick: function onClick() {
        return onTabChange(TAB_KEY.JS);
      }
    })), currentTab === TAB_KEY.JS && /*#__PURE__*/React.createElement("div", {
      className: "plugin-code-editor-js plugin-code-editor-inner"
    }, /*#__PURE__*/React.createElement(MonacoEditor, {
      value: code,
      language: "javascript",
      height: "100%",
      supportFullScreen: true,
      onChange: function onChange(newCode) {
        _this3._updateCode(newCode);
      },
      editorDidMount: function editorDidMount(monaco, editor) {
        _this3.editorDidMount(monaco, editor);
      }
    }), hasError && typeof errorInfo === 'string' ? /*#__PURE__*/React.createElement(ErrorTip, {
      errorInfo: errorInfo
    }) : null));
  };
  _proto._updateCode = function _updateCode(newCode) {
    var _this4 = this;
    var _transformJS = transformJS(newCode, defaultBabelConfig),
      hasError = _transformJS.hasError,
      errorInfo = _transformJS.errorInfo,
      errorLocation = _transformJS.errorLocation;
    var monacoEditor = this.monacoEditor,
      monaco = this.monaco;
    if (!monacoEditor || !monaco) {
      return;
    }

    // const pos = monacoEditor.getPosition();
    this.setState({
      errorInfo: errorInfo,
      hasError: hasError,
      code: newCode,
      errorLocation: errorLocation
    }, function () {
      // monacoEditor.setPosition(pos);
      // update error decorations
      if (_this4.lastErrorDecoration) {
        monacoEditor.deltaDecorations(_this4.lastErrorDecoration, []);
        _this4.lastErrorDecoration = null;
      }
      if (hasError && errorLocation) {
        var _this4$monaco, _this4$monaco$editor;
        _this4.lastErrorDecoration = monacoEditor.deltaDecorations([], [{
          range: new monaco.Range(errorLocation.line, errorLocation.column + 1, errorLocation.line, errorLocation.column + 2),
          options: {
            inlineClassName: 'squiggly-error'
          },
          minimap: {
            color: {
              id: "minimap.errorHighlight"
            },
            position: (_this4$monaco = _this4.monaco) === null || _this4$monaco === void 0 ? void 0 : (_this4$monaco$editor = _this4$monaco.editor) === null || _this4$monaco$editor === void 0 ? void 0 : _this4$monaco$editor.MinimapPosition.Inline
          }
        }, {
          range: new monaco.Range(errorLocation.line, errorLocation.column, errorLocation.line, errorLocation.column),
          options: {
            isWholeLine: true,
            linesDecorationsClassName: 'plugin-code-editor-error-line'
          }
        }]);
      }
    });
  };
  return JsEditor;
}(PureComponent);
JsEditor.defaultProps = {};