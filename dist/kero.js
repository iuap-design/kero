/**
 * kero v3.2.5
 * 
 * author : yonyou FED
 * homepage : https://github.com/iuap-design/kero#readme
 * bugs : https://github.com/iuap-design/kero/issues
 */

(function (exports) {
'use strict';

/**
 * Module : Sparrow extend enum
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

var U_LANGUAGES = "i_languages";
var U_THEME = "u_theme";
var U_LOCALE = "u_locale";
var U_USERCODE = "usercode";
var enumerables = true;
var enumerablesTest = {
		toString: 1
	};
for(var i in enumerablesTest) {
	enumerables = null;
}
if(enumerables) {
	enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
		'toLocaleString', 'toString', 'constructor'
	];
}

/**
 * Module : Sparrow extend
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
var extend = function(object, config) {
	var args = arguments,
		options;
	if(args.length > 1) {
		for(var len = 1; len < args.length; len++) {
			options = args[len];
			if(object && options && typeof options === 'object') {
				var i, j, k;
				for(i in options) {
					object[i] = options[i];
				}
				if(enumerables) {
					for(j = enumerables.length; j--;) {
						k = enumerables[j];
						if(options.hasOwnProperty && options.hasOwnProperty(k)) {
							object[k] = options[k];
						}
					}
				}
			}
		}
	}
	return object;
};

if(!Object.assign){
	Object.assign = extend;
}

/**
 * Module : kero DataTable copyRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 在指定index位置插入单条数据行
 * @memberof DataTable
 * @param  {number} index 数据行插入之后的位置
 * @param  {object} row   数据行信息
 * @example
 * var row = {
 *    field1:'value1'
 * }
 * datatable.copyRow(1,row)
 */
var copyRow = function copyRow(index, row) {
    this.copyRows(index, [row]);
};

/**
 * 在指定index位置插入多条数据行
 * @memberof DataTable
 * @param  {number} index 数据行插入之后的位置
 * @param  {array} rows   存储数据行信息的数组
 * @example
 * var row1 = {
 *    field1:'value1'
 * }
 * var row2 = {
 *    field1:'value1'
 * }
 * datatable.copyRow(1,[row1,row2])
 */
var copyRows = function copyRows(index, rows) {
    for (var i = 0; i < rows.length; i++) {
        var newRow = new Row({
            parent: this
        });
        if (rows[i]) {
            newRow.setData(rows[i].getData());
        }
        this.insertRows(index === undefined ? this.rows().length : index, [newRow]);
    }
};

var copyRowFunObj = {
    copyRow: copyRow,
    copyRows: copyRows
};

/**
 * Module : kero DataTable data
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 设置数据信息
 * @memberof DataTable
 * @param {object} data    需要设置的数据信息，必须包含rows或者pages属性
 * @param {array} [data.rows]    数据信息中的行信息数组
 * @param {array} [data.pages]    数据信息中的page对象数组
 * @param {number} [data.pageIndex=DataTable对象当前的页码]    数据信息中的当前页码
 * @param {number} [data.pageSize=DataTable对象当前的每页显示条数]    数据信息中的每页显示条数
 * @param {number} [data.totalPages=DataTable对象当前的总页数]    数据信息中的总页数
 * @param {number} [data.totalRow=如果存在rows则为rows的长度，否则为DataTable对象当前的总条数]    数据信息中的总条数
 * @param {number} [data.select]    数据信息中的选中行行号
 * @param {number} [data.focus]    数据信息中的focus行行号
 * @param {object} options 设置数据时的配置参数
 * @param {boolean} options.unSelect=false 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
 * @example
 * // 不包含分页的情况
 * var data = {
 *    pageIndex:0,
 *    pageSize:5,
 *    totalPages:5,
 *    totalRow:22,
 *    rows:[{
 *      id:'r41201', // 如果需要添加
 *      status:'nrm', // 如果需要添加
 *      data:{
 *          field1:'value1',
 *          field2:'value2'
 *        }
 *    },{
 *      id:'r41202',
 *      status:'nrm',
 *      data:{
 *          field1:'value11',
 *          field2:'value21'
 *        }
 *    },...],
 *    select:[0]
 * }
 * // 包含分页的情况
 * var data = {
 *    pageIndex:0,
 *    pageSize:5,
 *    totalPages:5,
 *    totalRow:22,
 *    pages:[{
 *      index: 0,
 *      select: [],
 *      current: -1,
 *      rows:[{
 *        id:'r41201', // 如果需要添加
 *        status:'nrm', // 如果需要添加
 *        data:{
 *          field1:'value1',
 *          field2:'value2'
 *        }
 *      },{
 *        id:'r41202',
 *        status:'nrm',
 *        data:{
 *          field1:'value11',
 *          field2:'value21'
 *        }
 *      },...]
 *    },...],
 * }
 * var op = {
 *     unSelect:true
 * }
 * datatable.setData(data,op)
 */
var setData = function setData(data, options) {
    if (data.pageIndex || data.pageIndex === 0) {
        var newIndex = data.pageIndex;
    } else {
        var newIndex = this.pageIndex();
    }
    if (data.pageSize || data.pageSize === 0) {
        var newSize = data.pageSize;
    } else {
        var newSize = this.pageSize();
    }
    if (data.totalPages || data.totalPages === 0) {
        var newTotalPages = data.totalPages;
    } else {
        var newTotalPages = this.totalPages();
    }
    if (data.totalRow || data.totalRow === 0) {
        var newTotalRow = data.totalRow;
    } else {
        if (data.rows) var newTotalRow = data.rows.length;else var newTotalRow = this.totalRow();
    }
    var select,
        focus,
        unSelect = options ? options.unSelect : false;

    this.pageIndex(newIndex);
    this.pageSize(newSize);

    this.pageCache = data.pageCache || this.pageCache;
    if (this.pageCache === true) {
        this.updatePages(data.pages);
        if (newIndex != this.pageIndex()) {
            this.setCurrentPage(newIndex, true);
            this.totalPages(newTotalPages);
            this.totalRow(newTotalRow + this.newCount);
            return;
        } else {
            // 首先删除数据，然后将当前页数据插入
            this.removeAllRows();
            select = this.getPage(newIndex).selectedIndices;
            focus = this.getPage(newIndex).focus;
            var rows = this.setRows(this.getPage(newIndex).rows, options);
            this.getPage(newIndex).rows = rows;
        }
        // 后台传入totalPages及totalRow才进行更新
        if (data.totalPages) {
            this.totalPages(data.totalPages);
        }
        if (data.totalRow || data.totalRow === 0) {
            this.totalRow(data.totalRow + this.newCount);
        }
    } else {
        select = data.select || (!unSelect ? [0] : []);
        focus = data.focus !== undefined ? data.focus : data.current;
        this.setRows(data.rows, options);
        this.totalPages(newTotalPages);
        this.totalRow(newTotalRow);
    }

    this.updateSelectedIndices();

    if (select && select.length > 0 && this.rows().length > 0) this.setRowsSelect(select);
    if (focus !== undefined && this.getRow(focus)) this.setRowFocus(focus);
};

/**
 * 设置对应行对应字段的值
 * @memberof DataTable
 * @param {string} fieldName 需要设置的字段
 * @param {string} value     需要设置的值
 * @param {u.row} [row=当前行] 需要设置的u.row对象，
 * @param {*} [ctx]        自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置
 * @param {string} validType 传递值的字符类型，如string，integer等
 * @example
 * datatable.setValue('filed1','value1') //设置当前行字段值
 * var row = datatable.getRow(1)
 * datatable.setValue('filed1','value1',row) //设置在指定行字段值
 * datatable.setValue('filed1','value1',row,'ctx') //设置在指定行字段值，同时传入自定义数据
 */
var setValue = function setValue(fieldName, value, row, ctx, validType) {
    if (arguments.length === 1) {
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow();
    if (row) row.setValue(fieldName, value, ctx, undefined, validType);
};

/**
 * 重置所有行的数据至nrm状态时的数据
 */
var resetAllValue = function resetAllValue() {
    var rows = new Array();
    rows = rows.concat(this.rows());
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        this.resetValueByRow(row);
    }
};

/**
 * 根据row对象重置数据至nrm状态时的数据
 * @param {u.row} row 需要重置数据的row对象
 */
var resetValueByRow = function resetValueByRow(row) {
    if (row.status == Row.STATUS.NEW) {
        this.setRowsDelete(row);
    } else if (row.status == Row.STATUS.FALSE_DELETE) {
        row.status = Row.STATUS.NORMAL;
        var rows = [row];
        this.trigger(DataTable.ON_INSERT, {
            index: 0,
            rows: rows
        });
    } else if (row.status == Row.STATUS.UPDATE) {
        row.status = Row.STATUS.NORMAL;
        row.resetValue();
    }
};
var dataFunObj = {
    setData: setData,
    setValue: setValue,
    resetAllValue: resetAllValue,
    resetValueByRow: resetValueByRow
};

/**
 * Module : kero DataTable enable
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 判断DataTable或指定字段是否可修改
 * @memberof DataTable
 * @param  {string}  [fieldName] 需要进行判断的字段值
 * @return {boolean}  DataTable/指定字段是否可修改
 * @example
 * datatable.isEnable() //获取datatable是否可修改
 * datatable.isEnable('field1') //获取字段field1是否可修改
 */
var isEnable = function isEnable(fieldName) {
    var fieldEnable = this.getMeta(fieldName, 'enable');
    if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
    return fieldEnable && this.enable;
};

/**
 * 设置DataTable是否可修改
 * @memberof DataTable
 * @param {boolean} enable true表示可修改，否则表示不可修改
 * @example
 * datatable.setEnable(true)
 */
var setEnable = function setEnable(enable) {
    if (this.enable == enable) return;
    //当传入的参数不为false时，默认enable为true
    if (enable === false) {
        enable = false;
    } else {
        enable = true;
    }
    this.enable = enable;
    this.enableChange(-this.enableChange());
    this.trigger(DataTable.ON_ENABLE_CHANGE, {
        enable: this.enable
    });
};

var enableFunObj = {
    isEnable: isEnable,
    setEnable: setEnable
};

/**
 * Module : kero DataTable getCurrent
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取DataTable对象的当前行
 * @memberof DataTable
 * @return {null|u.Row} DataTable对象的当前行
 * @example
 * datatable.getCurrentRow()
 */
var getCurrentRow = function getCurrentRow() {
    if (this.focusIndex() != -1) return this.getFocusRow();
    var index = this.getSelectedIndex();
    if (index == -1) return null;else return this.getRow(index);
};
/**
 * 获取DataTable对象的当前行对应的index
 * @memberof DataTable
 * @return {number} DataTable对象的当前行对应的index
 * @example
 * datatable.getCurrentIndex()
 */
var getCurrentIndex = function getCurrentIndex() {
    if (this.focusIndex() != -1) return this.focusIndex();
    var index = this.getSelectedIndex();
    if (index == -1) return -1;else return index;
};

var getCurrentFunObj = {
    getCurrentRow: getCurrentRow,
    getCurrentIndex: getCurrentIndex
};

/**
 * Module : kero DataTable getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */

/**
 * 获取DataTable的数据信息
 * @memberof DataTable
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * datatable.getData()
 */
var getData = function getData() {
    var datas = [],
        rows = this.rows();
    for (var i = 0; i < rows.length; i++) {
        datas.push(rows[i].getData());
    }
    return datas;
};

// 将page转为row对象格式
var page2data = function page2data(page, pageIndex) {
    var data = {};
    data.focus = page.focus;
    data.index = pageIndex;
    data.select = page.selectedIndices;
    return data;
};

/**
 * 按照特定规则获取数据
 * @memberof DataTable
 * @param  {string} rule
 * DataTable.SUBMIT.current('current') ：当前选中行
 * DataTable.SUBMIT.focus('focus') ：当前focus行
 * DataTable.SUBMIT.all('all') ：所有行
 * DataTable.SUBMIT.select('select') ：当前页选中行
 * DataTable.SUBMIT.change('change') ：发生改变的行
 * DataTable.SUBMIT.empty('empty') ：不获取数据，返回空数组
 * DataTable.SUBMIT.allSelect('allSelect') ：所有页选中行
 * DataTable.SUBMIT.allPages('allPages') ：所有页的数据
 * @return {array}      按照规则获取到的数据信息
 * @example
 * datatable.getDataByRule(‘all’)
 */

var getDataByRule = function getDataByRule(rule) {
    var returnData = {},
        datas = null,
        rows;
    returnData.meta = this.meta;
    returnData.params = this.params;
    rule = rule || DataTable.SUBMIT.current;
    // 存在多页及不存在多页分开处理
    if (this.pageCache) {
        var pages = this.getPages();
        if (rule == DataTable.SUBMIT.current || rule == DataTable.SUBMIT.focus) {
            datas = [];
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if (currPage) {
                var currIndex = this.focusIndex();
                if (rule == DataTable.SUBMIT.current) {
                    if (currIndex == -1) currIndex = this.getSelectedIndex();
                }
                var data = page2data(currPage, pageIndex);
                data.rows = [];
                for (var i = 0, count = currPage.rows.length; i < count; i++) {
                    var row = currPage.rows[i].getData();
                    if (i != currIndex) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.all || rule == DataTable.SUBMIT.allPages) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var i = 0; i < currPage.rows.length; i++) {
                    data.rows.push(currPage.rows[i].getData());
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.select) {
            datas = [];
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if (currPage) {
                var data = page2data(currPage, pageIndex);
                data.rows = [];
                for (var i = 0, count = currPage.rows.length; i < count; i++) {
                    var row = currPage.rows[i].getData();
                    if (data.select.indexOf(i) < 0) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.allSelect) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var j = 0, count = currPage.rows.length; j < count; j++) {
                    var row = currPage.rows[j].getData();
                    if (data.select.indexOf(j) < 0) row.data = {};
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule == DataTable.SUBMIT.change) {
            datas = [];
            for (var i = 0; i < pages.length; i++) {
                var currPage = pages[i];
                var data = page2data(currPage, i);
                data.rows = [];
                for (var j = 0, count = currPage.rows.length; j < count; j++) {
                    var row = currPage.rows[j].getData();
                    if (row.status == Row.STATUS.NORMAL) {
                        row.data = {};
                    }
                    data.rows.push(row);
                }
                datas.push(data);
            }
        } else if (rule === DataTable.SUBMIT.empty) {
            datas = [];
        }
        if (pages.length < 1 || !pages[this.pageIndex()]) {
            datas = [{
                index: this.pageIndex(),
                select: [],
                focus: -1,
                rows: []
            }];
        }
        returnData.pages = datas;
    } else {
        if (rule == DataTable.SUBMIT.current) {
            datas = [];
            var currIndex = this.focusIndex();
            if (currIndex == -1) currIndex = this.getSelectedIndex();
            rows = this.rows();
            for (var i = 0, count = rows.length; i < count; i++) {
                if (i == currIndex) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
            }
        } else if (rule == DataTable.SUBMIT.focus) {
            datas = [];
            rows = this.rows();
            for (var i = 0, count = rows.length; i < count; i++) {
                if (i == this.focusIndex()) datas.push(rows[i].getData());else datas.push(rows[i].getEmptyData());
            }
        } else if (rule == DataTable.SUBMIT.all) {
            datas = this.getData();
        } else if (rule == DataTable.SUBMIT.select) {
            datas = this.getSelectedDatas(true);
        } else if (rule == DataTable.SUBMIT.change) {
            datas = this.getChangedDatas();
        } else if (rule === DataTable.SUBMIT.empty) {
            datas = [];
        }

        returnData.rows = datas;
        returnData.select = this.getSelectedIndexs();
        returnData.focus = this.getFocusIndex();
    }

    returnData.pageSize = this.pageSize();
    returnData.pageIndex = this.pageIndex();
    returnData.isChanged = this.isChanged();
    returnData.master = this.master;
    returnData.pageCache = this.pageCache;
    return returnData;
};

/**
 * 根据索引获取指定行数据信息
 * @memberof DataTable
 * @param  {number} index 需要获取的数据信息的索引
 * @return {object}      获取到的指定行数据信息
 * @example
 * datatable.getRow(1)
 */
var getRow = function getRow(index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index];
};

// 获取子表的数据行
var getChildRow = function getChildRow(obj) {
    var fullField = obj.fullField,
        index = obj.index,
        row = null;
    if (parseInt(index) > -1) {
        if ((index + '').indexOf('.') > 0) {
            var fieldArr = fullField.split('.');
            var indexArr = index.split('.');
            var nowDataTable = this;
            var nowRow = null;
            for (var i = 0; i < indexArr.length; i++) {
                nowRow = nowDataTable.getRow(indexArr[i]);
                if (i < indexArr.length - 1) {
                    if (nowRow) {
                        nowDataTable = nowRow.getValue(fieldArr[i]);
                    } else {
                        nowRow = null;
                        break;
                    }
                }
            }
            row = nowRow;
        } else {
            row = this.getRow(index);
        }
    }
    return row;
};

/**
 * 根据rowid获取Row对象
 * @memberof DataTable
 * @param {string} rowid 需要获取的Row对应的rowid
 * @returns {Row}
 * @example
 * datatable.getRowByRowId('rowid')
 */
var getRowByRowId = function getRowByRowId(rowid) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowid) return rows[i];
    }
    return null;
};

/**
 * 获取Row对象对应的索引
 * @memberof DataTable
 * @param {u.Row} 需要获取索引的row对象
 * @returns {*}
 * @example
 * var row = datatable.getRow(1)
 * datatable.getRowIndex(row) // 1
 */
var getRowIndex = function getRowIndex(row) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId) return i;
    }
    return -1;
};

/**
 * 根据字段及字段值获取所有数据行
 * @memberof DataTable
 * @param  {string} field 需要获取行的对应字段
 * @param  {string} value 需要获取行的对应字段值
 * @return {array}      根据字段及字段值获取的所有数据行
 * @example
 * datatable.getRowsByField('field1','value1')
 */
var getRowsByField = function getRowsByField(field, value) {
    var rows = this.rows.peek();
    var returnRows = new Array();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) returnRows.push(rows[i]);
    }
    return returnRows;
};

/**
 * 根据多个字段及字段值获取所有数据行
 * @memberof DataTable
 * @param  {string} fields 需要获取行的对应字段及对应值数组
 * @return {array}      根据字段及字段值获取的所有数据行
 * @example
 * datatable.getRowsByFields([{field:'field1',value:'value1'},{field:'field2',value:'value2'}])
 */
var getRowsByFields = function getRowsByFields(fileds) {
    var rows = this.rows.peek();
    var returnRows = new Array();
    if (fileds && fileds.length > 0) {
        for (var i = 0, count = rows.length; i < count; i++) {
            var matchCount = 0;
            var l = fileds.length;
            for (var j = 0; j < l; j++) {
                if (rows[i].getValue(fileds[j]['field']) === fileds[j]['value']) matchCount++;
            }
            if (matchCount == l) returnRows.push(rows[i]);
        }
    }
    return returnRows;
};

/**
 * 根据字段及字段值获取第一条数据行
 * @memberof DataTable
 * @param  {string} field 需要获取行的对应字段
 * @param  {string} value 需要获取行的对应字段值
 * @return {u.Row}      根据字段及字段值获取第一条数据行
 * @example
 * datatable.getRowByField('field1','value1')
 */
var getRowByField = function getRowByField(field, value) {
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value) return rows[i];
    }
    return null;
};

/**
 * 获取当前页的所有数据行
 * @memberof DataTable
 * @return {array} 获取到的数据行
 * @example
 * datatable.getAllRows()
 */
var getAllRows = function getAllRows() {
    return this.rows.peek();
};

/**
 * 获取所有页的所有数据行
 * @memberof DataTable
 * @return {array} 获取到的数据行
 * @example
 * datatable.getAllPageRows()
 */
var getAllPageRows = function getAllPageRows() {
    var datas = [],
        rows;
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
};

/**
 * 获取发生变化的数据信息
 * @memberof DataTable
 * @param  {boolean} withEmptyRow=false 未发生变化的数据是否使用空行代替，true表示以空行代替未发生变化行，false相反
 * @return {array}            发生变化的数据信息
 * @example
 * datatable.getChangedDatas()
 */
var getChangedDatas = function getChangedDatas(withEmptyRow) {
    var datas = [],
        rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            datas.push(rows[i].getData());
        } else if (withEmptyRow == true) {
            datas.push(rows[i].getEmptyData());
        }
    }
    return datas;
};

/**
 * 获取发生改变的Row对象
 * @memberof DataTable
 * @return {array} 发生改变的Row对象
 * @example
 * datatable.getChangedRows()
 */
var getChangedRows = function getChangedRows() {
    var changedRows = [],
        rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i]);
        }
    }
    return changedRows;
};

var getDeleteRows = function getDeleteRows() {
    var deleteRows = [],
        rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status == Row.STATUS.FALSE_DELETE) {
            deleteRows.push(rows[i]);
        }
    }
    return deleteRows;
};

/**
 * 根据字段获取对应Row对象的字段值
 * @memberof DataTable
 * @param  {string} fieldName 需要获取的值对应的字段
 * @param  {u.Row} [row=默认为当前行]     对应的数据行
 * @return {string}     获取到的字段值
 * @example
 * datatable.getValue('field1')
 * var row = datatable.getRow(1)
 * datatable.getValue('field1',row)
 */
var getValue = function getValue(fieldName, row) {
    row = row || this.getCurrentRow();
    if (row) return row.getValue(fieldName);else return '';
};

/**
 * 根据行号获取行索引
 * @memberof DataTable
 * @param {String} rowId
 * @example
 * datatable.getIndexByRowId('rowid')
 */
var getIndexByRowId = function getIndexByRowId(rowId) {
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId == rowId) return i;
    }
    return -1;
};

/**
 * 获取所有行数据信息
 * @memberof DataTable
 * @return {array} 所有行数据信息
 * @example
 * datatable.getAllDatas()
 */
var getAllDatas = function getAllDatas() {
    var rows = this.getAllRows();
    var datas = [];
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i]) datas.push(rows[i].getData());
    }return datas;
};

/**
 * 根据索引获取rowid
 * @memberof DataTable
 * @param  {array} indices 需要获取rowid的索引值
 * @return {array}         获取到的rowid
 * @example
 * datatable.getRowIdsByIndices([1,2,5])
 */
var getRowIdsByIndices = function getRowIdsByIndices(indices) {
    var rowIds = [];
    for (var i = 0; i < indices.length; i++) {
        if (this.getRow(indices[i])) rowIds.push(this.getRow(indices[i]).rowId);
    }
    return rowIds;
};
/**
 * 根据索引获取row
 * @memberof DataTable
 * @param  {array} indices 需要获取rowid的索引值
 * @return {array}         获取到的row
 * @example
 * datatable.getRowIdsByIndices([1,2,5])
 */
var getRowsByIndices = function getRowsByIndices(indices) {
    var rows = [];
    for (var i = 0; i < indices.length; i++) {
        rows.push(this.getRow(indices[i]));
    }
    return rows;
};

var getDataFunObj = {
    getData: getData,
    getDataByRule: getDataByRule,
    getRow: getRow,
    getChildRow: getChildRow,
    getRowByRowId: getRowByRowId,
    getRowIndex: getRowIndex,
    getRowsByField: getRowsByField,
    getRowByField: getRowByField,
    getAllRows: getAllRows,
    getAllPageRows: getAllPageRows,
    getChangedDatas: getChangedDatas,
    getChangedRows: getChangedRows,
    getDeleteRows: getDeleteRows,
    getValue: getValue,
    getIndexByRowId: getIndexByRowId,
    getAllDatas: getAllDatas,
    getRowIdsByIndices: getRowIdsByIndices,
    getRowsByIndices: getRowsByIndices,
    getRowsByFields: getRowsByFields
};

/**
 * Module : kero dataTable getFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取焦点行
 * @memberof DataTable
 * @return {u.Row} 焦点行
 * @example
 * datatable.getFocusRow()
 */
var getFocusRow = function getFocusRow() {
    if (this.focusIndex() != -1) return this.getRow(this.focusIndex());else return null;
};

/**
 * 获取焦点行索引
 * @memberof DataTable
 * @return {number} 焦点行索引
 * @example
 * datatable.getFocusIndex()
 */
var getFocusIndex = function getFocusIndex() {
    return this.focusIndex();
};

var getFocusFunObj = {
    getFocusRow: getFocusRow,
    getFocusIndex: getFocusIndex
};

/**
 * Module : kero dataTable getMete
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 获取meta信息
 * @memberof DataTable
 * @param  {string} [fieldName] 需要获取的字段
 * @param  {string} [key]       需要获取的字段指定meta信息
 * @return {object}           meta信息
 * @example
 * datatable.getMeta() // 获取所有meta信息
 * datatable.getMeta('field1') // 获取field1所有meta信息
 * datatable.getMeta('field1','type') // 获取field1的key信息
 */
var getMeta = function getMeta(fieldName, key) {
    if (arguments.length === 0) return this.meta;else if (arguments.length === 1) return this.meta[fieldName];

    if (this.meta[fieldName] && typeof this.meta[fieldName][key] !== 'undefined') {
        return this.meta[fieldName][key];
    } else {
        return null;
    }
};

/**
 * 获取当前行的meta信息，如果不存在当前行则获取DataTable的meta信息
 * @memberof DataTable
 * @param  {string} [fieldName] 需要获取的字段
 * @param  {string} [key]       需要获取的字段指定meta信息
 * @return {object}           meta信息
 * @example
 * datatable.getRowMeta() // 获取当前行所有meta信息
 * datatable.getRowMeta('field1') // 获取当前行field1所有meta信息
 * datatable.getRowMeta('field1','type') // 获取当前行field1的key信息
 */
var getRowMeta = function getRowMeta(fieldName, key) {
    var row = this.getCurrentRow();
    if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
};

var getMetaFunObj = {
    getMeta: getMeta,
    getRowMeta: getRowMeta
};

/**
 * Module : kero dataTable getPage
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 获取指定索引的Page对象
 * @memberof DataTable
 * @param  {number} pageIndex 需要获取的page对应的索引
 * @return {Page|-1}           获取到的Page对象，不存在则返回-1
 * @example
 * datatable.getPage(1)
 */
var getPage = function getPage(pageIndex) {
    if (this.pageCache) {
        return this.cachedPages[pageIndex];
    }
    return -1;
};

/**
 * 获取所有的Page对象
 * @memberof DataTable
 * @return {array} 所有的Page对象
 * @example
 * datatable.getPages()
 */
var getPages = function getPages() {
    if (this.pageCache) {
        return this.cachedPages;
    }
    return [];
};

var getPageFunObj = {
    getPage: getPage,
    getPages: getPages
};

/**
 * Module : kero dataTable getParam
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 获取Param参数值
 * @memberof DataTable
 * @param  {string} key Param对应的key
 * @return {*}     Param参数值
 * @example
 * datatable.getParam('param1')
 */
var getParam = function getParam(key) {
  return this.params[key];
};

var getParamFunObj = {
  getParam: getParam
};

/**
 * Module : kero dataTable getSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */

/**
 * 获取选中行索引，多选时，只返回第一个行索引
 * @memberof DataTable
 * @return {number} 选中行索引
 * @example
 * datatable.getSelectedIndex()
 */
var getSelectedIndex = function getSelectedIndex() {
    var selectedIndices = this.selectedIndices();
    if (selectedIndices == null || selectedIndices.length == 0) return -1;
    return selectedIndices[0];
};

/**
 * 获取选中的所有行索引数组
 * @memberof DataTable
 * @return {array} 所有行索引数组
 * @example
 * datatable.getSelectedIndices()
 */
var getSelectedIndices = function getSelectedIndices() {
    var selectedIndices = this.selectedIndices();
    if (selectedIndices == null || selectedIndices.length == 0) return [];
    return selectedIndices;
};

// 兼容保留，不要用
var getSelectedIndexs = function getSelectedIndexs() {
    return this.getSelectedIndices();
};

/**
 * 获取选中行的数据信息
 * @memberof DataTable
 * @param  {boolean} [withEmptyRow=false] 未选中的数据是否使用空行代替，true表示以空行代替未选中行，false相反
 * @return {array}            发生变化的数据信息
 * @example
 * datatable.getSelectedDatas()
 * datatable.getSelectedDatas(true)
 */
var getSelectedDatas = function getSelectedDatas(withEmptyRow) {
    var selectedIndices = this.selectedIndices();
    var datas = [];
    var sIndices = [];
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i]);
    }
    var rows = this.rows();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1) datas.push(rows[i].getData());else if (withEmptyRow == true) datas.push(rows[i].getEmptyData());
    }
    return datas;
};

/**
 * 获取选中的Row对象
 * @memberof DataTable
 * @return {array} 选中的Row对象
 * @example
 * datatable.getSelectedRows()
 */
var getSelectedRows = function getSelectedRows() {
    var selectedIndices = this.selectedIndices();
    var selectRows = [];
    var rows = this.rows.peek();
    var sIndices = [];
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        sIndices.push(selectedIndices[i]);
    }
    for (var i = 0, count = rows.length; i < count; i++) {
        if (sIndices.indexOf(i) != -1) selectRows.push(rows[i]);
    }
    return selectRows;
};

var getAllPageSelectedRows = function getAllPageSelectedRows() {
    var rows = [];
    if (this.pageCache) {
        var pages = this.getPages();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page) {
                rows = rows.concat(page.getSelectRows());
            }
        }
    }
    return rows;
};

var getSelectFunObj = {
    getSelectedIndex: getSelectedIndex,
    getSelectedIndices: getSelectedIndices,
    getSelectedIndexs: getSelectedIndexs,
    getSelectedDatas: getSelectedDatas,
    getSelectedRows: getSelectedRows,
    getAllPageSelectedRows: getAllPageSelectedRows
};

/**
 * Module : kero dataTable getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

/**
 * 获取数据信息，只获取字段名与字段值
 * @memberof DataTable
 * @param  {object} [options] [description]
 * @param  {string} [options.type=all]    获取数据的规则
 * all：所有数据
 * current：当前行数据
 * focus：焦点行数据
 * select：选中行数据
 * change：发生改变的数据
 * @param  {array} [options.fields]    需要获取数据的字段名数组
 * @return {array}        获取到的数据信息
 * @example
 * datatable.getSimpleData() // 获取所有数据信息
 * datatable.getSimpleData({type:'current'}) // 获取当前行数据信息
 * datatable.getSimpleData({type:'current','fields':['filed1','field3']}) // 获取当前行field1和filed3数据信息
 */
var getSimpleData = function getSimpleData(options) {
    options = options || {};
    var rows,
        _rowData = [],
        type = options['type'] || 'all',
        fields = options['fields'] || null;

    if (type === 'current') {
        var currRow = this.getCurrentRow();
        rows = currRow == null ? [] : [currRow];
    } else if (type === 'focus') {
        var focusRow = this.getFocusRow();
        rows = focusRow == null ? [] : [focusRow];
    } else {
        if (this.pageCache) {
            var pages = this.getPages();
            rows = [];
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (page) {
                    if (type === 'all') {
                        rows = rows.concat(page.rows);
                    } else if (type === 'select') {
                        rows = rows.concat(page.getSelectRows());
                    } else if (type === 'change') {
                        rows = rows.concat(page.getChangedRows());
                    }
                }
            }
        } else {
            if (type === 'all') {
                rows = this.rows.peek();
            } else if (type === 'select') {
                rows = this.getSelectedRows();
            } else if (type === 'change') {
                rows = this.getChangedRows();
            }
        }
    }

    for (var i = 0; i < rows.length; i++) {
        _rowData.push(rows[i].getSimpleData({
            fields: fields
        }));
    }
    if (_rowData.length == 0) {
        _rowData = this.setSimpleDataReal; //云采提的#需求
    }
    return _rowData;
};

var getSimpleDataFunObj = {
    getSimpleData: getSimpleData
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Module : kero dataTable mete
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 设置meta信息
 * @memberof DataTable
 * @param {string} fieldName 需要设置meta信息的字段名
 * @param {string} key       meta信息的key
 * @param {string} value     meta信息的值
 * @example
 * datatable.setMeta('filed1','type','string')
 */
var setMeta = function setMeta(fieldName, key, value) {
    if (!this.meta[fieldName]) return;
    var oldValue = this.meta[fieldName][key];
    var currRow = this.getCurrentRow();
    this.meta[fieldName][key] = value;
    if (this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    if (key == 'enable') this.enableChange(-this.enableChange());
    this.trigger(DataTable.ON_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value
    });
    if (currRow && !currRow.getMeta(fieldName, key, false)) {
        this.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.id,
            oldValue: oldValue,
            newValue: value
        });
    }
};

/**
 * 更新meta信息，需要在对应的控件中去监听事件，该方式是想去动态的更改Datatable中的this.options里面的属性的值的配置
 * @memberof DataTable
 * @param  {object} meta 需要更新的meta信息
 * @example
 * var metaObj = {supplier: {meta: {precision:'3', default: '0239900x', display:'显示名称'}}}
 * datatable.updateMeta(metaObj)
 */
var updateMeta = function updateMeta(meta) {
    if (!meta) {
        return;
    }
    for (var fieldKey in meta) {
        for (var propKey in meta[fieldKey]) {
            var oldValue = this.meta[fieldKey][propKey];
            var newValue = meta[fieldKey][propKey];
            if (propKey === 'default') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {};
                }
                this.meta[fieldKey]['default'].value = meta[fieldKey][propKey];
            } else if (propKey === 'display') {
                if (!this.meta[fieldKey]['default']) {
                    this.meta[fieldKey]['default'] = {};
                }
                this.meta[fieldKey]['default'].display = meta[fieldKey][propKey];
            } else {
                this.meta[fieldKey][propKey] = meta[fieldKey][propKey];
            }
            if (this.metaChange[fieldKey + '.' + propKey]) this.metaChange[fieldKey + '.' + propKey](-this.metaChange[fieldKey + '.' + propKey]());

            this.trigger(DataTable.ON_META_CHANGE, {
                eventType: 'dataTableEvent',
                dataTable: this.id,
                field: fieldKey,
                meta: propKey,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }
};

// 字段不存在时创建字段，fieldName为需要创建的字段
// options.meta为对应的meta信息
var createField = function createField(fieldName, options) {
    //字段不主动定义，则不创建
    if (this.root.strict == true) return;
    //有子表的情况不创建字段
    if (fieldName.indexOf('.') != -1) {
        var fNames = fieldName.split('.');
        var _name = fNames[0];
        for (var i = 0, count = fNames.length; i < count; i++) {
            if (this.meta[_name] && this.meta[_name]['type'] === 'child') return;
            if (i + 1 < count) _name = _name + '.' + fNames[i + 1];
        }
    }
    if (!this.meta[fieldName]) {
        this.meta[fieldName] = {};
    }
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
        if (options['meta']) {
            for (var key in options['meta']) {
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName]['meta'][key] = options['meta'][key];
                //}
            }
        } else {
            for (var key in options) {
                //if (!this.meta[fieldName][key]){
                this.meta[fieldName][key] = options[key];
                //}
            }
        }
    }
    // 在顶层dataTable上定义field信息
    if (this.root !== this) {
        var nsArr = this.ns.split('.');
        var _fieldMeta = this.root.meta;
        for (var i = 0; i < nsArr.length; i++) {
            _fieldMeta[nsArr[i]] = _fieldMeta[nsArr[i]] || {};
            _fieldMeta[nsArr[i]]['type'] = _fieldMeta[nsArr[i]]['type'] || 'child';
            _fieldMeta[nsArr[i]]['meta'] = _fieldMeta[nsArr[i]]['meta'] || {};
            _fieldMeta = _fieldMeta[nsArr[i]]['meta'];
        }
        if (!_fieldMeta[fieldName]) {
            _fieldMeta[fieldName] = {};
        }
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            for (var key in options) {
                if (!_fieldMeta[fieldName][key]) {
                    _fieldMeta[fieldName][key] = options[key];
                }
            }
        }
    }
};

var metaFunObj = {
    setMeta: setMeta,
    updateMeta: updateMeta,
    createField: createField
};

/**
 * Module : kero dataTable page
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */

// 设置当前页
var setCurrentPage = function setCurrentPage(pageIndex, notCacheCurrentPage) {
    var nowTotalRow = this.totalRow();
    if (pageIndex != this.pageIndex() && notCacheCurrentPage != true) this.cacheCurrentPage();
    this.pageIndex(pageIndex);
    var cachedPage = this.cachedPages[this.pageIndex()];
    if (cachedPage) {
        // 取当前页的选中行重设选中行
        var selectedIndices = cachedPage.selectedIndices;
        this.removeAllRows();
        this.setRows(cachedPage.rows);
        this.setRowsSelect(selectedIndices);
    }
    this.totalRow(nowTotalRow);
};

// 更新分页信息，通过fire调用，不对外提供
var updatePages = function updatePages(pages) {
    var pageSize = this.pageSize(),
        pageIndex = 0,
        page,
        r,
        row;
    var page, index, i, rows, focus, selectIndices, status, j, row, originRow;
    for (i = 0; i < pages.length; i++) {
        index = pages[i].index;
        rows = pages[i].rows;
        focus = pages[i].current;
        selectIndices = pages[i].select;
        status = pages[i].status;
        if (status === 'del') {
            this.cachedPages[index] = null;
            continue;
        }
        if (!this.cachedPages[index]) {
            page = new Page({
                parent: this
            });
            page.rows = rows;
            for (var j = 0; j < page.rows.length; j++) {
                page.rows[j].rowId = page.rows[j].id;
                delete page.rows[j].id;
            }
            this.cachedPages[index] = page;
            page.selectedIndices = selectIndices;
            page.focus = focus;
        } else {
            page = this.cachedPages[index];
            page.selectedIndices = selectIndices;
            page.focus = focus;
            for (var j = 0; j < rows.length; j++) {
                r = rows[j];
                if (!r.id) r.id = Row.getRandomRowId();
                if (r.status == Row.STATUS.DELETE) {

                    var row = page.getRowByRowId(r.id);
                    if (row) {
                        // 针对后台不传回总行数的情况下更新总行数
                        var oldTotalRow = this.totalRow();
                        var newTotalRow = oldTotalRow - 1;
                        this.totalRow(newTotalRow);
                        if (row.status == Row.STATUS.NEW) {
                            this.newCount -= 1;
                            if (this.newCount < 0) this.newCount = 0;
                        }
                    }
                    this.removeRowByRowId(r.id);
                    page.removeRowByRowId(r.id);
                } else {
                    row = page.getRowByRowId(r.id);
                    if (row) {
                        page.updateRow(row, r);
                        // if(row.status == Row.STATUS.NEW){
                        //     // 针对后台不传回总行数的情况下更新总行数
                        //     var oldTotalRow = this.totalRow();
                        //     var newTotalRow = oldTotalRow + 1;
                        //     this.totalRow(newTotalRow);
                        // }
                        if (row.status == Row.STATUS.NEW && r.status != Row.STATUS.NEW) {
                            this.newCount -= 1;
                            if (this.newCount < 0) this.newCount = 0;
                        }
                        row.setStatus(Row.STATUS.NORMAL);
                        if (r.status == Row.STATUS.NEW) {
                            row.setStatus(Row.STATUS.NEW);
                        }
                    } else {
                        r.rowId = r.id;
                        delete r.id;
                        page.rows.push(r);
                        if (r.status != Row.STATUS.NEW) {
                            row.setStatus(Row.STATUS.NORMAL);
                        } else {
                            this.newCount += 1;
                        }
                        // 针对后台不传回总行数的情况下更新总行数
                        var oldTotalRow = this.totalRow();
                        var newTotalRow = oldTotalRow + 1;
                        this.totalRow(newTotalRow);
                    }
                }
            }
        }
    }
};

// 前端分页方法，不建议使用，建议在后端进行分页
var setPages = function setPages(allRows) {
    var pageSize = this.pageSize(),
        pageIndex = 0,
        page;
    this.cachedPages = [];
    for (var i = 0; i < allRows.length; i++) {
        pageIndex = Math.floor(i / pageSize);
        if (!this.cachedPages[pageIndex]) {
            page = new Page({
                parent: this
            });
            this.cachedPages[pageIndex] = page;
        }
        page.rows.push(allRows[i]);
    }
    if (this.pageIndex() > -1) this.setCurrentPage(this.pageIndex());
    this.totalRow(allRows.length);
    this.totalPages(pageIndex + 1);
};

// 判断是否存在索引对应的Page
var hasPage = function hasPage(pageIndex) {
    return this.pageCache && this.cachedPages[pageIndex] ? true : false;
};

// 清空cachedPages
var clearCache = function clearCache() {
    this.cachedPages = [];
};

// 更新当前分页的page对象
var cacheCurrentPage = function cacheCurrentPage() {
    if (this.pageCache && this.pageIndex() > -1) {
        var page = new Page({
            parent: this
        });
        page.focus = this.getFocusIndex();
        page.selectedIndices = this.selectedIndices().slice();
        var rows = this.rows.peek();
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i].getData();
            r.rowId = r.id;
            delete r.id;
            page.rows.push(r);
        }
        this.cachedPages[this.pageIndex()] = page;
    }
};

//根据datatable的选中行更新每页的选中行
var updatePagesSelect = function updatePagesSelect() {
    var selectRows = this.getSelectedRows();
    var pages = this.getPages();
    for (var i = 0; i < pages.length; i++) {
        var rows = pages[i].rows;
        var selectedIndices = [];
        for (var j = 0; j < selectRows.length; j++) {
            var nowSelectRow = selectRows[j];
            for (var k = 0; k < rows.length; k++) {
                var row = rows[k];
                if (nowSelectRow == row) {
                    selectedIndices.push(k);
                    break;
                }
            }
        }
        pages[i].selectedIndices = selectedIndices;
    }
};

//根据datatable的rows更新当前页的rows
var updatePageRows = function updatePageRows() {
    if (this.pageCache) {
        var pageIndex = this.pageIndex();
        var page = this.getPages()[pageIndex];
        if (page) {
            page.rows = this.rows();
        }
    }
};

//根据datatable的选中行更新page的选中行
var updatePageSelect = function updatePageSelect() {
    if (this.pageCache) {
        var pageIndex = this.pageIndex();
        var page = this.getPages()[pageIndex];
        if (page) {
            var selectedIndices = this.selectedIndices().slice();
            page.selectedIndices = selectedIndices;
        }
    }
};

//根据datatable的focus更新page的focus
var updatePageFocus = function updatePageFocus() {
    if (this.pageCache) {
        var pageIndex = this.pageIndex();
        var page = this.getPages()[pageIndex];
        if (page) {
            page.focus = this.getFocusIndex();
        }
    }
};

// 根据datatable更新page对象
var updatePageAll = function updatePageAll() {
    this.updatePageRows();
    this.updatePageSelect();
    this.updatePageFocus();
};

var pageFunObj = {
    setCurrentPage: setCurrentPage,
    updatePages: updatePages,
    setPages: setPages,
    hasPage: hasPage,
    clearCache: clearCache,
    cacheCurrentPage: cacheCurrentPage,
    updatePagesSelect: updatePagesSelect,
    updatePageRows: updatePageRows,
    updatePageSelect: updatePageSelect,
    updatePageFocus: updatePageFocus,
    updatePageAll: updatePageAll
};

/**
 * Module : kero dataTable param
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 增加Param参数
 * @memberof DataTable
 * @param {string} key   需要增加的key值
 * @param {*} value 需要增加的具体指
 * @example
 * datatable.addParam('precision','3')
 */
var addParam = function addParam(key, value) {
    this.params[key] = value;
};

/**
 * 增加多个Param参数
 * @memberof DataTable
 * @param {object} params 需要增加的Param对象
 * @example
 * var paramsObj = {
 *  'precision':'3',
 *  'default':'1.234'
 * }
 * datatable.addParams(paramsObj)
 */
var addParams = function addParams(params) {
    for (var key in params) {
        this.params[key] = params[key];
    }
};

var paramFunObj = {
    addParam: addParam,
    addParams: addParams
};

/**
 * Module : kero dataTable ref
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */

/**
 * 为选中行绑定监听，当选中行发生改变时触发对应方法
 * @memberof DataTable
 * @param {string} fieldName 绑定的字段名
 * @example
 * datatable.refSelectedRows().subscribe(function(){})
 */
var refSelectedRows = function refSelectedRows() {
    return ko.pureComputed({
        read: function read() {
            var ins = this.selectedIndices() || [];
            var rs = this.rows();
            var selectedRows = [];
            for (var i = 0; i < ins.length; i++) {
                selectedRows.push(rs[i]);
            }
            return selectedRows;
        },
        owner: this
    });
};

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法
 * @memberof DataTable
 * @param {string} fieldName 绑定的字段名
 * @example
 * datatable.ref('field1').subscribe(function(){})
 */
var ref = function ref(fieldName) {
    this.createField(fieldName);
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var row = this.getCurrentRow();
            if (row) {
                return row.getChildValue(fieldName);
            } else return '';
        },
        write: function write(value) {
            var row = this.getCurrentRow();
            if (row) row.setChildValue(fieldName, value);
        },
        owner: this
    });
};

/**
 * 绑定字段属性，当字段属性发生改变时触发对应方法
 * @memberof DataTable
 * @param {string} fieldName 绑定的字段名
 * @param {string} key 绑定的属性key
 * @example
 * datatable.refMeta('field1','type').subscribe(function(){})
 */
var refMeta = function refMeta(fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            return this.getMeta(fieldName, key);
        },
        write: function write(value) {
            this.setMeta(fieldName, key, value);
        },
        owner: this
    });
};

/**
 * 绑定当前行的字段属性，当字段属性发生改变时触发对应方法
 * @memberof DataTable
 * @param {string} fieldName 绑定的字段名
 * @param {string} key 绑定的属性key
 * @example
 * datatable.refRowMeta('field1','type').subscribe(function(){})
 */
var refRowMeta = function refRowMeta(fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.metaChange[fieldName + '.' + key]();
            this.currentRowChange();
            var row = this.getCurrentRow();
            if (row) return row.getMeta(fieldName, key);else return this.getMeta(fieldName, key);
        },
        write: function write(value) {
            var row = this.getCurrentRow();
            if (row) row.setMeta(fieldName, value);
        },
        owner: this
    });
};

/**
 * 绑定字段是否可修改属性，当字段可修改属性发生改变时触发对应方法
 * @memberof DataTable
 * @param {string} fieldName 绑定的字段名
 * @example
 * datatable.refEnable('field1').subscribe(function(){})
 */
var refEnable = function refEnable(fieldName) {
    return ko.pureComputed({
        //enable优先级： dataTable.enable >  row上的enable >  field中的enable定义
        read: function read() {
            this.enableChange();
            if (!fieldName) return this.enable;
            var fieldEnable = this.getRowMeta(fieldName, 'enable');
            if (typeof fieldEnable == 'undefined' || fieldEnable == null) fieldEnable = true;
            return fieldEnable && this.enable;
        },
        owner: this
    });
};

var refFunObj = {
    refSelectedRows: refSelectedRows,
    ref: ref,
    refMeta: refMeta,
    refRowMeta: refRowMeta,
    refEnable: refEnable
};

/**
 * Module : Sparrow util tools
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 创建一个带壳的对象,防止外部修改
 * @param {Object} proto
 */
var createShellObject = function(proto) {
	var exf = function() {};
	exf.prototype = proto;
	return new exf();
};
var getJSObject = function(target, names) {
	if(!names) {
		return;
	}
	if(typeof names == 'object')
		return names
	var nameArr = names.split('.');
	var obj = target;
	for(var i = 0; i < nameArr.length; i++) {
		obj = obj[nameArr[i]];
		if(!obj) return null
	}
	return obj
};
var isNumber = function(obj) {
	//return obj === +obj
	//加了个typeof 判断，因为'431027199110.078573'会解析成number
	return obj - parseFloat(obj) + 1 >= 0;
};
var isArray = Array.isArray || function(val) {
	return Object.prototype.toString.call(val) === '[object Array]';
};
var isEmptyObject = function(obj) {
	var name;
	for(name in obj) {
		return false;
	}
	return true;
};
try{
	NodeList.prototype.forEach = Array.prototype.forEach;
}catch(e){
	
}


/**
 * 获得字符串的字节长度
 */
String.prototype.lengthb = function() {
	//	var str = this.replace(/[^\x800-\x10000]/g, "***");
	var str = this.replace(/[^\x00-\xff]/g, "**");
	return str.length;
};

/**
 * 将AFindText全部替换为ARepText
 */
String.prototype.replaceAll = function(AFindText, ARepText) {
	//自定义String对象的方法
	var raRegExp = new RegExp(AFindText, "g");
	return this.replace(raRegExp, ARepText);
};


var dateFormat = function ( str ) {
	//如果不是string类型  原型返回
	if ( typeof ( str ) !== 'string')
	{
		return str;
	}
	//判断 str 格式如果是 yy-mm-dd
	if (str && str.indexOf ('-') > -1){
		//获取当前是否是 ios版本,>8是因为ios不识别new Date（“2016/11”）格式
		var ua = navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(ua)) {
			//转换成 yy/mm/dd
		    str = str.replace(/-/g,"/");
			str = str.replace(/(^\s+)|(\s+$)/g,"");
			if(str.length <= 8){
				str = str += "/01";
			}
		}
	}


	return str;
};

/**
 * Module : kero dataTable util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
// 判断DataTable对象是否发生了改变
var isChanged = function isChanged() {
    var rows = this.getAllRows();
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != Row.STATUS.NORMAL) return true;
    }
    return false;
};

// 将Row对象转为索引数组或者将Row对象数组转为索引数组
var _formatToIndicesArray = function _formatToIndicesArray(dataTableObj, indices) {
    if (typeof indices == 'string' || typeof indices == 'number') {
        indices = [indices];
    } else if (indices instanceof Row) {
        indices = [dataTableObj.getIndexByRowId(indices.rowId)];
    } else if (isArray(indices) && indices.length > 0 && indices[0] instanceof Row) {
        for (var i = 0; i < indices.length; i++) {
            indices[i] = dataTableObj.getIndexByRowId(indices[i].rowId);
        }
    }
    return indices;
};

var utilFunObj = {
    isChanged: isChanged,
    _formatToIndicesArray: _formatToIndicesArray

};

/**
 * Module : kero dataTable removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
/**
 * 根据rowId删除指定行
 * @memberof DataTable
 * @param  {string} rowId 需要删除行的rowId
 * @example
 * datatable.removeRowByRowId('rowid1')
 */
var removeRowByRowId = function removeRowByRowId(rowId) {
    var index = this.getIndexByRowId(rowId);
    if (index != -1) this.removeRow(index);
};

/**
 *根据索引删除指定行
 * @memberof DataTable
 * @param  {number} index 需要删除行的索引
 * @example
 * datatable.removeRow(1)
 */
var removeRow = function removeRow(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.removeRows([index]);
};

/**
 * 删除所有行
 * @memberof DataTable
 * @example
 * datatable.removeAllRows();
 */
var removeAllRows = function removeAllRows() {
    this.rows([]);
    this.selectedIndices([]);
    this.focusIndex(-1);
    this.trigger(DataTable.ON_DELETE_ALL);
    this.updateCurrIndex();
};

/**
 * 根据索引数据删除多条数据行
 * @memberof DataTable
 * @param  {array} indices 需要删除的数据行对应数组，数组中既可以是索引也可以是row对象
 * @example
 * datatable.removeRows([1,2])
 * datatable.removeRows([row1,row2])
 */
var removeRows = function removeRows(indices, obj) {
    this.setRowsDelete(indices, obj);
};

/**
 * 清空datatable的所有数据以及分页数据以及index
 * @memberof DataTable
 * @example
 * datatable.clear()
 */
var clear = function clear() {
    this.removeAllRows();
    this.cachedPages = [];
    this.totalPages(1);
    this.pageIndex(0);
    this.focusIndex(-1);
    this.selectedIndices([]);
};

var removeRowFunObj = {
    removeRowByRowId: removeRowByRowId,
    removeRow: removeRow,
    removeAllRows: removeAllRows,
    removeRows: removeRows,
    clear: clear
};

/**
 * Module : kero dataTable row
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */
// 添加数据，建议使用setData或者setSimpleData
var setRows = function setRows(rows, options) {
    var insertRows = [],
        _id;
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        _id = r.rowId || r.id;
        if (!_id) _id = Row.getRandomRowId();
        if (r.status == Row.STATUS.DELETE) {
            this.removeRowByRowId(_id);
        } else {
            var row = this.getRowByRowId(_id);
            if (row) {
                row.updateRow(r);
                if (!isEmptyObject(r.data)) {
                    this.trigger(DataTable.ON_UPDATE, {
                        index: i,
                        rows: [row]
                    });
                    if (row == this.getCurrentRow()) {
                        this.currentRowChange(-this.currentRowChange());
                        row.currentRowChange(-row.currentRowChange());
                        this.trigger(DataTable.ON_CURRENT_UPDATE, {
                            index: i,
                            rows: [row]
                        });
                    } else {
                        row.currentRowChange(-row.currentRowChange());
                    }
                }
            } else {
                row = new Row({
                    parent: this,
                    id: _id
                });
                row.setData(rows[i], null, options);
                insertRows.push(row);
            }
            // 如果r对象中存在状态则更新状态为返回的状态
            if (r.status) {
                row.setStatus(r.status);
            }
        }
    }
    if (insertRows.length > 0) this.addRows(insertRows);
    return insertRows;
};

/**
 * 在最后位置添加一条数据行
 * @memberof DataTable
 * @param {u.Row} row 数据行
 * @example
 * var row1 = new Row({parent: datatable})
 * row1.setData({
 *  data:{
 *    field1: 'value1',
 *    field2: 'value2'
 *  }
 * })
 * datatable.addRow(row1)
 */
var addRow = function addRow(row) {
    this.insertRow(this.rows().length, row);
    this.resetDelRowEnd();
};

var resetDelRowEnd = function resetDelRowEnd() {
    for (var i = this.rows().length - 1; i > -1; i--) {
        var row = this.rows()[i];
        if (row.status == Row.STATUS.DELETE || row.status == Row.STATUS.FALSE_DELETE) {
            this.rows().splice(i, 1);
            this.rows().push(row);
        }
    }
};

/**
 * 在最后位置添加多条数据行
 * @memberof DataTable
 * @param {array} rows  数据行数组
 * @example
 * var row1 = new Row({parent: datatable})
 * row1.setData({
 *  data:{
 *    field1: 'value1',
 *    field2: 'value2'
 *  }
 * })
 * var row2 = new Row({parent: datatable})
 * row2.setData({
 *  data:{
 *    field1: 'value11',
 *    field2: 'value22'
 *  }
 * })
 * datatable.addRows([row1,row2])
 */
var addRows = function addRows(rows) {
    this.insertRows(this.rows().length, rows);
    this.resetDelRowEnd();
};

/**
 * 在指定索引位置添加一条数据行
 * @memberof DataTable
 * @param  {number} index 指定索引
 * @param  {u.Row} row   数据行
 * @example
 * var row1 = new Row({parent: datatable})
 * row1.setData({
 *  data:{
 *    field1: 'value1',
 *    field2: 'value2'
 *  }
 * })
 * datatable.insertRow(1,row1)
 */
var insertRow = function insertRow(index, row) {
    if (!row) {
        row = new Row({
            parent: this
        });
    }
    this.insertRows(index, [row]);
};

/**
 * 在指定索引位置添加多条数据行
 * @memberof DataTable
 * @param  {number} index 指定索引
 * @param  {array} rows  数据行数组
 * var row1 = new Row({parent: datatable})
 * row1.setData({
 *  data:{
 *    field1: 'value1',
 *    field2: 'value2'
 *  }
 * })
 * var row2 = new Row({parent: datatable})
 * row2.setData({
 *  data:{
 *    field1: 'value11',
 *    field2: 'value22'
 *  }
 * })
 * datatable.insertRows(1,[row1,row2])
 */
var insertRows = function insertRows(index, rows) {
    var args = [index, 0];
    for (var i = 0; i < rows.length; i++) {
        args.push(rows[i]);
    }
    this.rows.splice.apply(this.rows, args);

    this.updateSelectedIndices(index, '+', rows.length);
    this.updateFocusIndex(index, '+', rows.length);
    this.updatePageAll();
    var insertRows = [];
    $.each(rows, function (i) {
        if (this.status == Row.STATUS.NORMAL || this.status == Row.STATUS.UPDATE || this.status == Row.STATUS.NEW) {
            insertRows.push(this);
        }
    });
    this.trigger(DataTable.ON_INSERT, {
        index: index,
        rows: insertRows
    });
    if (this.ns) {
        if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
    }
};

/**
 * 创建空行
 * @memberof DataTable
 * @return {u.Row} 空行对象
 * @example
 * datatable.createEmptyRow();
 * datatable.createEmptyRow({unSelect:true})
 */
var createEmptyRow = function createEmptyRow(options) {
    var r = new Row({
        parent: this
    });
    this.addRow(r);
    var unSelect = options ? options.unSelect : false;
    if (!unSelect) {
        if (!this.getCurrentRow()) this.setRowSelect(r);
    }
    return r;
};

var rowFunObj = {
    setRows: setRows,
    addRow: addRow,
    addRows: addRows,
    insertRow: insertRow,
    insertRows: insertRows,
    createEmptyRow: createEmptyRow,
    resetDelRowEnd: resetDelRowEnd
};

/***
 * Module : kero dataTable rowCurrent
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

// 更新当前行对应索引
var updateCurrIndex = function updateCurrIndex() {
    var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
    if (this._oldCurrentIndex != currentIndex) {
        this._oldCurrentIndex = currentIndex;
        this.trigger(DataTable.ON_CURRENT_ROW_CHANGE);
        this.currentRowChange(-this.currentRowChange());
        if (this.ns) {
            if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
        }
    }
};

var rowCurrentFunObj = {
    updateCurrIndex: updateCurrIndex
};

/**
 * Module : kero dataTable rowDelete
 * Desc: 不建议使用此库方法
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
/***
 * 根据索引删除数据行
 * @param {number} index 需要删除数据行的索引
 */
var setRowDelete = function setRowDelete(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.setRowsDelete([index]);
};

/***
 * 删除所有数据行
 */
var setAllRowsDelete = function setAllRowsDelete() {
    var indices = new Array(this.rows().length);
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i;
    }
    this.setRowsDelete(indices);
};

/***
 * 根据索引数组删除数据行
 * @param {Array} indices 需要删除数据行的索引数组
 */
var setRowsDelete = function setRowsDelete(indices, obj) {
    var forceDel = obj ? obj.forceDel : false;
    indices = utilFunObj._formatToIndicesArray(this, indices);
    indices = indices.sort(function (a, b) {
        return b - a;
    });
    var rowIds = this.getRowIdsByIndices(indices);
    var rows = this.getRowsByIndices(indices);
    var ros = this.rows();
    for (var i = 0; i < indices.length; i++) {
        var row = this.getRow(indices[i]);
        if (row.status == Row.STATUS.NEW || this.forceDel || forceDel) {
            ros.splice(indices[i], 1);
        } else {
            row.setStatus(Row.STATUS.FALSE_DELETE);
            var temprows = ros.splice(indices[i], 1);
            ros.push(temprows[0]);
        }
        this.updateSelectedIndices(indices[i], '-');
        this.updateFocusIndex(indices[i], '-');
    }
    this.rows(ros);
    this.updateCurrIndex();
    this.trigger(DataTable.ON_DELETE, {
        falseDelete: true,
        indices: indices,
        rowIds: rowIds,
        rows: rows
    });
};

var rowDeleteFunObj = {
    setRowDelete: setRowDelete,
    setAllRowsDelete: setAllRowsDelete,
    setRowsDelete: setRowsDelete
};

/**
 * Module : kero dataTable rowSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */
/**
 * 设置所有行选中
 * @memberof DataTable
 * @example
 * datatable.setAllRowsSelect()
 */
var setAllRowsSelect = function setAllRowsSelect() {
    var indices = new Array(this.rows().length);
    for (var i = 0; i < indices.length; i++) {
        indices[i] = i;
    }
    this.setRowsSelect(indices);
    this.allSelected(true);
    this.trigger(DataTable.ON_ROW_ALLSELECT, {});
};

/**
 * 根据索引设置选中行，清空之前已选中的所有行
 * @memberof DataTable
 * @param {number} index 需要选中行的索引
 * @example
 * datatable.setRowSelect(1)
 */
var setRowSelect = function setRowSelect(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.setRowsSelect([index]);
    this.setRowFocus(this.getSelectedIndex());
};

/**
 * 根据索引数组设置选中行，清空之前已选中的所有行
 * @memberof DataTable
 * @param {array} indices 需要选中行的索引数组
 * @example
 * datatable.setRowsSelect([1,2])
 */
var setRowsSelect = function setRowsSelect(indices) {
    indices = indices || -1;
    if (indices == -1) {
        this.setAllRowsUnSelect({
            quiet: true
        });
        return;
    }
    indices = utilFunObj._formatToIndicesArray(this, indices);
    var sIns = this.selectedIndices();
    if (isArray(indices) && isArray(sIns) && indices.join() == sIns.join()) {
        // 避免与控件循环触发
        return;
    }

    if (isArray(indices)) {
        var rowNum = this.rows().length;
        for (var i = 0; i < indices.length; i++) {
            if (indices[i] < 0 || indices[i] >= rowNum) indices.splice(i, 1);
        }
    }

    this.setAllRowsUnSelect({
        quiet: true
    });
    try {
        this.selectedIndices(indices);
    } catch (e) {}
    this.updatePageSelect();
    var rowIds = this.getRowIdsByIndices(indices);
    this.currentRowChange(-this.currentRowChange());
    this.trigger(DataTable.ON_ROW_SELECT, {
        indices: indices,
        rowIds: rowIds
    });
    this.updateCurrIndex();

    this.setRowFocus(indices[0]);
};

/**
 * 根据索引添加选中行，不会清空之前已选中的行
 * @memberof DataTable
 * @param {number} index 需要选中行的索引
 * @example
 * datatable.addRowSelect(1)
 */
var addRowSelect = function addRowSelect(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.addRowsSelect([index]);
};

/**
 * 根据索引数组添加选中行，不会清空之前已选中的行
 * @memberof DataTable
 * @param {array} indices 需要选中行的索引数组
 * @example
 * datatabel.addRowsSelect([1,2])
 */
var addRowsSelect = function addRowsSelect(indices) {
    indices = utilFunObj._formatToIndicesArray(this, indices);
    var selectedIndices = this.selectedIndices().slice();
    var needTrigger = false;
    for (var i = 0; i < indices.length; i++) {
        var ind = indices[i],
            toAdd = true;
        for (var j = 0; j < selectedIndices.length; j++) {
            if (selectedIndices[j] == ind) {
                toAdd = false;
            }
        }
        //indices[i]存在并且大于-1
        if (toAdd && indices[i] > -1) {
            needTrigger = true;
            selectedIndices.push(indices[i]);
        }
    }
    this.selectedIndices(selectedIndices);
    this.updatePageSelect();
    var rowIds = this.getRowIdsByIndices(selectedIndices);
    if (needTrigger) {
        this.trigger(DataTable.ON_ROW_SELECT, {
            indices: selectedIndices,
            rowIds: rowIds
        });
    }
    this.updateCurrIndex();
};

/**
 * 全部取消选中
 * @memberof DataTable
 * @param {object} [options] 可选参数
 * @param {boolean} [options.quiet] 如果为true则不触发事件，否则触发事件
 * @example
 * datatable.setAllRowsUnSelect() // 全部取消选中
 * datatable.setAllRowsUnSelect({quiet:true}) // 全部取消选中,不触发事件
 */
var setAllRowsUnSelect = function setAllRowsUnSelect(options) {
    this.selectedIndices([]);
    this.updatePageSelect();
    if (!(options && options.quiet)) {
        this.trigger(DataTable.ON_ROW_ALLUNSELECT);
    }
    this.updateCurrIndex();
    this.allSelected(false);
};

/**
 * 根据索引取消选中
 * @memberof DataTable
 * @param {number} index 需要取消选中的行索引
 * @example
 * datatable.setRowUnSelect(1)
 */
var setRowUnSelect = function setRowUnSelect(index) {
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
    }
    this.setRowsUnSelect([index]);
};

/**
 * 根据索引数组取消选中
 * @memberof DataTable
 * @param {array} indices 需要取消选中的行索引数组
 * @example
 * datatable.setRowsUnSelect([1,2])
 */
var setRowsUnSelect = function setRowsUnSelect(indices) {
    indices = utilFunObj._formatToIndicesArray(this, indices);
    var selectedIndices = this.selectedIndices().slice();

    // 避免与控件循环触发
    if (selectedIndices.indexOf(indices[0]) == -1) return;

    for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var pos = selectedIndices.indexOf(index);
        if (pos != -1) selectedIndices.splice(pos, 1);
    }
    this.selectedIndices(selectedIndices);
    this.updatePageSelect();
    var rowIds = this.getRowIdsByIndices(indices);
    this.trigger(DataTable.ON_ROW_UNSELECT, {
        indices: indices,
        rowIds: rowIds
    });
    this.updateCurrIndex();
    this.allSelected(false);
};

/**
 * 当全部选中时取消选中，否则全部选中
 * @memberof DataTable
 */
var toggleAllSelect = function toggleAllSelect() {
    if (this.allSelected()) {
        this.setAllRowsUnSelect();
    } else {
        this.setAllRowsSelect();
    }
};

/***
 * 数据行发生改变时更新focusindex
 * @memberof DataTable
 * @param  {number} index 发生改变的数据行位置
 * @param  {string} type  +表示新增行，-表示减少行
 * @param  {number} num     新增/减少的行数
 */
var updateSelectedIndices = function updateSelectedIndices(index, type, num) {
    if (!isNumber(num)) {
        num = 1;
    }
    var selectedIndices = this.selectedIndices().slice();
    if (selectedIndices == null || selectedIndices.length == 0) return;
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index) selectedIndices[i] = parseInt(selectedIndices[i]) + num;
        } else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1);
            } else if (selectedIndices[i] > index + num - 1) selectedIndices[i] = selectedIndices[i] - num;
        }
    }
    this.selectedIndices(selectedIndices);
    this.updatePageSelect();
};
var rowSelectFunObj = {
    setAllRowsSelect: setAllRowsSelect,
    setRowSelect: setRowSelect,
    setRowsSelect: setRowsSelect,
    addRowSelect: addRowSelect,
    addRowsSelect: addRowsSelect,
    setAllRowsUnSelect: setAllRowsUnSelect,
    setRowUnSelect: setRowUnSelect,
    setRowsUnSelect: setRowsUnSelect,
    toggleAllSelect: toggleAllSelect,
    updateSelectedIndices: updateSelectedIndices
};

/**
 * Module : kero dataTable rowFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
/**
 * 设置焦点行
 * @memberof DataTable
 * @param {number|u.Row} index 行对象或者行index
 * @param {boolean} [quiet] 如果为true则不触发事件，否则触发事件
 * @param {boolean} [force] 如果为true当index行与已focus的行相等时，仍然触发事件，否则不触发事件
 * @example
 * datatable.setRowFocus(1) // 设置第二行为焦点行
 * datatable.setRowFocus(1,true) // 设置第二行为焦点行，不触发事件
 * datatable.setRowFocus(1,false,true) // 设置第二行为焦点行，如果当前焦点行为第二行，仍旧触发事件
 */
var setRowFocus = function setRowFocus(index, quiet, force) {
    var rowId = null;
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
        rowId = index.rowId;
    }

    if (index === -1 || index === this.focusIndex() && !force) {
        return;
    }
    if (this.focusIndex() > -1) {
        this.setRowUnFocus(this.focusIndex());
    }
    this.focusIndex(index);
    if (quiet) {
        return;
    }
    this.currentRowChange(-this.currentRowChange());
    if (!rowId) {
        rowId = this.getRow(index).rowId;
    }
    this.trigger(DataTable.ON_ROW_FOCUS, {
        index: index,
        rowId: rowId
    });
    this.updateCurrIndex();
};

/**
 * 焦点行反选
 * @memberof DataTable
 * @example
 * datatable.setRowUnFocus()
 */
var setRowUnFocus = function setRowUnFocus() {
    this.currentRowChange(-this.currentRowChange());
    var indx = this.focusIndex(),
        rowId = null;
    if (indx !== -1) {
        rowId = this.getRow(indx).rowId;
    }
    this.trigger(DataTable.ON_ROW_UNFOCUS, {
        index: indx,
        rowId: rowId
    });
    this.focusIndex(-1);
    this.updateCurrIndex();
};

/***
 * 数据行发生改变时更新focusindex
 * @memberof DataTable
 * @param  {number} opIndex 发生改变的数据行位置
 * @param  {string} opType  +表示新增行，-表示减少行
 * @param  {number} num     新增/减少的行数
 *
 */
var updateFocusIndex = function updateFocusIndex(opIndex, opType, num) {
    if (!isNumber(num)) {
        num = 1;
    }
    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
        if (opType === '+') {
            this.focusIndex(this.focusIndex() + num);
        } else if (opType === '-') {
            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
                this.focusIndex(-1);
            } else if (this.focusIndex() > opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - num);
            }
        }
    }
};

var rowFocusFunObj = {
    setRowFocus: setRowFocus,
    setRowUnFocus: setRowUnFocus,
    updateFocusIndex: updateFocusIndex
};

/**
 * Module : kero dataTable simpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */
/**
 * 设置数据, 只设置字段值
 * @memberof DataTable
 * @param {array} data 数据信息
 * @param {boject} [options] 可配置参数
 * @param {boject} [options.unSelect=false] 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
 * @example
 * var data = [{
 *   filed1:'value1',
 *   field2:'value2'
 * },{
 *   filed1:'value11',
 *   field2:'value21'
 * }]
 * datatable.setSimpleData(data)
 * datatable.setSimpleData(data,{unSelect:true})
 */
var setSimpleData = function setSimpleData(data, options) {
    this.removeAllRows();
    this.cachedPages = [];
    this.focusIndex(-1);
    this.selectedIndices([]);

    this.setSimpleDataReal = [];
    if (!data) {
        this.setSimpleDataReal = data;
        // throw new Error("dataTable.setSimpleData param can't be null!");
        return;
    }

    var rows = [];
    if (!isArray(data)) data = [data];
    for (var i = 0; i < data.length; i++) {
        var _data = data[i];
        /* 判断data中的字段在datatable中是否存在，如果不存在则创建 */
        // for(var f in _data){
        //     this.createField(f)
        // }
        if (_typeof(data[i]) !== 'object') _data = {
            $data: data[i]
        };
        if (options && options.status) {
            rows.push({
                status: options.status,
                data: _data
            });
        } else {
            rows.push({
                status: Row.STATUS.NORMAL,
                data: _data
            });
        }
    }
    var _data = {
        rows: rows
    };
    if (options) {
        if (typeof options.fieldFlag == 'undefined') {
            options.fieldFlag = true;
        }
    }
    this.setData(_data, options);
};

/**
 * 追加数据, 只设置字段值
 * @memberof DataTable
 * @param {array} data 数据信息
 * @param {string} [status=nrm] 追加数据信息的状态，参照Row对象的状态介绍
 * @param {boject} [options] 可配置参数
 * @param {boject} [options.unSelect=false] 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
 * @example
 * var data = [{
 *   filed1:'value1',
 *   field2:'value2'
 * },{
 *   filed1:'value11',
 *   field2:'value21'
 * }]
 * datatable.addSimpleData(data,Row.STATUS.NEW)
 * datatable.addSimpleData(data, null, {unSelect:true})
 */
var addSimpleData = function addSimpleData(data, status, options) {
    if (!data) {
        throw new Error("dataTable.addSimpleData param can't be null!");
    }
    if (!isArray(data)) data = [data];
    for (var i = 0; i < data.length; i++) {
        var r = this.createEmptyRow(options);
        r.setSimpleData(data[i], status);
    }
};

var simpleDataFunObj = {
    setSimpleData: setSimpleData,
    addSimpleData: addSimpleData
};

/**
 * Module : kero DataTable events
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */

/**
 * 为DataTable对象添加监听
 * @memberof DataTable
 * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
 * @param  {function} [callback] 监听对应的回调函数
 * @param  {boolean}   [one]      是否只执行一次监听，为true则表示只执行一次回调函数，否则每次触发监听都是执行回调函数
 * @return {DataTable}            当前的DataTable对象
 * @example
 * datatable.on(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
 * datatable.on([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
 * datatable.on({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
 */
var on = function on(name, _callback, one) {
    var self = this,
        origCb = _callback;
    if (Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for (var i in name) {
            this.on(name[i], _callback);
        }
        return this;
    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
        // map
        for (var key in name) {
            this.on(key, name[key]);
        }
        return this;
    }
    if (one) {
        _callback = function callback() {
            self.off(name, _callback);
            origCb.apply(this, arguments);
        };
    }
    name = name.toLowerCase();
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
        callback: _callback
    });
    return this;
};

/**
 * 为DataTable对象取消监听
 * @memberof DataTable
 * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
 * @param  {function} [callback] 监听对应的回调函数
 * @return {DataTable}            当前的DataTable对象
 * @example
 * datatable.off(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
 * datatable.off([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
 * datatable.off({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
 */
var off = function off(name, callback) {
    name = name.toLowerCase();
    if (!this._events) return this;
    if (Object.prototype.toString.call(name) == '[object Array]') {
        // 数组
        for (var i in name) {
            this.off(name[i], callback);
        }
        return this;
    } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
        // map
        for (var key in name) {
            this.off(key, name[key]);
        }
        return this;
    }
    var cbs = this._events[name];
    if (!cbs) return this;
    if (!callback) {
        // 解绑所有事件
        cbs = null;
    } else {
        for (var i = cbs.length - 1; i >= 0; i--) {
            if (cbs[i] == callback) {
                cbs.splice(i, 1);
            }
        }
    }
    this._events[name] = cbs;
    return this;
};

/**
 * 为DataTable对象添加只执行一次的监听
 * @memberof DataTable
 * @param  {string|array|object}   name     针对不同用法分别对应监听名称、监听名称对应的数组、监听名称及对应的回调组成的对象
 * @param  {function} [callback] 监听对应的回调函数
 * @example
 * datatable.one(u.DataTable.ON_ROW_FOCUS, function() {}) // 普通
 * datatable.one([u.DataTable.ON_INSERT, u.DataTable.ON_DELETE], function() {}) // 数组
 * datatable.one({u.DataTable.ON_INSERT: function() {}, u.DataTable.ON_DELETE: function() {}}) // map
 */
var one = function one(name, callback) {
    this.on(name, callback, 1);
};

/**
 * 触发DataTable对象绑定的事件监听
 * @memberof DataTable
 * @param  {string} name 需要触发的事件监听对应的名称
 * @return {DataTable}            当前的DataTable对象
 * @example
 * datatable.trigger('valuechange')
 */
var trigger = function trigger(name) {
    name = name.toLowerCase();
    if (!this._events || !this._events[name]) return this;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this._events[name];
    for (var i = 0, count = events.length; i < count; i++) {
        events[i].callback.apply(this, args);
    }
    return this;
};

// 带返回值的trigger，可以获取回调函数的返回值
var triggerReturn = function triggerReturn(name) {
    name = name.toLowerCase();
    if (!this._events || !this._events[name]) return this;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = this._events[name];
    var flag = true;
    for (var i = 0, count = events.length; i < count; i++) {
        flag = flag && events[i].callback.apply(this, args);
    }
    return flag;
};

// 获取监听名称对应的回调函数
var getEvent = function getEvent(name) {
    name = name.toLowerCase();
    this._events || (this._events = {});
    return this._events[name];
};

var eventsFunObj = {
    on: on,
    off: off,
    one: one,
    trigger: trigger,
    triggerReturn: triggerReturn,
    getEvent: getEvent
};

/**
 * Module : Kero webpack entry dataTable index
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

/**
 * DataTable
 * @namespace
 * @description 前端数据模型对象
 */

var DataTable$1 = function DataTable(options) {
    classCallCheck(this, DataTable);

    options = options || {};
    /**
     * DataTable对应的唯一标识
     * @type {string}
     */
    this.id = options['id'];
    /**
     * 在设置数据时是否自动创建对应字段，如果为true则不自动创建，如果为false则自动创建缺失的字段
     * @type {boolean}
     * @default false
     */
    this.strict = options['strict'] || false;
    /**
     * DataTable的所有字段属性信息
     * @type {object}
     */
    this.meta = DataTable.createMetaItems(options['meta']);
    /**
     * DataTable的是否支持编辑功能
     * @type {boolean}
     * @default true
     */
    this.enable = options['enable'] || DataTable.DEFAULTS.enable;
    /**
     * DataTable支持翻页功能时每页显示数据条数
     * @type {number}
     * @default 20
     */
    this.pageSize = ko.observable(options['pageSize'] || DataTable.DEFAULTS.pageSize);
    /**
     * DataTable支持翻页功能时当前页码
     * @type {number}
     * @default 0
     */
    this.pageIndex = ko.observable(options['pageIndex'] || DataTable.DEFAULTS.pageIndex);
    /**
     * DataTable支持翻页功能时总页数
     * @type {number}
     * @default 0
     */
    this.totalPages = ko.observable(options['totalPages'] || DataTable.DEFAULTS.totalPages);
    // 存储所有行对象
    this.totalRow = ko.observable();
    /**
     * DataTable的是否支持前端缓存，支持前端缓存则前端会存储所有页的数据信息，否则只保存当前页的数据信息。如果使用前端缓存则需要使用框架封装的fire方法来与后台进行交互
     * @type {boolean}
     * @default false
     */
    this.pageCache = options['pageCache'] === undefined ? DataTable.DEFAULTS.pageCache : options['pageCache'];
    /**
     * DataTable删除数据时是否强制删除，如果设置为true则不再考虑数据的状态，执行删除时则删除此条数据。如果设置为false则需要考虑数据的状态，如果状态为new则删除此条数据否则将状态修改为fdel
     * @type {boolean}
     * @default false
     */
    this.forceDel = options['forceDel'] === undefined ? DataTable.DEFAULTS.forceDel : options['forceDel'];
    // 存储所有row对象
    this.rows = ko.observableArray([]);
    // 存储所有的选中行的index
    this.selectedIndices = ko.observableArray([]);
    // 原有的当前行，用于判断当前行是否发生变化
    this._oldCurrentIndex = -1;
    // 当前focus行
    this.focusIndex = ko.observable(-1);
    // 存储所有页对象
    this.cachedPages = [];
    // 存储meta改变信息
    this.metaChange = {};
    // 存储valuecahnge改变信息
    this.valueChange = {}; //ko.observable(1);
    // 监听当前行改变
    this.currentRowChange = ko.observable(1);
    // 监听是否可修改属性的改变
    this.enableChange = ko.observable(1);
    /**
     * 使用者自定义的属性合集，框架内部不会针对此属性进行特殊处理，仅用于设置及获取
     * @type {object}
     */
    this.params = options['params'] || {};
    /**
     * 使用者自定义的属性，框架内部不会针对此属性进行特殊处理，仅用于设置及获取。
     * @type {string}
     */
    this.master = options['master'] || '';
    // 监听是否全部选中
    this.allSelected = ko.observable(false);
    /**
     * 通过getSimpleData获取数据时，日期字段是否转化为long型，如果为true时不进行转化，为false时转化为long型
     * @type {boolean}
     * @default false
     */
    this.dateNoConvert = options['dateNoConvert'] || false;
    // 对于子表通过root字段存储根datatable对象
    if (options['root']) {
        this.root = options['root'];
    } else {
        this.root = this;
    }
    // 记录子表的路径
    if (options['ns']) {
        this.ns = options['ns'];
    } else {
        this.ns = '';
    }
    // 前端分页情况下记录前端新增的数据
    this.newCount = 0;
};

var DataTableProto = DataTable$1.prototype;
Object.assign(DataTableProto, copyRowFunObj);
Object.assign(DataTableProto, dataFunObj);
Object.assign(DataTableProto, enableFunObj);
Object.assign(DataTableProto, getCurrentFunObj);
Object.assign(DataTableProto, getDataFunObj);
Object.assign(DataTableProto, getFocusFunObj);
Object.assign(DataTableProto, getMetaFunObj);
Object.assign(DataTableProto, getPageFunObj);
Object.assign(DataTableProto, getParamFunObj);
Object.assign(DataTableProto, getSelectFunObj);
Object.assign(DataTableProto, getSimpleDataFunObj);
Object.assign(DataTableProto, pageFunObj);
Object.assign(DataTableProto, metaFunObj);
Object.assign(DataTableProto, refFunObj);
Object.assign(DataTableProto, paramFunObj);
Object.assign(DataTableProto, rowFunObj);
Object.assign(DataTableProto, removeRowFunObj);
Object.assign(DataTableProto, rowCurrentFunObj);
Object.assign(DataTableProto, simpleDataFunObj);
Object.assign(DataTableProto, rowFocusFunObj);
Object.assign(DataTableProto, eventsFunObj);
Object.assign(DataTableProto, utilFunObj);
Object.assign(DataTableProto, rowSelectFunObj);
Object.assign(DataTableProto, rowDeleteFunObj);

DataTable$1.DEFAULTS = {
    pageSize: 20,
    pageIndex: 0,
    totalPages: 0,
    pageCache: false,
    enable: true,
    forceDel: false
};

DataTable$1.META_DEFAULTS = {
    enable: true,
    required: false,
    descs: {}

    //事件类型
};DataTable$1.ON_ROW_SELECT = 'select';
DataTable$1.ON_ROW_UNSELECT = 'unSelect';
DataTable$1.ON_ROW_ALLSELECT = 'allSelect';
DataTable$1.ON_ROW_ALLUNSELECT = 'allUnselect';
DataTable$1.ON_VALUE_CHANGE = 'valueChange';
DataTable$1.ON_BEFORE_VALUE_CHANGE = 'beforeValueChange';
DataTable$1.ON_CURRENT_VALUE_CHANGE = 'currentValueChange'; //当前行变化
//  DataTable.ON_AFTER_VALUE_CHANGE = 'afterValueChange'
//  DataTable.ON_ADD_ROW = 'addRow'
DataTable$1.ON_INSERT = 'insert';
DataTable$1.ON_UPDATE = 'update';
DataTable$1.ON_CURRENT_UPDATE = 'currentUpdate';
DataTable$1.ON_DELETE = 'delete';
DataTable$1.ON_DELETE_ALL = 'deleteAll';
DataTable$1.ON_ROW_FOCUS = 'focus';
DataTable$1.ON_ROW_UNFOCUS = 'unFocus';
DataTable$1.ON_LOAD = 'load';
DataTable$1.ON_ENABLE_CHANGE = 'enableChange';
DataTable$1.ON_META_CHANGE = 'metaChange';
DataTable$1.ON_ROW_META_CHANGE = 'rowMetaChange';
DataTable$1.ON_CURRENT_META_CHANGE = 'currentMetaChange';
DataTable$1.ON_CURRENT_ROW_CHANGE = 'currentRowChange';

DataTable$1.SUBMIT = {
    current: 'current',
    focus: 'focus',
    all: 'all',
    select: 'select',
    change: 'change',
    empty: 'empty',
    allSelect: 'allSelect',
    allPages: 'allPages'

    /**
     * 将默认meta与传入进行的meta对象进行合并
     * meta: {
         f1: {
             enable:false
         }
     }
     newMetas：{
         f1:{
             enable:false,
             required:false,
             descs:{
    
            }
        }
    }
     */
};DataTable$1.createMetaItems = function (metas) {
    var newMetas = {};
    for (var key in metas) {
        var meta = metas[key];
        if (typeof meta == 'string') meta = {};
        newMetas[key] = extend({}, DataTable$1.META_DEFAULTS, meta);
    }
    return newMetas;
};

/**
 * Module : kero dataTable page data
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 根据行序号设置字段值
 * @memberof Page
 * @param {number} rowIndex  行序号
 * @param {string} fieldName 字段名称
 * @param {string} value     字段值
 * @example
 * page.setRowValue(1,'field1','value1')
 */
var setRowValue = function setRowValue(rowIndex, fieldName, value) {
    var row = this.rows[rowIndex];
    if (row) {
        row.data[fieldName]['value'] = value;
        if (row.status != Row.STATUS.NEW) row.setStatus(Row.STATUS.UPDATE);
    }
};

// 通过row对象更新row对象，不建议次方法
var updateRow = function updateRow(originRow, newRow) {
    // originRow.status = originRow.status
    //this.rowId = data.rowId
    if (!newRow.data) return;
    for (var key in newRow.data) {
        if (originRow.data[key]) {
            var valueObj = newRow.data[key];
            if (typeof valueObj == 'string' || typeof valueObj == 'number' || valueObj === null) originRow.data[key]['value'] = valueObj;
            //this.setValue(key, this.formatValue(key, valueObj))
            else {
                    //					this.setValue(key, valueObj.value)

                    if (valueObj.error) {
                        if (u.showMessageDialog) u.showMessageDialog({
                            title: "警告",
                            msg: valueObj.error,
                            backdrop: true
                        });else alert(valueObj.error);
                    } else {
                        //this.setValue(key, this.formatValue(key, valueObj.value), null)
                        originRow.data[key]['value'] = valueObj.value;
                        for (var k in valueObj.meta) {
                            originRow.data[key]['meta'] = originRow.data[key]['meta'] || {};
                            originRow.data[key]['meta'][k] = valueObj.meta[k];
                        }
                    }
                }
        }
    }
};

var pageDataFunObj = {
    setRowValue: setRowValue,
    updateRow: updateRow
};

/**
 * Module : kero dataTable page getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取Page的数据信息
 * @memberof Page
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * page.getData()
 */
var getData$1 = function getData() {
    var datas = [],
        row,
        meta;
    meta = this.parent.getMeta();
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({
            'id': row.rowId,
            'status': row.status,
            data: row.data
        });
    }
    return datas;
};

/**
 * 获取Page的选中行数据信息
 * @memberof Page
 * @return {array} 数据信息对应的数组，每项对应一条数据
 * @example
 * page.getSelectDatas()
 */
var getSelectDatas = function getSelectDatas() {
    var datas = [],
        row;
    for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i];
        datas.push({
            'id': row.rowId,
            'status': row.status,
            data: row.data
        });
    }
    for (var i = 0; i < this.selectedIndices.length; i++) {
        row = this.rows[this.selectedIndices[i]];
        datas.push({
            'id': row.rowId,
            'status': row.status,
            data: row.data
        });
    }
    return datas;
};

/**
 * 获取Page的选中Row对象
 * @memberof Page
 * @return {array} Row对象对应的数组，每项对应一条数据
 * @example
 * page.getSelectRows()
 */
var getSelectRows = function getSelectRows() {
    var rows = [];
    for (var i = 0; i < this.selectedIndices.length; i++) {
        rows.push(this.rows[this.selectedIndices[i]]);
    }
    return rows;
};

/**
 * 获取发生改变的Row对象
 * @memberof DataTable
 * @return {array} 发生改变的Row对象
 * @example
 * datatable.getChangedRows()
 */
var getChangedRows$1 = function getChangedRows() {
    var changedRows = [],
        rows = this.rows;
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i]);
        }
    }
    return changedRows;
};
/**
 * 根据rowid获取Row对象
 * @memberof Page
 * @param {string} rowid 需要获取的Row对应的rowid
 * @returns {Row} Row对象
 * @example
 * page.getRowByRowId('rowid')
 */
var getRowByRowId$1 = function getRowByRowId(rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid) return this.rows[i];
    }
    return null;
};

/**
 * 根据行索引获取对应行的字段值
 * @memberof Page
 * @param {number} rowIndex 行索引
 * @param {string} fieldName 字段名
 * @returns {sting} 字段值
 * @example
 * page.getRowValue(1,'field1')
 */
var getRowValue = function getRowValue(rowIndex, fieldName) {
    var row = this.rows[rowIndex];
    if (row) {
        return row.data[fieldName]['value'];
    }
    return null;
};

var pageGetDataFunObj = {
    getData: getData$1,
    getSelectDatas: getSelectDatas,
    getSelectRows: getSelectRows,
    getChangedRows: getChangedRows$1,
    getRowByRowId: getRowByRowId$1,
    getRowValue: getRowValue
};

/**
 * Module : kero dataTable page getMeta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 获取指定行的meta信息
 * @param  {number} rowIndex  行索引
 * @param  {string} fieldName 需要获取的字段
 * @param  {string} key       需要获取的字段指定meta信息
 * @return {object}           meta信息
 * @example
 * page.getRowMeta(1,'field1','type')
 */
var getRowMeta$1 = function getRowMeta(rowIndex, fieldName, metaName) {
    var row = this.rows[rowIndex];
    if (row) {
        var meta = row[fieldName].meta;
        if (!meta) return null;else return meta[metaName];
    }
    return null;
};

var rowGetMetaFunObj = {
    getRowMeta: getRowMeta$1
};

/**
 * Module : kero dataTable page meta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 设置指定行的meta信息
 * @param  {number} rowIndex  行索引
 * @param  {string} fieldName 字段名
 * @param  {string} metaName       meta名称
 * @param  {string} value meta值
 * @return {object}           meta信息
 * @example
 * page.setRowMeta(1,'field1','type','string')
 */
var setRowMeta = function setRowMeta(rowIndex, fieldName, metaName, value) {
    var row = this.rows[rowIndex];
    if (row) {
        var meta = row[fieldName].meta;
        if (!meta) meta = row[fieldName].meta = {};
        meta[metaName] = value;
        if (row.status != Row.STATUS.NEW) row.setStatus(Row.STATUS.UPDATE);
    }
};

var pageMetaFunObj = {
    setRowMeta: setRowMeta
};

/**
 * Module : kero dataTable page removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

/**
 * 根据rowid删除行
 * @param  {string} rowid 需要删除行的rowid
 * @example
 * page.removeRowByRowId('rowid1')
 */
var removeRowByRowId$1 = function removeRowByRowId(rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid) {
            this.rows.splice(i, 1);
            count--;
            this.updateSelectedIndices(i, '-');
            this.updateFocusIndex(i, '-');
        }
    }
};

// 新增/删除行之后更新选中行的index
var updateSelectedIndices$1 = function updateSelectedIndices(index, type, num) {
    if (!isNumber(num)) {
        num = 1;
    }
    var selectedIndices = this.selectedIndices.slice();
    if (selectedIndices == null || selectedIndices.length == 0) return;
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index) selectedIndices[i] = parseInt(selectedIndices[i]) + num;
        } else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1);
            } else if (selectedIndices[i] > index + num - 1) selectedIndices[i] = selectedIndices[i] - num;
        }
    }
    this.selectedIndices = selectedIndices;
};

//新增/删除行之后更新焦点行
var updateFocusIndex$1 = function updateFocusIndex(opIndex, opType, num) {
    if (!isNumber(num)) {
        num = 1;
    }
    if (opIndex <= this.focus && this.focus != -1) {
        if (opType === '+') {
            this.focus = this.focus + num;
        } else if (opType === '-') {
            if (this.focus >= opIndex && this.focus <= opIndex + num - 1) {
                this.focus = this.focus - 1;
            } else if (this.focus > opIndex + num - 1) {
                this.focus = this.focus - num;
            }
        }
    }
};

var pageRemoveRowFunObj = {
    removeRowByRowId: removeRowByRowId$1,
    updateSelectedIndices: updateSelectedIndices$1,
    updateFocusIndex: updateFocusIndex$1
};

/**
 * Module : Kero webpack entry Page index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-09 15:24:46
 */

/**
 * Page
 * @namespace
 * @description 分页对象
 */

var Page$1 = function Page(options) {
  classCallCheck(this, Page);

  // 当前焦点行
  this.focus = options['focus'] || null;
  // 选中行
  this.selectedIndices = options['selectedIndices'] || null;
  // 所有数据行
  this.rows = options['rows'] || [];
  // DataTable对象
  this.parent = options['parent'] || null;
};

var PageProto = Page$1.prototype;
Object.assign(PageProto, pageDataFunObj);
Object.assign(PageProto, pageGetDataFunObj);
Object.assign(PageProto, rowGetMetaFunObj);
Object.assign(PageProto, pageMetaFunObj);
Object.assign(PageProto, pageRemoveRowFunObj);

/**
 * Module : Kero webpack entry events index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

//相关依赖导入
var Events = function Events() {
    classCallCheck(this, Events);
};

var EventsProto = Events.prototype;
Object.assign(EventsProto, eventsFunObj);

/**
 * Module : kero dataTable row util
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
var eq = function eq(a, b) {
    if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
    //判断输入的值是否相等，a,b是字符串直接比较这两个值即可，没必要判断是否是数据，判断是否是数据使用parseFloat转换有时精度不准（431027199110.078573）
    //if (isNumber(a) && isNumber(b) && parseFloat(a) == parseFloat(b)) return true;
    if (a + '' === b + '' || a === b) return true;
    if (isNumber(a) && isNumber(b) && parseFloat(a) - parseFloat(b) < 0.0000005 && parseFloat(a) - parseFloat(b) > -0.0000005) return true;
    return false;
};

// 格式化时间
var _formatDate = function _formatDate(value) {
    if (!value) return value;
    var date = new Date();
    date.setTime(value);
    //如果不能转为Date 直接返回原值
    if (isNaN(date)) {
        return value;
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
    var formatString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds; //+ "." + mill;
    return formatString;
};

// 格式化日期为UTCString
var _dateToUTCString = function _dateToUTCString(date) {
    if (!date && date != 0) return '';
    if (typeof date === 'number') return date;
    if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
};

// 触发数值改变事件
var _triggerChange = function _triggerChange(rowObj, fieldName, oldValue, ctx) {
    _getField(rowObj, fieldName).changed = true;
    if (rowObj.status != Row.STATUS.NEW) rowObj.setStatus(Row.STATUS.UPDATE);
    if (rowObj.valueChange[fieldName]) rowObj.valueChange[fieldName](-rowObj.valueChange[fieldName]());
    if (rowObj.parent.getCurrentRow() == rowObj && rowObj.parent.valueChange[fieldName]) {
        rowObj.parent.valueChange[fieldName](-rowObj.parent.valueChange[fieldName]());
    }
    if (rowObj.parent.ns) {
        var fName = rowObj.parent.ns + '.' + fieldName;
        if (rowObj.parent.root.valueChange[fName]) rowObj.parent.root.valueChange[fName](-rowObj.parent.root.valueChange[fName]());
    }

    var event = {
        eventType: 'dataTableEvent',
        dataTable: rowObj.parent.id,
        rowId: rowObj.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: rowObj.getValue(fieldName),
        ctx: ctx || "",
        rowObj: rowObj
    };
    rowObj.parent.trigger(DataTable.ON_VALUE_CHANGE, event);
    rowObj.parent.trigger(fieldName + "." + DataTable.ON_VALUE_CHANGE, event);
    if (rowObj == rowObj.parent.getCurrentRow()) rowObj.parent.trigger(fieldName + "." + DataTable.ON_CURRENT_VALUE_CHANGE, event);

    // 对于多级字表需要触发顶层div的valuechange事件
    if (rowObj.parent.ns) {
        event.fullField = fName;
        event.ns = rowObj.parent.ns;
        rowObj.parent.root.trigger(DataTable.ON_VALUE_CHANGE, event);
        rowObj.parent.root.trigger(fName + "." + DataTable.ON_VALUE_CHANGE, event);
    }
};

/***
 * 格式化数据值
 * @private
 * @param {Object} field
 * @param {Object} value
 */
var formatValue = function formatValue(field, value) {
    if (value && value.replace) {
        value = value.replace(/</g, "&#60;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
    }
    var type = this.parent.getMeta(field, 'type');
    if (!type) return value;
    if (type == 'date' || type == 'datetime') {
        return _formatDate(value);
    }

    return value;
};

// 查找字段
var _findField = function _findField(rowObj, fieldName) {
    var rat = rowObj.data[fieldName];
    if (!rat) {
        var fnames = fieldName.split('.'); //多级field
        if (fnames.length > 1) {
            var tempField = rowObj.data;
            for (var i = 0; i < fnames.length; i++) {
                tempField = tempField[fnames[i]];
                if (tempField.value instanceof DataTable) {
                    var row = tempField.value.getCurrentRow();
                    if (!row) {
                        row = tempField.value.rows()[0];
                    }
                    if (row) tempField = row.data;
                }
                if (!tempField) {
                    break;
                }
            }
            rat = tempField;
        }
    }
    return rat || null;
};

var _getField = function _getField(rowObj, fieldName) {
    var rat = _findField(rowObj, fieldName);
    if (!rat) {
        var msg = 'field:' + fieldName + ' not exist in dataTable:' + rowObj.parent.root.id + '!';
        throw new Error(msg);
    }
    return rat;
};

var rowUtilFunObj = {
    formatValue: formatValue,
    eq: eq,
    _triggerChange: _triggerChange,
    _getField: _getField,
    _dateToUTCString: _dateToUTCString
};

/**
 * Module : kero dataTable row getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
/**
 * 设置对应字段的值
 * @memberof Row
 * @param {string} fieldName 需要设置的字段
 * @param {string} value     需要设置的值
 * @param {*} [ctx]        自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置
 * @param {string} validType 传递值的字符类型，如string，integer等
 * @example
 * row.setValue('filed1','value1') // 设置字段值
 * row.setValue('filed1','value1','ctx') //设置字段值，同时传入自定义数据
 */
var setValue$1 = function setValue(fieldName, value, ctx, options, validType) {

    if (arguments.length === 1) {
        value = fieldName;
        fieldName = '$data';
    }
    var oldValue = this.getValue(fieldName);
    if (typeof oldValue == 'undefined' || oldValue === null) oldValue = '';
    if (validType && validType === "string") {
        if (oldValue === value) return;
    } else {
        if (rowUtilFunObj.eq(oldValue, value)) return;
    }
    var event = {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        rowId: this.rowId,
        field: fieldName,
        oldValue: oldValue,
        newValue: value,
        ctx: ctx || ""
    };
    var flag = this.parent.triggerReturn(DataTable.ON_BEFORE_VALUE_CHANGE, event);
    if (!flag) {
        rowUtilFunObj._triggerChange(this, fieldName, oldValue, ctx);
        return;
    }
    rowUtilFunObj._getField(this, fieldName)['value'] = value;
    rowUtilFunObj._triggerChange(this, fieldName, oldValue, ctx);
};

// 设置字表值，fieldName通过.分隔
var setChildValue = function setChildValue(fieldName, value) {
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    var _field = this.data[_name]; //_field保存当前_name对应的数据
    for (var i = 0, count = nameArr.length; i < count; i++) {
        //最后一级
        if (i == count - 1) {
            if (_field['value'] instanceof u.DataTable) {
                //暂不处理
            } else {
                this.setValue(fieldName, value);
            }
        } else {
            if (_field && _field['value'] instanceof u.DataTable) {
                var row = _field['value'].getCurrentRow();
                if (row) row.setChildValue(fieldName.replace(_name + '.', ''), value);
            } else {
                _name = nameArr[i + 1];
                _field = _field[_name]; //多层嵌套时_field取子项对应的数据
            }
        }
    }
};

// 通过rowid设置字表数据信息
var setChildSimpleDataByRowId = function setChildSimpleDataByRowId(rowId, data) {
    var rowIdArr = rowId.split('.');
    var rowIdLength = rowIdArr.length;
    if (rowIdLength > 1) {
        var _childField = rowIdArr[0]; //子表字段
        var _childObj = this.data[_childField]; // 子表字段存放的obj
        if (_childObj && _childObj['value'] instanceof u.DataTable) {
            var rowId = rowIdArr[1];
            var row = null;
            if (rowId) row = _childObj['value'].getRowByRowId(rowId);
            if (row) {
                if (rowIdArr.length == 2) {
                    row.setSimpleData(data);
                } else {
                    row.setChildSimpleDataByRowId(fieldName.replace(_childField + '.' + rowId + '.', ''), data);
                }
            }
        }
    }
};

/***
 * 设置数据的核心方法
 * @param {u.Row} rowObj     Row对象
 * @param {object} sourceData 源对象
 * @param {object} targetData 目标对象
 * @param {boolean} subscribe  是否触发监听，true表示触发监听
 * @param {string} parentKey  datatable的id
 * @param {object} options    设置数据信息是的配置参数
 * @param {boolean} options.fieldFlag   未设置的meta是否进行存储，如果为true则未设置的meta也进行存储
 */
var _setData = function _setData(rowObj, sourceData, targetData, subscribe, parentKey, options) {
    for (var key in sourceData) {

        // 判断是否要放到dataTable中
        if (options && !options.fieldFlag) {
            if (!rowObj.parent.getMeta(key)) {
                continue;
            }
        }
        var _parentKey = parentKey || null;
        //if (targetData[key]) {
        targetData[key] = targetData[key] || {};
        var valueObj = sourceData[key];

        // if (typeof valueObj != 'object'){
        //     if(typeof options == 'object'){
        //         if(options.fieldFlag) {
        //             rowObj.parent.createField(key);
        //         }
        //     }
        // }

        //if (typeof this.parent.meta[key] === 'undefined') continue;
        if (valueObj == null || (typeof valueObj === 'undefined' ? 'undefined' : _typeof(valueObj)) != 'object') {
            // 子表的话只有valueObj为datatable的时候才赋值
            if (!targetData[key].isChild) {
                targetData[key]['value'] = rowObj.formatValue(key, valueObj);
            }
            if (subscribe === true && oldValue !== targetData[key]['value']) {
                rowUtilFunObj._triggerChange(rowObj, key, oldValue);
            }
        } else {
            if (valueObj.error) {
                if (u.showMessageDialog) u.showMessageDialog({
                    title: "警告",
                    msg: valueObj.error,
                    backdrop: true
                });else alert(valueObj.error);
            } else if (valueObj.value || valueObj.value === null || valueObj.meta || valueObj.value === '' || valueObj.value === '0' || valueObj.value === 0) {
                var oldValue = targetData[key]['value'];
                targetData[key]['value'] = rowObj.formatValue(key, valueObj.value);
                if (subscribe === true && oldValue !== targetData[key]['value']) {
                    rowUtilFunObj._triggerChange(rowObj, key, oldValue);
                }
                for (var k in valueObj.meta) {
                    rowObj.setMeta(key, k, valueObj.meta[k]);
                }
            } else if (isArray(valueObj)) {
                targetData[key].isChild = true;
                //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
                var _key = _parentKey == null ? key : _parentKey + '.' + key;
                var ns = rowObj.parent.ns === '' ? key : rowObj.parent.ns + '.' + _key;
                if (rowObj.parent.meta[_key]) {
                    var meta = rowObj.parent.meta[_key]['meta'];
                    targetData[key].value = new u.DataTable({
                        root: rowObj.parent.root,
                        ns: ns,
                        meta: meta
                    });
                    targetData[key].value.setSimpleData(valueObj);
                }
            } else {
                _parentKey = _parentKey == null ? key : _parentKey + '.' + key;
                _setData(rowObj, valueObj, targetData[key], null, _parentKey, options);
            }
        }
        //}
    }
};

/**
 * 设置row的数据信息
 * @memberof Row
 * @param {object} data      需要设置的配置信息
 * @param {boolean} [subscribe] 是否触发监听，true表示触发监听
 * @param {object} [options]   设置数据信息是的配置参数
 * @param {boolean} [options.fieldFlag]   未设置的meta是否进行存储，如果为true则未设置的meta也进行存储
 * @example
 * var data = {
 *    data:{
 *      filed1:'value1',
 *      field2:'value2'
 *    }
 * }
 * row.setData(data)
 * row.setData(data,false)
 * row.setData(data),false,{fieldFlag:true})
 */
var setData$1 = function setData(data, subscribe, options) {
    var sourceData = data.data,
        targetData = this.data;
    if (this.parent.root.strict != true) {
        _setData(this, sourceData, targetData, subscribe, null, options);
        this.setStatus(data.status);
        return;
    }

    // strict 为true 时 ，定义dataTable的时候必须定义所有字段信息才能设置数据。
    var meta = this.parent.meta;
    for (var key in meta) {
        var oldValue = newValue = null;
        //子数据
        if (meta[key]['type'] && meta[key]['type'] === 'child') {
            targetData[key].isChild = true;
            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
            var meta = this.parent.meta[key]['meta'];
            targetData[key].value = new u.DataTable({
                root: this.parent.root,
                ns: ns,
                meta: meta
            });
            if (_typeof(sourceData[key]) === 'object') targetData[key].value.setSimpleData(sourceData[key]);
        }
        //存在多级关系
        else if (key.indexOf('.') != -1) {
                var keys = key.split('.');
                var _fieldValue = sourceData;
                var _targetField = targetData;
                for (var i = 0; i < keys.length; i++) {
                    _fieldValue = _fieldValue || {};
                    _fieldValue = _fieldValue[keys[i]];
                    _targetField = _targetField[keys[i]];
                }
                oldValue = _targetField['value'];
                _targetField['value'] = this.formatValue(key, _fieldValue);
                newValue = _targetField['value'];
            }
            // 通过 setSimpleData 设置的数据
            else if (sourceData[key] == null || _typeof(sourceData[key]) != 'object') {
                    oldValue = targetData[key]['value'];
                    targetData[key]['value'] = this.formatValue(key, sourceData[key]);
                    newValue = targetData[key]['value'];
                } else {
                    var valueObj = sourceData[key];
                    if (valueObj.error) {
                        if (u.showMessageDialog) u.showMessageDialog({
                            title: "警告",
                            msg: valueObj.error,
                            backdrop: true
                        });else alert(valueObj.error);
                    } else if (valueObj.value || valueObj.value === null || valueObj.meta) {
                        oldValue = targetData[key]['value'];
                        targetData[key]['value'] = this.formatValue(key, valueObj.value);
                        newValue = targetData[key]['value'];
                        for (var k in valueObj.meta) {
                            this.setMeta(key, k, valueObj.meta[k]);
                        }
                    }
                }
        if (subscribe === true && oldValue !== newValue) {
            rowUtilFunObj._triggerChange(this, key, oldValue);
        }
    }
};

// 效果同setData
var updateRow$1 = function updateRow(row) {
    this.setData(row);
};

/**
 * 设置row的status属性
 * @memberof Row
 * @param {string} status      需要设置的status
 * @example
 * row.setStatus(Row.STATUS.NORMAL)
 */
var setStatus = function setStatus(status) {
    this.status = status;
    if (status == Row.STATUS.NORMAL) {
        // 保存baseValue，用于重置
        var data = this.data;
        for (var field in data) {
            var value = data[field].value;
            data[field].baseValue = value;
        }
    }
};

/**
 * 重置数据至nrm状态时的数据
 * @example
 * row.resetValue()
 */
var resetValue = function resetValue() {
    var data = this.data;
    for (var field in data) {
        var value = data[field].baseValue;
        this.setValue(field, value);
    }
};

var rowDataFunObj = {
    setValue: setValue$1,
    setChildValue: setChildValue,
    setChildSimpleDataByRowId: setChildSimpleDataByRowId,
    setData: setData$1,
    updateRow: updateRow$1,
    setStatus: setStatus,
    resetValue: resetValue
};

/**
 * Module : kero dataTable row getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
/**
 * 获取row中某一字段的值
 * @memberof Row
 * @param  {string} fieldName 字段名
 * @return {string}           字段值
 * @example
 * row.getValue('field1')
 */
var getValue$1 = function getValue(fieldName) {
    return rowUtilFunObj._getField(this, fieldName)['value'];
};

//获取子表值 ，如果fieldName对应了一个子表，返回该子表的行数组
var getChildValue = function getChildValue(fieldName) {
    var nameArr = fieldName.split('.');
    var _name = nameArr[0];
    for (var i = 0, count = nameArr.length; i < count; i++) {
        var _value = this.getValue(_name);
        //最后一级
        if (i == count - 1) {
            if (_value instanceof u.DataTable) {
                return _value.rows.peek();
            } else {
                return _value;
            }
        } else {
            if (_value instanceof u.DataTable) {
                _value = _value.getCurrentRow();
                if (!_value) return '';else return _value.getChildValue(fieldName.replace(_name + '.', ''));
            } else {
                _name = _name + '.' + nameArr[i + 1];
            }
        }
    }
    return '';
};

/**
 * 获取数据信息
 * @memberof Row
 * @return {object} 格式如下：{'id': this.rowId, 'status': this.status, data: data}
 * @example
 * row.getData()
 */
var getData$2 = function getData() {
    var data = ko.toJS(this.data);
    var meta = this.parent.getMeta();
    for (var key in meta) {
        if (meta[key] && meta[key].type) {
            if (meta[key].type == 'date' || meta[key].type == 'datetime') {
                if (key.indexOf('.') > 0) {
                    //大于0说明是多级json
                    var keys = key.split('.');
                    var _keyValue = data;
                    for (var i = 0, count = keys.length; i < count; i++) {
                        _keyValue = _keyValue[keys[i]];
                    }
                    _keyValue.value = rowUtilFunObj._dateToUTCString(_keyValue.value);
                } else {
                    data[key].value = rowUtilFunObj._dateToUTCString(data[key].value);
                }
            } else if (meta[key].type == 'child') {
                var chiddt = this.getValue(key),
                    rs = chiddt.rows(),
                    cds = [];
                for (var i = 0; i < rs.length; i++) {
                    cds.push(rs[i].getData());
                }
                data[key].value = JSON.stringify(cds);
            }
        }
    }
    return {
        'id': this.rowId,
        'status': this.status,
        data: data
    };
};

// 获取空数据
var getEmptyData = function getEmptyData() {
    return {
        'id': this.rowId,
        'status': this.status,
        data: {}
    };
};

var rowGetDataFunObj = {
    getValue: getValue$1,
    getChildValue: getChildValue,
    getData: getData$2,
    getEmptyData: getEmptyData
};

/**
 * Module : kero dataTable row getMeta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

/**
 * 获取字段的属性
 * @memberof Row
 * @param  {string} fieldName   字段名
 * @param  {string} key         属性名
 * @param  {boolean} [fetchParent=false] 未定义时是否去DataTable对象查找，为true则未定义时去DataTable对象查找
 * @return {string}             属性值
 * @example
 * row.getMeta('field1','type')
 * row.getMeta('field1','type',true)
 */
var getMeta$1 = function getMeta(fieldName, key, fetchParent) {
    if (arguments.length == 0) {
        var mt = {};
        for (var k in this.data) {
            mt[k] = this.data[k].meta ? this.data[k].meta : {};
        }
        return mt;
    }
    var meta = rowUtilFunObj._getField(this, fieldName).meta;
    if (meta && meta[key] !== undefined && meta[key] !== null && meta[key] !== '') return meta[key];else if (typeof fetchParent == 'undefined' || fetchParent != false) return this.parent.getMeta(fieldName, key);
    return undefined;
};

var rowGetMetaFunObj$1 = {
    getMeta: getMeta$1
};

/**
 * Module : kero dataTable row getSimpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
// 获取数据的核心方法
var _getSimpleData = function _getSimpleData(rowObj, data) {
    var _data = {};
    var meta = rowObj.parent.getMeta() || {};
    for (var key in data) {
        if (key === 'meta' || isEmptyObject(data[key])) {
            continue;
        } else if (data[key].isChild) {
            _data[key] = data[key].value ? data[key].value.getSimpleData() : {};
        } else if (key === '$data') {
            //处理一维数组： [1,2,3]
            _data = data[key].value;
        } else if (typeof data[key].value !== 'undefined') {
            //如果类型为boolean，无论值为false、true都应该等于他本身
            if (meta[key] && meta[key].type === 'boolean') {
                _data[key] = data[key].value ? true : false; //默认值可能是null
            } else {
                _data[key] = data[key].value;
            }
            if (meta[key] && meta[key].type) {
                var obj = {
                    meta: meta,
                    data: data,
                    key: key
                };
                _data[key] = rowObj.formatValueFun(obj, rowObj.parent.dateNoConvert);
            }
        } else if (!data[key].value) {
            _data[key] = data[key].value;
        } else {
            _data[key] = _getSimpleData(rowObj, data[key]);
        }
    }
    return _data;
};

// 对于日期获取值时进行转换
var formatValueFun = function formatValueFun(obj, isDateNoConvert) {
    var meta = obj.meta,
        data = obj.data,
        key = obj.key;
    if (!isDateNoConvert && (meta[key].type == 'date' || meta[key].type == 'datetime')) {
        return rowUtilFunObj._dateToUTCString(data[key].value);
    }
    return data[key].value;
};

/**
 * 获取数据信息
 * @memberof Row
 * @param  {object} [options] 获取数据信息时的配置参数
 * @param  {array} [options.fields] 获取数据信息时是否制定字段值
 * @return {object}         数据信息
 * @example
 * row.getSimpleData()
 * row.getSimpleData({fields:['field1','field2']})
 */
var getSimpleData$1 = function getSimpleData(options) {
    options = options || {};
    var fields = options['fields'] || null;
    var meta = this.parent.getMeta();
    var data = this.data;
    var _data = _getSimpleData(this, data); //{};
    var _fieldsData = {};
    if (fields) {
        for (var key in _data) {
            if (fields.indexOf(key) != -1) {
                _fieldsData[key] = _data[key];
            }
        }
        return _fieldsData;
    }
    return _data;
};

var rowGetSimpleDataFunObj = {
    formatValueFun: formatValueFun,
    getSimpleData: getSimpleData$1
};

/***
 * Module : kero dataTable row init
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

// row的初始化方法
var init = function init() {
    var meta = this.parent.meta;

    for (var key in meta) {
        var targetData;
        if (key.indexOf('.') > 0) {
            var keys = key.split('.');
            targetData = this.data[keys[0]] = this.data[keys[0]] || {};
            for (var i = 1; i < keys.length; i++) {
                targetData[keys[i]] = targetData[keys[i]] || {};
                targetData = targetData[keys[i]];
            }
        } else {
            this.data[key] = this.data[key] || {};
            targetData = this.data[key];
        }
        targetData.value = null;
        //this.data[key] = {}
        //处理子表
        if (meta[key]['type'] && meta[key]['type'] === 'child') {
            targetData.isChild = true;
            //ns 是多级数据时的空间名： 最顶层的dataTable没有ns。  f1.f2.f3
            var ns = this.parent.ns === '' ? key : this.parent.ns + '.' + key;
            targetData.value = new u.DataTable({
                root: this.parent.root,
                ns: ns,
                meta: meta[key]['meta']
            });
        }
        //添加默认值
        else if (meta[key]['default']) {
                var defaults$$1 = meta[key]['default'];
                if ((typeof defaults$$1 === 'undefined' ? 'undefined' : _typeof(defaults$$1)) === 'object') {
                    for (var k in defaults$$1) {
                        if (k == 'value') {
                            if (typeof defaults$$1[k] === 'function') targetData.value = this.formatValue(key, defaults$$1[k]());else targetData.value = this.formatValue(key, defaults$$1[k]);
                        } else {
                            targetData.meta = targetData.meta || {};
                            targetData.meta[k] = defaults$$1[k];
                        }
                    }
                } else {
                    if (typeof defaults$$1 === 'function') targetData.value = this.formatValue(key, defaults$$1());else targetData.value = this.formatValue(key, defaults$$1);
                }
            }
    }
};

var rowInitFunObj = {
    init: init
};

/**
 * Module : kero dataTable row meta
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
/**
 * 设置meta信息
 * @memberof Row
 * @param {string} fieldName 需要设置meta信息的字段名
 * @param {string} key       meta信息的key
 * @param {string} value     meta信息的值
 * @example
 * row.setMeta('filed1','type','string')
 */
var setMeta$1 = function setMeta(fieldName, key, value) {
    var meta = rowUtilFunObj._getField(this, fieldName).meta;
    if (!meta) meta = rowUtilFunObj._getField(this, fieldName).meta = {};
    var oldValue = meta[key];
    if (rowUtilFunObj.eq(oldValue, value)) return;
    meta[key] = value;
    //this.metaChange(- this.metaChange())
    if (this.metaChange[fieldName + '.' + key]) {
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    }

    if (key == 'enable') this.parent.enableChange(-this.parent.enableChange());
    if (this.parent.getCurrentRow() == this) {
        if (this.parent.metaChange[fieldName + '.' + key]) this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
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
};

var rowMetaFunObj = {
    setMeta: setMeta$1
};

/**
 * Module : Sparrow cookies
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

var setCookie = function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
	var sCookie = sName + "=" + encodeURIComponent(sValue);
	if(oExpires)
		sCookie += "; expires=" + oExpires.toGMTString();
	if(sPath)
		sCookie += "; path=" + sPath;
	if(sDomain)
		sCookie += "; domain=" + sDomain;
	if(bSecure)
		sCookie += "; secure=" + bSecure;
	document.cookie = sCookie;
};

var getCookie = function(sName) {
	var sRE = "(?:; )?" + sName + "=([^;]*);?";
	var oRE = new RegExp(sRE);

	if(oRE.test(document.cookie)) {
		return decodeURIComponent(RegExp["$1"]);
	} else
		return null;
};

/**
 * Module : Sparrow core context
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 13:52:19
 */
var environment = {};
/**
 * client attributes
 */
var clientAttributes = {};

var sessionAttributes = {};

var fn = {};
var maskerMeta = {
	'float': {
		precision: 2
	},
	'datetime': {
		format: 'YYYY-MM-DD HH:mm:ss',
		metaType: 'DateTimeFormatMeta',
		speratorSymbol: '-'
	},
	'time': {
		format: 'HH:mm'
	},
	'date': {
		format: 'YYYY-MM-DD'
	},
	'currency': {
		precision: 2,
		curSymbol: '￥'
	},
	'percent': {

	},
	'phoneNumber': {
		
	}
};
/**
 * 获取环境信息
 * @return {environment}
 */
fn.getEnvironment = function() {
	return createShellObject(environment);
};

/**
 * 获取客户端参数对象
 * @return {clientAttributes}
 */
fn.getClientAttributes = function() {
	var exf = function() {};
	return createShellObject(clientAttributes);
};

fn.setContextPath = function(contextPath) {
	return environment[IWEB_CONTEXT_PATH] = contextPath
};
fn.getContextPath = function(contextPath) {
		return environment[IWEB_CONTEXT_PATH]
	};
	/**
	 * 设置客户端参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
fn.setClientAttribute = function(k, v) {
		clientAttributes[k] = v;
	};
	/**
	 * 获取会话级参数对象
	 * @return {clientAttributes}
	 */
fn.getSessionAttributes = function() {
	var exf = function() {};
	return createShellObject(sessionAttributes);
};

/**
 * 设置会话级参数对象
 * @param {Object} k 对象名称
 * @param {Object} v 对象值(建议使用简单类型)
 */
fn.setSessionAttribute = function(k, v) {
	sessionAttributes[k] = v;
	setCookie("ISES_" + k, v);
};

/**
 * 移除客户端参数
 * @param {Object} k 对象名称
 */
fn.removeClientAttribute = function(k) {
	clientAttributes[k] = null;
	execIgnoreError(function() {
		delete clientAttributes[k];
	});
};

/**
 * 获取地区信息编码
 */
fn.getLocale = function() {
	return this.getEnvironment().locale
};

/**
 * 获取多语信息
 */
fn.getLanguages = function() {
	return this.getEnvironment().languages
};
/**
 * 收集环境信息(包括客户端参数)
 * @return {Object}
 */
fn.collectEnvironment = function() {
	var _env = this.getEnvironment();
	var _ses = this.getSessionAttributes();

	for(var i in clientAttributes) {
		_ses[i] = clientAttributes[i];
	}
	_env.clientAttributes = _ses;
	return _env
};

/**
 * 设置数据格式信息
 * @param {String} type
 * @param {Object} meta
 */
fn.setMaskerMeta = function(type, meta) {
	if(typeof type == 'function') {
		getMetaFunc = type;
	} else {
		if(!maskerMeta[type])
			maskerMeta[type] = meta;
		else {
			if(typeof meta != 'object')
				maskerMeta[type] = meta;
			else
				for(var key in meta) {
					maskerMeta[type][key] = meta[key];
				}
		}
	}
};
fn.getMaskerMeta = function(type) {
	if(typeof getMetaFunc == 'function') {
		var meta = getMetaFunc.call(this);
		return meta[type];
	} else
		return extend({}, maskerMeta[type]);
};
environment.languages = getCookie(U_LANGUAGES) ? getCookie(U_LANGUAGES).split(',') : navigator.language ? navigator.language : 'zh-CN';
if(environment.languages == 'zh-cn')
	environment.languages = 'zh-CN';
if(environment.languages == 'en-us')
	environment.languages = 'en-US';

environment.theme = getCookie(U_THEME);
environment.locale = getCookie(U_LOCALE);
//environment.timezoneOffset = (new Date()).getTimezoneOffset()
environment.usercode = getCookie(U_USERCODE);
//init session attribute
document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function(a, b, c) {
	sessionAttributes[b] = c;
});

var Core = function() {};
Core.prototype = fn;

var core = new Core();

/**
 * Module : Sparrow i18n
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-29 10:16:54
 */
//import {uuii18n} from '?';//缺失故修改为default值
// 从datatable/src/compatiable/u/JsExtension.js抽取
window.getCurrentJsPath = function() {
	var doc = document,
	a = {},
	expose = +new Date(),
	rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
	isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
	// FF,Chrome
	if (doc.currentScript){
		return doc.currentScript.src;
	}

	var stack;
	try{
		a.b();
	}
	catch(e){
		stack = e.stack || e.fileName || e.sourceURL || e.stacktrace;
	}
	// IE10
	if (stack){
		var absPath = rExtractUri.exec(stack)[1];
		if (absPath){
			return absPath;
		}
	}

	// IE5-9
	for(var scripts = doc.scripts,
		i = scripts.length - 1,
		script; script = scripts[i--];){
		if (script.className !== expose && script.readyState === 'interactive'){
			script.className = expose;
			// if less than ie 8, must get abs path by getAttribute(src, 4)
			return isLtIE8 ? script.getAttribute('src', 4) : script.src;
		}
	}
};

if (window.i18n) {
	window.u = window.u || {};
    var scriptPath = getCurrentJsPath(),
        _temp = scriptPath.substr(0, scriptPath.lastIndexOf('/')),
        __FOLDER__ = _temp.substr(0, _temp.lastIndexOf('/')),
        resGetPath = u.i18nPath || __FOLDER__ + '/locales/__lng__/__ns__.json';
    i18n.init({
        postAsync: false,
        getAsync: false,
        fallbackLng: false,
        ns: {namespaces: ['uui-trans']},
		lng:getCookie(U_LOCALE) || 'zh',
        resGetPath: resGetPath
    });
}

var trans = function (key, dftValue) {
    return  window.i18n ?  i18n.t('uui-trans:' + key) : dftValue
};

/**
 * Module : Sparrow date util
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-06 13:37:20
 */

var u$1 = {};
u$1.date = {

    /**
     * 多语言处理
     */
    //TODO 后续放到多语文件中
    _dateLocale: {
        'zh-CN': {
            months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
            monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
            weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
            weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
            weekdaysMin: '日_一_二_三_四_五_六'.split('_')
        },
        'en-US': {
            months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
            monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
            weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thurday_Friday_Saturday'.split('_'),
            weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            weekdaysMin: 'S_M_T_W_T_F_S'.split('_')
        }
    },
    _jsonLocale: {
        months: trans('date.months', "一月\n二月\n三月\n四月\n五月\n六月\n七月\n八月\n九月\n十月\n十一月\n十二月").split('\n'),
        monthsShort: trans('date.monthsShort', "1月\n2月\n3月\n4月\n5月\n6月\n7月\n8月\n9月\n10月\n11月\n12月").split('\n'),
        weekdays: trans('date.weekdays', "星期日\n星期一\n星期二\n星期三\n星期四\n星期五\n星期六").split('\n'),
        weekdaysShort: trans('date.weekdaysShort', "周日\n周一\n周二\n周三\n周四\n周五\n周六").split('\n'),
        weekdaysMin: trans('date.weekdaysMin', "日\n一\n二\n三\n四\n五\n六").split('\n'),
        defaultMonth: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },

    _formattingTokens: /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYY|YY|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,

    leftZeroFill: function(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    },

    _formats: {
        //year
        YY: function(date) {
            return u$1.date.leftZeroFill(date.getFullYear() % 100, 2);
        },
        YYYY: function(date) {
            return date.getFullYear();
        },
        //month
        M: function(date) {
            return date.getMonth() + 1;
        },
        MM: function(date) {
            var m = u$1.date._formats.M(date);
            return u$1.date.leftZeroFill(m, 2);
        },
        MMM: function(date, language) {
            var m = date.getMonth();
            // return u.date._dateLocale[language].monthsShort[m];
            return u$1.date._jsonLocale.monthsShort[m];
        },
        MMMM: function(date, language) {
            var m = date.getMonth();
            // return u.date._dateLocale[language].months[m];
            return u$1.date._jsonLocale.months[m];
        },
        //date
        D: function(date) {
            return date.getDate();
        },
        DD: function(date) {
            var d = u$1.date._formats.D(date);
            return u$1.date.leftZeroFill(d, 2);
        },
        // weekday
        d: function(date) {
            return date.getDay();
        },
        dd: function(date, language) {
            var d = u$1.date._formats.d(date);
            // return u.date._dateLocale[language].weekdaysMin[d];
            return u$1.date._jsonLocale.weekdaysMin[d];
        },
        ddd: function(date, language) {
            var d = u$1.date._formats.d(date);
            // return u.date._dateLocale[language].weekdaysShort[d];
            return u$1.date._jsonLocale.weekdaysShort[d];
        },
        dddd: function(date, language) {
            var d = u$1.date._formats.d(date);
            // return u.date._dateLocale[language].weekdays[d];
            return u$1.date._jsonLocale.weekdays[d];
        },
        // am pm
        a: function(date) {
            if (date.getHours() > 12) {
                return 'pm';
            } else {
                return 'am';
            }
        },
        //hour
        h: function(date) {
            var h = date.getHours();
            h = h > 12 ? h - 12 : h;
            return h
        },
        hh: function(date) {
            var h = u$1.date._formats.h(date);
            return u$1.date.leftZeroFill(h, 2);
        },
        H: function(date) {
            return date.getHours();
        },
        HH: function(date) {
            return u$1.date.leftZeroFill(date.getHours(), 2);
        },
        // minutes
        m: function(date) {
            return date.getMinutes();
        },
        mm: function(date) {
            return u$1.date.leftZeroFill(date.getMinutes(), 2);
        },
        //seconds
        s: function(date) {
            return date.getSeconds();
        },
        ss: function(date) {
            return u$1.date.leftZeroFill(date.getSeconds(), 2);
        }
    },

    /**
     * 日期格式化
     * @param date
     * @param formatString
     */
    format: function(date, formatString, language) {
        if (!date && date != 0) return ''; // renturn date 改为 return '',因：setFormat初始会赋值为undefined,造成二次选择报错
        var array = formatString.match(u$1.date._formattingTokens),
            i, length, output = '';
        var _date = u$1.date.getDateObj(date);
        if (!_date) return date;
        language = language || core.getLanguages();
        for (i = 0, length = array.length; i < length; i++) {
            if (u$1.date._formats[array[i]]) {
                output += u$1.date._formats[array[i]](_date, language);
            } else {
                output += array[i];
            }
        }
        return output;
    },
    strToDateByTimezone: function(str, timezone) {
        var dateObj = u$1.date.getDateObj(str);
        var localTime = dateObj.getTime();
        var localOffset = dateObj.getTimezoneOffset() * 60000;
        var utc = localTime + localOffset; //得到国际标准时间
        utc = utc + (3600000 * parseFloat(timezone));
        return utc;
    },

    /**
     * 根据当前时区日期对象获取指定时区日期对象
     * @param  {Date} date     当前时区日期对象
     * @param  {number} timezone 指定时区
     * @return {Date}          转化后的日期对象
     */
    getDateByTimeZonec2z: function(date, timezone) {
        var dateObj = u$1.date.getDateObj(date);
        var localTime = dateObj.getTime();
        var localOffset = dateObj.getTimezoneOffset() * 60000;
        var utc = localTime + localOffset;
        var calctime = utc + (3600000 * parseFloat(timezone));
        return new Date(calctime);
    },
    /**
     * 根据指定时区日期对象获取当前时区日期对象
     * @param  {Date} date     指定时区日期对象
     * @param  {number} timezone 指定时区
     * @return {Date}          转化后的日期对象
     */
    getDateByTimeZonez2c: function(date, timezone) {
        var dateObj = u$1.date.getDateObj(date);
        var localTime = dateObj.getTime();
        var localOffset = dateObj.getTimezoneOffset() * 60000;
        var utc = localTime - (3600000 * parseFloat(timezone)) - localOffset;
        return new Date(utc)
    },

    _addOrSubtract: function(date, period, value, isAdding) {
        var times = date.getTime(),
            d = date.getDate(),
            m = date.getMonth(),
            _date = u$1.date.getDateObj(date);
        if (period === 'ms') {
            times = times + value * isAdding;
            _date.setTime(times);
        } else if (period == 's') {
            times = times + value * 1000 * isAdding;
            _date.setTime(times);
        } else if (period == 'm') {
            times = times + value * 60000 * isAdding;
            _date.setTime(times);
        } else if (period == 'h') {
            times = times + value * 3600000 * isAdding;
            _date.setTime(times);
        } else if (period == 'd') {
            d = d + value * isAdding;
            _date.setDate(d);
        } else if (period == 'w') {
            d = d + value * 7 * isAdding;
            _date.setDate(d);
        } else if (period == 'M') {
            m = m + value * isAdding;
            _date.setMonth(m);
        } else if (period == 'y') {
            m = m + value * 12 * isAdding;
            _date.setMonth(m);
        }
        return _date;
    },

    add: function(date, period, value) {
        return u$1.date._addOrSubtract(date, period, value, 1);
    },
    sub: function(date, period, value) {
        return u$1.date._addOrSubtract(date, period, value, -1);
    },
    getDateObj: function(value, obj) {
        var timezone;
        if (obj) {
            timezone = obj.timezone;
        }
        if ((!value && value != 0) || typeof value == 'undefined') return value;
        var dateFlag = false;
        var _date = new Date(dateFormat(value));
        if (isNaN(_date)) {
            // IE的话对"2016-2-13 12:13:22"进行处理
            var index1, index2, index3, s1, s2, s3, s4;
            if (value.indexOf) {
                index1 = value.indexOf('-');
                index2 = value.indexOf(':');
                index3 = value.indexOf(' ');
                if (index1 > 0 || index2 > 0 || index3 > 0) {
                    _date = new Date();
                    if (index3 > 0) {
                        s3 = value.split(' ');
                        s1 = s3[0].split('-');
                        s2 = s3[1].split(':');
                        s4 = s3[2];
                    } else if (index1 > 0) {
                        s1 = value.split('-');
                    } else if (index2 > 0) {
                        s2 = value.split(':');
                    }
                    if (s1 && s1.length > 0) {
                        _date.setYear(s1[0]);
                        _date.setMonth(parseInt(s1[1] - 1));
                        _date.setDate(s1[2] ? s1[2] : 0);
                        _date.setMonth(parseInt(s1[1] - 1));
                        _date.setDate(s1[2] ? s1[2] : 0);
                        dateFlag = true;
                    }
                    if (s2 && s2.length > 0) {
                        //解决ie和firefox等时间pm直接变am问题
                        if (s4 == "pm") {
                            s2[0] = s2[0] - (-12);
                        }
                        _date.setHours(s2[0] ? s2[0] : 0);
                        _date.setMinutes(s2[1] ? s2[1] : 0);
                        _date.setSeconds(s2[2] ? s2[2] : 0);
                        dateFlag = true;
                    }
                } else {
                    _date = new Date(parseInt(value));
                    if (isNaN(_date)) {
                        // throw new TypeError('invalid Date parameter');
                    } else {
                        dateFlag = true;
                    }
                }
            }
        } else {
            dateFlag = true;
        }
        if (dateFlag) {
            if (timezone) {
                _date = u$1.date.getDateByTimeZonec2z(_date, timezone);
            }
            return _date;
        } else
            return null;
    }

};

var date = u$1.date;

/**
 * Module : kero dataTable row ref
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */
/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @example
 * row.ref('field1').subscribe(function(){})
 */
var ref$1 = function ref(fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            return this.getChildValue(fieldName);
            //var value = this._getField(fieldName)['value'];
            //return value;
        },
        write: function write(value) {
            this.setChildValue(fieldName, value);
            //this.setValue(fieldName, value)
        },
        owner: this
    });
};

/**
 * 绑定字段属性，当字段属性发生改变时触发对应方法
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} key 绑定的属性key
 * @example
 * row.refMeta('field1','type').subscribe(function(){})
 */
var refMeta$1 = function refMeta(fieldName, key) {
    if (!this.metaChange[fieldName + '.' + key]) this.metaChange[fieldName + '.' + key] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.metaChange[fieldName + '.' + key]();
            return this.getMeta(fieldName, key);
        },
        write: function write(value) {
            this.setMeta(fieldName, key, value);
        },
        owner: this
    });
};

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法，针对下拉字段根据key转化为对应的value
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} datasource 下拉数据源变量名
 * @example
 * row.refCombo('field1','source1').subscribe(function(){})
 */
var refCombo = function refCombo(fieldName, datasource) {
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            var ds = getJSObject(this.parent.parent, datasource);
            if (rowUtilFunObj._getField(this, fieldName)['value'] === undefined || rowUtilFunObj._getField(this, fieldName)['value'] === "") return "";
            var v = rowUtilFunObj._getField(this, fieldName)['value'];
            var valArr = typeof v === 'string' ? v.split(',') : [v];

            var nameArr = [];

            for (var i = 0, length = ds.length; i < length; i++) {
                for (var j = 0; j < valArr.length; j++) {
                    var value = ds[i]['pk'] || ds[i]['value'] || '';
                    if (value == valArr[j]) {
                        nameArr.push(ds[i].name);
                    }
                }
            }

            return nameArr.toString();
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};

/**
 * 为某个字段绑定监听，当字段发生改变时触发对应方法，针对日期字段进行格式化
 * @memberof Row
 * @param {string} fieldName 绑定的字段名
 * @param {string} format 格式化规则
 * @example
 * row.refDate('field1','YYYY-MM-DD').subscribe(function(){})
 */
var refDate = function refDate(fieldName, format) {
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!rowUtilFunObj._getField(this, fieldName)['value']) return "";
            var valArr = rowUtilFunObj._getField(this, fieldName)['value'];
            if (!valArr) return "";
            valArr = date.format(valArr, format); //moment(valArr).format(format)
            return valArr;
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};

// 针对boolean类型进行转化，项目个性化代码，刘云燕提交
var refEnum = function refEnum(fieldName) {
    this.parent.createField(fieldName);
    if (!this.valueChange[fieldName]) this.valueChange[fieldName] = ko.observable(1);
    return ko.pureComputed({
        read: function read() {
            this.valueChange[fieldName]();
            this.currentRowChange();
            if (!rowUtilFunObj._getField(this, fieldName)['value']) return "";
            var valArr = rowUtilFunObj._getField(this, fieldName)['value'];
            if (!valArr) return "";
            if (valArr == "N") valArr = "否";else if (valArr == "Y") valArr = "是";
            return valArr;
        },
        write: function write(value) {

            this.setValue(fieldName, value);
        },
        owner: this
    });
};

var rowRefFunObj = {
    ref: ref$1,
    refMeta: refMeta$1,
    refCombo: refCombo,
    refDate: refDate,
    refEnum: refEnum
};

/**
 * Module : kero dataTable row rowSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

/**
 * 切换数据行的选中状态
 * @memberof Row
 * @param  {boolean} [type] 执行选中操作时，如果为single则取消其他行的选中状态，否则只修改当前行的选中状态
 * @example
 * row.toggleSelect()
 * row.toggleSelect('single')
 * row.toggleSelect('multi')
 */
var toggleSelect = function toggleSelect(type) {
    var index = this.parent.getRowIndex(this);
    var selectindices = this.parent.getSelectedIndices();
    if (selectindices.indexOf(index) != -1) {
        this.parent.setRowUnSelect(index);
    } else {
        if (type === 'single') this.parent.setRowSelect(index);else this.parent.addRowSelect(index);
    }
};

var singleSelect = function singleSelect() {
    this.toggleSelect('single');
};

var multiSelect = function multiSelect() {
    this.toggleSelect('multi');
};

var rowRowSelectFunObj = {
    toggleSelect: toggleSelect,
    singleSelect: singleSelect,
    multiSelect: multiSelect
};

/**
 * Module : kero dataTable row simpleData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

/**
 * 设置数据, 只设置字段值
 * @memberof Row
 * @param {object} data 数据信息
 * @param {boject} [status=nrm] 数据行状态
 * @example
 * var data = {
 *   filed1:'value1',
 *   field2:'value2'
 * }
 * datatable.setSimpleData(data)
 * datatable.setSimpleData(data,'upd')
 */
var setSimpleData$1 = function setSimpleData(data, status) {
  var allData = {};
  allData.data = data;
  allData.status = status || 'nrm';
  this.setData(allData, true);
  this.currentRowChange(-this.currentRowChange());
};

var rowSimpleDataFunObj = {
  setSimpleData: setSimpleData$1
};

/**
 * Module : Kero webpack entry row index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date   : 2016-08-09 15:24:46
 */

/**
 * Row
 * @namespace
 * @description 前端数据模型行对象
 */

var Row$1 = function (_Events) {
    inherits(Row, _Events);

    function Row(options) {
        classCallCheck(this, Row);

        var _this = possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this));

        var self = _this;
        /**
         * 当前行的唯一标识
         * @type {string}
         */
        _this.rowId = options['id'] || Row.getRandomRowId();
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
        _this.status = Row.STATUS.NEW;
        /**
         * 当前行对应的DataTable对象
         * @type {u.DataTable}
         */
        _this.parent = options['parent'];
        // 当前行的数据信息
        _this.data = {};
        // 存储meta改变信息
        _this.metaChange = {}; //ko.observable(1)
        // 存储valuecahnge改变信息
        _this.valueChange = {};
        // 监听当前行改变
        _this.currentRowChange = ko.observable(1);
        // 监听当前行是否选中
        _this.selected = ko.pureComputed({
            read: function read() {
                var index = this.parent.getRowIndex(this);
                var selectindices = this.parent.getSelectedIndices();
                return selectindices.indexOf(index) != -1;
            },
            owner: _this

        });
        // 监听当前行是否为focus
        _this.focused = ko.pureComputed({
            read: function read() {
                var index = this.parent.getRowIndex(this);
                var focusIndex = this.parent.getFocusIndex();
                return focusIndex == index;
            },
            owner: _this

        });
        _this.init();
        return _this;
    }

    return Row;
}(Events);

var RowProto = Row$1.prototype;
Object.assign(RowProto, rowDataFunObj);
Object.assign(RowProto, rowGetDataFunObj);
Object.assign(RowProto, rowGetMetaFunObj$1);
Object.assign(RowProto, rowGetSimpleDataFunObj);
Object.assign(RowProto, rowInitFunObj);
Object.assign(RowProto, rowMetaFunObj);
Object.assign(RowProto, rowRefFunObj);
Object.assign(RowProto, rowRowSelectFunObj);
Object.assign(RowProto, rowSimpleDataFunObj);
Object.assign(RowProto, rowUtilFunObj);

Row$1.STATUS = {
    NORMAL: 'nrm',
    UPDATE: 'upd',
    NEW: 'new',
    DELETE: 'del',
    FALSE_DELETE: 'fdel'

    /*
     * 生成随机行id
     * @private
     */
};Row$1.getRandomRowId = function () {
    var _id = setTimeout(function () {});
    return _id + '';
};

/**
 * Module : Kero webpack entry index
 * Author : liuyk(liuyuekai@yonyou.com)
 * Date	  : 2016-08-08 15:24:46
 */

window.DataTable = DataTable$1;

window.Page = Page$1;

window.Row = Row$1;

window.u = window.u || {};
u = window.u;
u.DataTable = DataTable$1;
u.Row = Row$1;

exports.u = u;
exports.DataTable = DataTable$1;

}((this.bar = this.bar || {})));
