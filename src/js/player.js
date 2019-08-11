class Player {
    constructor() {
        // Sprite handling
        this.sprites = [3, 31, 59, 31];
        this.spriteIndex = 0;
        this.needsToUpdateSprite = true;
        // Positions
        this.x = 36;
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
        // Sprite updating
        this.updateSprite();
    }

    updateSprite() {
        if (!this.needsToUpdateSprite) {
            return;
        } else {
            this.needsToUpdateSprite = false;
            this.spriteIndex++;
            if (this.spriteIndex === this.sprites.length) {
                this.spriteIndex = 0;
            }
            setTimeout(() => this.needsToUpdateSprite = true, GLOBAL.PLAYER_WINGS_ANIMATION);
        }
    }

    getSprite() {
        return this.sprites[this.spriteIndex];
    }

    jump() {
        this.yspeed = GLOBAL.JUMP;
    }

    handler() {
        this.jump();
    }
}