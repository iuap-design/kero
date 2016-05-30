var V_integer = document.getElementById('V_integer');
var test1 = new u.Validate({
    el: V_integer,
    required: true,
    validType: "integer"
});
var V_float=document.getElementById('V_float');
var test2=new u.Validate({
    el: V_float,
    required: true,
    validType: "float"
});
var V_zipCode=document.getElementById('V_zipCode');
var test3=new u.Validate({
    el: V_zipCode,
    required: true,
    validType: "zipCode"
});
var V_phone=document.getElementById('V_phone');
var test4=new u.Validate({
    el: V_phone,
    required: true,
    validType: "phone"
});
var V_email=document.getElementById('V_email');
var test5=new u.Validate({
    el: V_email,
    required: true,
    validType: "email"
});
var V_url=document.getElementById('V_url');
var test6=new u.Validate({
    el: V_url,
    required: true,
    validType: "url"
});
var V_datetime=document.getElementById('V_datetime');
var test7=new u.Validate({
    el: V_datetime,
    required: true,
    validType: "datetime"
});

