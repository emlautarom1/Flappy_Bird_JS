class PlayerAnimation {
    constructor() {
        this.playerSprites = [3, 31, 59, 31];
        this.currentSprite = 0;
        this.enabled = true;
    }

    update() {
        if (!this.enabled) {
            return;
        } else {
            this.enabled = false;
            this.currentSprite++;
            if (this.currentSprite === this.playerSprites.length) {
                this.currentSprite = 0;
            }
            setTimeout(() => this.enabled = true, GLOBAL.PLAYER_WINGS_ANIMATION);
        }
    }

    getPlayerSprite() {
        return this.playerSprites[this.currentSprite];
    }
}