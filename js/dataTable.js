


/**
 * 字段不存在时，创建字段
 * @param fieldName
 * @param options
 */
DataTable.fn.createField = function(fieldName, options){
    //字段不主动定义，则不创建
    if (this.root.strict == true)
        return;
    //有子表的情况不创建字段
    if (fieldName.indexOf('.') != -1){
        var fNames = fieldName.split('.');
        var _name = fNames[0];
        for(var i= 0, count = fNames.length; i< count; i++){
            if (this.meta[_name] && this.meta[_name]['type'] === 'child')
                return;
            if ((i+1) < count)
                _name = _name + '.' + fNames[i+1]
        }
    }
    if (!this.meta[fieldName]){
        this.meta[fieldName] = {}
    }
    if (typeof options === 'object'){
        if(options['meta']){
            for(var key in options['meta']){
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName]['meta'][key] = options['meta'][key];
                //}
            }
        }else{
            for(var key in options){
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName][key] = options[key];
                //}
            }
        }
    }
    // 在顶层dataTable上定义field信息
    if (this.root !== this){
        var nsArr = this.ns.split('.')
        var _fieldMeta = this.root.meta
        for (var i = 0; i< nsArr.length; i++){
            _fieldMeta[nsArr[i]] = _fieldMeta[nsArr[i]] || {}
            _fieldMeta[nsArr[i]]['type'] = _fieldMeta[nsArr[i]]['type'] || 'child';
            _fieldMeta[nsArr[i]]['meta'] = _fieldMeta[nsArr[i]]['meta'] || {};
            _fieldMeta =  _fieldMeta[nsArr[i]]['meta'];
        }
        if (!_fieldMeta[fieldName]){
            _fieldMeta[fieldName] = {}
        }
        if (typeof options === 'object'){
            for(var key in options){
                if (!_fieldMeta[fieldName][key]){
                    _fieldMeta[fieldName][key] = options[key];
                }
            }
        }
    }

}

DataTable.fn.isChanged = function () {
    var rows = this.getAllRows()
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL)
            return true
    }
    return false
}



/**
 * 根据索引取rowid
 * @param {Object} indices
 */
DataTable.fn.getRowIdsByIndices = function (indices) {
    var rowIds = []
    for (var i = 0; i < indices.length; i++) {
        rowIds.push(this.getRow(indices[i]).rowId)
    }
    return rowIds
}


DataTable.fn.updateFocusIndex = function (opIndex, opType, num) {
    if (!u.isNumber(num)) {
        num = 1
    }
    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
        if (opType === '+') {
            this.focusIndex(this.focusIndex() + num)
        } else if (opType === '-') {
            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - 1)
            } else if (this.focusIndex() > opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - num)
            }
        }
    }
}

/**
 * 获取焦点行
 */
DataTable.fn.getFocusIndex = function () {
    return this.focusIndex()
}

/**
 * 根据行号获取行索引
 * @param {String} rowId
 */
DataTable.fn.getIndexByRowId = function (rowId) {
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowId)
            return i
    }
    return -1
}

/**
 * 获取所有行数据
 */
DataTable.fn.getAllDatas = function () {
    var rows = this.getAllRows()
    var datas = []
    for (var i = 0, count = rows.length; i < count; i++)
        if (rows[i])
            datas.push(rows[i].getData())
    return datas
}





DataTable.fn.isEnable = function (fieldName) {
    var fieldEnable = this.getMeta(fieldName, 'enable')
    if (typeof fieldEnable == 'undefined' || fieldEnable == null)
        fieldEnable = true
    return fieldEnable && this.enable
}

DataTable.fn.getValue = function (fieldName, row) {
    row = row || this.getCurrentRow()
    if (row)
        return row.getValue(fieldName)
    else
        return ''
}



DataTable.fn.setValue = function (fieldName, value, row, ctx) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow()
    if (row)
        row.setValue(fieldName, value, ctx)
}

DataTable.fn.setEnable = function (enable) {
    if (this.enable == enable) return
    //当传入的参数不为false时，默认enable为true
    if (enable===false){
        enable=false;
    }else{
        enable=true;
    }
    this.enable = enable
    this.enableChange(-this.enableChange())
    this.trigger(DataTable.ON_ENABLE_CHANGE, {
        enable: this.enable
    })
}

/**
 * 获取当前操作行
 * 规则： focus 行优先，没有focus行时，取第一选中行
 */
DataTable.fn.getCurrentRow = function () {
    if (this.focusIndex() != -1)
        return this.getFocusRow()
    var index = this.getSelectedIndex()
    if (index == -1)
        return null
    else
        return this.getRow(index)
}

DataTable.fn.getCurrentIndex = function () {
    if (this.focusIndex() != -1)
        return this.focusIndex()
    var index = this.getSelectedIndex()
    if (index == -1)
        return -1
    else
        return index
}


DataTable.fn.updateCurrIndex = function () {
    var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
    if (this._oldCurrentIndex != currentIndex) {
        this._oldCurrentIndex = currentIndex;
        this.trigger(DataTable.ON_CURRENT_ROW_CHANGE)
        this.currentRowChange(-this.currentRowChange());
        if (this.ns){
            if (this.root.valueChange[this.ns])
                this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
        }

    }
}

/**
 * 获取焦点行
 */
DataTable.fn.getFocusRow = function () {
    if (this.focusIndex() != -1)
        return this.getRow(this.focusIndex())
    else
        return null
}

/**
 * 设置焦点行
 * @param {Object} index 行对象或者行index
 * @param quiet 不触发事件
 * @param force 当index行与已focus的行相等时，仍然触发事件
 */
DataTable.fn.setRowFocus = function (index, quiet, force) {
    var rowId = null
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId)
        rowId = index.rowId
    }
    if (index === -1 || (index === this.focusIndex() && !force)) {
        return;
    }
    this.focusIndex(index)
    if (quiet) {
        return;
    }
    this.currentRowChange(-this.currentRowChange())
    if (!rowId) {
        rowId = this.getRow(index).rowId
    }
    this.trigger(DataTable.ON_ROW_FOCUS, {
        index: index,
        rowId: rowId
    })
    this.updateCurrIndex();
}

/**
 * 焦点行反选
 */
DataTable.fn.setRowUnFocus = function () {
    this.currentRowChange(-this.currentRowChange())
    var indx = this.focusIndex(), rowId = null;
    if (indx !== -1) {
        rowId = this.getRow(indx).rowId
    }
    this.trigger(DataTable.ON_ROW_UNFOCUS, {
        index: indx,
        rowId: rowId
    })
    this.focusIndex(-1)
    this.updateCurrIndex();
}

DataTable.fn.getRow = function (index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index]
};

/**
 * 根据rowid取row对象
 * @param rowid
 * @returns {*}
 */
DataTable.fn.getRowByRowId = function (rowid) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowid)
            return rows[i]
    }
    return null
}

/**
 * 取行索引
 * @param row
 * @returns {*}
 */
DataTable.fn.getRowIndex = function (row){
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId)
            return i;
    }
    return -1;
};

DataTable.fn.getRowsByField = function(field,value){
    var rows = this.rows.peek();
    var returnRows = new Array();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value)
            returnRows.push(rows[i]);
    }
    return returnRows;
}

DataTable.fn.getRowByField = function(field,value){
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value)
            return rows[i]
    }
    return null;
}

DataTable.fn.getAllRows = function () {
    return this.rows.peek();
}

DataTable.fn.getAllPageRows = function () {
    var datas = [], rows;
    for (var i = 0; i < this.totalPages(); i++) {
        rows = [];
        if (i == this.pageIndex()) {
            rows = this.getData();
        } else {
            var page = this.cachedPages[i];
            if (page) {
                rows = page.getData();
            }
        }
        for (var j = 0; j < rows.length; j++) {
            datas.push(rows[j]);
        }
    }
    return datas;
}

/**
 * 获取变动的数据(新增、修改)
 */
DataTable.fn.getChangedDatas = function (withEmptyRow) {
    var datas = [], rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            datas.push(rows[i].getData())
        }
        else if (withEmptyRow == true) {
            datas.push(rows[i].getEmptyData())
        }
    }
    return datas
};

/**
 * 取改变的行
 */
DataTable.fn.getChangedRows = function(){
    var changedRows = [], rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i])
        }
    }
    return changedRows
}

DataTable.fn._formatToIndicesArray = function (indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices]
    } else if (indices instanceof Row) {
        indices = this.getIndexByRowId(indices.rowId)
    } else if (u.isArray(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = this.getIndexByRowId(indices[i].rowId)
        }
    }
    return indices;
};


/**
 * row :   {data:{}}
 * @constructor
 */
var Page = function (options) {
    this.focus = options['focus'] || null;
    this.selectedIndices = options['selectedIndices'] || null;
    this.rows = options['rows'] || []
    this.parent = options['parent'] || null;
}

Page.fn = Page.prototype

Page.fn.getData = function () {
    var datas = [], row, meta;
    meta = this.parent.getMeta()
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}

Page.fn.getSelectDatas = function () {
    var datas = [], row;
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    for (var i = 0; i < this.selectedIndices.length; i++) {
        row = this.rows[this.selectedIndices[i]];
        datas.push({'id': row.rowId, 'status': row.status, data: row.data});
    }
    return datas
}

Page.fn.getRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid)
            return this.rows[i]
    }
    return null
}

Page.fn.removeRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid)
            this.rows.splice(i, 1);
    }
}

Page.fn.getSelectRows = function () {
    var rows = [];
    for (var i = 0; i < this.selectedIndices.length; i++) {
        rows.push(this.rows[this.selectedIndices[i]])
    }
    return rows
}

Page.fn.getRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid)
            return this.rows[i]
    }
    return null
}

Page.fn.setRowValue = function (rowIndex, fieldName, value) {
    var row = this.rows[rowIndex]
    if (row) {
        row.data[fieldName]['value'] = value
        if (row.status != Row.STATUS.NEW)
            row.status = Row.STATUS.UPDATE
    }
}

Page.fn.getRowValue = function (rowIndex, fieldName) {
    var row = this.rows[rowIndex]
    if (row) {
        return row.data[fieldName]['value']
    }
    return null
}

Page.fn.setRowMeta = function (rowIndex, fieldName, metaName, value) {
    var row = this.rows[rowIndex]
    if (row) {
        var meta = row[fieldName].meta
        if (!meta)
            meta = row[fieldName].meta = {}
        meta[metaName] = value
        if (row.status != Row.STATUS.NEW)
            row.status = Row.STATUS.UPDATE
    }
}

Page.fn.getRowMeta = function (rowIndex, fieldName, metaName) {
    var row = this.rows[rowIndex]
    if (row) {
        var meta = row[fieldName].meta
        if (!meta)
            return null
        else
            return meta[metaName]
    }
    return null
}


Page.fn.updateRow = function (originRow, newRow) {
    originRow.status = originRow.status
    //this.rowId = data.rowId
    if (!newRow.data) return;
    for (var key in newRow.data) {
        if (originRow.data[key]) {
            var valueObj = newRow.data[key]
            if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null)
                originRow.data[key]['value'] = valueObj
            //this.setValue(key, this.formatValue(key, valueObj))
            else {
//					this.setValue(key, valueObj.value)

                if (valueObj.error) {
                    u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
                } else {
                    //this.setValue(key, this.formatValue(key, valueObj.value), null)
                    originRow.data[key]['value'] = valueObj.value
                    for (var k in valueObj.meta) {
                        originRow.data[key]['meta'] = originRow.data[key]['meta'] || {}
                        originRow.data[key]['meta'][k] = valueObj.meta[k]
                    }
                }
            }
        }
    }
}


/**===========================================================================================================
 *
 * 行模型
 *
 * {id:'xxx', parent:dataTable1}
 *
 * data:{value:'v1',meta:{}}
 *
 * ===========================================================================================================
 */
var Row = function (options) {
    var self = this;
    this.rowId = options['id'] || Row.getRandomRowId()
    this.status = Row.STATUS.NEW
    //this.selected = ko.observable(false);
    //this.selected.subscribe(function(value){
    //    if (value === true){
    //        self.parent.addRowSelect(self);
    //    }else{
    //        self.parent.setRowUnSelect(self);
    //    }
    //
    //})
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
    this.init()
}

Row.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'
}

Row.fn = Row.prototype = new Events()

/**
 * Row初始化方法
 * @private
 */
Row.fn.init = function () {
    var meta = this.parent.meta;

    for (var key in meta) {
        var targetData;
        if (key.indexOf('.') > 0){
            var keys = key.split('.');
            targetData =  this.data[keys[0]] = this.data[keys[0]] || {};
            for(var i = 1; i< keys.length; i++){
                targetData[keys[i]] = targetData[keys[i]] || {};
                targetData = targetData[keys[i]];
            }
        }else{
            this.data[key] = this.data[key] || {}
            targetData = this.data[key];
        }
        targetData.value = null;
        //this.data[key] = {}
        //处理子表
        if (meta[key]['type'] && meta[key]['type'] === 'child'){
            targetData.isChild = true;
            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key
            targetData.value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta[key]['meta']});
        }
        //添加默认值
        else if (meta[key]['default']) {
            var defaults = meta[key]['default']
            if (typeof defaults === 'object'){
                for (var k in defaults) {
                    if (k == 'value'){
                        if (typeof defaults[k] === 'function')
                            targetData.value = this.formatValue(key,defaults[k]());
                        else
                            targetData.value = this.formatValue(key,defaults[k]);
                    }
                    else {
                        targetData.meta = targetData.meta || {}
                        targetData.meta[k] = defaults[k]
                    }
                }
            }else{
                if (typeof defaults === 'function')
                    targetData.value = this.formatValue(key, defaults());
                else
                    targetData.value = this.formatValue(key,defaults);
            }
        }
    }
}

Row.fn.toggleSelect = function(type){
    var index = this.parent.getRowIndex(this);
    var selectindices = this.parent.getSelectedIndices();
    if (selectindices.indexOf(index) != -1){
        this.parent.setRowUnSelect(index);
    }else{
        if (type === 'single')
            this.parent.setRowSelect(index);
        else
            this.parent.addRowSelect(index);
    }
};

/**
 * 行点击事件
 */
Row.fn.singleSelect = function(){
    this.toggleSelect('single');
};

Row.fn.multiSelect = function(){
    this.toggleSelect('multi');
};

Row.fn.ref = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            return this.getChildValue(fieldName)
            //var value = this._getField(fieldName)['value'];
            //return value;
        },
        write: function (value) {
            this.setChildValue(fieldName, value);
            //this.setValue(fieldName, value)
        },
        owner: this
    })
}


/**
 * 绑定子表行
 * @param fieldName
 */
//Row.fn.refChildRows = function(fieldName){
//    if (!this.valueChange[fieldName])
//        this.valueChange[fieldName] = ko.observable(1);
//    return ko.pureComputed({
//        read: function () {
//            this.valueChange();
//            this.currentRowChange();
//            var childDt = this._getField(fieldName)['value'];
//            if (!(childDt instanceof u.DataTable)){
//                throw new Error("refChildRows('" + fieldName + "') error, field is not a child datatable!");
//            }
//            return childDt.rows.peek();
//        },
//        //write: function (value) {
//        //    this.setValue(fieldName, value)
//        //},
//        owner: this
//    })
//}

Row.fn.refMeta = function (fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key])
        this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.metaChange[fieldName + '.' + key]()
            return this.getMeta(fieldName, key)
        },
        write: function (value) {
            this.setMeta(fieldName, key, value)
        },
        owner: this
    })
}
Row.fn.refCombo = function (fieldName, datasource) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var ds = u.getJSObject(this.parent.parent, datasource)
            if (this._getField(fieldName)['value'] === undefined || this._getField(fieldName)['value'] === "") return "";
            var v = this._getField(fieldName)['value'];
            var valArr = typeof v === 'string' ? v.split(',') : [v];

            var nameArr = []

            for (var i = 0, length = ds.length; i < length; i++) {
                for (var j = 0; j < valArr.length; j++) {
                    var value = ds[i]['pk'] || ds[i]['value'] || '';
                    if (value == valArr[j]) {
                        nameArr.push(ds[i].name)
                    }
                }
            }

            return nameArr.toString();
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}
Row.fn.refDate = function (fieldName, format) {
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!this._getField(fieldName)['value']) return "";
            var valArr = this._getField(fieldName)['value']
            if (!valArr) return "";
            valArr = u.date.format(valArr, format); //moment(valArr).format(format)
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

// 刘云燕提交
Row.fn.refEnum = function (fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName])
        this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function () {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!this._getField(fieldName)['value']) return "";
            var valArr = this._getField(fieldName)['value']
            if (!valArr) return "";
            if(valArr == "N")
                valArr = "否";
            else if(valArr == "Y")
                valArr = "是";
            return valArr;
        },
        write: function (value) {

            this.setValue(fieldName, value)
        },
        owner: this
    })
}

/**
 *获取row中某一列的值
 */
Row.fn.getValue = function (fieldName) {
    return this._getField(fieldName)['value']
}

/**
 * 获取子表值 ，如果fieldName对应了一个子表，返回该子表的行数组
 * @param fieldName
 */
Row.fn.getChildValue = function(fieldName){
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    for (var i = 0, count = nameArr.length; i<count; i++){
        var _value = this.getValue(_name);
        //最后一级
        if (i == count -1){
            if (_value instanceof u.DataTable){
                return _value.rows.peek();
            }else{
                return _value;
            }
        }else{
            if (_value instanceof u.DataTable){
                _value = _value.getCurrentRow();
                if (!_value)
                    return '';
                else
                    return _value.getChildValue(fieldName.replace(_name + '.', ''))
            }else{
                _name = _name + '.' + nameArr[i+1];
            }

        }
    }
    return '';
};

Row.fn.setChildValue = function(fieldName, value){
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    var _field = this.data[_name];//_field保存当前_name对应的数据
    for (var i = 0, count = nameArr.length; i<count; i++){
        // var _field = this.data[_name];
        // if (!_field)
        //     throw new Error('field:' + fieldName + ' not exist in dataTable:' + this.root.id + '!');
        //最后一级
        if (i == count -1){
            if (_field['value'] instanceof u.DataTable){
                //暂不处理
            }else{
                //_field['value'] = value;
                this.setValue(fieldName, value);
            }
        }else{
			if (_field && _field['value'] instanceof u.DataTable){
                var row = _field['value'].getCurrentRow();
                if (row)
                    row.setChildValue(fieldName.replace(_name + '.', ''), value)
            }else{
            	_name = nameArr[i + 1];
            	_field = _field[_name];//多层嵌套时_field取子项对应的数据
                // _name = _name + '.' + nameArr[i];
                
            }

        }
    }
};

Row.fn.setChildSimpleDataByRowId = function(rowId, data){
    var rowIdArr = rowId.split('.');
    var rowIdLength = rowIdArr.length;
    if(rowIdLength > 1){
        var _childField = rowIdArr[0]; //子表字段
        var _childObj = this.data[_childField]; // 子表字段存放的obj
        if (_childObj && _childObj['value'] instanceof u.DataTable){
            var rowId = rowIdArr[1];
            var row = null;
            if(rowId)
                row = _childObj['value'].getRowByRowId(rowId);
            if (row){
                if(rowIdArr.length == 2){
                    row.setSimpleData(data);
                }else{
                    row.setChildSimpleDataByRowId(fieldName.replace(_childField + '.' + rowId + '.', ''),data)
                }
            }
        }
    }
}


var eq = function (a, b) {
    if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
    if (u.isNumber(a) && u.isNumber(b) && parseFloat(a) == parseFloat(b)) return true;
    if (a + '' == b + '')  return true;
    return false;
}

Row.fn._triggerChange = function(fieldName, oldValue, ctx){
    this._getField(fieldName).changed = true
    if (this.status != Row.STATUS.NEW)
        this.status = Row.STATUS.UPDATE
    if (this.valueChange[fieldName])
        this.valueChange[fieldName](-this.valueChange[fieldName]())
    if (this.parent.getCurrentRow() == this && this.parent.valueChange[fieldName]){
        this.parent.valueChange[fieldName](-this.parent.valueChange[fieldName]());
    }
    if (this.parent.ns){
        var fName = this.parent.ns + '.' + fieldName;
        if (this.parent.root.valueChange[fName])
            this.parent.root.valueChange[fName](-this.parent.root.valueChange[fName]());
    }

    var event = {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        rowId: this.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: this.getValue(fieldName),
        ctx: ctx || ""
    }
    this.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    if (this == this.parent.getCurrentRow())
        this.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

};

/**
 *设置row中某一列的值
 */
Row.fn.setValue = function (fieldName, value, ctx, options) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }
    var oldValue = this.getValue(fieldName)
    if(typeof oldValue == 'undefined' || oldValue === null)
        oldValue = ''
    if (eq(oldValue, value)) return;
    this._getField(fieldName)['value'] = value;
    this._triggerChange(fieldName, oldValue, ctx);
    // this._getField(fieldName).changed = true
    // if (this.status != Row.STATUS.NEW)
    //     this.status = Row.STATUS.UPDATE
    // if (this.valueChange[fieldName])
    //     this.valueChange[fieldName](-this.valueChange[fieldName]())
    // if (this.parent.getCurrentRow() == this && this.parent.valueChange[fieldName])
    //     this.parent.valueChange[fieldName](-this.parent.valueChange[fieldName]());
    // if (this.parent.ns){
    //     var fName = this.parent.ns + '.' + fieldName;
    //     if (this.parent.root.valueChange[fName])
    //         this.parent.root.valueChange[fName](-this.parent.root.valueChange[fName]());
    // }

    // var event = {
    //     eventType: 'dataTableEvent',
    //     dataTable: this.parent.id,
    //     rowId: this.rowId,
    //     field: fieldName,
    //     oldValue: oldValue,
    //     newValue: value,
    //     ctx: ctx || ""
    // }
    // this.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    // this.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    // if (this == this.parent.getCurrentRow())
    //     this.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);
}

/**
 *获取row中某一列的属性
 */
Row.fn.getMeta = function (fieldName, key, fetchParent) {
    if (arguments.length == 0) {
        var mt = {}
        for (var k in this.data) {
            mt[k] = this.data[k].meta ? this.data[k].meta : {}
        }
        return mt
    }
    var meta = this._getField(fieldName).meta
    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '')
        return meta[key]
    else if (typeof fetchParent == 'undefined' || fetchParent != false)
        return this.parent.getMeta(fieldName, key)
    return undefined;
}

/**
 *设置row中某一列的属性
 */
Row.fn.setMeta = function (fieldName, key, value) {
    var meta = this._getField(fieldName).meta
    if (!meta)
        meta = this._getField(fieldName).meta = {}
    var oldValue = meta[key]
    if (eq(oldValue, value)) return;
    meta[key] = value
    //this.metaChange(- this.metaChange())
    if (this.metaChange[fieldName + '.' + key]) {
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    }

    if (key == 'enable')
        this.parent.enableChange(-this.parent.enableChange())
    if (this.parent.getCurrentRow() == this) {
        if (this.parent.metaChange[fieldName + '.' + key])
            this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
        this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            oldValue: oldValue,
            newValue: value
        });
        //this.parent.metaChange(- this.parent.metaChange())
    }
    this.parent.trigger(DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });

    this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });
}

/**
 * [_setData description]
 * @param {[type]} sourceData 
 * @param {[type]} targetData 
 * @param {[type]} subscribe  
 * @param {[type]} parentKey  [父项key，数据项为数组时获取meta值用]
 */
Row.fn._setData = function(sourceData, targetData, subscribe, parentKey){
    for (var key in sourceData) {
    	var _parentKey = parentKey || null;
        //if (targetData[key]) {
        targetData[key] = targetData[key] || {};
        var valueObj = sourceData[key]
        if (typeof valueObj != 'object')
            this.parent.createField(key);
        //if (typeof this.parent.meta[key] === 'undefined') continue;
        if (valueObj == null ||  typeof valueObj != 'object'){
            targetData[key]['value'] = this.formatValue(key, valueObj)
            if (subscribe === true && (oldValue !== targetData[key]['value'])){
                    this._triggerChange(key, oldValue);
                }
        }
        else {
            if (valueObj.error) {
                u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
            } else if (valueObj.value || valueObj.value === null  || valueObj.meta || valueObj.value === '' || valueObj.value === '0' || valueObj.value === 0){
                var oldValue = targetData[key]['value'];
                targetData[key]['value'] = this.formatValue(key, valueObj.value)
                if (subscribe === true && (oldValue !== targetData[key]['value'])){
                    this._triggerChange(key, oldValue);
                }
                for (var k in valueObj.meta) {
                    this.setMeta(key, k, valueObj.meta[k])
                }
            }else if (u.isArray(valueObj)){
                targetData[key].isChild = true;
                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                var _key = _parentKey == null ? key : _parentKey + '.' + key;
                var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + _key
              if(this.parent.meta[_key]){
            	var meta = this.parent.meta[_key]['meta']
                targetData[key].value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta});
                targetData[key].value.setSimpleData(valueObj);
              }
            }else{
            	_parentKey = _parentKey == null ? key : _parentKey + '.' + key;
                this._setData(valueObj, targetData[key], null, _parentKey);
            }
        }
        //}
    }

}

/**
 *设置Row数据
 *@subscribe 是否触发监听  
 */
Row.fn.setData = function (data, subscribe) {
    this.status = data.status
    var sourceData = data.data,
        targetData = this.data;
    if (this.parent.root.strict != true){
        this._setData(sourceData, targetData,subscribe);
        return;
    }

    // strict 为true 时 ，定义dataTable的时候必须定义所有字段信息才能设置数据。
    var meta = this.parent.meta;
    for (var key in meta){
        var oldValue = newValue = null;
        //子数据
        if (meta[key]['type'] && meta[key]['type'] === 'child'){
            targetData[key].isChild = true;
            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key
            var meta = this.parent.meta[key]['meta']
            targetData[key].value = new u.DataTable({root:this.parent.root,ns:ns,meta:meta});
            if (typeof sourceData[key] === 'object')
                targetData[key].value.setSimpleData(sourceData[key]);
        }
        //存在多级关系
        else if (key.indexOf('.') != -1){
            var keys = key.split('.');
            var _fieldValue = sourceData;
            var _targetField = targetData;
            for(var i = 0; i< keys.length; i++){
                _fieldValue = _fieldValue || {};
                _fieldValue = _fieldValue[keys[i]];
                _targetField = _targetField[keys[i]];
            }
            oldValue = _targetField['value'];
            _targetField['value'] = this.formatValue(key, _fieldValue)
            newValue = _targetField['value'];
        }
        // 通过 setSimpleData 设置的数据
        else if (sourceData[key] == null ||  typeof sourceData[key] != 'object'){
            oldValue = targetData[key]['value'];
            targetData[key]['value'] = this.formatValue(key, sourceData[key])
            newValue = targetData[key]['value'];
        }
        else{
            var valueObj = sourceData[key];
            if (valueObj.error) {
                u.showMessageDialog({title: "警告", msg: valueObj.error, backdrop: true});
            } else if (valueObj.value || valueObj.value === null || valueObj.meta){
                oldValue = targetData[key]['value'];
                targetData[key]['value'] = this.formatValue(key, valueObj.value)
                newValue = targetData[key]['value'];
                for (var k in valueObj.meta) {
                    this.setMeta(key, k, valueObj.meta[k])
                }
            }
        }
        if (subscribe === true && (oldValue !== newValue)){
            this._triggerChange(key, oldValue);
        }

    }
};



Row.fn.setSimpleData = function(data, status){
    var allData = {};
    allData.data = data;
    allData.status = status || 'nrm';
    this.setData(allData, true);
    this.currentRowChange(-this.currentRowChange());
}


/**
 * 格式化数据值
 * @private
 * @param {Object} field
 * @param {Object} value
 */
Row.fn.formatValue = function (field, value) {
    var type = this.parent.getMeta(field, 'type')
    if (!type) return value
    if (type == 'date' || type == 'datetime') {
        return _formatDate(value)
    }
    return value
}

Row.fn.updateRow = function (row) {
    this.setData(row)
}

/**
 * @private
 * 提交数据到后台
 */
/**
 * @private
 * 提交数据到后台
 */
Row.fn.getData = function () {
    var data = ko.toJS(this.data)
    var meta = this.parent.getMeta()
    for (var key in meta) {
        if (meta[key] && meta[key].type) {
            if (meta[key].type == 'date' || meta[key].type == 'datetime') {
                if(key.indexOf('.')>0){//大于0说明是多级json
                    var keys=key.split('.');
                    var _keyValue=data;
                    for(var i=0,count=keys.length;i<count;i++){
                        _keyValue=_keyValue[keys[i]];
                    }
                    _keyValue.value =_dateToUTCString(_keyValue.value);
                  
                }else{
                    data[key].value = _dateToUTCString(data[key].value)
                }
            } else if(meta[key].type == 'child') {
                var chiddt = this.getValue(key),
                    rs = chiddt.rows(),
                    cds = [];
                for(var i=0;i < rs.length;i++) {
                    cds.push(rs[i].getData());
                }
                data[key].value = JSON.stringify(cds);
            }
        }
    }
    return {'id': this.rowId, 'status': this.status, data: data}
}

Row.fn.getEmptyData = function () {
    return {'id': this.rowId, 'status': this.status, data: {}}
};

Row.fn._getSimpleData = function(data){
    var _data = {};
    var meta = this.parent.getMeta() || {};
    for(var key in data){
        if (key === 'meta' || u.isEmptyObject(data[key])){
            continue;
        }else if (data[key].isChild) {
            _data[key] = data[key].value?data[key].value.getSimpleData():{};
        }else if (key === '$data'){  //处理一维数组： [1,2,3]
            _data = data[key].value
        }else if (typeof data[key].value !== 'undefined'){
           //如果类型为boolean，无论值为false、true都应该等于他本身
            if(meta[key] && meta[key].type==='boolean'){
                _data[key] = data[key].value?true:false;//默认值可能是null
            }else{
                _data[key] = data[key].value;
            }
            if (meta[key] && meta[key].type) {
                if (meta[key].type == 'date' || meta[key].type == 'datetime') {

                    _data[key] = _dateToUTCString(data[key].value)
                }
            }
        }
        // else if(typeof data[key].value !== 'undefined'){
        //     _data[key] = undefined;
        // }
        else{
            _data[key] = this._getSimpleData(data[key])
        }
    }
    return _data;

}

Row.fn.getSimpleData = function(options){
    options = options || {}
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = this.data;
    var _data = this._getSimpleData(data); //{};
    var _fieldsData = {};
    if (fields){
        for (var key in _data){
            if (fields.indexOf(key) != -1){
                _fieldsData[key] = _data[key];
            }
        }
        return _fieldsData;
    }
    // for (var key in meta) {
    //    if (fields && fields.indexOf(key) == -1)
    //        continue;
    //    if (meta[key] && meta[key].type) {
    //        if (meta[key].type == 'date' || meta[key].type == 'datetime') {
    //            data[key].value = _dateToUTCString(data[key].value)
    //        }
    //    }
    //    _data[key] = data[key].value;
    // }
    return _data;

};

Row.fn._findField = function(fieldName){
    var rat = this.data[fieldName];
    if (!rat) {
        var fnames = fieldName.split('.'); //多级field
        if (fnames.length > 1){
            var tempField = this.data
            for (var i = 0; i < fnames.length; i++){
                tempField = tempField[fnames[i]];
                if (!tempField){
                    break;
                }
            }
            rat = tempField;
        }
    }
    return rat || null;

}

Row.fn._getField = function (fieldName) {
    var rat = this._findField(fieldName);
    if (!rat) {
        var msg = 'field:' + fieldName + ' not exist in dataTable:' + this.parent.root.id + '!'
        console.error(msg);
        throw new Error(msg);
    }
    return rat;
}


/*
 * 生成随机行id
 * @private
 */
Row.getRandomRowId = function () {
    var _id = setTimeout(function () {})
    return  _id + '';
};

var _formatDate = function (value) {
    if (!value) return value
    var date = new Date();
    date.setTime(value);
    //如果不能转为Date 直接返回原值
    if (isNaN(date)){
        return value
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (parseInt(month) < 10) month = "0" + month;
    var day = date.getDate();
    if (parseInt(day) < 10) day = "0" + day;
    var hours = date.getHours();
    if (parseInt(hours) < 10) hours = "0" + hours;
    var minutes = date.getMinutes();
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    var seconds = date.getSeconds();
    if (parseInt(seconds) < 10) seconds = "0" + seconds;
    var mill = date.getMilliseconds();
    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds ; //+ "." + mill;
    return formatString;
}

var _dateToUTCString = function (date) {
    if (!date) return ''
    if(typeof date==='number')
        return date
    if (date.indexOf("-") > -1)
        date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
}


u.Row = Row;
u.DataTable = DataTable;
