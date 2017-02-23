// JS

var app,viewModel;

viewModel = {
    dt1: new u.DataTable({
        meta:{
            f1:{type:'string',required:true,maxLength:8,minLength:3},
            f2:{type:'string',required:true,maxLength:8,minLength:3,notipFlag: true,
                    hasSuccess: true},
        }
    })
};


app = u.createApp({
    el:'body',
    model:viewModel
});

var r = viewModel.dt1.createEmptyRow();