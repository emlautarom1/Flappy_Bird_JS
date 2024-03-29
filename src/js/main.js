function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.src = url;
    });
}

function updatePipes(dt) {
    if (pipes[0].isLeftOfScreen()) {
        pipes.splice(0, 1);
    }
    if (needToSpawnPipe()) {
        score.increase();
        spawnPipe();
    }
    pipes.forEach(p => p.update(dt));
}

function needToSpawnPipe() {
    return pipes[pipes.length - 1].x + PipePair.w + GLOBAL.PIPE_DISTANCE < GLOBAL.CANVAS_W;
}

function spawnPipe(offset = 0) {
    pipes.push(new PipePair(GLOBAL.CANVAS_W + offset));
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

function initGameObjects() {
    player = new Player();
    pipes = [];
    background = new Background();
    score = new Score(() => {
        scoredAudio.play();
        draw.score(score.value);
        if (score.value % 10 === 0) {
            levelUpAudio.play();
            background.flipLandscape();
        }
    });
    // Initial 0 score draw
    draw.score(score.value);
    spawnPipe(GLOBAL.PIPE_INITIAL_OFFSET);
}

function onDeath() {
    deathAudio.play();
    alert(`You lost! Your score: ${score.value}`);
    initGameObjects();
}

function mainLoop(dt) {
    draw.clear();
    // Update
    background.update(dt);
    player.update(dt);
    updatePipes(dt);

    // Draw
    draw.landscape(background);
    draw.pipes(pipes);
    draw.floor(background);
    draw.player(player);

    // Collision detection
    if (didCollide(player, pipes)) {
        onDeath();
        return;
    }
}

// Initial setup
const canvas = document.getElementById('canvas');
const dpr = window.devicePixelRatio || 1;
canvas.setAttribute('width', GLOBAL.CANVAS_W * dpr);
canvas.setAttribute('height', GLOBAL.CANVAS_H * dpr);
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);
ctx.imageSmoothingEnabled = false; // Disable AA

// Utils
const draw = new Draw(ctx);
const scoredAudio = new Audio('src/audio/scored.wav');
const deathAudio = new Audio('src/audio/death.wav');
const levelUpAudio = new Audio('src/audio/level_up.wav');

// Game objects
let player;
let pipes;
let background;
let score;

// Event handling
document.onclick = () => player.handler();
document.ontouchend = () => player.handler();

// Animation Loop
let lastTime = 0;
function animationLoop(mil) {
    if (lastTime) {
        mainLoop((mil - lastTime) / 10);
    }
    lastTime = mil;
    window.requestAnimationFrame(animationLoop);
}

// On assets load
loadImage('src/img/tiles.png').then(
    img => {
        draw.tiles = img;
        initGameObjects();
        animationLoop();
    }
);