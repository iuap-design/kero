var remove = document.querySelector('.fa-remove');
u.on(remove, 'click', function() {
    var tag = u.closest(this, 'u-tag');
    tag.parentNode.removeChild(tag);
})