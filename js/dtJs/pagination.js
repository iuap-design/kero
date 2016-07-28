u.PaginationAdapter = u.BaseAdapter.extend({
    initialize: function (comp, options) {
        var self = this;
        u.PaginationAdapter.superclass.initialize.apply(this, arguments);

        //var Pagination = function(element, options, viewModel) {

        if (!this.dataModel.pageSize() && this.options.pageSize)
            this.dataModel.pageSize(this.options.pageSize)
        this.options.pageSize = this.dataModel.pageSize() || this.options.pageSize;
        //this.$element.pagination(options);
        //this.comp = this.$element.data('u.pagination');
        var options = u.extend({},{el:this.element,jumppage:true},this.options);
        this.comp = new u.pagination(options);
		this.element['u.pagination'] = this.comp;
        this.comp.dataModel = this.dataModel;
        this.pageChange = u.getFunction(this.viewModel, this.options['pageChange']);
        this.sizeChange = u.getFunction(this.viewModel, this.options['sizeChange']);

        this.comp.on('pageChange', function (pageIndex) {
            if (typeof self.pageChange == 'function') {
                self.pageChange(pageIndex);
            } else {
                self.defaultPageChange(pageIndex);
            }

        });
        this.comp.on('sizeChange', function (size, pageIndex) {
            if (typeof self.sizeChange == 'function') {
                self.sizeChange(size, pageIndex);
            } else {
                self.defaultSizeChange(size,pageIndex);
                // u.showMessage({msg:"没有注册sizeChange事件"});
            }
        });


        this.dataModel.totalPages.subscribe(function (value) {
            self.comp.update({totalPages: value})
        })

        this.dataModel.pageSize.subscribe(function (value) {
            self.comp.update({pageSize: value})
        })

        this.dataModel.pageIndex.subscribe(function (value) {
            self.comp.update({currentPage: value + 1})
        })

        this.dataModel.totalRow.subscribe(function (value) {
            self.comp.update({totalCount: value})
        })

        if(this.comp.options.pageList.length > 0){
            this.comp.options.pageSize = this.comp.options.pageList[0];
            ///this.comp.trigger('sizeChange', options.pageList[0])
            this.dataModel.pageSize(this.comp.options.pageList[0]);
        }


        // 如果datatable已经创建则根据datatable设置分页组件
        // self.comp.update({totalPages: this.dataModel.totalPages()})
        // self.comp.update({pageSize: this.dataModel.pageSize()})
        // self.comp.update({currentPage: this.dataModel.pageIndex() + 1})
        // self.comp.update({totalCount: this.dataModel.totalRow()})
        self.comp.update({totalPages: this.dataModel.totalPages(),pageSize: this.dataModel.pageSize(),currentPage: this.dataModel.pageIndex() + 1,totalCount: this.dataModel.totalRow()})
    },

    defaultPageChange: function (pageIndex) {
        if (this.dataModel.hasPage(pageIndex)) {
            this.dataModel.setCurrentPage(pageIndex)
        } else {
        }
    },

    defaultSizeChange: function(size,pageIndex){
        this.dataModel.pageSize(size);
    },

    disableChangeSize: function () {
        this.comp.disableChangeSize();
    },

    enableChangeSize: function () {
        this.comp.enableChangeSize();
    }
});

u.compMgr.addDataAdapter(
    {
        adapter: u.PaginationAdapter,
        name: 'pagination'
    });




