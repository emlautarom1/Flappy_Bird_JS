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

function drawPlayer(tiles) {
    const w = 18;
    const h = 12;
    const leftOffset = 36;
    ctx.drawImage(
        tiles,
        3, // Source x
        491, // Source y
        w, // Source width -> Player width
        h, // Source height -> Player height
        leftOffset, // Destination x
        SETTINGS.HEIGHT / 2, // Destination y
        w, // Destination width -> Player width
        h // Destination height -> Player height
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
    drawBG(tiles);
    drawFloor(tiles);
    drawPlayer(tiles);
    // Animation looper
    window.requestAnimationFrame(mainLoop);
}

let tiles;

loadImage('src/img/tiles.png').then(
    img => {
        tiles = img;
        mainLoop(tiles);
    }
);