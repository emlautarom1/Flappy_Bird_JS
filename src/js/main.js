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

function drawPipe(tiles) {
    // TODO: Refactor random position generator

    // Pipe random position generator
    function customRnd() {
        return Math.floor(Math.random() * (h - headH * 4))
    }
    // Draws top and bottom pipes
    const h = 160;
    const w = 26;
    const gap = SETTINGS.HEIGHT / 4;
    const headH = 12;
    // Generate random position
    let rnd = customRnd();
    // Generate new random until random deltas is apropiate
    while (Math.abs(rnd - previousRnd) < 40) {
        rnd = customRnd();
    }
    // Update previous random
    previousRnd = rnd

    const topY = rnd - h + 12;
    const bottomY = topY + h + gap
    // Top green pipe
    ctx.drawImage(
        tiles,
        56, // Source x
        323, // Source y
        w, // Source width 
        h, // Source height
        5, // Destination x
        topY, // Destination y
        w, // Destination width
        h // Destination height
    );
    // Bottom green pipe
    ctx.drawImage(
        tiles,
        84, // Source x
        323, // Source y
        w, // Source width 
        h, // Source height
        5, // Destination x
        bottomY, // Destination y
        w, // Destination width
        h // Destination height
    );
    // Head height = 12
    // Head width = 26


}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mainLoop() {
    clearCanvas();
    // Update
    player.update();
    // Draw
    drawBG(tiles);
    drawPipe(tiles);
    drawFloor(tiles);
    drawPlayer(tiles, player);
    // Animation looper

    setTimeout(() => {
        window.requestAnimationFrame(mainLoop);
    }, 500);
}

let tiles;
let previousRnd = 0;
const player = new Player();

loadImage('src/img/tiles.png').then(
    img => {
        tiles = img;
        mainLoop(tiles);
    }
);