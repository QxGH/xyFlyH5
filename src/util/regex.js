
// 手机号正则
const phoneReg = /^1\d{10}$/;
// 验证码正则
const codeReg = /^d{6}$/;

// 手机号校验
export function validatePhone(phone) {
    //
    if (!phone.length) {
        uni.showModal({
            title: '温馨提示',
            content: '请输入手机号',
            showCancel: false
        });
        return false;
    }

    if (!/^1\d{10}$/.test(phone)) {
        uni.showModal({
            title: '温馨提示',
            content: '号码格式不正确',
            success:()=>{
              phone = ''
            },
            showCancel: false
        });
        
        return false;
    }

    return true;
}

// 手机号校验
export function validateTel(phone) {
    //
    if (!phone.length) {
        uni.showToast({
            title: '请输入电话号码',
            icon:'none',
            duration: 2000
        });
        return false;
    } else if(phone.length < 8){
        uni.showToast({
            title: '请输入正确的电话号码',
            icon:'none',
            duration: 2000
        });
        return false;
    }
    return true;
}
// 验证码校验
export function validateCode(code) {
    // 验证码校验
    if (!code.length) {
        uni.showModal({
            title: '温馨提示',
            content: '请输入验证码',
            showCancel: false
        });
        return false;
    }

    if (!/^\d{6}$/.test(code)) {
        uni.showModal({
            title: '温馨提示',
            content: '验证码格式不正确',
            showCancel: false
        });
        return false;
    }

    return true;
}

// 密码校验
export function validatePassword(pwd) {
    if (!pwd.length){
        uni.showModal({
            title: '温馨提示',
            content: '请输入密码',
            showCancel: false
        });
        return false;
    }
    if (!/^\d{6}$/.test(pwd)) {
        uni.showModal({
            title: '温馨提示',
            content: '请输入六位密码',
            showCancel: false
        });
        return false;
    }

    return true;
}
// 身份证校验
export function isCardNo(card){ 
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card) === false) { 
        uni.showToast({
            title: '请输入正确的身份证号码',
            icon:'none',
            duration: 2000
        });
        return false; 
    } 
    return true;
}

//邮箱验证
export function isEmail(email){
    // /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
　　var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;; //正则表达式
　　if(!reg.test(email)){ //正则验证不通过，格式不对
        uni.showToast({
            title: '请输入正确的邮箱',
            icon:'none',
            duration: 2000
        });
　　　　return false;
　　}
    return true;
}