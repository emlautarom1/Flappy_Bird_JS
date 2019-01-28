function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img)
        });
        img.src = url;
    });
}

function updatePipes() {
    if (pipes[0].isLeftOfScreen()) {
        pipes.splice(0, 1);
    }
    if (needToSpawnPipe()) {
        spawnPipe();
    }
    pipes.forEach(p => p.update());
}

function needToSpawnPipe() {
    return pipes[pipes.length - 1].x + PipePair.w + GLOBAL.PIPE_DISTANCE < GLOBAL.CANVAS_W;
}

function spawnPipe() {
    pipes.push(new PipePair(GLOBAL.CANVAS_W));
}

function didCollide(player, pipes) {
    if (player.y + player.h > GLOBAL.CANVAS_H - GLOBAL.FLOOR_H) {
        return true;
    }

    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        if (player.x < pipe.x + PipePair.w &&
            player.x + player.w > pipe.x &&
            player.y < pipe.topY + PipePair.h &&
            player.h + player.y > pipe.topY) {
            return true;
        }

        if (player.x < pipe.x + PipePair.w &&
            player.x + player.w > pipe.x &&
            player.y < pipe.bottomY + PipePair.h &&
            player.h + player.y > pipe.bottomY) {
            return true;
        }
    }
    return false;
}

function mainLoop() {
    draw.clear();
    // Update
    player.update();
    updatePipes();

    // Draw
    draw.background();
    draw.pipes(pipes);
    draw.floor();
    draw.player(player);

    // Collision detection
    if (didCollide(player, pipes)) {
        console.log('player collided!');
    }

    // Animation looper
    window.requestAnimationFrame(mainLoop);
    // setTimeout(() => {
    //     window.requestAnimationFrame(mainLoop);
    // }, 100);
}

// Initial setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Disable AA
canvas.setAttribute('width', GLOBAL.CANVAS_W);
canvas.setAttribute('height', GLOBAL.CANVAS_H);

// Utils
const draw = new Draw(ctx);
// Game objects
const player = new Player();
const pipes = [];
spawnPipe();

document.onclick = () => player.handler();

loadImage('src/img/tiles.png').then(
    img => {
        draw.tiles = img
        mainLoop();
    }
);