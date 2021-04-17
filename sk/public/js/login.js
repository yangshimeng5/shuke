function login() {
    // let reg=/^[a-zA-Z0-9]{3,12}$/;
    // let reg2=/^[a-zA-Z0-9]{3,12}$/;
    // let msg=document.getElementById('msg');
    // let uname=document.getElementById('uname');
    // let upwd=document.getElementById('upwd');
    //  // 5：验证用户名如果错误：添加提示消息 停止函数执行
    // if(!reg.test(uname.value)){
    //     msg.innerHTML="用户名格式错误";
    //     return;
    // }
    // // 6：验证密码如果错误：添加提示消息 停止函数执行
    // if(!reg.test(upwd.value)){
    //     msg.innerHTML="密码格式错误";
    //     return;
    // }
    // // 6.1创建正则表达式验证码4位数字
    // var reg3=/^[0-9]{4}$/;
    // // 6.2获取验证元素 id="code"
    // var code=document.getElementById("code");
    // // 6.3验证用户输入的验证码如果格式不正确
    // if(!reg3.test(code.value)){
    //     msg.innerHTML="验证码格式错误"
    //     return;
    // }
    // // 6.4添加提示信息
    // // 6.5返回
    // // 7：添加提示消息“验证通过”
    // msg.innerHTML="验证通过";
    //获取用户输入内容; id="uname" id="upwd"
    let uname = document.getElementById("uname").value;
    let upwd = document.getElementById("upwd").value;
    alert(uname + upwd);
    //验证;  3~12位 字母数字
    let reg = /^[a-zA-Z0-9]{3,12}$/;
    if (!reg.test(uname)) {//用户名输入错误
        alert("用户名格式有误，请检查");
        return;
    }
    if (!reg.test(upwd)) {//用户密码输入错误
        alert("密码格式有误，请检查");
        return;
    }
    //发送请求 ajax ;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var msg = xhr.responseText;
            if (msg == 1) {//成功
                location.href = "pro_list.html";
            } else {
                alert("用户名或密码有误，请重试")
            }
        }
    }
    let url = `http://127.0.0.1:8080/ajax/v1/http_get?uname=${uname}&upwd=${upwd}`;
    //alert(url)
    xhr.open("GET", url, true);
    xhr.send();
    //接收返回数据

}
