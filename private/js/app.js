'use strict';

delete require.cache[require.resolve("../data/dayOff.json")];

import data from '../data/trad/fr';
import dayOff from '../data/dayOff';
import $ from 'jquery';


//GLOBAL FUNCTIONS
let format = function(value) {
    return (value < 10) ? "0" + value : value;
};

//GLOBAL VARS
let date = new Date();
let today = `${date.getFullYear()}-${format(date.getMonth())}-${format(date.getDate())}`;

let day = date.getDay();

function ifOff(day) {
    return dayOff.filter(
        function(data){ return data.date == day }
    );
  }

//if is a day off
let isOff = (ifOff(today).length > 0);
//if it is weekend
let ligne12;
let ligne13;

switch (day) {
    case 6:
        ligne12 = data.ligne[0].horaires[1];
        ligne13 = data.ligne[1].horaires[1];
        break;
    case 0:
        ligne12 = data.ligne[0].horaires[2];
        ligne13 = data.ligne[1].horaires[2];
        break;
    default:
        ligne12 = data.ligne[0].horaires[0];
        ligne13 = data.ligne[1].horaires[0];
  }

let whatTimeIsIt = function(){
    let calcDate = new Date();
    let h = calcDate.getHours();
    let m = calcDate.getMinutes();
    let s = calcDate.getSeconds();

    data.currentHours = format(h);
    data.currentMinutes = format(m);
    data.currentSeconds = format(s);

    data.brut = [data.currentHours, data.currentMinutes];
    data.brut = data.brut.join('');
};

let bestHours = function(table){
    
    let allHours = Object.values(table);
    let next = allHours.find(function(e){
        return e > data.brut
    });

    return (next) ? next : allHours[0]; 
};

let whatIsBestforAll = function() {
    whatTimeIsIt();
    
    let best12 = bestHours(ligne12);
    let best13 = bestHours(ligne13);
    
    data.next = whichNext(data.brut, (best12 < best13) ? best12 : best13);
    data.hNext = (best12 < best13) ? best12.slice(0, 2) : best13.slice(0, 2);
    data.mNext = (best12 < best13) ? best12.slice(2) : best13.slice(2);
    data.number = (best12 < best13) ? 12 : 13;

    changeTheme(data.number);
};

let whichNext = function(hour, next) {
    let result = next - hour;

    return (result > 1) ? result + ' minutes' : result + " minute";
};

let changeTheme = function(n) {
    let color = (n === 12) ? '#E32118' : '#007734';

    $('head').find('meta[name="theme-color"]').attr('content', color);
}

var app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: data,
    mounted : function(){
        whatIsBestforAll();
        setInterval(whatIsBestforAll, 1000);
    }
})
