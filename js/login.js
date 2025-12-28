// 登录专用验证码变量：用于存储生成的随机验证码，全局可访问
var loginCode = "";

// 生成登录验证码的函数：负责创建4位数字+大写字母的随机验证码并展示
function createLoginCode() {
    loginCode = ""; // 清空原有验证码，准备生成新验证码
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 验证码字符库（数字+大写字母）
    // 循环4次，生成4位验证码
    for (var i = 0; i < 4; i++) {
        // 随机获取字符库中的一个字符，拼接到loginCode中
        // Math.random()生成0-1随机数，乘以字符库长度取整，得到随机索引
        loginCode += chars[Math.floor(Math.random() * chars.length)];
    }
    // 获取展示验证码的DOM元素（id为loginCodeShow的span标签）
    var codeEle = document.getElementById("loginCodeShow");
    if (codeEle) { // 判断元素是否存在，避免报错
        codeEle.innerText = loginCode; // 将生成的验证码赋值给元素，显示在页面上
        codeEle.style.letterSpacing = "3px"; // 设置字符间距3px，让验证码更易辨认
        codeEle.style.fontWeight = "bold"; // 设置文字加粗，提升验证码视觉清晰度
    }
}

// 登录验证核心函数：校验账号、密码、验证码的有效性，返回布尔值控制表单提交
function validate() {
    // 获取输入框值并去除前后空格（避免用户输入无效空格）
    var loginUsername = document.getElementById("t2").value.trim(); // 账号输入框值
    var loginPwd = document.getElementById("t3").value.trim(); // 密码输入框值
    var inputCode = document.getElementById("input").value.trim().toUpperCase(); // 验证码输入框值（转为大写，忽略大小写差异）

    // 账号非空验证：如果账号为空，弹出提示并聚焦到账号输入框，返回false拦截表单提交
    if (!loginUsername) {
        alert("请输入用户名！");
        document.getElementById("t2").focus();
        return false;
    }
    // 密码非空验证：如果密码为空，弹出提示并聚焦到密码输入框，返回false拦截表单提交
    if (!loginPwd) {
        alert("请输入密码！");
        document.getElementById("t3").focus();
        return false;
    }

    // 密码长度验证：校验密码是否在6-8位之间，不符合则提示并聚焦，返回false
    if (loginPwd.length < 6 || loginPwd.length > 8) {
        alert("密码长度需6-8位！");
        document.getElementById("t3").focus();
        return false;
    }

    // 验证码非空验证：如果验证码为空，弹出提示并聚焦到验证码输入框，返回false
    if (!inputCode) {
        alert("请输入验证码！");
        document.getElementById("input").focus();
        return false;
    }
    // 验证码一致性验证：对比用户输入的验证码与生成的验证码（均转大写），不一致则提示并重置
    if (inputCode !== loginCode.toUpperCase()) {
        alert("验证码输入错误！@_@");
        createLoginCode(); // 重新生成新的验证码
        document.getElementById("input").value = ""; // 清空验证码输入框
        document.getElementById("input").focus(); // 聚焦到验证码输入框
        return false;
    }

    // 校验已注册用户：从本地存储中获取注册用户列表，判断当前账号密码是否已注册
    // localStorage.getItem("registeredUsers")获取存储的用户数据，JSON.parse转为数组，无数据则默认空数组
    var userList = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    // 查找用户列表中是否存在账号和密码匹配的用户
    var validUser = userList.find(user => user.username === loginUsername && user.password === loginPwd);
    // 若未找到匹配用户，提示账号未注册或密码错误，重置密码框并聚焦，返回false
    if (!validUser) {
        alert("账号未注册或密码错误！请先注册");
        document.getElementById("t3").value = ""; // 清空密码输入框
        document.getElementById("t3").focus(); // 聚焦到密码输入框
        return false;
    }

    // 登录成功：所有校验通过，弹出提示，清空所有输入框并重新生成验证码，返回true允许表单提交
    alert("登录成功！即将跳转到首页");
    document.getElementById("t2").value = ""; // 清空账号输入框
    document.getElementById("t3").value = ""; // 清空密码输入框
    document.getElementById("input").value = ""; // 清空验证码输入框
    createLoginCode(); // 重新生成验证码，为下次登录做准备
    return true;
}

// 页面加载完成事件：页面渲染完毕后自动执行，初始化生成验证码
window.onload = function() {
    createLoginCode(); // 调用验证码生成函数，页面加载时就显示验证码
};