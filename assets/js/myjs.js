$(function () {
    // 切换登录注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义校验规则 葱layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致'
            }

        }
        
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        $.post('/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message); 
            }
            layer.msg('sussce')

            $('#link_login').click();
        })
    })

    $('#form_login').submit(function (e) { 
        e.preventDefault();
        $.ajax({
            method: "POST",
           
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !==0){
                    return layer.msg('失败')
                }
                layer.msg('成功')
                localStorage.setItem('token',res.token)
                console.log(res.token)
                location.href = '/index.html'
            }
        });
    });
    
    
})
