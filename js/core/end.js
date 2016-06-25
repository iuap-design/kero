/**
 * Created by dingrf on 2016/3/4.
 */

/**
 * 加载控件
 */

if (document.readyState && document.readyState === 'complete'){
    u.compMgr.updateComp();
}else{
    u.on(window, 'load', function() {

        //扫描并生成控件
        u.compMgr.updateComp();
    });
}