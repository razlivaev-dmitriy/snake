let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d", {alpha: false});
let grid = canvas.height / 30;
let count = 0;
let delay = 0;
let mainX = 0;
let mainY = 0;
let snake = {
    x: grid*20,
    y: grid*10,
    xSpeed: grid,
    ySpeed: 0,
    cells: [],
    maxCells: 1
};
let obstacles = [{x: 0, y: 0}];
let apple = {
    x: grid*30,
    y: grid*10
};
let appleImage = document.createElement("img");
appleImage.src = "apple.png";
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
    requestAnimationFrame(loop);
    delay++;
    if (delay == 15 - Math.floor(snake.maxCells/10)) {
        delay = 0;
        count = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        snake.x += snake.xSpeed;
        snake.y += snake.ySpeed;
        if (snake.x < 0) {
            death();
        } else if (snake.x >= canvas.width) {
            death();
        }
        if (snake.y < 0) {
            death();
        } else if (snake.y >= canvas.height) {
            death();
        }
        snake.cells.unshift({ x: snake.x, y: snake.y });
        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 80; j++) {
                if (j % 2 == i % 2) {
                    context.fillStyle = "#188A00";
                }
                else {
                    context.fillStyle = "#25D500";
                }
                context.fillRect(mainX, mainY, grid, grid)
                mainX += grid;
            }
            mainY += grid;
            mainX = 0;
        }
        mainX = 0;
        mainY = 0;
        context.drawImage(appleImage, apple.x+0.5, apple.y+0.5, grid, grid);
        context.fillStyle = "black";
        for (let i = 0; i < obstacles.length; i++) {
            context.fillRect(obstacles[i].x, obstacles[i].y, grid, grid);
        }
        context.fillStyle = '#1B0773';
        snake.cells.forEach(function (cell, index) {
            context.fillRect(cell.x+0.5, cell.y+0.5, grid-1, grid-1);
            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;
                $(".flex").html(`<div class="count">${snake.maxCells-1}</div>`) 
                obstacles.push({x: 0, y: 0})
                for (let i = 0; i < obstacles.length; i++) {
                    obstacles[i].x = getRandomInt(0, 60) * grid;
                    obstacles[i].y = getRandomInt(0, 30) * grid;
                }
                apple.x = getRandomInt(0, 60) * grid;
                apple.y = getRandomInt(0, 30) * grid;
            }
            for (let i = index + 1; i < snake.cells.length; i++) {
                if (apple.x !== snake.cells[i].x || apple.y !== snake.cells[i].y) {
                    context.drawImage(appleImage, apple.x+0.5, apple.y+0.5, grid, grid);
                } else {
                    apple.x = getRandomInt(0, 60) * grid;
                    apple.y = getRandomInt(0, 30) * grid;
                }
                for (let i = 0; i < obstacles.length; i++) {
                    if (obstacles[i].x !== snake.cells[i].x || obstacles[i].y !== snake.cells[i].y) {
                        context.fillStyle = 'black';
                        context.fillRect(obstacles[i].x, obstacles[i].y, grid, grid);
                        context.fillStyle = '#1B0773';
                    } else {
                        obstacles[i].x = getRandomInt(0, 60) * grid;
                        obstacles[i].y = getRandomInt(0, 30) * grid;
                    }
                }
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    death();
                }
                for (let i = 0; i < obstacles.length; i++) {
                    if (apple.x === obstacles[i].x && apple.y === obstacles[i].y) {
                        apple.x = getRandomInt(0, 60) * grid;
                        apple.y = getRandomInt(0, 30) * grid;
                    }
                }
                for (let i = 0; i < obstacles.length; i++) {
                    if (cell.x === obstacles[i].x && cell.y === obstacles[i].y) {
                        death();
                    }
                }
            }
        });
    }
}
function death() {
    snake.x = grid;
    snake.y = grid*10;
    snake.cells = [];
    snake.maxCells = 1;
    snake.xSpeed = grid;
    snake.ySpeed = 0;
    apple.x = getRandomInt(0, 60) * grid;
    apple.y = getRandomInt(0, 30) * grid;
    obstacles = [{x: 0, y: 0}]
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x = getRandomInt(0, 60) * grid;
        obstacles[i].y = getRandomInt(0, 30) * grid;
    }
    $(".flex").html(`<div class="count">0</div>`) 
}
$("body").on('keydown', function (e) {
    if (e.key === "ArrowLeft" && snake.xSpeed === 0) {
        snake.xSpeed = -grid;
        snake.ySpeed = 0;
    } else if (e.key === "ArrowUp" && snake.ySpeed === 0) {
        snake.ySpeed = -grid;
        snake.xSpeed = 0;
    } else if (e.key === "ArrowRight" && snake.xSpeed === 0) {
        snake.xSpeed = grid;
        snake.ySpeed = 0;
    } else if (e.key === "ArrowDown" && snake.ySpeed === 0) {
        snake.ySpeed = grid;
        snake.xSpeed = 0;
    }
});
loop();
