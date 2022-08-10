function myMusic(audioUrl, imgUrl, position) {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        /*window.location.href="你的手机版地址";*/
        // alert("mobile");
        $('.content-mobile').show();
        $('.content-pc').hide();
        var audiourl = audioUrl || '';
        var imgurl = imgUrl || 'https://wxcore.forhoo.com.cn/21/wj/20210705wy/img/video.png';
        // 播放状态
        var isPalying = true;
        var myAduio = new Audio();
        myAduio.src = audiourl;
        myAduio.loop = true;
        // dom操作
        var audioCtr = document.createElement('div');
        audioCtr.classList.add('audio-ctr'); //方便外部css样式控制
        var img = new Image();
        img.src = imgurl;
        img.onload = function () {
            audioCtr.appendChild(img);
            document.body.appendChild(audioCtr);
        }
        // 绑定事件
        audioCtr.addEventListener('click', function () {
            if (isPalying) {
                myAduio.pause();
                isPalying = !isPalying;
                audioCtr.style.animationPlayState = 'paused';
            } else {
                myAduio.play();
                isPalying = !isPalying;
                audioCtr.style.animationPlayState = 'running';
            }
        });
        // css in js(0.0)
        var style = document.createElement('style');
        style.innerHTML = `
            .audio-ctr {
                position: fixed;
                width: 1rem;
                height: 1rem;
                ${position || 'left'}: 3%;
                bottom: 2%;
                background-color: transparent;
                border-radius: 50%;
                z-index: 9999;
                animation: mxz 3s linear infinite;
            }

            .audio-ctr img {
                width: 100%;
            }

            @keyframes mxz {
                0% {
                    transform: rotate(0);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);

        // 自动播放
        myAduio.play();
        // 兼容微信
        document.addEventListener("WeixinJSBridgeReady", function () {
            myAduio.play();
        }, false);

        // 挂载
        window.myAduio = myAduio;
        }
    else {
        /*window.location.href="你的电脑版地址"; */
        $('.content-mobile').hide();
        $('.content-pc').show();
    };
    
}