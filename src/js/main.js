const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Disable AA
canvas.setAttribute('width', SETTINGS.WIDTH);
canvas.setAttribute('height', SETTINGS.HEIGHT);