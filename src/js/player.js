class Player {
    constructor() {
        // Positions
        this.x = 36
        this.y = SETTINGS.HEIGHT / 2
        // Size
        this.w = SETTINGS.PLAYER_W;
        this.h = SETTINGS.PLAYER_H;
        // Y-speed / gravity
        this.yspeed = 2;
    }

    update() {
        this.y += this.yspeed;
        if (this.y > SETTINGS.HEIGHT) {
            this.y = 0;
        }
    }
}