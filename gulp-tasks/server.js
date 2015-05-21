var gulp = require('gulp');
var cp = require('child_process');

gulp.task('server:spawn', function () {
    spawnServer();
});

gulp.task('server:kill', function () {
    killServer();
});

gulp.task('server:restart', function () {
    killServer();
    spawnServer();
})

var _p;

function spawnServer() {
    if (_p) {
        _p.kill();
    }

    _p = cp.spawn('node', ['server.js'], {
        stdio: 'inherit'
    })

}

function killServer() {
    if(_p) {
        _p.kill();
    }
}

process.on('exit', function () {
    killServer();
});

