// ==UserScript==
// @name         Github Commit Graphs Improved
// @namespace    https://github.com/JarateKing
// @version      1.2
// @description  Improve Github's commit graphs
// @include      https://github.com/*
// @exclude      https://github.com/
// @exclude      https://github.com/*/*
// ==/UserScript==

const percent_exponent = 0.7;

const color1 = [198, 228, 138];
const color2 = [123, 201, 111];
const color3 = [35, 154, 59];
const color4 = [25, 97, 39];

(function() {
    'use strict';

    var elements = document.getElementsByClassName("day");
    var maxCommits = 0;
    for (var i = 0; i < elements.length; i++)
    {
        if (parseInt(elements[i].getAttribute("data-count")) > maxCommits)
        {
            maxCommits = parseInt(elements[i].getAttribute("data-count"));
        }
    }
    for (i = 0; i < elements.length; i++)
    {
        if (parseInt(elements[i].getAttribute("data-count")) == 0)
        {
           elements[i].setAttribute("fill", "#EEEEEE");
        }
        else if (maxCommits == 1)
        {
            elements[i].setAttribute("fill", "#C6E48A");
        }
        else
        {
            elements[i].setAttribute("fill", getColor(elements[i].getAttribute("data-count"),maxCommits));
        }
    }
})();

function getColor(curval,maxval)
{
    var percentage = Math.pow(parseFloat(curval)-1,percent_exponent) / Math.pow(parseFloat(maxval)-1, percent_exponent);
    var total = [0,0,0];
    for (var i = 0; i < 3; i++)
    {
        if (percentage < 0.333333)
        {
            var newpercent = percentage * 3;
            total[i] = (color1[i] * (1-newpercent) + color2[i] * newpercent);
        }
        else if (percentage < 0.666666)
        {
            newpercent = (percentage - 0.333333) * 3;
            total[i] = (color2[i] * (1-newpercent) + color3[i] * newpercent);
        }
        else
        {
            newpercent = (percentage - 0.666666) * 3;
            total[i] = (color3[i] * (1-newpercent) + color4[i] * newpercent);
        }
    }
    return "#" + parseInt(total[0]).toString(16) + parseInt(total[1]).toString(16) + parseInt(total[2]).toString(16);
}