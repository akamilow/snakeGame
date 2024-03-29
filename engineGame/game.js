import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'

import { update as updateFood, draw as drawFood} from './food.js'

import { outSideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        document.querySelector(".board-info").innerHTML = "<h1> ¡GAME OVER! <br><br> Presiona <br> <em>\"ENTER\"</em> <br> para <br> continuar </h1>"
        window.addEventListener("keyup", function (e) {
            if ( e.key == "Enter") {
                window.location.href='https://akamilow.github.io/snakeGame/';
            }
        })
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return 

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection() 
}

// ---------------------------------------------------------------------------- //

var randomColor = function() {

    var rvalue = function() {
        return Math.round(Math.random()*255)
    }
    return 'rgb(' + rvalue() + "," + rvalue() + "," + rvalue() + ")"
}
  
var button = document.querySelector('button');
  
button.onclick = function() {
    this.style.backgroundColor = randomColor();
    window.location.href='https://akamilow.github.io/snakeGame/';
}