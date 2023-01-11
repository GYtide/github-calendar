import { date2stamp } from "./date2stamp.js";

/**
 * 
 * @param date
 * 
 * 根据日期戳计算周几
 * 
 * 1970 年 1 月 1 日是周 4
 */

function getweek(datestr){

    if(typeof datestr == 'string'){
        let date = date2stamp(datestr)

        let week = (date + 3) % 7

        // 0 - 6 星期日到星期六
        return week
    }
    else if(typeof datestr == 'number'){
        let daysyamp =  datestr/1000/24/3600 + 1
        let week = (daysyamp + 3) % 7

        // 0 - 6 星期日到星期六
        return week
    }

}

export{getweek}


