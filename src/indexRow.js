/**
 * Module : Kero webpack entry row index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

import {
    Events
} from './indexEvents';


import {
    rowDataFunObj
} from './row-data';

import {
    rowGetDataFunObj
} from './row-getData';

import {
    rowGetMetaFunObj
} from './row-getMeta';

import {
    rowGetSimpleDataFunObj
} from './row-getSimpleData';

import {
    rowInitFunObj
} from './row-init';

import {
    rowMetaFunObj
} from './row-meta';

import {
    rowRefFunObj
} from './row-ref';

import {
    rowRowSelectFunObj
} from './row-rowSelect';

import {
    rowSimpleDataFunObj
} from './row-simpleData';

import {
    rowUtilFunObj
} from './row-util';


/**
 * Row
 * @namespace
 * @description 前端数据模型行对象
 */

class Row extends Events {
    constructor(options) {
        super();
        var self = this;
        /**
         * 当前行的唯一标识
         * @type {string}
         */
        this.rowId = options['id'] || Row.getRandomRowId()
        /**
         * 当前行的状态
         * Row.STATUS.NORMAL('nrm') ：前后端都存在并且保持一致
         * Row.STATUS.UPDATE('upd') ：前后端都存在并且前端进行了修改
         * Row.STATUS.NEW('new') ：后端不存在，前端存在的数据
         * Row.STATUS.DELETE('del') ：后端请求返回的状态，前端判断为此状态则将数据删除
         * Row.STATUS.FALSE_DELETE('fdel') ：后端存在，前端不存在的数据
         * @type {string}
         * @default Row.STATUS.NEW
         */
        this.status = Row.STATUS.NEW
        /**
         * 当前行对应的DataTable对象
         */
        this.parent = options['parent']
        // 当前行的数据信息
        this.data = {}
        // 存储meta改变信息
        this.metaChange = {} //ko.observable(1)
        // 存储valuecahnge改变信息
        this.valueChange = {};
        // 监听当前行改变
        this.currentRowChange = ko.observable(1);
        // 监听当前行是否选中
        this.selected = ko.pureComputed({
            read: function() {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: this

        })
        // 监听当前行是否为focus
        this.focused = ko.pureComputed({
            read: function() {
                var index = this.parent.getRowIndex(this);
                var focusIndex = this.parent.getFocusIndex()
                return focusIndex == index;
            },
            owner: this

        })
        this.init();
    }
}
const RowProto = Row.prototype;
Object.assign(RowProto, rowDataFunObj);
Object.assign(RowProto, rowGetDataFunObj);
Object.assign(RowProto, rowGetMetaFunObj);
Object.assign(RowProto, rowGetSimpleDataFunObj);
Object.assign(RowProto, rowInitFunObj);
Object.assign(RowProto, rowMetaFunObj);
Object.assign(RowProto, rowRefFunObj);
Object.assign(RowProto, rowRowSelectFunObj);
Object.assign(RowProto, rowSimpleDataFunObj);
Object.assign(RowProto, rowUtilFunObj);

Row.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'
}

/*
 * 生成随机行id
 * @private
 */
Row.getRandomRowId = function() {
    var _id = setTimeout(function() {})
    return _id + '';
};



export {
    Row
}
