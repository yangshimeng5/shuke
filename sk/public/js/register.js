function reg() {
    let reg1 = /^[a-zA-Z0-9]{3,12}$/;
    let reg2 = /^[a-zA-Z0-9]{3,12}$/;
    let reg3 = /^1[3-9]\d{9}$/;
    let msg = document.getElementById('msg');
    let uname = document.getElementById("uname").value;
    let upwd = document.getElementById("upwd").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    // 验证正则表达式
    // 用户名验证
    if (!reg1.test(uname)) {
        alert("用户名格式有误");
        return;
    };
    // 验证密码
    if (!reg2.test(upwd)) {
        alert("密码格式有误");
        return;
    };
    if (!reg3.test(phone)) {
        alert("手机格式有误")
        return;
    };
    // 创建Ajax对象
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let obj = JSON.parse(xhr.responseText);
            // alert(xhr.responseText);
            if (obj.code === 200) {
                alert("注册成功");
                location.href = "./login.html"
            }
        }
    }
    // 绑定状态修改事件
    let url = "http://127.0.0.1:8080/v1/users/reg";
    // alert(url)
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //发送
    // alert(uname)
    let formdata = `uid=null&uname=${uname}&upwd=${upwd}&email=${email}&phone=${phone}`;
    xhr.send(formdata);
}
