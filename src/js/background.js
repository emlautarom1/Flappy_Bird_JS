class Background {
    constructor() {
        this.landscapePattern = 'day';
        this.xlandscape = 0;
        this.xfloor = 0;
    }

    update() {
        this.xlandscape -= GLOBAL.LANDSCAPE_SPEED;
        if (this.xlandscape < -GLOBAL.CANVAS_W) {
            this.xlandscape = 0;
        }

        this.xfloor -= GLOBAL.SPEED;
        if (this.xfloor < -GLOBAL.CANVAS_W) {
            this.xfloor = 0;
        }
    }

    landscapeSpriteX() {
        if (this.landscapePattern === 'day') {
            return 0;
        } else {
            return 146;
        }
    }

    flipLandscape() {
        if (this.landscapePattern === 'day') {
            this.landscapePattern = 'night'
        } else {
            this.landscapePattern = 'day';
        }
    }
}