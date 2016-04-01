var app = {
    // Application Constructor
    initialize: function() {
        this.populateData(data);
        this.buildSchedule(data.schedule);
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvent: function(elem, func) {
        elem.addEventListener('click', func, false);
    },

    populateData: function (data) {
        if (window.localStorage.length < 1) {
            app.storeData('datetime', data.time);
            for (var day in data.schedule) {
                for (var track in data[day]) {
                    for (i = 0; i < data[day][track].length; i++) {
                        app.storeData(day + track + i + 'attend', data[day][track][i]['attend']);
                    }
                }
            }
        }
    },

    populateMySchedule: function (data) {
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
        var id = this.id;
        if (this.getAttribute('data-attend') == "true") {
            this.setAttribute('class', 'item-attend');
            this.setAttribute('data-attend', false);
            app.storeData(id, false);
        } else {
            this.setAttribute('class', 'item-attend attend');
            this.setAttribute('data-attend', true);
            app.storeData(id, true);
        }
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

        var el = document.getElementById(target.id);
        var tracks = document.getElementsByClassName('track');

        Array.prototype.forEach.call(tracks, function(elem) {
            elem.parentElement.setAttribute("class", "days");
            if (elem.id != "list" + el.id) {
                elem.setAttribute("class", "track hide");
            } else {
                elem.setAttribute("class", "track");
            }
        });
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
        for (var day in data) {
            for (var key in data[day]) {
                var tabView = document.createElement("div");
                tabView.setAttribute('id', day + key);
                tabView.setAttribute('class', 'tabs')
                this.bindEvent(tabView, this.showHide);

                var txtDiv = document.createTextNode(day + " " + key);
                tabView.appendChild(txtDiv);
                var el = document.getElementById("track-tabs");
                el.appendChild(tabView);
            }
        }

        for (var day in data) {
            var dayTrack = document.createElement("div");
            dayTrack.setAttribute("class", "days");
            dayTrack.setAttribute("id", day);
            for (var key in data[day]) {
                var track = this.buildTracks(data[day][key], day, key);
                dayTrack.appendChild(track);
            }
            var body = document.getElementById('body');
            body.appendChild(dayTrack);
        }
    },

    buildTracks: function (items, day, track) {
        var trackDiv = document.createElement('div');
        trackDiv.setAttribute('id', 'list' + day + track);
        trackDiv.setAttribute('class', 'track');

        for (var i = 0; i < items.length; i++) {
            var item = document.createElement('div');
            item.setAttribute('class', "list-item");
            item.appendChild(this.buildItemText(items[i], day, track, i));
            item.appendChild(this.buildItemAttend(items[i], day, track, i));
            trackDiv.appendChild(item);
        }

        return trackDiv;
    },

    buildItemText: function (item, day, track, num) {
        var txt = document.createElement('div');
        txt.setAttribute('class', "item-text");
        txt.setAttribute('id', day + "-" + track + "-" + num);

        this.bindEvent(txt, this.lectureDetails);

        var title = document.createElement('p');
        title.setAttribute('class', 'item-title');

        var txtTitle = document.createTextNode(item.title);
        title.appendChild(txtTitle);

        var speaker = document.createElement('p');
        speaker.setAttribute('class', 'item-speaker');

        var spk = document.createTextNode(item.speaker);
        speaker.appendChild(spk);

        var time = document.createElement('p');
        time.setAttribute('class', 'item-time');

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
        div.setAttribute('id', day + track + num + "attend");
        div.setAttribute('data-attend', item.attend);
        this.bindEvent(div, this.lectureAttend);

        if (app.getData(day + track + num + 'attend') == "true") {
            div.setAttribute('class', 'item-attend attend');
        } else {
            div.setAttribute("class", 'item-attend');
        }

        return div;
    }
};

app.initialize();
