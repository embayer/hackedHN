// ==UserScript==
// @name        hackedHN.js
// @namespace   https://gist.github.com/embayer/327c1eed1987f929be9f/edit
// @version     1.0
// @description big font sizes, full width and alternate mark inversion rows, colorful points, search-field on top
// @match      https://news.ycombinator.com/
// @match      https://news.ycombinator.com/news
// @copyright  2015, embayer
// ==/UserScript==

var colors = {
    points: [
        { points: 1000, color: 'fuchsia' },
        { points: 500, color: 'deeppink' },
        { points: 400, color: 'red' },
        { points: 300, color: 'crimson' },
        { points: 200, color: 'firebrick' },
        { points: 40, color: 'orangered' },
        { points: 30, color: 'tomato' },
        { points: 20, color: 'chocolate' },
        { points: 10, color: 'coral' },
        { points: 0, color: 'salmon' }
    ],
    rowEven: 'inherit',
    rowOdd: 'beige',
    headline: 'white'
};

(function styleRows() {
    'use strict';
    var trs = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

    var j = 1;
    for (var i = 0; i < trs.length; i++){
        var links = trs[i].getElementsByTagName('a');
        for (var k = 0; k < links.length; k++) {
            links[k].style['line-height'] = 'initial';
            links[k].style['font-size'] = '18pt';
        }

        if (j >= 4) {
            // even
            trs[i].style['background-color'] = colors.rowEven;
        }
        if (j < 4) {
            // odd
            trs[i].style['background-color'] = colors.rowOdd;
            trs[i].style['font-size'] = '30pt';
        } else if (j === 6) {
            j = 0;
        }
        j++;

        if (i === trs.length -4) {
            break;
        }
    }
}());

(function stylePoints() {
    'use strict';
    function greaterThan(value) {
        return function(element) {
            if (value > element.points) {
                return element.color;
            }
            return false;
        };
    }

    var ps = document.getElementsByClassName('score');
    for (var i=0; i< ps.length; i++) {
        for (var j=0; j< ps[i].childNodes.length; j++)  {
            var reg = new RegExp('^[0-9]*');
            var matches = reg.exec(ps[i].innerHTML);
            var p = parseInt(matches[0]);
            ps[i].style.color = colors.points.find(greaterThan(p)).color;
        }
    }
}());

(function moveSearch() {
    'use strict';
    var searchForm = document.getElementsByTagName('form')[0];
    searchForm.style['padding-top'] = '5px';
    var loginTd = document.getElementsByTagName('td')[3];
    loginTd.appendChild(searchForm);
}());

(function styleGlobal() {
    'use strict';
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var gs = 'body { background-color: #F6F6EF; }' +
        'span.pagetop { font-size: 20pt; }' +
        'span.rank { font-size: 15pt; }' +
        'span.comhead { font-size: 15pt; }' +
        'td.subtext { font-size: 13pt; }' +
        'td.title { font-size: 19pt; }';
    addGlobalStyle(gs);
    var hl = document.getElementsByTagName('tr')[1];
    hl.style['background-color'] = 'rgb(255, 102, 0)';
    var hn = document.getElementsByTagName('a')[1];
    hn.style.color = colors.headline;
    var th = document.getElementsByTagName('table')[1];
    th.style['padding-top'] = '15px';
    th.style['padding-bottom'] = '15px';
    var logo = document.getElementsByTagName('img')[0];
    logo.style.width = '40px';
    logo.style.height = '40px';
    logo.style.margin = '0 20px 0 15px';
    //document.getElementsByTagName('td')[0].style.display = 'none';
}());
