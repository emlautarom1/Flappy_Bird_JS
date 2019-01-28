class Player {
    constructor() {
        // Positions
        this.x = 36
        this.y = GLOBAL.CANVAS_H / 2
        // Size
        this.w = GLOBAL.PLAYER_W;
        this.h = GLOBAL.PLAYER_H;
        // Y-speed
        this.yspeed = 0;
    }

    update() {
        this.y = Math.floor(this.y + this.yspeed);
        // Gravity
        this.yspeed += GLOBAL.GRAVITY;
        if (this.y > GLOBAL.CANVAS_H) {
            this.y = 0;
            this.yspeed = 0;
        }
    }

    handler() {
        this.yspeed = GLOBAL.JUMP
    }
}