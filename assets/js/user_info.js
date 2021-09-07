$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度在1~6之间'
            }
           
        }
    })
    
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status !==0){
                    return layer.msg('获取失败'); 
                }
               
                form.val('formUserInfo',res.data)
            }
        });
    }
   
    $('#btnReset').click(function (e) { 
        e.preventDefault();
        initUserInfo()
        
    });

    $('.layui-form').submit(function (e) { 
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !==0){
                    return layer.msg('fail'); 
                }
                layer.msg('succse'); 
                window.parent.getUserInfo()
            }
        });
    });
})