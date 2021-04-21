var myGamePiece;
var myBackground;
var myScore;
var myObstacles = [];

window.onload = function() {
    startGame()
}

function startGame() {
    myGamePiece = new component(40, 40, "giphy.gif", 0, 0, "image");
    myBackground = new component(656, 270, "game-background.jpg", 0, 0, "background")
    myBackground2 = new component(656, 270, "game-background.jpg", 656, 0, "background")
    myScore = new component("20px", "sans-serif", "white", 280, 40, "text")
    myGameArea.start();
}

console.log(document.getElementById("game"))
console.log(myGamePiece)

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      this.frameNo = 0;
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
      })
    },
    clear : function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
  }

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height); 
        }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fontStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }   
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            window.location.href = "Fail_Game1.html";
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    myBackground.speedX = -1;
    if (myBackground.x < -656) {
        myBackground.x = 656
    }
    myBackground.newPos();
    myBackground.update();
    myBackground2.speedX = -1;
    if (myBackground2.x < -656) {
        myBackground2.x = 656
    }
    myBackground2.newPos();
    myBackground2.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    myScore.text="Score: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    if (myGameArea.frameNo == 1000) {
        window.location.href = "Level_Passed.html"
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function Refresh() {
    window.location='Game1.html';
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode == '38') {
        musicPlay()
    }
    else if (e.keyCode == '37') {
        musicPlay()
    }
    else if (e.keyCode == '39') {
        musicPlay()
    }
    else if (e.keyCode == '40') {
        musicPlay()
    }
});

function musicPlay() {
    document.getElementById('music').volume = 0.2;
    document.getElementById('music').play();
    document.removeEventListener('click', musicPlay);
}