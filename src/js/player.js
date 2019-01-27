class Player {
    constructor() {
        // Positions
        this.x = 36
        this.y = SETTINGS.HEIGHT / 2
        // Size
        this.w = 18;
        this.h = 12;
        // Y-speed or gravity
        this.yspeed = 2;
    }

    update() {
        this.y += this.yspeed;
        if (this.y > SETTINGS.HEIGHT) {
            this.y = 0;
        }
    }
}