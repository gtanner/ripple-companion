var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
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
    }
};
