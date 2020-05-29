
//'use strict';
/* const path = './../../data/alarms.json';
const ManiplateJson = require('../../utility/readWrite')
let utility = new ManiplateJson(path); */
var $ = require('jquery');
const json = require('json');

window.addEventListener('load', () => {
    let ui = new UserInterface();
    ui.displayAlarms();
});

class UserInterface {
    constructor() {
        this.today = new Date();
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];
        //this.alarmsArray = [];
        this.count = 0;
    }

    displayAlarms() {
        let setTimeBtn = document.getElementById('settime');
        let stopTimeBtn = document.getElementById('stopalarm');
        let alarmInfo = document.getElementById('alarm_info');
        let error = document.getElementById('error');
        let alarms = document.getElementById('alarms');

        const fs = require('fs');
        fs.readFile('./alarms.json', 'utf-8', (err, data) => {
            if (err) { throw err; }

            let json = JSON.parse(data);
            console.log('data: ', json);
            Math.min.apply(Math, json.map(function (i) {
                alarmInfo.innerHTML = ('<h5 class ="text-scondary font-weight-bold"><i class ="fa fa-bell h2 text-danger"></i>&nbsp;&nbsp;Next Alarm: on<span class"text-info">&nbsp;&nbsp;' + new Date(i.millsec).toLocaleDateString() + '</span></h5>');
            }));
        });

        setTimeBtn.addEventListener('click', () => {
            let alarmLabel = document.getElementById('alarm_label').value;
            let alarmDate = document.getElementById('alarm_date').value;
            let alarmTime = document.getElementById('alarm_time').value;

            if (alarmLabel.length == 0) {
                //alarmLabel.style.border = "red";
                error.innerHTML = 'Alarm lable field are required!';
            } else if (alarmDate.length == 0) {
                //alarmDate.style.borderColor = "red";
                error.innerHTML = 'Date field are required!';
            } else if (alarmTime.length == 0) {
                //alarmTime.style.borderColor = "red";
                error.innerHTML = 'Time field are required!';
            } else {
                let dateToMiliSec = new Date(alarmDate + ' ' + alarmTime).getTime();
                let newAlarms = {
                    id: this.count + 1,
                    label: alarmLabel,
                    day: this.weekdays[new Date(alarmDate).getUTCDay()],
                    date: alarmDate,
                    time: alarmTime,
                    millsec: dateToMiliSec
                }

                let alarmsArray = [];
                alarmsArray.push(newAlarms);
                //const data = alarmsArray;

                //utility.writeData(alarmsArray);

                const writedata = (jsonString) => {
                    const fs = require('fs');
                    const json = JSON.stringify(jsonString);
                    console.log(json)
                    fs.writeFile('./alarms.json', json, { flag: 'a' }, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    });
                }

                writedata(alarmsArray);

                //For debug purpose
                /* for (const element in alarmsArray) {
                    console.log(alarmsArray[element]);
                } */

                //Reading an existing alarms json file
                const fs = require('fs');
                fs.readFile('./alarms.json', 'utf-8', (err, data) => {
                    if (err) { throw err; }

                    let json = JSON.parse(data);
                    console.log('data: ', json);
                    Math.max.apply(Math, json.map(function (i) {
                        alarmInfo.innerHTML = ('<h5 class ="text-scondary font-weight-bold"><i class ="fa fa-bell h2 text-danger"></i>&nbsp;&nbsp;Next Alarm: on<span class"text-info">&nbsp;&nbsp;' + (new Date(i.millsec)).toLocaleDateString() + '</span></h5>');
                    }))
                    for (const i in json) {
                        if (json[0].millsec > json[0].millsec) {
                            alarmInfo.innerHTML = ('<h5 class ="text-scondary font-weight-bold"><i class ="fa fa-bell h2 text-danger"></i>&nbsp;&nbsp;Next Alarm: on<span class"text-info">&nbsp;&nbsp;' + (new Date(json[0].millsec * 1000)).toLocaleDateString() + '</span></h5>');
                            //alarmInfo.innerHTML = ('<h5 class ="text-scondary font-weight-bold"><i class ="fa fa-bell h2 text-danger"></i>&nbsp;&nbsp;Next Alarm: on<span class"text-info">&nbsp;&nbsp;' + this.weekdays[new Date(alarmDate).getUTCDay()] + ', ' + this.months[new Date(alarmDate).getUTCMonth()] + ' ' + new Date(alarmDate).getUTCDate() + ',  ' + new Date(alarmDate).getUTCFullYear() + '</span></h5>');
                        }
                    }
                });

                alarmLabel == '';
                alarmDate == '';
                alarmTime == '';
                error.innerHTML = ' ';
            }

            let text = '';
            text += '<tr>';
            text += '<th scope="row">' + this.count + '</th>';
            text += '<td>' + alarmLabel + '</td>';
            text += '<td>' + this.weekdays[new Date(alarmDate).getUTCDay()] + '</td>';
            text += '<td>' + alarmDate + '</td>';
            text += '<td>' + alarmTime + '</td>';
            text += '<td class="font-weight-bold"><i class="fa fa-clock text-info"></i>&nbsp;&nbsp;' + new AlarmTime().setAlarm() + '</td>';
            text += '<td><button id="edit" type="button" class="btn"><i class="fa fa-pencil text-dark"></i></button></td>';
            text += '<td><button id="cancel" type="button" class="btn"><i class="fa fa-trash text-danger"></i></button></td>';
            text += '</tr>'

            $('#alarms').append(text);

            alarmLabel == '';
            alarmDate == '';
            alarmTime == '';
        });

        /* $('#alarms_table').addEventListener('click', '#cancel', function () {
            alarmInfo.html('<h5 class="text-scondary font-weight-bold"></h5>');
            $(this).closest("tr").remove();
        }); */
    }
}

class AlarmTime {
    constructor() {
        this.today = new Date();
    }

    setAlarm() {
        let alarmInfo = document.getElementById('alarm_info');
        let alarmDate = document.getElementById('alarm_date').value;
        let alarmTime = document.getElementById('alarm_time').value;
        let date = new Date(alarmDate + ' ' + alarmTime);
        let millisec = date.valueOf() - this.today.valueOf();

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

        setInterval(() => {
            alarmInfo.innerHTML = this.createLocalTime();
        }, 1000);
        //let fresh = setTimeout(timeToAlarm, 500);
    }

}