import { transform } from './babel';
export var transformJS = function transformJS(code, config) {
  var hasError = false;
  var errorInfo = '';
  var transformCode = '';
  var errorLocation = undefined;
  try {
    transformCode = transform(code, config).code;
  } catch (ex) {
    var _ex$message$split$, _ex$message, _ex$message$split;
    hasError = true;
    errorInfo = (_ex$message$split$ = (_ex$message = ex.message) === null || _ex$message === void 0 ? void 0 : (_ex$message$split = _ex$message.split('\n')) === null || _ex$message$split === void 0 ? void 0 : _ex$message$split[0]) !== null && _ex$message$split$ !== void 0 ? _ex$message$split$ : '代码解析异常';
    errorInfo = errorInfo.replace('unknown: ', '');
    errorLocation = ex.loc;
  }
  return {
    hasError: hasError,
    errorInfo: errorInfo,
    errorLocation: errorLocation,
    code: transformCode
  };
};