import { getweek } from "./getweek.js";
import { date2stamp, stamp2date } from "./date2stamp.js";

var dateb = document.getElementById('dateb')
var datee = document.getElementById('datee')
var svg = document.getElementById('calsvg')

var datebegin = dateb.valueAsNumber
var dateend = datee.valueAsNumber

if (dateend <= datebegin || !datebegin) {
    datebegin = dateend - 1000 * 3600 * 10 * 24
    dateb.valueAsNumber = dateend - 1000 * 3600 * 10 * 24
}

var datelist = []


var refresh = function () {
    let datebegin = dateb.valueAsNumber
    let dateend = datee.valueAsNumber
    if (dateend <= datebegin || !datebegin) {
        datebegin = dateend - 1000 * 3600 * 10 * 24
        dateb.valueAsNumber = dateend - 1000 * 3600 * 10 * 24
    }

    datelist = getdatelist()

    datelist.then(
         res => {
            document.getElementById('yearlist').textContent = ''

            for (let i = 0; i < res.length; ++i) {
                var li = document.createElement('li')
                var a = document.createElement('a')
                a.setAttribute("class", "year-item")
                a.class = "year-item"
                a.id = "year-link-2023"
                a.yindex = i
                a.textContent = res[i].year
                a.onclick = function () {
        
                    let items = document.getElementsByClassName('year-item')
        
                    for (let i = 0; i < items.length; ++i) {
                        // console.log(items[0])
                        items[i].style = "background-color: #FFFFFF;"
                    }
        
                    this.style = "background-color: #0969da;"
                    clearRect()
                    initRect(res[this.yindex])
        
                }
                li.appendChild(a)
                document.getElementById('yearlist').appendChild(li)
            }
            clearRect()
            initRect(res[0])
        }
    )
    

}

document.getElementById('enter').addEventListener('click', refresh)



// refer https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
// Example POST method implementation:
// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// postData('https://example.com/answer', { answer: 42 })
//     .then(data => {
//         console.log(data); // JSON data parsed by `data.json()` call
//     });


async function getdatelist() {
    var response = await fetch('/src/datepreview.json')

    return response.json()

}



function initRect(dalist) {

    var g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g1.setAttribute("transform", `translate(15, 20)`)

    svg.appendChild(g1)

    let posi = 0
    let monlabellist = [' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let mnum = 0

    var wlabel1 = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    wlabel1.setAttribute("class", "ContributionCalendar-label")
    wlabel1.setAttribute("dx", -15)
    wlabel1.setAttribute("dy", 24)
    wlabel1.textContent = 'Mon'
    g1.appendChild(wlabel1)
    var wlabel3 = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    wlabel3.setAttribute("class", "ContributionCalendar-label")
    wlabel3.setAttribute("dx", -15)
    wlabel3.setAttribute("dy", 54)
    wlabel3.textContent = 'Wed'
    g1.appendChild(wlabel3)
    var wlabel5 = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    wlabel5.setAttribute("class", "ContributionCalendar-label")
    wlabel5.setAttribute("dx", -15)
    wlabel5.setAttribute("dy", 84)
    wlabel5.textContent = 'Fri'
    g1.appendChild(wlabel5)

    for (let i = 0; i < dalist.list.length;) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

        g.setAttribute("transform", `translate(${posi}, 0)`)
        if (mnum != dalist.list[i].month) {
            mnum += 1
            var mlabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            mlabel.setAttribute("class", "ContributionCalendar-label")
            mlabel.setAttribute("x", `${posi + 16}`)
            mlabel.setAttribute("y", -8)
            mlabel.textContent = monlabellist[mnum]
            g1.appendChild(mlabel)
        }

        for (let j = dalist.list[i].week; j < 7 && i < dalist.list.length; ++j, ++i) {

            var r1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            r1.setAttribute("width", 11)
            r1.setAttribute("height", 11)
            r1.setAttribute("x", 16)
            r1.setAttribute("y", j * 15)
            r1.setAttribute("rx", 2)
            r1.setAttribute("ry", 2)
            r1.setAttribute("class", "ContributionCalendar-day rect")
            r1.setAttribute("data-level", `${dalist.list[i].value}`)
            r1.setAttribute("data-descr", 'asdasd')
            r1.onmouseover = showtip
            r1.onmouseout = function () {
                let tip = document.getElementsByClassName('svg-tip')
                tip[0].hidden = "true"
            }
            r1.textContent = `${dalist.list[i].year}年 ${dalist.list[i].month}月 ${dalist.list[i].day}日 ${dalist.list[i].value}`
            g.appendChild(r1)

        }
        g1.appendChild(g)
        posi += 16
    }




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

function clearRect() {
    // svg.selectAll ("*").remove ();
    svg.textContent = ''
}






