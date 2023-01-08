
/**
 * 
 * @param {string} datastr 
 * @returns null , time stamp
 * 根据日期字符串转换为对应时间戳
 */
const date2stamp = function (datastr) {
    
    /**
     * 
     * @param year 
     * 
     * 判断是否是闰年
     */
    function isLeapYear(year){
        // if(year)
        if(year%4 ==0  && year%100 !=0 || year%400 == 0){
            return true
        }
        else{
            return false
        }
    }

    if (typeof datastr != 'string') {
        return null
    }
    else {
        // 判断 字符串是否符合类型 'YYYY-MM-dd'
        var data = datastr.split('-')
        // console.log(data)
        if (data.length != 3) {
            return null
        }
        let year = parseInt(data[0])
        let month = parseInt(data[1])
        let day = parseInt(data[2])

        if (!year || !month || !day) {
            return null
        }
        else if (year < 1970 || month > 12 || month < 1 || day < 1) {
            return null
        }
        else if ((month == 1 || month == 3 || month == 5
            || month == 7 || month == 8 || month == 10 
            || month == 12) && day  > 31) {
            return null
        }
        else if((month == 4 || month == 6 || month == 9
            || month == 11 ) && day  > 30){
            return null

        }
        else if(month == 2 && isLeapYear(year) && day > 29){
            return null
        }
        else if(month == 2 && !isLeapYear(year) && day > 28){
            return null
        }

        // 计算天数

        let daystamp = 0

        for(let i = 1970 ; i < year ;++i ){
            if(isLeapYear(i)){
                daystamp += 366
            }
            else{
                daystamp +=365
            }
        }

        for(let i = 1 ; i < month ; ++i){
            if(i == 4 || i == 6 || i == 9 || i ==11){
                daystamp += 30
            }
            else if(i == 2){
                if(isLeapYear(year)){
                    daystamp += 29
                }else{
                    daystamp += 28
                }
            }
            else{
                daystamp += 31
            }

        }

        daystamp += day

        return daystamp

    }

}


export{ date2stamp }
