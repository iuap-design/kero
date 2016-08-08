

import {
    setValue,
    setChildValue,
    setChildSimpleDataByRowId,
    setData,
    updateRow
} from './data'; 

import {
    getValue,
    getChildValue,
    getData,
    getEmptyData
} from './getData'; 

import {
    getMeta
} from './getMeta'; 

import {
    getSimpleData
} from './getSimpleData'; 

import {
    init
} from './init'; 

import {
    setMeta
} from './meta'; 

import {
    ref,
    refMeta,
    refCombo,
    refDate,
    refEnum
} from './ref'; 

import{
    toggleSelect,
    singleSelect,
    multiSelect
} from './rowSelect'; 

import {
    setSimpleData
} from './simpleData'; 

import {
    formatValue, //需要最终产出
} from './util'; 


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

        
        //data
        this.setValue= setValue;
        this.setChildValue= setChildValue;
        this.setChildSimpleDataByRowId= setChildSimpleDataByRowId;
        this.setData= setData;
        this.updateRow= updateRow;

        //getData
        this.getValue= getValue;
        this.getChildValue= getChildValue;
        this.getData= getData;
        this.getEmptyData= getEmptyData;

        //getMeta
        this.getMeta= getMeta;

        //getSimpleData
        this.getSimpleData= getSimpleData;

        //init
        this.init= init;

        //meta
        this.setMeta= setMeta;

        //ref
        this.ref= ref;
        this.refMeta= refMeta;
        this.refCombo= refCombo;
        this.refDate= refDate;
        this.refEnum= refEnum;

        //rowSelect
        this.toggleSelect= toggleSelect;
        this.singleSelect= singleSelect;
        this.multiSelect= multiSelect;

        //simpleData
        this.setSimpleData= setSimpleData;

        //util
        this.formatValue= formatValue;

        this.init()
    }
}

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