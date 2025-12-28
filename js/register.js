// 注册专用验证码变量
var regCode = "";

// 生成注册验证码
function createRegCode() {
    regCode = "";
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i++) {
        regCode += chars[Math.floor(Math.random() * chars.length)];
    }
    var codeEle = document.getElementById("regCodeShow");
    if (codeEle) {
        codeEle.innerText = regCode;
        codeEle.style.letterSpacing = "3px";
        codeEle.style.fontWeight = "bold";
    }
}

// 注册验证核心函数
function validate() {
    // 获取输入值并去除前后空格
    var username = document.getElementById("t1").value.trim();
    var password1 = document.getElementById("t2").value.trim();
    var password2 = document.getElementById("t3").value.trim();
    var inputCode = document.getElementById("input").value.trim().toUpperCase();

    // 用户名验证
    if (!username) {
        alert("请输入用户名！");
        document.getElementById("t1").focus();
        return false;
    }
    if (username.length > 11) {
        alert("用户名长度不能超过11位！");
        document.getElementById("t1").focus();
        return false;
    }

    // 密码长度验证
    if (password1.length < 6 || password1.length > 8) {
        alert("设置的密码不符要求！（需6-8位）");
        document.getElementById("t2").focus();
        return false;
    }

    // 两次密码一致性验证
    if (password1 !== password2) {
        alert("确认密码与前面设置的密码不符！");
        document.getElementById("t3").focus();
        return false;
    }

    // 验证码验证
    if (!inputCode) {
        alert("请输入验证码！");
        document.getElementById("input").focus();
        return false;
    }
    if (inputCode !== regCode.toUpperCase()) {
        alert("验证码输入错误！@_@");
        createRegCode();
        document.getElementById("input").value = "";
        document.getElementById("input").focus();
        return false;
    }

    // 检查用户名是否已注册
    var userList = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    var isExist = userList.some(user => user.username === username);
    if (isExist) {
        alert("该用户名已注册，无需重复注册！");
        document.getElementById("t1").focus();
        return false;
    }

    // 保存用户信息到本地存储
    userList.push({ username: username, password: password1 });
    localStorage.setItem("registeredUsers", JSON.stringify(userList));

    // 注册成功
    alert("注册成功！即将跳转到首页");
    document.getElementById("t1").value = "";
    document.getElementById("t2").value = "";
    document.getElementById("t3").value = "";
    document.getElementById("input").value = "";
    createRegCode();
    return true;
}

// 页面加载自动生成验证码
window.onload = function() {
    createRegCode();
};