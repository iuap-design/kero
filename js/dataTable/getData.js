/**
 * Module : kero dataTable getData
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-07-30 14:34:01
 */ 

/**
 * 获取当前页数据
 */
const getData = function () {
    var datas = [], rows = this.rows();
    for (var i = 0; i < rows.length; i++) {
        datas.push(rows[i].getData())
    }
    return datas
}

/**
 * 将page转为row对象格式
 */
const page2data = function(page, pageIndex){
    var data = {}
    data.focus = page.focus;
    data.index = pageIndex;
    data.select = page.selectedIndices;
    return data;
}

const getDataByRule = function (rule) {
    var returnData = {}, datas = null, rows;
    returnData.meta = this.meta
    returnData.params = this.params
    rule = rule || DataTable.SUBMIT.current;
    // 存在多页及不存在多页分开处理
    if(this.pageCache){
        var pages = this.getPages();
        if(rule == DataTable.SUBMIT.current || rule == DataTable.SUBMIT.focus){
            datas = []
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if(currPage){
                var currIndex = this.focusIndex()
                if(rule == DataTable.SUBMIT.current){
                    if (currIndex == -1)
                        currIndex = this.getSelectedIndex()
                }
                var data = page2data(currPage,pageIndex);
                data.rows = [];
                for(var i = 0, count = currPage.rows.length; i < count; i++){
                    var row = currPage.rows[i].getData();
                    if(i != currIndex)
                        row.data = {}
                    data.rows.push(row);
                }
                datas.push(data);
            }
        }
        else if (rule == DataTable.SUBMIT.all || rule == DataTable.SUBMIT.allPages) {
            datas = []
            for(var i = 0; i < pages.length; i++){
                var currPage = pages[i]
                var data = page2data(currPage,i);
                data.rows = [];
                for(var i = 0; i < currPage.rows.length; i++){
                    data.rows.push(currPage.rows[i].getData())
                }
                datas.push(data)
            }
        }
        else if (rule == DataTable.SUBMIT.select) {
            datas = []
            var pageIndex = this.pageIndex();
            var currPage = pages[pageIndex];
            if(currPage){
                var data = page2data(currPage,pageIndex);
                data.rows = [];
                for(var i = 0, count = currPage.rows.length; i < count; i++){
                    var row = currPage.rows[i].getData();
                    if(data.select.indexOf(i) < 0)
                        row.data = {}
                    data.rows.push(row);
                }
                datas.push(data);
            }
        }
        else if (rule == DataTable.SUBMIT.allSelect) {
            datas = []
            for(var i = 0; i < pages.length; i++){
                var currPage = pages[i]
                var data = page2data(currPage,i);
                data.rows = [];
                for(var j = 0, count = currPage.rows.length; j < count; j++){
                    var row = currPage.rows[j].getData();
                    if(data.select.indexOf(j) < 0)
                        row.data = {}
                    data.rows.push(row);
                }
                datas.push(data)
            }
        }
        else if (rule == DataTable.SUBMIT.change) {
            datas = []
            for(var i = 0; i < pages.length; i++){
                var currPage = pages[i]
                var data = page2data(currPage,i);
                data.rows = [];
                for(var j = 0, count = currPage.rows.length; j < count; j++){
                    var row = currPage.rows[j].getData();
                    if(row.status == Row.STATUS.NORMAL){
                        row.data = {}
                    }
                    data.rows.push(row)
                }
                datas.push(data)
            }
        }
        else if (rule === DataTable.SUBMIT.empty) {
            datas = []
        }
        if(pages.length < 1 || !pages[this.pageIndex()]){
            datas = [{ index: this.pageIndex(), select: [], focus: -1, rows: [] }];
        }
        returnData.pages = datas;
    }else{
        if (rule == DataTable.SUBMIT.current) {
            datas = []
            var currIndex = this.focusIndex()
            if (currIndex == -1)
                currIndex = this.getSelectedIndex()
            rows = this.rows();
            for (var i = 0, count = rows.length; i < count; i++) {
                if (i == currIndex)
                    datas.push(rows[i].getData())
                else
                    datas.push(rows[i].getEmptyData())
            }

        }
        else if (rule == DataTable.SUBMIT.focus) {
            datas = []
            rows = this.rows();
            for (var i = 0, count = rows.length; i < count; i++) {
                if (i == this.focusIndex())
                    datas.push(rows[i].getData())
                else
                    datas.push(rows[i].getEmptyData())
            }
        }
        else if (rule == DataTable.SUBMIT.all) {
            datas = this.getData()
        }
        else if (rule == DataTable.SUBMIT.select) {
            datas = this.getSelectedDatas(true)
        }
        else if (rule == DataTable.SUBMIT.change) {
            datas = this.getChangedDatas()
        }
        else if (rule === DataTable.SUBMIT.empty) {
            datas = []
        }

        returnData.rows = datas
        returnData.select = this.getSelectedIndexs()
        returnData.focus = this.getFocusIndex()
    }

    
        

    returnData.pageSize = this.pageSize()
    returnData.pageIndex = this.pageIndex()
    returnData.isChanged = this.isChanged()
    returnData.master = this.master
    returnData.pageCache = this.pageCache
    return returnData
}



const getRow = function (index) {
    //return this.rows()[index]   //modify by licza.   improve performance
    return this.rows.peek()[index]
};

const getChildRow = function(obj){
    var fullField = obj.fullField,
        index = obj.index,
        row = null;
    if (parseInt(index) > -1) {
        if ((index + '').indexOf('.') > 0) {
            var fieldArr = fullField.split('.');
            var indexArr = index.split('.');
            var nowDatatable = this;
            var nowRow = null;
            for (var i = 0; i < indexArr.length; i++) {
                nowRow = nowDatatable.getRow(indexArr[i]);
                if (i < indexArr.length - 1) {
                    if (nowRow) {
                        nowDatatable = nowRow.getValue(fieldArr[i]);
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
 * 根据rowid取row对象
 * @param rowid
 * @returns {*}
 */
const getRowByRowId = function (rowid) {
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
const getRowIndex = function (row){
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].rowId === row.rowId)
            return i;
    }
    return -1;
};

const getRowsByField = function(field,value){
    var rows = this.rows.peek();
    var returnRows = new Array();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value)
            returnRows.push(rows[i]);
    }
    return returnRows;
}

const getRowByField = function(field,value){
    var rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i].getValue(field) === value)
            return rows[i]
    }
    return null;
}

const getAllRows = function () {
    return this.rows.peek();
}

const getAllPageRows = function () {
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
const getChangedDatas = function (withEmptyRow) {
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
const getChangedRows = function(){
    var changedRows = [], rows = this.rows.peek();
    for (var i = 0, count = rows.length; i < count; i++) {
        if (rows[i] && rows[i].status != Row.STATUS.NORMAL) {
            changedRows.push(rows[i])
        }
    }
    return changedRows
}


const getValue = function (fieldName, row) {
    row = row || this.getCurrentRow()
    if (row)
        return row.getValue(fieldName)
    else
        return ''
}


/**
 * 根据行号获取行索引
 * @param {String} rowId
 */
const getIndexByRowId = function (rowId) {
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
const getAllDatas = function () {
    var rows = this.getAllRows()
    var datas = []
    for (var i = 0, count = rows.length; i < count; i++)
        if (rows[i])
            datas.push(rows[i].getData())
    return datas
}


/**
 * 根据索引取rowid
 * @param {Object} indices
 */
const getRowIdsByIndices = function (indices) {
    var rowIds = []
    for (var i = 0; i < indices.length; i++) {
        rowIds.push(this.getRow(indices[i]).rowId)
    }
    return rowIds
}


export {
    getData,
    getDataByRule,
    getRow,
    getChildRow,
    getRowByRowId,
    getRowIndex,
    getRowsByField,
    getRowByField,
    getAllRows,
    getAllPageRows,
    getChangedDatas,
    getChangedRows,
    getValue,
    getIndexByRowId,
    getAllDatas,
    getRowIdsByIndices
}