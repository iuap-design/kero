'use strict';

var _indexApp = require('./app/indexApp');

var _indexServerEvent = require('./app/indexServerEvent');

var _indexDataTable = require('./dataTable/indexDataTable');

var _indexPage = require('./dataTable/indexPage');

var _indexRow = require('./dataTable/indexRow');

window.App = _indexApp.App; /**
                             * Module : Kero webpack entry index
                             * Author : liuyk(liuyuekai@yonyou.com)
                             * Date	  : 2016-08-08 15:24:46
                             */

window.processXHRError = _indexApp.processXHRError;
u.createApp = _indexApp.createApp;

window.ServerEvent = _indexServerEvent.ServerEvent;

window.DataTable = _indexDataTable.DataTable;
u.DataTable = _indexDataTable.DataTable;

window.Page = _indexPage.Page;

window.Row = _indexRow.Row;
u.Row = _indexRow.Row;