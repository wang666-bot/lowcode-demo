import React from 'react';
import './ErrorTip.less';
export var ErrorTip = function ErrorTip(_ref) {
  var errorInfo = _ref.errorInfo;
  return /*#__PURE__*/React.createElement("div", {
    className: "plugin-code-editor-errorTip"
  }, errorInfo);
};