function http(obj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: obj.type || "GET",
            url: obj.url,
            data: obj.data || {},
            success: (data) => {
                resolve(data)
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}

var wConfirm = window.confirm;
window.confirm = function (message) {
    try {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var alertFrame = window.frames[0];
        var iwindow = alertFrame.window;
        if (iwindow == undefined) {
            iwindow = alertFrame.contentWindow;
        }
        var result = iwindow.confirm(message);
        iframe.parentNode.removeChild(iframe);
        return result;
    }
    catch (exc) {
        return wConfirm(message);
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function getCsvJson(path) {
    return new Promise((reslove, reject) => {
        Papa.parse(path, {
            download: true,
            complete: function (results) {
                let ret = results.data;
                ret.splice(0, 1);//删除标题
                ret.pop();//删除最后一个空元素
                reslove(ret);
            }
        });
    });
}

// 获取表单的值
const getFormValue = (form) => {
    const result = {};
    const formItems = form.querySelectorAll('*[name]');
    if (formItems.length == 0) return 'next';
    for (const item of formItems) {
        // 验证
        // if ((item.name != 'hc_travelmode' && item.name != 'cf_travelmode' && item.name != 'hc_travelinfo' && item.name != 'cf_travelinfo' && item.name != 'idcode') && item.value.trim().length == 0) {
        //     alert('请填写完整~');
        //     return 'break';
        // }
        if (item.name == 'username' && item.value.trim().length == 0) {
            alert('请填写完整~');
            return 'break';
        }
       
        if (item.name == 'username' && !reg.name.test(item.value)) {
            alert('请输入正确的用户姓名');
            return 'break';
        }
        if (item.name == 'mobile' && !reg.phone.test(item.value)) {
            alert('请输入正确的手机号码！');
            return 'break';
        }
        if (item.name == 'department' && item.value.trim().length == 0) {
            alert('请选择部门~');
            return 'break';
        }
        // if (item.name == 'idcode' && !reg.idCard.test(item.value)) {
        //     alert('身份证号不合法'); return 'break';
        // }

        result[item.name] = item.value;
    }
    console.log('表单值', result);
    return result;
}

// select初始灰色
document.querySelectorAll('select').forEach((item) => {
    if (item.value == '') item.classList.add('select-unselect');
    item.addEventListener('change', (e) => {
        if (e.target.value != '') e.target.classList.remove('select-unselect');
    });
});
// 音乐
myMusic('./audio/audio.mp3', './img/video.png');

// 页面切换函数
let pageIndex = 0;
const pageTo = (index) => {
    if (index == 'next') {
        pageIndex++;
    } else if (index == 'prev') {
        pageIndex--;
    } else if (index) {
        pageIndex = +index;
    };
    if (pageIndex == 6) {//signcodeurl
        // 名称
        document.querySelector('.qr-user-info').innerHTML = userInfo.username;
        // 嘉宾类型
        // document.querySelector('.qr-usertype-info').innerHTML = userInfo.usertype;
        // if (userInfo.usertype != '内蒙古伊利实业集团股份有限公司') {
        //     document.querySelector('.qr-usertype-info').innerHTML = '参会嘉宾';
        // }
        // 二维码
        const img = new Image();
        const addArr = userInfo.signcodeurl.split('');
        // 使用https协议进行加载,解决截图没有二维码的情况
        addArr.splice(4, 0, 's');
        userInfo.signcodeurl = addArr.join('');
        img.src = userInfo.signcodeurl;
        img.onload = function () {
            document.querySelector('.qr-code-img').append(img);
            html2canvas(document.body, {
                useCORS: true,
                scale: 4,
                backgroundColor: null,
                ignoreElements: (element) => {
                    if (element.className == "re-btn" || element.className == "audio-ctr") return true;
                }
            }).then((canvas) => {
                const dzpz = new Image();
                dzpz.classList.add('dzpz');
                dzpz.src = canvas.toDataURL('image/png');
                document.querySelector('.p7').appendChild(dzpz);
                upload(dzpz.src);

            });
        }
    }
   
    console.log(pageIndex);
    if(pageIndex>7){
        pageIndex = 6;
    };
    const pages = document.querySelectorAll('.swiper-slide');
    pages.forEach((page) => {
        page.style.display = 'none';
    });
    pages[pageIndex].style.display = 'block';
}

document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('blur', () => {
        window.scroll(0, 0);
    });
});

function upload(image) {
    var imgFile=dataURLtoFile(image,"img.png");
    var xhr=new XMLHttpRequest();
    var fd=new FormData();
    xhr.open('POST','https://wxcore.forhoo.com.cn/home2021/yili0706_AddSignPosterUrlTOFile');
    fd.append("b64",imgFile);
    xhr.send(fd);
    console.log('上传json！')
};

//将图片Base64 转成文件
function dataURLtoFile(dataurl, filename) {
    console.log("转文件")
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
};

