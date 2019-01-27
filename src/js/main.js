const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Disable AA
canvas.setAttribute('width', SETTINGS.WIDTH);
canvas.setAttribute('height', SETTINGS.HEIGHT);

function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img)
        });
        img.src = url;
    });
}

function drawBG(tiles) {
    ctx.drawImage(
        tiles,
        0, // Source x
        0, // Source y
        SETTINGS.WIDTH, // Source width 
        SETTINGS.HEIGHT, // Source height
        0, // Destination x
        0, // Destination y
        SETTINGS.WIDTH, // Destination width
        SETTINGS.HEIGHT // Destination height
    )
};

function drawPlayer(tiles, player) {
    ctx.drawImage(
        tiles,
        3, // Source x
        491, // Source y
        player.w,
        player.h,
        player.x,
        player.y,
        player.w,
        player.h
    )
}

function drawFloor(tiles) {
    const h = 56;
    ctx.drawImage(
        tiles,
        292, // Source x
        0, // Source y
        SETTINGS.WIDTH, // Source width 
        h, // Source height
        0, // Destination x
        SETTINGS.HEIGHT - h, // Destination y
        SETTINGS.WIDTH, // Destination width
        h // Destination height
    );
}

function drawPipes(tiles, pipes) {
    pipes.forEach(p => {
        // Top green pipe
        ctx.drawImage(
            tiles,
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
        ctx.drawImage(
            tiles,
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

function initPipes(count) {
    for (let i = 0; i < count; i++) {
        pipes.push(new PipePair(
            SETTINGS.WIDTH +
            PipePair.w * i +
            SETTINGS.PIPE_DISTANCE * i
        ));
    }
}

function updatePipes() {
    pipes.forEach(p => p.update());
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mainLoop() {
    clearCanvas();
    // Update
    player.update();
    updatePipes();
    // Draw
    drawBG(tiles);
    drawPipes(tiles, pipes);
    drawFloor(tiles);
    drawPlayer(tiles, player);
    // Animation looper

    setTimeout(() => {
        window.requestAnimationFrame(mainLoop);
    }, 50);
}

let tiles;
// Game objects
const player = new Player();
let pipes = []

initPipes(3);
loadImage('src/img/tiles.png').then(
    img => {
        tiles = img;
        mainLoop(tiles);
    }
);