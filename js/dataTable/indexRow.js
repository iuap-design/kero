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


class Row extends Events{
    constructor(options){
        super();
        var self = this;
        this.rowId = options['id'] || Row.getRandomRowId()
        this.status = Row.STATUS.NEW
        this.parent = options['parent']
        this.initValue = null
        this.data = {}
        this.metaChange = {}//ko.observable(1)
        this.valueChange = {};
        this.currentRowChange = ko.observable(1);
        this.selected = ko.pureComputed({
            read: function () {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: this

        })
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


Row.fn.formatValue

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
