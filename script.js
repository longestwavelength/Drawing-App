const canvas = document.getElementById('canvas'); //Canvas API
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeElem = document.getElementById('size')
const colorBoard = document.getElementById('color')
const clearElem = document.getElementById('clear')
const ctx = canvas.getContext('2d');

let size = 20
let isPressed = false
let color = "black"
let x 
let y

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
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
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

clearElem.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))


