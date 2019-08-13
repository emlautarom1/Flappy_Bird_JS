class Score {
    constructor(onIncrease) {
        this.value = 0;
        this.onIncrease = onIncrease;
        this.needsToRedraw = true;
    }

    increase() {
        this.value++;
        this.needsToRedraw = true;
        this.onIncrease();
    }
}