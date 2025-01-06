import _Tab from "@alifd/next/es/tab";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import MonacoEditor from '@alilc/lowcode-plugin-base-monaco-editor';
import { TAB_KEY } from '../../config';
import './CssEditor.less';
import { beautifyCSS } from '../../utils';
// TODO: CSS语法提示后续再添加
export var CssEditor = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(CssEditor, _PureComponent);
  function CssEditor() {
    var _this$props$cssCode;
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      code: (_this$props$cssCode = _this.props.cssCode) !== null && _this$props$cssCode !== void 0 ? _this$props$cssCode : ''
    };
    _this.cssEditor = void 0;
    return _this;
  }
  var _proto = CssEditor.prototype;
  _proto.editorDidMount = function editorDidMount(editor) {
    this.cssEditor = editor;
  };
  _proto.getBeautifiedCSS = function getBeautifiedCSS() {
    var code = this.state.code;
    var nextCode = beautifyCSS(code);
    // css 将会经过格式化，因此需要同步回来
    this.setState({
      code: nextCode
    });
    return nextCode;
  };
  _proto.render = function render() {
    var _this2 = this;
    var code = this.state.code;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Tab, {
      size: "small",
      shape: "wrapped",
      activeKey: this.props.currentTab
    }, /*#__PURE__*/React.createElement(_Tab.Item, {
      title: (code !== this.props.cssCode ? '* ' : '') + "index.css",
      key: TAB_KEY.CSS,
      onClick: function onClick() {
        return _this2.props.onTabChange(TAB_KEY.CSS);
      }
    })), this.props.currentTab === TAB_KEY.CSS && /*#__PURE__*/React.createElement("div", {
      className: "plugin-code-editor-css plugin-code-editor-inner"
    }, /*#__PURE__*/React.createElement(MonacoEditor, {
      value: code,
      language: "css",
      height: "100%",
      supportFullScreen: true,
      onChange: function onChange(newCode) {
        _this2._updateCode(newCode);
      },
      editorDidMount: function editorDidMount(useMonaco, editor) {
        _this2.editorDidMount(editor);
      }
    })));
  };
  _proto._updateCode = function _updateCode(newCode) {
    this.setState({
      code: newCode
    });
  };
  return CssEditor;
}(PureComponent);
CssEditor.defaultProps = void 0;