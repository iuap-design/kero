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

const getDataByRule = function (rule) {
    var returnData = {}, datas = null, rows;
    returnData.meta = this.meta
    returnData.params = this.params
    rule = rule || DataTable.SUBMIT.current
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
    if (this.pageCache && datas != null) {
        datas = [{index: this.pageIndex(), select: this.getSelectedIndexs(), focus: this.focusIndex(), rows: datas}]
    }
    if (rule == DataTable.SUBMIT.allSelect) {
        datas = []
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getSelectedDatas()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({
                        index: i,
                        select: page.selectedIndices,
                        focus: page.focus,
                        rows: page.getSelectDatas()
                    });
                }
            }
        }
    } else if (rule == DataTable.SUBMIT.allPages) {
        datas = []
        var totalPages = this.totalPages();
        //缓存页数据
        for (var i = 0; i < totalPages; i++) {
            if (i == this.pageIndex()) {
                //当前页数据
                datas.push({
                    index: this.pageIndex(),
                    select: this.getSelectedIndexs(),
                    focus: this.focusIndex(),
                    rows: this.getData()
                });
            } else {
                var page = this.cachedPages[i];
                if (page) {
                    datas.push({index: i, select: page.selectedIndices, focus: page.focus, rows: page.getData()});
                }
            }
        }
    }
    if (this.pageCache) {
        returnData.pages = datas;
    } else {
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

export {
    getData,
    getDataByRule
}