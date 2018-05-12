// ==UserScript==
// @name         Github Commit Graphs Improved
// @namespace    https://github.com/JarateKing
// @version      1.0
// @description  Improve Github's commit graphs
// @include      https://github.com/*
// ==/UserScript==

const percent_exponent = 0.7;

const r1 = 198;
const g1 = 228;
const b1 = 138;
const r2 = 123;
const g2 = 201;
const b2 = 111;
const r3 = 35;
const g3 = 154;
const b3 = 59;
const r4 = 25;
const g4 = 97;
const b4 = 39;

(function() {
    'use strict';

    var elements = document.getElementsByClassName("day");
    var maxCommits = 0;
    var maxDate = "";
    for (var i = 0; i < elements.length; i++)
    {
        if (parseInt(elements[i].getAttribute("data-count")) > maxCommits)
        {
            maxCommits = parseInt(elements[i].getAttribute("data-count"));
            maxDate = elements[i].getAttribute("data-date");
        }
    }
    for(i = 0; i < elements.length; i++)
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
    var percentage = Math.pow(parseFloat(curval)-1,percent_exponent) / Math.pow(parseFloat(maxval)-1,percent_exponent);
    var r_total;
    var g_total;
    var b_total;
    if (percentage < 0.333333)
    {
        percentage = percentage * 3;
        r_total = (r1 * (1-percentage) + r2 * percentage);
        g_total = (g1 * (1-percentage) + g2 * percentage);
        b_total = (b1 * (1-percentage) + b2 * percentage);
    }
    else if (percentage < 0.666666)
    {
        percentage = (percentage - 0.333333) * 3;
        r_total = (r2 * (1-percentage) + r3 * percentage);
        g_total = (g2 * (1-percentage) + g3 * percentage);
        b_total = (b2 * (1-percentage) + b3 * percentage);
    }
    else
    {
        percentage = (percentage - 0.666666) * 3;
        r_total = (r3 * (1-percentage) + r4 * percentage);
        g_total = (g3 * (1-percentage) + g4 * percentage);
        b_total = (b3 * (1-percentage) + b4 * percentage);
    }
    return "#" + parseInt(r_total).toString(16) + parseInt(g_total).toString(16) + parseInt(b_total).toString(16);
}