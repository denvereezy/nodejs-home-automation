var five = require('johnny-five'),
    Raspi = require("raspi-io"),
    board = new five.Board() || new five.Board({
        io: new Raspi()
    });

board.on('ready', function() {
    var roomLight = new five.Led(11) || new five.Led("P1-13");
    var control = setInterval(function() {
        var date = new Date(),
            currentTime = date.getHours() + ':' + date.getMinutes(),
            manualControl = date.getDay();

        switch (currentTime) {
            case process.env.roomTime || '17:50':
                roomLight.on();
                break;
            case process.env.dimmTime || '18:30':
                roomLight.brightness(128);
                break;
            case process.env.offTime || '20:00':
                roomLight.off();
                break;
            case process.env.morningOnTime || '6:00':
                roomLight.on();
                break;
            case process.env.morningOffTime || '6:45':
                roomLight.on();
                break;
        };

        switch (manualControl) {
            case 6 || 7:
                clearInterval(control);
                break;
        };
    }, 1000);
});
