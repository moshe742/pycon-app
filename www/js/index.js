var app = {
    // Application Constructor
    initialize: function() {
        if (window.localStorage.length < 1 || app.getData('datetime') < data.time) {
            this.populateData(data);
        }
        if (!app.getObjectData('mySchedule')) {
            this.populateMySchedule();
        }
        this.buildSchedule(app.getObjectData('schedule'));
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvent: function(elem, func) {
        elem.addEventListener('click', func, false);
    },

    populateData: function (data) {
        app.storeData('datetime', data.time);
        app.storeObjectData("schedule", data.schedule);
    },

    populateMySchedule: function () {
        var schedule = app.getObjectData('schedule');
        var mySchedule = {};

        for (var day in schedule) {
            mySchedule[day] = {};
            // assuming the tracks on a day are sincronized, if not should
            // refactor to accomodate this.
            for (var i = 0; i < schedule[day][Object.keys(schedule[day])[0]].length; i++) {
                mySchedule[day][schedule[day][Object.keys(schedule[day])[0]][i]["time"]] = "";
            }
        }
        this.storeObjectData("mySchedule", mySchedule);
    },

    buildMySchedule: function () {
        var schedule = app.getObjectData('schedule');
        var mySchedule = app.getObjectData('mySchedule');
        var elemSchedule = document.getElementById('myschedule');

        for (var day in mySchedule) {
            for (var time in mySchedule[day]) {
                if (mySchedule[day][time]) {
                    var arr = mySchedule[day][time].split("-");
                    var day = arr[0];
                    var track = arr[1];
                    var num = arr[2];

                    var item = app.createElementWithAttribute('div', 'class', 'list-item');

                    item.appendChild(app.buildItemText(schedule[day][track][num], day, track, num));
                    elemSchedule.appendChild(item);
                }
            }
        }
    },

    showMySchedule: function () {
        app.buildMySchedule();
    },

    storeObjectData: function (key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },

    storeData: function (key, val) {
        window.localStorage.setItem(key, val);
    },

    getObjectData: function (key) {
        var ret = window.localStorage.getItem(key);
        return JSON.parse(ret);
    },

    getData: function (key) {
        return window.localStorage.getItem(key);
    },

    lectureAttend: function() {
        var modal = document.getElementById('modal');

        app.storeData('conflicting-schedule', this.getAttribute('id'));
        var arr = this.getAttribute('id').split('-');
        var day = arr[0];
        var track = arr[1];
        var num = arr[2];

        var schedule = app.getObjectData('schedule');
        var mySchedule = app.getObjectData('mySchedule');

        var time = schedule[day][track][num]['time'];
        if (mySchedule[day][time]) {
            modal.style.display = "block";
        } else {
            app.replaceEvent();
            return;
        }

        var txtTitle = document.createTextNode(schedule[day][track][num]['title']);

        var replacedEvent = document.getElementById('replaced-event');
        replacedEvent.appendChild(txtTitle);
    },

    cancelModal: function () {
        var modal = document.getElementById('modal');
        modal.style.display = 'none';
    },

    replaceEvent: function () {
        var id = app.getData('conflicting-schedule');
        var arr = id.split('-');
        var day = arr[0];
        var track = arr[1];
        var num = arr[2];

        var mySchedule = app.getObjectData('mySchedule');
        var schedule = app.getObjectData('schedule');
        var time = schedule[day][track][num].time;

        if (mySchedule[day][time] == id) {
            document.getElementById(id).setAttribute('class', 'item-attend');
            mySchedule[day][time] = "";
            app.storeObjectData('mySchedule', mySchedule);
        } else {
            document.getElementById(id).setAttribute('class', 'item-attend attend');
            mySchedule[day][time] = id;
            app.storeObjectData('mySchedule', mySchedule);
        }

        var modal = document.getElementById('modal');
        modal.style.display = 'none';
    },

    showHide: function() {
        var target = event.target;
        var tabs = document.getElementsByClassName('tabs');

        Array.prototype.forEach.call(tabs, function(elem) {
            if (target.id != elem.id) {
                elem.setAttribute('class', 'tabs');
            } else {
                elem.setAttribute('class', 'tabs active');
            }
        });

        var cls = target.getAttribute("class");
        target.setAttribute("class", cls + " active");

        var days = document.getElementsByClassName('days');

        Array.prototype.forEach.call(days, function(elem) {
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
        });

        if (target.id != 'myscheduletab') {
            var myschedule = document.getElementById('myschedule');
            while (myschedule.firstChild) {
                myschedule.removeChild(myschedule.firstChild);
            }
            var schedule = app.getObjectData('schedule');
            var arr = target.id.split('-');
            var day = arr[0];
            var track = arr[1];

            var e = document.getElementById(day);
            var track = app.buildTracks(schedule[day][track], day, track);
            e.appendChild(track);
        }

        var lectureText = document.getElementById('lecture-text');
        lectureText.setAttribute("class", "hide");
    },

    lectureDetails: function () {
        var el = event.currentTarget;
        var body = document.getElementById('body');
        var lectureText = document.getElementById('lecture-text');

        body.removeChild(lectureText)
        lectureText = document.createElement('div');
        lectureText.setAttribute('id', 'lecture-text');

        var dataFromJson = el.id.split("-");
        var lecture = document.createTextNode(data['schedule'][dataFromJson[0]][dataFromJson[1]][dataFromJson[2]]["lecture-abstruct"]);
        lectureText.appendChild(lecture);
        body.appendChild(lectureText);

        var days = document.getElementsByClassName('days');
        Array.prototype.forEach.call(days, function(elem) {
                elem.setAttribute("class", "days hide");
            }
        );
    },

    buildSchedule: function (data) {
        var el = document.getElementById("track-tabs");
        var mySchedule = app.createElementWithAttribute('div', 'id', 'myscheduletab');
        app.bindEvent(mySchedule, app.showMySchedule);

        mySchedule.setAttribute('class', 'tabs');
        this.bindEvent(mySchedule, this.showHide);
        var txtSchedule = document.createTextNode('My schedule');
        mySchedule.appendChild(txtSchedule);
        el.appendChild(mySchedule);

        for (var day in data) {
            for (var key in data[day]) {
                var tabView = document.createElement("div");
                tabView.setAttribute('id', day + '-' + key);
                tabView.setAttribute('class', 'tabs')
                this.bindEvent(tabView, this.showHide);

                var txtDiv = document.createTextNode(day + " " + key);
                tabView.appendChild(txtDiv);
                el.appendChild(tabView);
            }
        }

        for (var day in data) {
            var dayTrack = document.createElement("div");
            dayTrack.setAttribute("class", "days");
            dayTrack.setAttribute("id", day);
            var body = document.getElementById('body');
            body.appendChild(dayTrack);
        }
    },

    buildTracks: function (items, day, track) {
        var trackDiv = document.createElement('div');
        trackDiv.setAttribute('id', 'list' + '-' + day + '-' + track);
        trackDiv.setAttribute('class', 'track');

        var mySchedule = this.getObjectData('mySchedule');

        for (var i = 0; i < items.length; i++) {
            var item = document.createElement('div');
            item.setAttribute('class', "list-item");

            item.appendChild(this.buildItemText(items[i], day, track, i));
            item.appendChild(this.buildItemAttend(mySchedule[day][items[i].time], day, track, i));
            trackDiv.appendChild(item);
        }

        return trackDiv;
    },

    createElementWithAttribute: function (tag, attr, name) {
        var elem = document.createElement(tag);
        elem.setAttribute(attr, name);
        return elem;
    },

    buildItemText: function (item, day, track, num) {
        var txt = this.createElementWithAttribute('div', 'class', 'item-text');

        this.bindEvent(txt, this.lectureDetails);

        var title = this.createElementWithAttribute('p', 'class', 'item-title');

        var txtTitle = document.createTextNode(item.title);
        title.appendChild(txtTitle);

        var speaker = this.createElementWithAttribute('p', 'class', 'item-speaker');

        var spk = document.createTextNode(item.speaker);
        speaker.appendChild(spk);

        var time = this.createElementWithAttribute('p', 'class', 'item-time');

        var t = document.createTextNode(item.time);
        time.appendChild(t);

        txt.appendChild(title);
        txt.appendChild(speaker);
        txt.appendChild(time);
        return txt;
    },

    buildItemAttend: function (item, day, track, num) {
        var div = document.createElement('div');
        div.setAttribute('class', "item-attend");
        div.setAttribute('id', day + "-" + track + "-" + num);
        this.bindEvent(div, this.lectureAttend);

        var btnOK = document.getElementById('btn-ok');
        var btnCancel = document.getElementById('btn-cancel');

        app.bindEvent(btnOK, app.replaceEvent);
        app.bindEvent(btnCancel, app.cancelModal);

        if (item == day + "-" + track + "-" + num) {
            div.setAttribute('class', 'item-attend attend');
        } else {
            div.setAttribute("class", 'item-attend');
        }

        return div;
    }
};

app.initialize();
