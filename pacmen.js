let pos = 0;
let movepacman;
const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'],
    ['./images/PacMan3.png', './images/PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './images/PacMan1.png';
    newimg.width = 80;
    newimg.style.left = position.x + 'px';
    newimg.style.top = position.y + 'px';
  
    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        direction
    }
}

function update() {
    if (!pacMen.length) {
       return; 
    }
    document.getElementById('btn').disabled = true;
    pos = (pos + 1) % 2;
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        
        checkDirection(item)
        checkCollisions(item)

        item.newimg.src = pacArray[item.direction][pos];

        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    movepacman = setTimeout(update, 100);
}

// Check Pacman direction
function checkDirection(item) {
     if (item.position.x + item.velocity.x + item.newimg.width > game.offsetWidth ) item.direction = 1;
     if (item.position.x + item.velocity.x < 0) item.direction = 0; 
}

// Check Pacman Collisions with borders
function checkCollisions(item) {
     if(item.position.x + item.velocity.x < 0 || item.position.x + item.velocity.x + item.newimg.width > game.offsetWidth ){
       item.velocity.x = -item.velocity.x;
     }
     if(item.position.y + item.velocity.y < 0 || item.position.y + item.velocity.y + item.newimg.height > game.offsetHeight ){
       item.velocity.y = -item.velocity.y;
     }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

function removeLastOne() {
    pacMen.pop().newimg.remove();  // remove the last Pacman
}

function resetGame() {
    pacMen.forEach(element => {
    element.newimg.remove();  
    });
    clearTimeout(movepacman);
    document.getElementById('btn').disabled = false;
}