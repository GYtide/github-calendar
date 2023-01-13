import { getweek } from "./src/getweek.js";
import { date2stamp, stamp2date } from "./src/date2stamp.js";
import * as path from 'path'
import * as fs from 'fs'

function getdatelist(begin, end) {

    // console.log(begin,end)
    let begind = {
        daystamp: begin.valueAsNumber / 1000 / 3600 / 24 + 1,
        year: parseInt(begin.value.split('-')[0]),
        month: parseInt(begin.value.split('-')[1]),
        day: parseInt(begin.value.split('-')[2]),
        week: getweek(begin.valueAsNumber)
    }
    let endd = {
        daystamp: end.valueAsNumber / 1000 / 3600 / 24 + 1,
        year: parseInt(end.value.split('-')[0]),
        month: parseInt(end.value.split('-')[1]),
        day: parseInt(end.value.split('-')[2]),
        week: getweek(end.valueAsNumber)
    }
    let listbegin = {
        daystamp: date2stamp(`${begind.year}-01-01`),
        year: begind.year,
        month: 1,
        day: 1,
        week: getweek(`${begind.year}-01-01`)
    }
    let listend = {
        daystamp: date2stamp(`${endd.year}-12-31`),
        year: endd.year,
        month: 12,
        day: 31,
        week: getweek(`${endd.year}-12-31`)
    }

    var datelist = []

    var newlist = {
        year: listbegin.year,
        list: []
    }
    datelist.unshift(newlist)

    for (let i = listbegin.daystamp; i <= listend.daystamp; ++i) {

        if (stamp2date(i).year == newlist.year) {
            newlist.list.push({
                daystamp: i,
                year: stamp2date(i).year,
                month: stamp2date(i).month,
                day: stamp2date(i).day,
                week: (i + 3) % 7,
                value: (i >= begind.daystamp && i <= endd.daystamp) ? Math.floor(Math.random() * 4) : 0
            })
        }
        else {
            newlist = {
                year: stamp2date(i).year,
                list: []
            }
            datelist.unshift(newlist)

            newlist.list.push({
                daystamp: i,
                year: stamp2date(i).year,
                month: stamp2date(i).month,
                day: stamp2date(i).day,
                week: (i + 3) % 7,
                value: (i >= begind.daystamp && i <= endd.daystamp) ? Math.floor(Math.random() * 4) : 0
            })
        }

    }
    return datelist

}


var begin = {
    value:"2020-01-01",
    valueAsNumber :1577836800000 
}

var end = {
    value:"2023-12-31",
    valueAsNumber :1703980800000 
}


var datelist = getdatelist(begin,end)

var jsonText = JSON.stringify(datelist)



// 参考：https://blog.csdn.net/lihefei_coder/article/details/81516169

//指定创建目录及文件名称，__dirname为执行当前js文件的目录
var file = path.join('datepreview.json'); 

//写入文件
fs.writeFile(file, jsonText, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('文件创建成功，地址：' + file);
});
// console.log(jsonText)