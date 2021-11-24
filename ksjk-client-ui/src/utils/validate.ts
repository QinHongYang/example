/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s: string) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s: string) {
    return /^1[0-9]{10}$/.test(s)
}
/**
 * URL地址
 * @param {*} s
 */
export function isURL(s: string) {
    return /^http[s]?:\/\/.*/.test(s)
}
/* 小写字母*/
export function validateLowerCase(str: string) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str: string) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str: string) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

interface ICity {
    [key: string]: string
}
const city: ICity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西",
    15: "内蒙古", 21: "辽宁", 22: "吉林",
    23: "黑龙江 ", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
    37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南",
    44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
};
/**
 * 判断身份证号码
 */
export function cardid(code: string) {
    let result = { success: true, msg: '' };
    if (!validateNull(code)) {
        if (code.length == 18) {
            const index = code.substr(0, 2);
            if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
                result.msg = "证件号码格式错误";
            } else if (!city[index]) {
                result.msg = "地址编码错误";
            } else {
                //18位身份证需要验证最后一位校验位
                let codeArr = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = parseInt(codeArr[i]);
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != codeArr[17]) {
                    result.msg = "证件号码校验位错误";
                } else {
                    result.success = false;
                }
            }
        } else {
            result.msg = "证件号码长度不为18位";
        }

    } else {
        result.msg = "证件号码不能为空";
    }
    return result;
}

/**
 * 判断姓名是否正确
 */
export function validateName(name: string) {
    var regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(name)) return false;
    return true;
}
/**
 * 判断是否为整数
 */
export function validatenum(num: string, type: number) {
    let regName = /[^\d.]/g;
    if (type == 1) {
        if (!regName.test(num)) return false;
    } else if (type == 2) {
        regName = /[^\d]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}
/**
 * 判断是否为小数
 */
export function validateNumOrd(num: string, type: number) {
    let regName = /[^\d.]/g;
    if (type === 1) {
        if (!regName.test(num)) return false;
    } else if (type === 2) {
        regName = /[^\d.]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}
/**
 * 判断是否为空
 */
export function validateNull(val: any) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}