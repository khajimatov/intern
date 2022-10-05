var Clock = /** @class */ (function () {
    function Clock(template) {
        this.timer = 0;
        this.template = template;
        this.data = template.data;
    }
    ;
    Clock.prototype.render = function () {
        var date = new Date();
        var dateHours = date.getHours();
        var hours = dateHours.toString();
        if (dateHours < 10) {
            hours = '0' + hours;
        }
        var dateMinutes = date.getMinutes();
        var minutes = dateMinutes.toString();
        if (dateMinutes < 10) {
            minutes = '0' + minutes;
        }
        ;
        var dateSeconds = date.getSeconds();
        var seconds = dateSeconds.toString();
        if (dateSeconds < 10) {
            seconds = '0' + seconds;
        }
        ;
        var output = this.data.replace('h', hours).replace('m', minutes).replace('s', seconds);
        console.log(output);
    };
    ;
    Clock.prototype.rend = function () {
        return this.template.data;
    };
    Clock.prototype.stop = function () {
        clearInterval(this.timer);
    };
    ;
    Clock.prototype.start = function () {
        this.render();
        this.timer = setInterval(this.render.bind(this), 1000);
        // console.log(this.timer);
    };
    ;
    return Clock;
}());
var clock = new Clock({ data: 'h:m:s' });
clock.start();
