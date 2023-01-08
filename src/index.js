import { date2week } from "./date2week.js";
import { date2stamp } from "./date2stamp.js";


console.log('==============aa=================')


var svgdoc = document.getElementById('svg')





// var g =  svgdoc.createElementNS('g')


for(let i = 0 ; i < 52 ; ++i){
    var g = document.createElementNS('http://www.w3.org/2000/svg','g')
    let posi = i*16
    // g.transform=`translate(${posi}, 0)`
    g.setAttribute("transform",`translate(${posi}, 0)`)
    for(let j = 0 ; j < 7 ;++j){
        var r1 = document.createElementNS('http://www.w3.org/2000/svg','rect')
        r1.setAttribute("width",11)
        r1.setAttribute("height",11)
        r1.setAttribute("x",16)
        r1.setAttribute("y",j*15)
        r1.setAttribute("rx",2)
        r1.setAttribute("ry",2) 
        r1.setAttribute("class","ContributionCalendar-day")
        r1.setAttribute("data-level",2)
        // r1.width = 11
        // r1.height = 11
        // r1.x = 16
        // r1.y = j*15
        // r1.rx = 2
        // r1.ry = 2
        // r1.class = "ContributionCalendar-day"
        // r1.data-level  = "2"
        g.appendChild(r1)
    }
    svg.appendChild(g)
}





