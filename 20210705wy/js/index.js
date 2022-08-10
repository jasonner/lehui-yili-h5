var userInfo = {
    username:'',//姓名
    mobile:'',//手机号
    department:'',//部门
    vaccinesurl:'',//疫苗
    healthcodeurl:'',//核酸
    itinerarycardurl:'',//行程卡
    g_city:'',//出行城市
    g_travelmode:'',//出行方式
    g_travelinfo:'',//出行信息
    g_arrivaltime:'',//到达时间
    c_city:'',//返回城市
    c_travelmode:'',//出行方式
    c_travelinfo:'',//出行信息
    c_arrivaltime:'',//到达时间
    tripcodeurl: '',//
    signcodeurl: ''
};

(async () => {
    // 加载人员种类select
    (async () => {
        //const encoding = checkEncoding(data)
        const data = await getCsvJson('./static/personType.csv');
        const personTypeSelect = document.getElementById('personType');
        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.innerText = element;
            personTypeSelect.append(option);
        });
    })();

    // 事件绑定
    (() => {
        // 提交按钮
        document.querySelectorAll('.submit-btn').forEach((el) => {
            el.addEventListener('click', async (e) => {
                let nextFlag = true;
                const parentNode = e.target.parentNode;
                const formValue = getFormValue(parentNode);
                
                if (formValue == 'break') return;
                if (formValue == 'next') return pageTo('next');;
                // const httpFun = apiHttp[e.target.dataset.http];
                // httpFun(formValue);
                userInfo = {
                    ...userInfo,
                    ...formValue
                };
                if ([...el.classList].includes('submit-btn-getUser')){//根据手机号获取用户填写信息 
                    console.log(userInfo);
                    let promise = {
                        'mobile':userInfo.mobile
                    };
                    const res = await apiHttp.getUserInfoByMobile(promise);
                    console.log(res);
                    if(res.userinfo){//如果用户注册并填写过则赋值渲染
                        sessionStorage.setItem('Mobile',res.userinfo.mobile)
                        userInfo = res.userinfo; 
                        if(res.userinfo.healthcodeurl){//疫苗
                            sessionStorage.setItem('healthcodeurl',true);
                            let healthcodeurl = document.getElementById('healthcodeurl');
                            healthcodeurl.innerHTML = `
                             <img class="template" src="./img/selectimg-bg.png" alt="">
                             <img class="content" src="${res.userinfo.healthcodeurl}" alt="">
                             `;  
                         };

                        if(res.userinfo.vaccinesurl){//核酸
                            sessionStorage.setItem('vaccinesurl',true);
                            let vaccinesurl = document.getElementById('vaccinesurl');
                            vaccinesurl.innerHTML = `
                             <img class="template" src="./img/selectimg-bg.png" alt="">
                             <img class="content" src="${res.userinfo.vaccinesurl}" alt="">
                             `;  
                        };

                        if(res.userinfo.itinerarycardurl){//行程单
                            let itinerarycardurl = document.getElementById('itinerarycardurl');
                            itinerarycardurl.innerHTML = `
                             <img class="template" src="./img/Upload-itinerary.png" alt="">
                             <img class="content" src="${res.userinfo.itinerarycardurl}" alt="">
                             `;  
                        };

                         //出发城市
                         if(res.userinfo.g_city){
                            let  g_city = document.getElementById('g_city')
                            g_city.value =  res.userinfo.g_city;
                         };
                         if(res.userinfo.g_travelmode){
                             let  g_travelmode = document.getElementById('g_travelmode')
                             g_travelmode.value = res.userinfo.g_travelmode;
                          };
                          if(res.userinfo.g_travelinfo){
                             let  g_travelinfo = document.getElementById('g_travelinfo')
                             g_travelinfo.value = res.userinfo.g_travelinfo;
                          };
                          if(res.userinfo.g_arrivaltime){
                             let  g_arrivaltime = document.getElementById('g_arrivaltime')
                             g_arrivaltime.value = res.userinfo.g_arrivaltime;
                          };
 
                         //到达城市
                          if(res.userinfo.g_city){
                             let  c_city = document.getElementById('c_city')
                             c_city.value = res.userinfo.c_city;
                          };
                          if(res.userinfo.c_travelmode){
                              let  c_travelmode = document.getElementById('c_travelmode')
                              c_travelmode.value = res.userinfo.c_travelmode;
                           };
                           if(res.userinfo.c_travelinfo){
                              let  c_travelinfo = document.getElementById('c_travelinfo')
                              c_travelinfo.value = res.userinfo.c_travelinfo;
                           };
                           if(res.userinfo.c_arrivaltime){
                              let  c_arrivaltime = document.getElementById('c_arrivaltime')
                              c_arrivaltime.value = res.userinfo.c_arrivaltime;
                           };
                    };   
                };
                const end = e.target.dataset.end;
                if (end) {
                    if (userInfo.signcodeurl) {
                        const flag = confirm('将覆盖您上次的信息,是否提交?');
                        if (flag) {
                            const res = await apiHttp.setUserInfo(userInfo);
                            //userInfo.signcodeurl = res.url;
                        } else {
                            nextFlag = false;
                        }
                    } else {
                        const res = await apiHttp.setUserInfo(userInfo);
                        let promise = {
                            'mobile':userInfo.mobile
                        };
                        const resM = await apiHttp.getUserInfoByMobile(promise);
                        userInfo.signcodeurl = resM.userinfo.signcodeurl;
                    }
                }

                nextFlag && pageTo('next');
            });
        });

        // 上传健康码和行程码
        const imgArr = ['', '',''];
        document.querySelectorAll('.select-img').forEach((el) => {
            el.addEventListener('click', (e) => {
                let flag = 'right';
                if ([...el.classList].includes('left')) flag = 'left';//
                if ([...el.classList].includes('travel')) flag = 'travel';
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        if(flag == 'travel'){
                            el.innerHTML = `
                            <img class="template" src="./img/Upload-itinerary.png" alt="">
                            <img class="content" src="${localIds[0]}" alt="">
                            `;  
                        }else{
                            el.innerHTML = `
                            <img class="template" src="./img/selectimg-bg.png" alt="">
                            <img class="content" src="${localIds[0]}" alt="">
                            `;
                        }
                        wx.uploadImage({
                            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                if (flag == 'left') imgArr[0] = serverId;
                                if (flag == 'right') imgArr[1] = serverId;//
                                if (flag == 'travel') imgArr[2] = serverId;
                                sessionStorage.setItem('healthcodeurl',true);
                                sessionStorage.setItem('vaccinesurl',true);
                            }
                        });
                    }
                });
            });

        });
        // 上传提交按钮
        document.querySelector('.img-submit-btn').addEventListener('click', (e) => {
            // const httpFun = apiHttp[e.target.dataset.http];
            // httpFun({
            //     healthcodeurl: imgArr[0],
            //     tripcodeurl: imgArr[1]
            // });
            userInfo.vaccinesurl = imgArr[0] || '';//疫苗
            userInfo.healthcodeurl = imgArr[1] || '';//核酸
            // userInfo.itinerarycardurl = imgArr[2] || '';//行程单
            let vaccinesurl = sessionStorage.getItem('vaccinesurl');
            let healthcodeurl = sessionStorage.getItem('healthcodeurl');
            if(!vaccinesurl && !healthcodeurl){
                alert("请上传疫苗接种证明或核酸检测证明~");
            }else{
                pageTo('next');
            };
        });
        //行程码上传提交按钮
        document.querySelector('.submit-btn-trval').addEventListener('click', (e) => {
            userInfo.itinerarycardurl = imgArr[2] || '';//行程单
            pageTo('next');
        });

        // 返回按钮
        document.querySelectorAll('.re-btn').forEach((el) => {
            el.addEventListener('click', function () {
                const page = el.dataset.page;
                if (page) {
                    pageTo(page);
                } else {
                    pageTo('prev');
                }
            });
        });

        // 首页点击下一页
        document.querySelector('.p1').addEventListener('click', () => {
            pageTo(1);
        });
        
    })();

    // 页面初始化回显信息
    (async () => {
      
        let mobile =  sessionStorage.getItem('Mobile');
        let promise = {
            'mobile':mobile
        };
        const resM = await apiHttp.getUserInfoByMobile(promise);
        userInfo = resM.userinfo; 
        sessionStorage.clear();
        userInfo && (userInfo.tripcodeurl = '');
        userInfo && (userInfo.healthcodeurl = '');
        if (userInfo && userInfo.signcodeurl) {
            // const keys = Object.keys(userInfo);
            // for (const key of keys) {
            //     const el = document.querySelector('*[name="' + key + '"]');
            //     const elType = el && el.localName;
            //     if (elType == 'select' && userInfo[key]) {
            //         el.classList.remove('select-unselect');
            //         el && (el.value = userInfo[key]);
            //     } else {
            //         el && (el.value = userInfo[key]);
            //     }
            // }
            pageTo(6);
        }
    })();
})();


