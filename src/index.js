import { getweek } from "./getweek.js";
import { date2stamp, stamp2date } from "./date2stamp.js";

var dateb = document.getElementById('dateb')
var datee = document.getElementById('datee')


dateb.oninput = datee.oninput = dateb.onchange = datee.onchange =
    function () {
        console.log(dateb.value, datee.value)
        let datebegin = dateb.valueAsNumber
        let dateend = datee.valueAsNumber
        var datelist = getdatelist(
            {
                value: dateb.value,
                valueAsNumber: dateb.valueAsNumber

            },
            {
                value: datee.value,
                valueAsNumber: datee.valueAsNumber

            })
        if (dateend <= datebegin || !datebegin) {
            datebegin = dateend - 1000 * 3600 * 10 * 24
            dateb.valueAsNumber = dateend - 1000 * 3600 * 10 * 24
        }
        initRect(datelist)
    }

var svg = document.getElementById('svg')

let datebegin = dateb.valueAsNumber
let dateend = datee.valueAsNumber
if (dateend <= datebegin || !datebegin) {
    datebegin = dateend - 1000 * 3600 * 10 * 24
    dateb.valueAsNumber = dateend - 1000 * 3600 * 10 * 24
}

let datelist = getdatelist(
    {
        value: dateb.value,
        valueAsNumber: dateb.valueAsNumber

    },
    {
        value: datee.value,
        valueAsNumber: datee.valueAsNumber

    })

initRect(datelist)


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
    console.log(begind, endd)
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
    console.log(listbegin, listend)

    var datelist = []

    var newlist = {
        year : listbegin.year,
        list : []
    }
    console.log(newlist)
    datelist.unshift(newlist)
    console.log(datelist)

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
                year : stamp2date(i).year,
                list : []
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


function initRect(datelist) {



    for (let i = 0; i < 52; ++i) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        let posi = i * 16
        // g.transform=`translate(${posi}, 0)`
        g.setAttribute("transform", `translate(${posi}, 0)`)
        for (let j = 0; j < 7; ++j) {
            var r1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            r1.setAttribute("width", 11)
            r1.setAttribute("height", 11)
            r1.setAttribute("x", 16)
            r1.setAttribute("y", j * 15)
            r1.setAttribute("rx", 2)
            r1.setAttribute("ry", 2)
            r1.setAttribute("class", "ContributionCalendar-day rect")
            r1.setAttribute("data-level", 2)
            r1.setAttribute("data-descr", 'asdasd')
            r1.onmouseover = showtip
            r1.onmouseout = function () {
                let tip = document.getElementsByClassName('svg-tip')
                tip[0].hidden = "true"
            }
            r1.textContent = `${i},${j}`
            g.appendChild(r1)
        }
        svg.appendChild(g)
    }

    // 2 contributions on December 17, 2022

    function showtip(a) {
        let b = a.target
        // console.log(b.getBoundingClientRect())
        let c = b.getBoundingClientRect()

        let tip = document.getElementsByClassName('svg-tip')[0]
        // 要显示不是将 hidden设为 false 而是删除该属性
        tip.removeAttribute("hidden");
        tip.style.setProperty("top", `${r1.x}px`)
        let d = c.left + window.pageXOffset - tip.offsetWidth / 2 + c.width / 2
        let e = c.bottom + window.pageYOffset - tip.offsetHeight - 2 * c.height
        tip.style.top = `${e}px`
        tip.style.left = `${d}px`
        tip.textContent = b.textContent
    }
}



// github 的 rect 的 mouseover 事件

// function t(a) {
//     let b = a.target;
//     if (!((b instanceof HTMLElement || b instanceof SVGElement) && b.matches("[data-level]"))) return;
//     s(), o.textContent = b.textContent, o.hidden = !1;
//     let c = b.getBoundingClientRect(),
//         d = c.left + window.pageXOffset - o.offsetWidth / 2 + c.width / 2,
//         e = c.bottom + window.pageYOffset - o.offsetHeight - 2 * c.height,
//         f = document.querySelector(".js-calendar-graph"),
//         g = f.getBoundingClientRect();
//     o.style.top = `${e}px`, u(g, d) ? (
//         o.style.left = `${w(c)}px`,
//         o.classList.add("left"),
//         o.classList.remove("right")
//     ) : v(g, d) ? (o.style.left = `${x(c)}px`,
//         o.classList.add("right"), o.classList.remove("left")) : (o.style.left = `${d}px`,
//             o.classList.remove("left"), o.classList.remove("right")
//     )
// }



