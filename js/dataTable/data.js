/**
 * Module : kero dataTable data
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/** 
 *设置数据
 *
 */
const setData = function (data,options) {
    if(data.pageIndex || data.pageIndex === 0){
        var newIndex = data.pageIndex;
    }else{
        var newIndex = this.pageIndex();
    }
    if(data.pageSize || data.pageSize === 0){
        var newSize = data.pageSize;
    }else{
        var newSize = this.pageSize();
    }
    if(data.totalPages || data.totalPages === 0){
        var newTotalPages = data.totalPages;
    }else{
        var newTotalPages = this.totalPages();
    }
    if(data.totalRow || data.totalRow === 0){
        var newTotalRow = data.totalRow;
    }else{
        var newTotalRow = data.rows.length; //后续要考虑状态，del的不计算在内
    }
    var select, focus,unSelect=options?options.unSelect:false; 

    this.pageCache = data.pageCache || this.pageCache
    if (this.pageCache === true) {
        this.updatePages(data.pages)
        if (newIndex != this.pageIndex()) {
            this.setCurrentPage(newIndex, true);
            this.totalPages(newTotalPages)
            this.totalRow(newTotalRow)
            return;
        }
        else {
            select = this.getPage(newIndex).selectedIndices
            focus = this.getPage(newIndex).focus
            this.setRows(this.getPage(newIndex).rows)
        }
    } else {
        select = data.select||(!unSelect?[0]:[]);
        focus = data.focus;
        this.setRows(data.rows)
    }
    this.pageIndex(newIndex)
    this.pageSize(newSize)
    this.totalPages(newTotalPages)
    this.totalRow(newTotalRow)

    this.updateSelectedIndices()

    if (select && select.length > 0 && this.rows().length > 0)
        this.setRowsSelect(select)
    if (focus)
        this.setRowFocus(focus)
};



const setValue = function (fieldName, value, row, ctx) {
    if (arguments.length === 1){
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow()
    if (row)
        row.setValue(fieldName, value, ctx)
}


export {
    setData,
    setValue
}