// 页面加载成功后执行的函数
window.onload=function(){
    let obj=new URLSearchParams(location.search);
    let _uid=obj.get("uid")
    alert(_uid)
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        // 接收返回的数据
        // alert(xhr.readyState)
        // alert(xhr.status)
        if(xhr.readyState===4 && xhr.status===200){
        // 将服务器返回的字符串转为js对象
            let rows=JSON.parse(xhr.responseText);
            let data=document.getElementById("data");
            // 创建变量以对HTML进行拼接其
            let html=`
            <ul>
            <li><input id="uname" type="text" name="name" value="${rows[0].uname}"></li>
            <li><input id="upwd" type="password" name="upwd" value="${rows[0].upwd}"></li>
            <li><input id="email" type="text" name="email" value="${rows[0].email}"></li>
            <li><input id="phone" type="text" name="phone" value="${rows[0].phone}"></li>
            <li><input id="but" type="button" value="modify" onclick="update(${rows[0].uid})"></li>
            </ul>`
            //将获取的字符串赋值到html
            data.innerHTML=html
        }
    }
    // 绑定状态事件
    let url=`http://127.0.0.1:8080/ajax/restful_get/${_uid}`
    xhr.open("get",url,true);
    xhr.send();
}
function update(uid){
    // alert(uid)
    // 显示确认框
    let rs=confirm("是否修改指定用户？")
    if(!rs){
        return;
    }
    let reg1=/^[a-zA-Z0-9]{3,12}$/;
    let reg2=/^[a-zA-Z0-9]{3,12}$/;
    let reg3=/^1[3-9]\d{9}$/;
    // let msg=document.getElementById('msg');
    let uname=document.getElementById("uname").value;
    let upwd=document.getElementById("upwd").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    // 验证正则表达式
    // 用户名验证
    if(!reg1.test(uname)){
        alert("用户名格式有误");
        return;
    };
    // 验证密码
    if(!reg2.test(upwd)){
        alert("密码格式有误");
        return;
    };
    if(!reg3.test(phone)){
        alert("手机格式有误")
        return;
    };
    // 刷新页面，接收返回数据
    let xhr=new XMLHttpRequest();
    // console.log(2222222)
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && xhr.status===200){
            let obj=JSON.parse(xhr.responseText);
            // console.log(11111111)
            console.log(obj)
            if(obj.code===200){
                // 刷新页面[1：重新弄显示页面2：再次发请求]
                location.href="pro_list.html"
                alert("修改成功");
            }else{
                console.log("修改失败");
            }
        }
    }
    let url=`http://127.0.0.1:8080/v1/users/update`;
    alert(url);
    xhr.open("put",url,true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //发送
    alert(uid)
    let formdata=`uid=${uid}&uname=${uname}&upwd=${upwd}&email=${email}&phone=${phone}`;
    console.log(formdata)
    xhr.send(formdata);
};