"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickDataProps = void 0;
var pickDataProps = function (props) {
    if (props === void 0) { props = {}; }
    return Object.keys(props).reduce(function (buf, key) {
        if (key.includes('data-')) {
            buf[key] = props[key];
        }
        return buf;
    }, {});
};
exports.pickDataProps = pickDataProps;
//# sourceMappingURL=pickDataProps.js.map