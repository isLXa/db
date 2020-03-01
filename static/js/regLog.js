const HiddenClassName = 'hidden';
var UsernameKey = document.getElementById("username");
function onLogin() {
    $.ajax({
        type: "POST",
        url: "login",
        data: {"username":$("#username").val(),"password":$("#password").val()},
        dataType: "json",
        async: true,
        success: function (data) {
            let json = JSON.stringify(data);
            let jsonObj = $.parseJSON(json);
            if(jsonObj['flag']){
                onLoginSuccess()
            }
            else{
                alert("用户尚未注册！或用户名密码错误！")
            }

        }
    })
}

function onLoginSuccess() {
    $.ajax({
        type: 'POST',
        url: 'ajax_login_success',
        data: {'username':$("#username").val()},
        dataType: 'json',
        async: true,
        success: function (data) {
            let json = JSON.stringify(data);
            let jsonObj = $.parseJSON(json);
            window.location.href='ajax_main'
        }
    })
}

function onRegisterCheck() {
    let un = username.value;
    let pw = password.value;
    let pw2 = password2.value;
    let flag = true;
    if(un == ''){
        alert("用户名不能为空")
        flag = false
    }else if( pw == ''){
        alert("密码不能为空")
        flag = false
    }else if( pw2 == ''){
        alert("重复密码不能为空")
        flag = false
    }else if( pw != pw2){
        alert("密码与重复密码不一致")
        flag = false
    };
    if (flag == true){
        addData();
    }
}

function addData() {
    $.ajax({
        type: "POST",
        url: "ajax_register",
        data: {"username":$("#username").val(),"password":$("#password").val()},
        dataType: "json",
        async:true,
        success: function (data) {
            let json = JSON.stringify(data);
            let jsonObj = $.parseJSON(json);
            if(jsonObj['res']){
                alert("注册成功！")
                onRegisterCheckSuccess()
            }
            else{
                alert("用户名已被注册！请换昵称")
            }

        }
    })
}

function onRegisterCheckSuccess() {
    switchToLogin();
}

function showElement(element){
    element.classList.remove(HiddenClassName);
}
function hideElement(element){
    element.classList.add(HiddenClassName);
}

function switchToLogin(){
    showElement(login);
    hideElement(back);
    hideElement(password2_field);
    register.onclick=switchToRegister;
}
function switchToRegister(){
    hideElement(login);
    showElement(back);
    showElement(password2_field);
    register.onclick=onRegisterCheck;
}
function initialize(){
    login.onclick=onLogin;
    register.onclick=switchToRegister;
    back.onclick=switchToLogin;
}
window.onload=initialize;