/**
 * Module : Kero webpack entry row index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

import {
    Events
} from './indexEvents';


import {
    setValue,
    setChildValue,
    setChildSimpleDataByRowId,
    setData,
    updateRow
} from './row-data';

import {
    getValue,
    getChildValue,
    getData,
    getEmptyData
} from './row-getData';

import {
    getMeta
} from './row-getMeta';

import {
    formatValueFun,
    getSimpleData
} from './row-getSimpleData';

import {
    init
} from './row-init';

import {
    setMeta
} from './row-meta';

import {
    ref,
    refMeta,
    refCombo,
    refDate,
    refEnum
} from './row-ref';

import{
    toggleSelect,
    singleSelect,
    multiSelect
} from './row-rowSelect';

import {
    setSimpleData
} from './row-simpleData';

import {
    formatValue, //需要最终产出,
} from './row-util';


/**
 * Row
 * @namespace
 * @description 前端数据模型行对象
 */

class Row extends Events{
    constructor(options){
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
        this.metaChange = {}//ko.observable(1)
        // 存储valuecahnge改变信息
        this.valueChange = {};
        // 监听当前行改变
        this.currentRowChange = ko.observable(1);
        // 监听当前行是否选中
        this.selected = ko.pureComputed({
            read: function () {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: this

        })
        // 监听当前行是否为focus
        this.focused = ko.pureComputed({
            read: function () {
                var index = this.parent.getRowIndex(this);
                var focusIndex = this.parent.getFocusIndex()
                return focusIndex == index;
            },
            owner: this

        })
        this.init();
    }
}

//data
Row.prototype.setValue= setValue;
Row.prototype.setChildValue= setChildValue;
Row.prototype.setChildSimpleDataByRowId= setChildSimpleDataByRowId;
Row.prototype.setData= setData;
Row.prototype.updateRow= updateRow;

//getData
Row.prototype.getValue= getValue;
Row.prototype.getChildValue= getChildValue;
Row.prototype.getData= getData;
Row.prototype.getEmptyData= getEmptyData;

//getMeta
Row.prototype.getMeta= getMeta;

//getSimpleData
Row.prototype.formatValueFun= formatValueFun;
Row.prototype.getSimpleData= getSimpleData;

//init
Row.prototype.init= init;

//meta
Row.prototype.setMeta= setMeta;

//ref
Row.prototype.ref= ref;
Row.prototype.refMeta= refMeta;
Row.prototype.refCombo= refCombo;
Row.prototype.refDate= refDate;
Row.prototype.refEnum= refEnum;

//rowSelect
Row.prototype.toggleSelect= toggleSelect;
Row.prototype.singleSelect= singleSelect;
Row.prototype.multiSelect= multiSelect;

//simpleData
Row.prototype.setSimpleData= setSimpleData;

//util
Row.prototype.formatValue= formatValue;



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
Row.getRandomRowId = function () {
    var _id = setTimeout(function () {})
    return  _id + '';
};



export {
    Row
}
