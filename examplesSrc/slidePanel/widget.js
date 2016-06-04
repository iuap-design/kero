var btn = document.querySelector('.u-button');
u.on(btn, 'click', function(){
  u.slidePanel({url:'test.html',width:'500px',callback:function(){alert('success')}});
})
