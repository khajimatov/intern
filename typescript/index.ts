interface iTemplate { data: string }

class Clock {

    private timer: number = 0;
    private template: { data: string };
    private data: string;
    public constructor(template: iTemplate) {
        this.template = template;
        this.data = template.data;
    };

    private render(): void {
        let date = new Date();

        let dateHours: number = date.getHours();
        let hours: string = dateHours.toString();
        if (dateHours < 10) {
            hours = '0' + hours;
        }

        let dateMinutes: number = date.getMinutes();
        let minutes: string = dateMinutes.toString();
        if (dateMinutes < 10) {
            minutes = '0' + minutes;
        };

        let dateSeconds: number = date.getSeconds();
        let seconds: string = dateSeconds.toString();
        if (dateSeconds < 10) {
            seconds = '0' + seconds;
        };

        let output = this.data.replace('h', hours).replace('m', minutes).replace('s', seconds);

        console.log(output);
    };
    public rend(): string {
        return this.template.data;
    }
    public stop(): void {
        clearInterval(this.timer);
    };
    public start(): void {
        this.render();
        this.timer = setInterval(this.render.bind(this), 1000);
        // console.log(this.timer);
    };
}
const clock = new Clock({ data: 'h:m:s' });
clock.start();