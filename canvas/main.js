var canvas = document.getElementById('thingy');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var things = [];
var word = prompt("Enter a string");

context.font = "200px sans-serif";
context.textAlign = "center";
context.fillText(word, canvas.width / 2,  canvas.height / 2);

var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;

context.clearRect(0, 0, canvas.width, canvas.height);

for (height = 0; height < canvas.height; height += 12) {
    for (width = 0; width < canvas.width; width += 12) {
        current = data[((width + (height * canvas.width)) * 4) - 1];
        if (current == 255) {
            drawCircle(width, height);
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i < things.length; i++) {
        context.beginPath();
        context.arc(things[i].x, things[i].y, 5, 0, 2 * Math.PI);
        context.fillStyle = things[i].c;
        context.fill();
        if (things[i].dx && things[i].dy) {
            things[i].x += things[i].dx;
            things[i].y += things[i].dy;
        }
    }
}

function drawCircle(x, y) {
    things.push({x: x, y: y, c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16)});
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
}

document.body.onload = setInterval(draw, 15);
canvas.onclick = function() {
    for (var i=0; i < things.length; i++) {
        things[i].dx = Math.random() * 10 - 5;
        things[i].dy = Math.random() * 10 - 5;
    }
}
