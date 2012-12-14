var app = {
    initialize: function() {
        this.bind();

        var ip = localStorage["ripple-ip"];
        if (ip) {
            document.getElementById('where-is-ripple').value = ip;
            document.querySelector('#rippleconnected .pending').click();
        }
    },
    bind: function() {
        document.addEventListener('deviceready', function () {
            console.log("deviceready");
        });
        document.querySelector("#rippleconnected .pending").addEventListener('click', function () {
            var ip = document.getElementById('where-is-ripple').value;

            app.connect(ip, function (socket) {
                app.connected(socket);
                localStorage['ripple-ip'] = ip;
            },
            function () {
                alert("well fuck: " + ip);
                app.disconnected();
            });
        });

        document.querySelector("#rippleconnected .reconnect").addEventListener('click', function () {
            delete localStorage['ripple-ip'];
            app.disconnected();
        });
    },
    connected: function(socket) { 
        document.querySelector('#rippleconnected .pending').className += ' hide';
        var completeElem = document.querySelector('#rippleconnected .complete');
        completeElem.className = completeElem.className.split('hide').join('');

        var reconnectElem = document.querySelector('#rippleconnected .reconnect');
        reconnectElem.className = reconnectElem.className.split('hide').join('');

        document.getElementById('search').style.display = 'none';

        socket.on('exec', function(data, callback) {
            app.exec(data.service, data.action, data.args, callback);
        });
    },
    disconnected: function () {
        document.querySelector('#rippleconnected .complete').className += ' hide';
        document.querySelector('#rippleconnected .reconnect').className += ' hide';

        var pending = document.querySelector('#rippleconnected .pending');
        pending.className = pending.className.split('hide').join('');

        document.getElementById('search').style.display = '';
    },
    connect: function (ip, success, fail) {
        var script = document.createElement('script');

        script.src = "http://" + ip + "/socket.io/socket.io.js";
        script.onerror = function () {
            fail();
        };
        script.onload = function () {
            var socket = io.connect('http://' + ip);
            socket.on('connect', function() {
                socket.emit('set-role', {role:'device',name:device.name});
                success(socket);
            });
        };

        document.body.appendChild(script);
    },
    exec: function (service, action, args, done) {
        //This method probably doens't need to exist. 
        //
        //From ripple we are probably going to get:
        //  service
        //  action
        //  args
        //
        //In which we need to tell them if we call success or fail and with what arguments
        //to call the callback with.
        //
        //This is just a quick map to show that concept before we get all the socket.io stuff in
        cordova.exec(function () {
            done({win: true, args: arguments});
        },
        function () {
            done({win: false, args: arguments });
        },
        service, action, args);
    }
};
