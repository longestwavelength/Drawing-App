const canvas = document.getElementById('canvas'); //Canvas API
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeElem = document.getElementById('size')
const colorBoard = document.getElementById('color')
const clearElem = document.getElementById('clear')
const eraserBtn = document.getElementById('eraser')
const ctx = canvas.getContext('2d');


let size = 10
let isPressed = false
let color = "black"
let x 
let y
let eraserMode = false

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed){
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
    
})

function updateSizeOnScreen() {
    sizeElem.innerText = size
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true)
    if(eraserBtn.className === 'on') {
        ctx.fillStyle = '#f7f5f7';
        //ctx.globalAlpha = 1.0;
    } else {
        ctx.fillStyle = color
        //ctx.globalAlpha = 1.0;
    }
    ctx.fill()
    ctx.globalAlpha = 1.0;
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    if (eraserBtn.className === 'on') {
        ctx.strokeStyle = '#f7f5f7';
       // ctx.globalAlpha = 1.0;
    } else {
        ctx.strokeStyle = color;
      //  ctx.globalAlpha = 1.0;
    }
    ctx.lineWidth = size * 2
    ctx.stroke()
    ctx.globalAlpha = 1.0;
}


increaseBtn.addEventListener('click', (e) => {
    size += 2
    if(size > 50){
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', (e) => {
    size -= 2
    if(size < 2){
        size = 2
    }

    updateSizeOnScreen()
})

colorBoard.addEventListener('change', (e) =>
    color = e.target.value
)



eraserBtn.addEventListener('click', (e) => {
    eraserMode = !eraserMode
    if(eraserMode){
        eraserBtn.classList.add('on')
        eraserBtn.classList.remove('off')
    } else {    
        eraserBtn.classList.remove('on')
        eraserBtn.classList.add('off')
        
    }

})


clearElem.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
