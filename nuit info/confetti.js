
pinata = document.getElementById("target");
let timer = 0;

pinata.addEventListener("click",function(){
   timer = 1500;
   update();
   draw();

});


let canvas = document.getElementById('confetti');

let ctx = canvas.getContext('2d');
let pieces = [];
let numberOfPieces = 100;
let lastUpdateTime = Date.now();

function randomColor () {
    let colors = ['#06f','#c6f','#6cf' ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function update () {
    
    let now = Date.now(),
        dt = now - lastUpdateTime;
    
    for (let i = pieces.length - 1; i >= 0; i--) {
        let p = pieces[i];

        if (p.y > canvas.height) {
            pieces.splice(i, 1);
            continue;
        }
    
        p.y += p.gravity * dt ;
        p.rotation += p.rotationSpeed * dt;
        
    }
    
    while (pieces.length < numberOfPieces) {
            pieces.push(new Piece(Math.random() * canvas.width, -(Math.random()*200)-10));  
    }

    lastUpdateTime = now;
    timer--;
    if(timer > 0){
        setTimeout(update, 1);
    }
    
}

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(function (p) {
        ctx.save();

        ctx.fillStyle = p.color;

        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);

        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();
        
    });
        if(timer > 0){
        requestAnimationFrame(draw);
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
}

function Piece (x, y) {
    this.x = x;
    this.y = y - 200;
    this.size = (Math.random() * 0.5 + 0.75) * 2;
    this.gravity = (Math.random() * 0.5 + 0.75) * 0.1;
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * (Math.random() - 0.5) * 0.01;
    this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
    pieces.push(new Piece(Math.random() * canvas.width, -(Math.random()*200)-10));
}
