class Draw {
    constructor(ctx) {
        this.ctx = ctx;
        this.tiles;
        this.scoreContainer = document.getElementById("score");
    }

    player(player) {
        this.ctx.drawImage(
            this.tiles,
            player.getSprite(), // Source x
            491, // Source y
            player.w,
            player.h,
            player.x,
            player.y,
            player.w,
            player.h
        );
    }

    pipes(pipes) {
        pipes.forEach(p => {
            // Top green pipe
            this.ctx.drawImage(
                this.tiles,
                56, // Source x
                323, // Source y
                PipePair.w, // Source width 
                PipePair.h, // Source height
                p.x, // Destination x
                p.topY, // Destination y
                PipePair.w, // Destination width
                PipePair.h // Destination height
            );
            // Bottom green pipe
            this.ctx.drawImage(
                this.tiles,
                84, // Source x
                323, // Source y
                PipePair.w, // Source width 
                PipePair.h, // Source height
                p.x, // Destination x
                p.bottomY, // Destination y
                PipePair.w, // Destination width
                PipePair.h // Destination height
            );
        });
    }

    landscape(bg) {
        this.ctx.drawImage(
            this.tiles,
            bg.landscapeSpriteX(), // Source x
            0, // Source y
            GLOBAL.CANVAS_W, // Source width 
            GLOBAL.CANVAS_H, // Source height
            bg.xlandscape + 1, // Destination x
            0, // Destination y
            GLOBAL.CANVAS_W, // Destination width
            GLOBAL.CANVAS_H // Destination height
        );

        this.ctx.drawImage(
            this.tiles,
            bg.landscapeSpriteX(), // Source x
            0, // Source y
            GLOBAL.CANVAS_W, // Source width 
            GLOBAL.CANVAS_H, // Source height
            bg.xlandscape + GLOBAL.CANVAS_W, // Destination x
            0, // Destination y
            GLOBAL.CANVAS_W, // Destination width
            GLOBAL.CANVAS_H // Destination height
        );
    }

    floor(bg) {
        this.ctx.drawImage(
            this.tiles,
            292, // Source x
            0, // Source y
            GLOBAL.CANVAS_W, // Source width 
            GLOBAL.FLOOR_H, // Source height
            bg.xfloor + 1, // Destination x
            GLOBAL.CANVAS_H - GLOBAL.FLOOR_H, // Destination y
            GLOBAL.CANVAS_W, // Destination width
            GLOBAL.FLOOR_H // Destination height
        );

        this.ctx.drawImage(
            this.tiles,
            292, // Source x
            0, // Source y
            GLOBAL.CANVAS_W, // Source width 
            GLOBAL.FLOOR_H, // Source height
            bg.xfloor + GLOBAL.CANVAS_W, // Destination x
            GLOBAL.CANVAS_H - GLOBAL.FLOOR_H, // Destination y
            GLOBAL.CANVAS_W, // Destination width
            GLOBAL.FLOOR_H // Destination height
        );
    }

    score(value) {
        this.scoreContainer.innerText = `SCORE: ${value}`
    }

    clear() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}