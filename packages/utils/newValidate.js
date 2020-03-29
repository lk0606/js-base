import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' //引入中文文件
 import IDValidator from 'id-validator'
import GB2260 from 'id-validator/src/GB2260'
import stote from '../store/info-modify-store'
// 配置中文
Validator.addLocale(zh_CN);
//Validator.localize(zh_CN);

const config = {
    locale: 'zh_CN',
    events: 'blur'
};


//console.log("attributes-stote",stote.state.validataTipData)
// 自定义validate 
const dictionary = {
    zh_CN: {
        messages: {
            email: () => '请输入正确的邮箱格式',
            numeric: (field) => field + '只能为整数',
            max: (field, length) => field + '长度不能大于' + length + '位数',
            required: (field) => "请输入" + field,
            between: (field, arr) => {
                return field + '必须为' + arr[0] + '到' + arr[1] + '之间'
            },
        },
        // attributes: {
        //     captchaValue: '验证码凄凄切切',
        //     renewalBank_payRenewalAcctNo:'ddd'
        // },
        attributes:stote.state.validataTipData
        
    }
};
//Validator.localize(dictionary)
Validator.updateDictionary(dictionary);

Validator.extend('mobile', {
    messages: {
        zh_CN: field => '请输入正确的电话号码',
    },
    validate: value => {
        // return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
        return value.length == 11 && /^(1[0123456789][0-9]{9})$/.test(value)
    }
});
Validator.extend('IdCard', {
    messages: {
        zh_CN: field => '请输入正确的身份证号',
    },
    validate: value => {
        if(value.length == 18){
            let idValidator = new IDValidator(GB2260)
            return !!idValidator.isValid(value)
        }else {
            return false
        }
    }
});
Validator.extend('chinese', {
    messages: {
        zh_CN: field => '请输入正确的名字',
    },
    validate: value => {
        return /^(([\u4e00-\u9fa5]{1,10})(·{0,1})([\u4e00-\u9fa5]{1,10})){1,5}$|^(([A-z]{1,20})([\,\.\·]{0,1})([A-z]{1,20})){1,100}$/.test(value)
    }
});
Validator.extend('address', {
    messages: {
        zh_CN: field => '请输入正确的地址',
    },
    validate: value => {
        return /^[\u4E00-\u9FA5A-Za-z\d\-\_]{5,60}$/.test(value)
    }
});
Validator.extend('bankno', {
    messages: {
        zh_CN: field => '请输入正确的开户卡号',
    },
    validate: value => {
        return /^[0-9]{16,20}$/.test(value)
    }
});
Validator.extend('number', {
    messages: {
        zh_CN: field => '请输入数字',
    },
    validate: value => {
        return /^\+?[0-9][0-9]*$/.test(value)
        //return /^[1-9]\d*|0$/.test(value)
        
    }
});
Validator.extend('isInteger', {
    messages: {
        zh_CN: field => '请输入正整数',
    },
    validate: value => {
        return  /^([1-9]\d*|0)$/.test(value)        
    }
});
Vue.use(VeeValidate, config);
