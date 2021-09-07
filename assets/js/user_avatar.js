$(function () {
    var layer = layui.layer
    //获取裁剪区域dom元素
    var $images = $('#image')
    //配置选项
    const options = {
        //纵横比
        aspectRatio: 1,
        //指定预览区域
        preview: '.img-preview'
    }
    //创建裁剪区域
    $images.cropper(options)

    //上传图片
    $('#btnChooseImage').click(function (e) {
        e.preventDefault();
        $('#file').click()
    });
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        console.log(filelist)
        if (filelist.length === 0) {
            return layer.msg('sss')
        }

        var file = e.target.files[0]
        var imgURL = URL.createObjectURL(file)
        $images
            .cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)
    })

    $('#btnUpload').click(function (e) {
        e.preventDefault();
        var dataURL = $images
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (response) {
                if (response.status !== 0) {
                    return layer.msg('更换失败')
                }
                layer.msg('更换成功')
                window.parent.getUserInfo()
            }
        });
    });

})