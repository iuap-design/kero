
var element = document.getElementById('pagination');
var comp = new u.pagination({el:element,jumppage:true});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200,});

comp.on('pageChange', function (pageIndex) {
    console.log('新的页号为' + pageIndex);
});

comp.on('sizeChange', function (arg) {
    console.log('每页显示条数为' + arg[0]);
});

