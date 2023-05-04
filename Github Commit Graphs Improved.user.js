// ==UserScript==
// @name         Github Commit Graphs Improved
// @namespace    https://github.com/JarateKing
// @version      1.4
// @description  Improve Github's commit graphs
// @match        https://github.com/*
// @exclude      https://github.com/
// @exclude      https://github.com/*/*
// ==/UserScript==

const percent_exponent = 0.5;

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
        var value = getValue(elements[i]);
        if (value > maxCommits)
        {
            maxCommits = parseInt(value);
        }
    }
    for (i = 0; i < elements.length; i++)
    {
        value = getValue(elements[i]);
        if (value !== null)
        {
            if (parseInt(value) == 0)
            {
                elements[i].style.fill = "#EBEDF0";
                elements[i].style.backgroundColor = "#EBEDF0";
            }
            else if (maxCommits == 1)
            {
                elements[i].style.fill = "#9BE9A8";
                elements[i].style.backgroundColor = "#9BE9A8";
            }
            else
            {
                var color = getColor(value, maxCommits);
                elements[i].style.fill = color;
                elements[i].style.backgroundColor = color;
            }
        }
    }
})();

function getValue(element)
{
    if (element.innerText == null)
    {
        return null;
    }
    return element.innerText.match(/\d+/)[0];
}

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
