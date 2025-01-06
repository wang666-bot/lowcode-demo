"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
var _exportNames = {
  DataSourceForm: true,
  createDataSourcePane: true,
  DataSourcePane: true,
  DataSourceFilter: true,
  DataSourceList: true,
  DroppableDataSourceListItem: true,
  DataSourcePaneImportPlugin: true,
  DataSourceType: true,
  DataSourceConfig: true,
  DataSourceImportPluginCode: true,
  JSFunctionComp: true,
  createStateService: true,
  DataSourcePaneContext: true
};
exports.DataSourceForm = void 0;
exports.createDataSourcePane = createDataSourcePane;
exports["default"] = void 0;
var _message = _interopRequireDefault(require("@alifd/next/lib/message"));
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireWildcard(require("react"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _set2 = _interopRequireDefault(require("lodash/set"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _reactDnd = require("react-dnd");
var _editorContext = require("../utils/editor-context");
var _DataSourcePane = require("./DataSourcePane");
exports.DataSourcePane = _DataSourcePane.DataSourcePane;
var _DataSourceFilter = require("../components/DataSourceFilter");
exports.DataSourceFilter = _DataSourceFilter.DataSourceFilter;
var _DataSourceList = require("../components/DataSourceList");
exports.DataSourceList = _DataSourceList.DataSourceList;
var _DataSourceListItem = require("../components/DataSourceListItem");
exports.DroppableDataSourceListItem = _DataSourceListItem.DroppableDataSourceListItem;
var _types = require("../types");
exports.DataSourcePaneImportPlugin = _types.DataSourcePaneImportPlugin;
exports.DataSourceType = _types.DataSourceType;
exports.DataSourceConfig = _types.DataSourceConfig;
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
var _DataSourceImportPluginCode = require("../components/DataSourceImportPluginCode");
exports.DataSourceImportPluginCode = _DataSourceImportPluginCode.DataSourceImportPluginCode;
var _Forms = require("../components/Forms");
exports.JSFunctionComp = _Forms.JSFunctionComp;
var _reactErrorBoundary = require("react-error-boundary");
var _schema = require("../utils/schema");
var _stateMachine = require("../utils/stateMachine");
exports.createStateService = _stateMachine.createStateService;
var _panelContext = require("../utils/panel-context");
exports.DataSourcePaneContext = _panelContext.DataSourcePaneContext;
var _misc = require("../utils/misc");
var _lowcodeEngine = require("@alilc/lowcode-engine");
require("./index.scss");
var _DataSourceForm = require("../components/DataSourceForm");
exports.DataSourceForm = _DataSourceForm.DataSourceForm;
var _datasourceTypes = require("../datasource-types");
Object.keys(_datasourceTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _datasourceTypes[key]) return;
  exports[key] = _datasourceTypes[key];
});
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PLUGIN_NAME = 'dataSourcePane';
var BUILTIN_IMPORT_PLUGINS = [{
  name: 'default',
  title: '源码',
  component: _DataSourceImportPluginCode.DataSourceImportPluginCode
}];

// TODO
function createDataSourcePane() {}
var DataSourcePanePlugin = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(DataSourcePanePlugin, _PureComponent);
  function DataSourcePanePlugin(props) {
    var _this;
    _this = _PureComponent.call(this, props) || this;
    // 第一次 active 事件不会触发监听器
    _this.stateService = (0, _stateMachine.createStateService)();
    _this.state = {
      active: false,
      panelKey: 1
    };
    _this.handleSchemaChange = function (schema) {
      var _this$props = _this.props,
        project = _this$props.project,
        onSchemaChange = _this$props.onSchemaChange;
      if (project) {
        var docSchema = project.exportSchema(_lowcodeEngine.common.designerCabin.TransformStage.Save);
        if (!(0, _isEmpty2["default"])(docSchema)) {
          (0, _set2["default"])(docSchema, 'componentsTree[0].dataSource', schema);
          project.importSchema(docSchema);
        }
      }
      onSchemaChange === null || onSchemaChange === void 0 ? void 0 : onSchemaChange(schema);
    };
    _this.handleReset = function () {
      _this.setState(function (_ref) {
        var panelKey = _ref.panelKey;
        return {
          panelKey: panelKey + 1
        };
      });
    };
    _this.state.active = true;
    var event = _this.props.event;
    // @todo pluginName, to unsubscribe
    event.on('skeleton.panel-dock.active', function (pluginName) {
      if (pluginName === PLUGIN_NAME) {
        _this.setState({
          active: true
        });
      }
    });
    event.on('skeleton.panel-dock.unactive', function (pluginName) {
      if (pluginName === PLUGIN_NAME) {
        _this.setState({
          active: false
        });
      }
    });
    _this.handleSchemaChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  var _proto = DataSourcePanePlugin.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.stateService.start();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stateService.stop();
  };
  _proto.render = function render() {
    var _project$exportSchema;
    var _this$props2 = this.props,
      importPlugins = _this$props2.importPlugins,
      exportPlugins = _this$props2.exportPlugins,
      dataSourceTypes = _this$props2.dataSourceTypes,
      defaultSchema = _this$props2.defaultSchema,
      project = _this$props2.project,
      logger = _this$props2.logger,
      onError = _this$props2.onError,
      setters = _this$props2.setters;
    var _this$state = this.state,
      active = _this$state.active,
      panelKey = _this$state.panelKey;
    if (!active) return null;
    var projectSchema = (_project$exportSchema = project.exportSchema(_lowcodeEngine.common.designerCabin.TransformStage.Save)) !== null && _project$exportSchema !== void 0 ? _project$exportSchema : {};
    var schema = defaultSchema;
    if ((0, _isFunction2["default"])(defaultSchema)) {
      schema = defaultSchema();
    }
    if (!schema) {
      schema = (0, _get2["default"])(projectSchema, 'componentsTree[0].dataSource');
    }
    if (!(0, _schema.isSchemaValid)(schema)) {
      logger.warn('发现不合法的 schema', schema);
      schema = (0, _schema.correctSchema)(schema);
      logger.log('进行修正', schema);
    }
    return /*#__PURE__*/_react["default"].createElement(_editorContext.EditorContext.Provider, {
      value: {
        project: project,
        logger: logger,
        setters: setters
      }
    }, /*#__PURE__*/_react["default"].createElement(_panelContext.DataSourcePaneContext.Provider, {
      value: {
        stateService: this.stateService,
        dataSourceTypes: dataSourceTypes
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
      backend: _reactDndHtml5Backend.HTML5Backend
    }, /*#__PURE__*/_react["default"].createElement(_reactErrorBoundary.ErrorBoundary, {
      onError: onError,
      FallbackComponent: ErrorFallback,
      onReset: this.handleReset,
      resetKeys: [panelKey]
    }, /*#__PURE__*/_react["default"].createElement(_DataSourcePane.DataSourcePane, {
      key: panelKey + 1,
      importPlugins: (0, _misc.mergeTwoObjectListByKey)(BUILTIN_IMPORT_PLUGINS, importPlugins, 'name'),
      exportPlugins: (0, _misc.mergeTwoObjectListByKey)(BUILTIN_IMPORT_PLUGINS, exportPlugins, 'name'),
      dataSourceTypes: dataSourceTypes,
      initialSchema: schema,
      onSchemaChange: this.handleSchemaChange
    })))));
  };
  return DataSourcePanePlugin;
}(_react.PureComponent);
exports["default"] = DataSourcePanePlugin;
DataSourcePanePlugin.displayName = 'DataSourcePanePlugin';
DataSourcePanePlugin.defaultProps = {
  dataSourceTypes: [],
  importPlugins: [],
  exportPlugins: []
};
function ErrorFallback(props) {
  return /*#__PURE__*/_react["default"].createElement(_message["default"], {
    type: "error",
    shape: "addon",
    title: "\u6E32\u67D3\u5F02\u5E38"
  }, props.error.message, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    onClick: props.resetErrorBoundary
  }, "\u5237\u65B0\u9762\u677F"));
}