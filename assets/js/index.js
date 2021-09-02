$(function(){
    getUserInfo()

    var layer = layui.layer
    //点击按钮实现退出
    $('#btnLogout').on('click',function(){
        //提示退出
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储 跳转到登录页
            localStorage.removeItem('token')
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
          });
    })
})
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
       
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg('获取失败'); 
            }
            renderAvatar(res.data)
        }
        
        
    });
    
}
//渲染用户头像
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        


    }
}