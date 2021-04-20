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
            }else if(obj.code===404){
                console.log(22222)
                alert("该用户名己存在");
                isEx = false;
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
// 检测用户名信息是否重复
function isExists(){
    // console.log(1)
    // 获取用户输入的信息
    var _uname=uname.value;
    if(!_uname){
        alert("用户名不能为空！");
        return;
    }
    // 创建xhr异步对象
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var r=xhr.responseText;
            console.log(r)
            if(r==1){
                alert("该用户名己存在");
                isEx = false;
                //js跳转页面的写法
                //location.href="http://127.0.0.1:8080/pro_list.html"
            }else{
                alert("欢迎使用");
                isEx =  true;
            }
        }
    }
    // 创建请求链接，打开链接
    let url = `http://127.0.0.1:8080/v1/users/isexists?uname=${_uname}`;
    //alert(url)
    console.log(typeof _uname)
    xhr.open("GET", url, true);
    xhr.send();
}
