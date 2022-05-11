// ==UserScript==
// @name         Github Commit Graphs Improved
// @namespace    https://github.com/JarateKing
// @version      1.3
// @description  Improve Github's commit graphs
// @include      https://github.com/*
// @exclude      https://github.com/
// @exclude      https://github.com/*/*
// ==/UserScript==

const percent_exponent = 0.6;

const color1 = [155, 233, 168];
const color2 = [64, 196, 99];
const color3 = [48, 161, 78];
const color4 = [33, 110, 57];

(function() {
    'use strict';

    var elements = document.getElementsByClassName("ContributionCalendar-day");
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
        if (elements[i].getAttribute("data-count") !== null)
        {
            if (parseInt(elements[i].getAttribute("data-count")) == 0)
            {
                elements[i].setAttribute("style", "fill: #EBEDF0;");
            }
            else if (maxCommits == 1)
            {
                elements[i].setAttribute("style", "fill: #9BE9A8;");
            }
            else
            {
                elements[i].setAttribute("style", "fill: " + getColor(elements[i].getAttribute("data-count"),maxCommits) + ";");
            }
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