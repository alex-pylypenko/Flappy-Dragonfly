var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var sun = new Image();


bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
sun.src = "img/sun.gif";

pipeUp.height = 300;

var gap = 200;

//document.addEventListener("keydown", moveUp);

/*function moveUp() {
    yPos -= 20;
}*/

document.onkeydown = function (event) {
    if (event.keyCode == 38) {
        yPos -= 20;
    }

    if (event.keyCode == 40) {
        yPos += 20;
    }
}

var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

var xPos = 10;
var yPos = 300;
var grav = 1;
var score = 0;

function Draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(sun, 1040, 40, 200, 200);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, 138, 300);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + 300 + gap);
        ctx.drawImage(fg, pipe[i].x - 1280, 400);
        ctx.drawImage(fg, pipe[i].x, 400);

        pipe[i].x = pipe[i].x - 5;

        if (pipe[i].x == 600) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * 300 - 300)
            });

        }

        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height ||
            yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload();
        }

        if (pipe[i].x == 5) {
            score++;
        }

    }

    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    ctx.fillStyle = "red";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 20, 35);

    requestAnimationFrame(Draw);
}

pipeBottom.onload = Draw;
