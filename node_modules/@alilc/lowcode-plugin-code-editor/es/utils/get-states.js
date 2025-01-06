import traverse from '@babel/traverse';
export var getState = function getState(ast) {
  var state = {};
  traverse(ast, {
    enter: function enter(path) {
      // get state
      if (path.isIdentifier({
        name: 'state'
      })) {
        var _path$container, _path$container$value;
        var properties = (_path$container = path.container) === null || _path$container === void 0 ? void 0 : (_path$container$value = _path$container.value) === null || _path$container$value === void 0 ? void 0 : _path$container$value.properties;
        if (properties) {
          properties.forEach(function (property) {
            var _property$key$name;
            state[(_property$key$name = property.key.name) !== null && _property$key$name !== void 0 ? _property$key$name : property.key.extra.rawValue] = property.value.value;
          });
        }
      }
    }
  });
  return state;
};