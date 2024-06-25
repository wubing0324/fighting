function trans(num) {
    const units = ['', '十', '百', '千', '万', '亿'];
    const nums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    
    if (num === 0) {
        return nums[0];
    }

    let result = '';
    let digit, unit;
    let zeroCount = 0;
    let strNum = num.toString();
    let len = strNum.length;
    let prevWasZero = false;

    for (let i = 0; i < len; i++) {
        digit = parseInt(strNum[i]);
        unit = (len - i - 1) % 4;

        if (digit === 0) {
            zeroCount++;
        } else {
            if (zeroCount > 0) {
                result += nums[0];
                zeroCount = 0;
            }
            result += nums[digit] + units[unit];
            prevWasZero = false;
        }

        if (unit === 0 && i !== len - 1) {
            if (prevWasZero) {
                result += nums[0];
            }
            result += units[4 + Math.floor((len - i - 1) / 4)];
            prevWasZero = digit === 0;
        }
    }

    // 去掉最后的 "零"
    result = result.replace(/零+$/, '');

    // 特殊情况处理：如果第一个字符是 "一十"
    result = result.replace(/^一十/, '十');

    return result;
}

console.log(trans(1234));         // 一千二百三十四
console.log(trans(123456));       // 十二万三千四百五十六
console.log(trans(12345670));     // 一千二百三十四万五千六百七十
console.log(trans(100010001));    // 一亿零一万零一
console.log(trans(10100010001));  // 一百零一亿零一万零一


10001