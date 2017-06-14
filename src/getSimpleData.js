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
const getSimpleData = function(options) {
    options = options || {}
    var rows, _rowData = [],
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
            rows = []
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (type === 'all') {
                    rows = rows.concat(page.rows.peek());
                }else if(type === 'select') {
                    rows = rows.concat(page.getSelectRows());
                } else if (type === 'change') {
                    rows = rows.concat(page.getSelectRows());
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



export const getSimpleDataFunObj = {
    getSimpleData: getSimpleData
}
