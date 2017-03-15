(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'tinper-sparrow/src/util', './util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('tinper-sparrow/src/util'), require('./util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.util, global.util);
        global.rowSelect = mod.exports;
    }
})(this, function (exports, _util, _util2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.rowSelectFunObj = undefined;


    /**
     * 设置所有行选中
     * @memberof DataTable
     * @example
     * datatable.setAllRowsSelect()
     */
    /**
     * Module : kero dataTable rowSelect
     * Author : liuyk(liuyk@yonyou.com)
     * Date   : 2016-08-01 14:34:01
     */
    const setAllRowsSelect = function () {
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
    const setRowSelect = function (index) {
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
    const setRowsSelect = function (indices) {
        indices = indices || -1;
        if (indices == -1) {
            this.setAllRowsUnSelect({
                quiet: true
            });
            return;
        }
        indices = _util2.utilFunObj._formatToIndicesArray(this, indices);
        var sIns = this.selectedIndices();
        if ((0, _util.isArray)(indices) && (0, _util.isArray)(sIns) && indices.join() == sIns.join()) {
            // 避免与控件循环触发
            return;
        }

        if ((0, _util.isArray)(indices)) {
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
    };

    /**
     * 根据索引添加选中行，不会清空之前已选中的行
     * @memberof DataTable
     * @param {number} index 需要选中行的索引
     * @example
     * datatable.addRowSelect(1)
     */
    const addRowSelect = function (index) {
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
    const addRowsSelect = function (indices) {
        indices = _util2.utilFunObj._formatToIndicesArray(this, indices);
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
    const setAllRowsUnSelect = function (options) {
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
    const setRowUnSelect = function (index) {
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
    const setRowsUnSelect = function (indices) {
        indices = _util2.utilFunObj._formatToIndicesArray(this, indices);
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
    const toggleAllSelect = function () {
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
    const updateSelectedIndices = function (index, type, num) {
        if (!(0, _util.isNumber)(num)) {
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
    const rowSelectFunObj = exports.rowSelectFunObj = {
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
});