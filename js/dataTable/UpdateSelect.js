/**
 * Module : kero dataTable updateSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-01 14:34:01
 */

 const toggleAllSelect = function(){
    if (this.allSelected()){
        this.setAllRowsUnSelect();
    }else{
        this.setAllRowsSelect();
    }

};


/**
 *
 * @param {Object} index 要处理的起始行索引
 * @param {Object} type   增加或减少  + -
 */
const updateSelectedIndices = function (index, type, num) {
    if (!u.isNumber(num)) {
        num = 1
    }
    var selectedIndices = this.selectedIndices().slice()
    if (selectedIndices == null || selectedIndices.length == 0)
        return
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index)
                selectedIndices[i] = parseInt(selectedIndices[i]) + num
        }
        else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1)
            }
            else if (selectedIndices[i] > index + num - 1)
                selectedIndices[i] = selectedIndices[i] - num
        }
    }
    this.selectedIndices(selectedIndices)
}

export {
    toggleAllSelect,
    updateSelectedIndices
}