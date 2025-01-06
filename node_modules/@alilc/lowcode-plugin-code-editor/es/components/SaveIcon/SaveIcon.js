import _Button from "@alifd/next/es/button";
import React from 'react';
import { WORDS } from '../../config';
import './SaveIcon.less';
export var SaveIcon = function SaveIcon(_ref) {
  var isDisabled = _ref.isDisabled,
    onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: "plugin-code-editor-save-icon " + (isDisabled ? 'plugin-code-editor-save-icon--disabled' : '')
  }, /*#__PURE__*/React.createElement(_Button, {
    onClick: onClick,
    size: "small"
  }, WORDS.save));
};