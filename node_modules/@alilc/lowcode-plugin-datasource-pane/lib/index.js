"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _pane = _interopRequireDefault(require("./pane"));
// TODO: 2.0插件传参修改，不支持直接options: Options
var plugin = function plugin(ctx, options) {
  return {
    name: 'com.alibaba.lowcode.datasource.pane',
    width: 300,
    // 依赖的插件（插件名数组）
    dep: [],
    // 插件对外暴露的数据和方法
    exports: function exports() {
      return {};
    },
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init: function init() {
      var dataSourceTypes = ctx.preference.getPreferenceValue('dataSourceTypes') || options.dataSourceTypes;
      var importPlugins = ctx.preference.getPreferenceValue('importPlugins') || options.importPlugins;
      var schemaDock = ctx.skeleton.add({
        area: 'leftArea',
        name: 'dataSourcePane',
        type: 'PanelDock',
        props: {
          icon: 'shujuyuan',
          description: '数据源'
        },
        panelProps: {
          width: '300px'
          // title: '源码面板',
        },

        content: _pane["default"],
        contentProps: {
          importPlugins: importPlugins,
          dataSourceTypes: dataSourceTypes,
          event: ctx.event,
          project: ctx.project,
          logger: ctx.logger,
          setters: ctx.setters
        }
      });
      schemaDock && schemaDock.disable();
      ctx.project.onSimulatorRendererReady(function () {
        schemaDock.enable();
      });
    }
  };
};
plugin.pluginName = 'DataSourcePane';
plugin.meta = {
  preferenceDeclaration: {
    title: '数据源面板插件参数定义',
    properties: [{
      key: 'importPlugins',
      type: 'array',
      description: ''
    }, {
      key: 'dataSourceTypes',
      type: 'array',
      description: '数据源类型'
    }]
  }
};
var _default = plugin;
exports["default"] = _default;