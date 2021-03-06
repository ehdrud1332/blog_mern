//회원가입시 사용자입력값에대한 설정, 지정
const Validator = require('validator');
const isEmpty = require('./is-empty');

// 회원가입시 필요한 정보를 data라고 지칭
module.exports = function validateRegisterInput(data) {
    const errors = {};

    // ?
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    //컴펌 패스워드
    data.password2 = !isEmpty(data.password2) ? data.password : '';

    // 여기서 isEmpty는 validator안에 들어 있는 함수이다.

    if (!Validator.isLength(data.username, { min:2, max: 30})) {
        errors.username = "Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "name field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "이메일 형식이 아닙니다.";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "email is required";
    }

    if (!Validator.isLength(data.password, { min:6, max: 30})) {
        errors.password = "password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "password much match";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "comfirm password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
