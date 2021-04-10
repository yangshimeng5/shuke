// 页面加载成功后执行的函数
window.onload=function(){
    // alert(1);
    // 发送请求
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        // 接收返回的数据
        // alert(xhr.readyState)
        // alert(xhr.status)
        if(xhr.readyState===4 && xhr.status===200){
            // 将服务器返回的字符串转为js对象
            let rows=JSON.parse(xhr.responseText);
            // 获取到tbody
            let tbody=document.getElementById("data");
            // 创建变量以对HTML进行拼接其tr td
            let html=
            // 遍历数组中的所有对象
            // for(let i=0 ; i<rows.length; i++){
                // 依据遍历结果对其进行拼接
                `
                <tr>
                    <td>${rows[0].uname}</td>
                    <td>${rows[0].email}</td>
                    <td>${rows[0].phone}</td>
                    <td>${rows[0].avatar}</td>
                    <td>${rows[0].user_name}</td>
                    <td>${rows[0].gender}</td>
                    <td><a href="javascript:;">修改信息</a></td>
                </tr>`;
            // }
            // 循环外：将字符串赋值tbody.innerHTML
            tbody.innerHTML=html
        };
    };
    xhr.open("get",`http://127.0.0.1:8080/ajax/restful_get/${1}`,true);
    xhr.send();
}