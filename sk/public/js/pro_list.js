// 页面加载成功；
window.onload = function () {
    // alert(1)
    // 发送请求
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // 接收返回数据
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 将服务器返回字符串转换为js对象
            let rows = JSON.parse(xhr.responseText);
            // 依据id获取tbody
            let tbody = document.getElementById("data");
            // 创建变量HTML拼接字符串tr td
            let html = ""
            // 遍历魂环遍历数组中所有对象
            for (let i = 0; i < rows.length; i++) {
                //依据对象拼接字符串 
                html += `
                <tr>
                    <td>${rows[i].uname}</td>
                    <td>${rows[i].phone}</td>
                    <td><a href="userdata.html?uid=${rows[i].uid}">详细信息</a></td>
                    <td><a href="javascript:del(${rows[i].uid})">删除</a></td>
                </tr>`;
            }
            // 循环外：将字符串赋值tbody.innerHTML
            tbody.innerHTML = html
        };
    };
    xhr.open("get", "http://127.0.0.1:8080/ajax/userlist", true);
    xhr.send();
}
// 完成用户删除操作
// 1创建函数
function del(uid) {
    // alert(uid)
    // 显示确认框
    let rs = confirm("是否删除指定用户？")
    if (!rs) {
        return;
    }
    // 刷新页面，接收返回数据
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText == 1) {
                // 刷新页面[1：重新弄显示页面2：再次发请求]
                location.reload(true);
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        }
    }
    let url = `http://127.0.0.1:8080/ajax/restful_del/${uid}`;
    // alert(url);
    xhr.open("delete", url, true);
    xhr.send();
};
// 进行数据传递，执行用户详细信息的操作
function get(uid) {
    alert(uid)
    // 接收数据
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText)
            location.href = "./userdata.html"
        }
    }
    let url = `http://127.0.0.1:8080/ajax/restful_get/${uid}`;
    alert(url);
    xhr.open("get", url, true);
    xhr.send();
}
