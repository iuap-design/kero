/**
 * Module : kero dataTable copyRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-01 14:34:01
 */


const copyRow = function (index, row) {
    this.copyRows(index, [row])
}

const copyRows = function (index, rows) {
    for(var i=0;i < rows.length;i++) {
        var newRow = new Row({parent: this})
        if (rows[i]) {
            newRow.setData(rows[i].getData())
        }
        this.insertRows(index === undefined ? this.rows().length : index, [newRow])
    }
}

export {
	copyRow,
	copyRows
}