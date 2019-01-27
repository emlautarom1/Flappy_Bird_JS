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
    )
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
    drawFloor(tiles);
    drawPlayer(tiles, player);
    // Animation looper
    window.requestAnimationFrame(mainLoop);
}

let tiles;
const player = new Player();

loadImage('src/img/tiles.png').then(
    img => {
        tiles = img;
        mainLoop(tiles);
    }
);