function randomY() {
    function customRnd() {
        return Math.floor(Math.random() * (PipePair.h - PipePair.headH * 4))
    }

    let rnd = customRnd();
    // Generate new random until random deltas is apropiate
    while (Math.abs(rnd - PipePair.previousRnd) < 40) {
        rnd = customRnd();
    }
    // Update previous random
    PipePair.previousRnd = rnd;
    return rnd;
}

class PipePair {
    constructor(x = 0) {
        this.x = x; // Add initial offset?
        this.topY = randomY() - PipePair.h + PipePair.headH;
        this.bottomY = this.topY + PipePair.h + PipePair.gap;
    }

    isLeftOfScreen() {
        return this.x < -(PipePair.w);
    }

    update() {
        this.x -= PipePair.xspeed;
    }

}

PipePair.w = 26;
PipePair.h = 160;
PipePair.headH = 12;
PipePair.gap = SETTINGS.HEIGHT / 4;
PipePair.xspeed = 2;
PipePair.previousRnd = -SETTINGS.HEIGHT;