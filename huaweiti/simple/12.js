// 考勤信息

function getResult(arr) {
    let total = 0
    let absentCout = 0
    
    for (let i = 0; i < arr.length; i++) {
        switch(arr[i]) {
            case 'absent':
                if (absentCout > 1) return false
                absentCout += 1
                total += 1
                break
            case 'lately':
            case 'ealy':
                if (arr[i - 1] === 'absent' || arr[i - 1] === 'lately') return false
                total += 1
                break
        }
        if (i > 7 && arr[i - 7] === 'present') total--
        if (total > 3) return false
    }
    return true
}