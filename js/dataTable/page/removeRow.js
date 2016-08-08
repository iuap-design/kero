/**
 * Module : kero dataTable page removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */


const removeRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows.rowId == rowid)
            this.rows.splice(i, 1);
    }
}

export {
	removeRowByRowId
}