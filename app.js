var five = require('johnny-five'),
    CronJob = require('cron').CronJob,
    Raspi = require("raspi-io"),
    board = new five.Board() || new five.Board({
        io: new Raspi()
    });

board.on('ready', function() {
    var roomLight = new five.Led(11) || new five.Led("P1-13");
    var lightOnNight = new CronJob({
        cronTime: '0 45 17 * * 1-5',
        onTick: function() {
            roomLight.on();
        },
        start: true,
        timeZone: 'Africa/johannesburg'
    });

    var lightdimm = new CronJob({
        cronTime: '00 30 18 * * 1-5',
        onTick: function() {
            roomLight.brightness(128);
        },
        start: true,
        timeZone: 'Africa/johannesburg'
    });

    var lightOffNight = new CronJob({
        cronTime: '00 00 20 * * 1-5',
        onTick: function() {
            roomLight.off();
        },
        start: true,
        timeZone: 'Africa/johannesburg'
    });

    var lightOnMorning = new CronJob({
        cronTime: '00 00 6 * * 1-5',
        onTick: function() {
            roomLight.on();
        },
        start: true,
        timeZone: 'Africa/johannesburg'
    });

    var lightOffMorning = new CronJob({
        cronTime: '00 50 6 * * 1-5',
        onTick: function() {
            roomLight.off();
        },
        start: true,
        timeZone: 'Africa/johannesburg'
    });
});
