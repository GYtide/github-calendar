import { date2stamp } from "./date2stamp.js";

/**
 * 
 * @param date
 * 
 * 根据日期戳计算周几
 * 
 * 1970 年 1 月 1 日是周 4
 */

function date2week(datestr){

    let date = date2stamp(datestr)

    let week = (date + 3) % 7

    return week

}


export{date2week}


