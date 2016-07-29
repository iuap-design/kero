/**
 * Module : kero app dataTable
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */

var addDataTable = function (dataTable) {
    this.dataTables[dataTable.id] = dataTable
    return this
}
var getDataTable = function (id) {
    return this.dataTables[id]
}

var getDataTables = function () {
    return this.dataTables
}

export {
	addDataTable,
	getDataTable,
	getDataTables
}