
'use strict';
const path = '../../data/alarmssss.json';
//const ipc = require('electron').ipcRenderer;
/* const ManiplateJson = require('../../utility/readWrite');
let utility = new ManiplateJson(path); */
var $ = require('jquery');
const fs = require('fs');

window.addEventListener('load', () => {
   let ui = new UI();
   ui.showAlarmsTable();
});

class UI {
   constructor() { }

   showAlarmsTable() {
      //utility.loadData();

      //Reading an existing alarms json file
      fs.readFile('./alarms.json', 'utf-8', (err, data) => {
         if (err) {
            document.getElementById('error').innerHTML = 'Alarm(s) not found.';
         }

         let json = JSON.parse(data);
         console.log('data: ', json);
         console.log('data: ', data);

         let text = '';
         for (const i in json) {
            text += '<tr>';
            text += '<th scope="row">' + json[i].id + '</th>';
            text += '<td>' + json[i].label + '</td>';
            text += '<td>' + json[i].day + '</td>';
            text += '<td>' + new AlarmTime().dateFormat(json[i].date) + '</td>';
            text += '<td><i class="fa fa-clock text-info"></i>&nbsp;&nbsp;' + new AlarmTime().timeFormat(json[i].date + ' ' + json[i].time) + '</td>';
            // text += '<td class="font-weight-bold"><i class="fa fa-clock text-info"></i>&nbsp;&nbsp;' + new AlarmTime().setAlarm(parseInt(json[0].millsec)) + '</td>';
            text += '<td><button id="edit" type="button" class="btn"><i class="fa fa-pencil text-dark"></i></button></td>';
            text += '<td><button id="cancel" type="button" class="btn"><i class="fa fa-trash text-danger"></i></button></td>';
            text += '</tr>'

         }

         $('#alarms').append(text);

         /* $('#alarms_table').addEventListener('click', '#cancel', function () {
            alarmInfo.html('<h5 class="text-scondary font-weight-bold"></h5>');
            $(this).closest("tr").remove();
         }); */
      });

   }
}

class AlarmTime {
   constructor() {
      this.today = new Date();
   }

   setAlarm(millisec) {
      millisec = date.valueOf() - this.today.valueOf();

      let seconds = (millisec / 1000).toFixed(0);
      let minutes = (millisec / (1000 * 60)).toFixed(0);
      let hours = (millisec / (1000 * 60 * 60)).toFixed(0);
      let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

      if (seconds < 60) {
         return seconds + " Seccond(s)";
      } else if (minutes < 60) {
         return minutes + " Minute(s)";
      } else if (hours < 24) {
         return hours + " Hour(s)";
      } else {
         return days + " Day(s)"
      }

      //let fresh = setTimeout(timeToAlarm, 500);
   }

   dateFormat(inputDate) {
      let date = new Date(inputDate);
      if (!isNaN(date.getTime())) {
         // Months use 0 index.
         return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      }
   }

   timeFormat(inputDate) {
      let now = new Date(inputDate);
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      let ampm = hour > 12 ? 'PM' : 'AM';
      hour = hour > 12 ? hour - 12 : hour;
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;

      // let display = now.toLocaleTimeString();
      return hour + ' : ' + minute + '  ' + ampm;
   }

}