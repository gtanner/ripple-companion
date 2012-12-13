var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', function () {
            console.log("deviceready");
        });
        document.getElementById('connect').addEventListener('click', function () {
            app.report('deviceready');
            document.getElementById('search').style.display = 'none';
        });
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
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
            done({callback: "success", args: arguments});
        },
        function () {
            done({callback: "fail", args: arguments });
        },
        service, action, args);
    }
};
