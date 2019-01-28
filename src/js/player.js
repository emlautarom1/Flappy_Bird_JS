class Player {
    constructor() {
        // Positions
        this.x = 36
        this.y = GLOBAL.CANVAS_H / 2
        // Size
        this.w = GLOBAL.PLAYER_W;
        this.h = GLOBAL.PLAYER_H;
        // Y-speed / gravity
        this.yspeed = 2;
    }

    update() {
        this.y += this.yspeed;
        if (this.y > GLOBAL.CANVAS_H) {
            this.y = 0;
        }
    }

    handler(ev) {
        console.log(ev);
        this.yspeed = 80;
        console.log(this.yspeed);
    }
}