export var pickDataProps = function (props) {
    if (props === void 0) { props = {}; }
    return Object.keys(props).reduce(function (buf, key) {
        if (key.includes('data-')) {
            buf[key] = props[key];
        }
        return buf;
    }, {});
};
//# sourceMappingURL=pickDataProps.js.map