const c = document.getElementById("mainCanvas");
const ctx = c.getContext("2d");

const dot = {x:5,y:5, outline:"black",fill:"yellow",sound:'sounds/newPoint.wav'}
const line = {outline:"red",sound:'sounds/drawLine.wav'}
const triangle = {fill:'#ff00ff',sound:'sounds/fillTriangle2.wav'}

const score = 0;

const prefs = {sound:"on"}

let points = []

const toggleSound = ()=>{
    if(prefs.sound=="on"){
        prefs.sound="off"
    }else{prefs.sound="on"}
}

function getRandomColor() {
    /* Source https://stackoverflow.com/questions/1484506/random-color-generator */
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

c.addEventListener('click',function(e){
    let x = e.offsetX
    let y = e.offsetY
    let pointsCount = points.length;
    console.log(points)
    switch (pointsCount) {
        case 0:
            drawCircle(x,y,3);
            points.push([x,y])
            break;
        case 1:
            drawCircle(x,y,3);
            points.push([x,y])
            drawLine(points[0],points[1])
            break;
        case 2:
            drawCircle(x,y,3);
            points.push([x,y])
            drawLine(points[1],points[2])
            drawLine(points[2],points[0])
            fillTriangle(points[0],points[1],points[2])
            points = []
            break;
        default:
            console.log("Points count:",pointsCount)
            break;
    }
})

const soundFX = shape=>{
    if(prefs.sound=="on"){
    var audio = new Audio(shape.sound);
    audio.play();}
    else{console.log("sound disabled")}
}

const drawPoint = (x,y)=>{
    ctx.fillRect(x,y,dot.x,dot.y); // fill in the pixel at (10,10)
}

const drawCircle = (x,y,r,sAngle=0,eAngle=2)=>{
    try {
        ctx.strokeStyle = dot.outline; // line color
        ctx.beginPath();
        soundFX(dot)
        ctx.arc(x, y, r, sAngle, eAngle * Math.PI);
        ctx.stroke();
        ctx.fillStyle = dot.fill;
        ctx.fill();
    } catch (error) {
        console.error(error);
    }

}

const drawLine = (startXY,endXY)=>{
    console.log("Drawing line:",startXY,endXY)
    try {
        ctx.beginPath();
        soundFX(line)
        ctx.moveTo(startXY[0], startXY[1]);
        ctx.lineTo(endXY[0], endXY[1]);
        ctx.strokeStyle = line.outline;
        ctx.stroke();
    } catch (error) {
        console.log(error);
    }

}

const fillTriangle = (point0,point1,point2)=>{
    ctx.beginPath();
    ctx.moveTo(point0[0], point0[1]);
    ctx.lineTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.lineTo(point0[0], point0[1]);
    ctx.fillStyle =getRandomColor();
    ctx.fill();
    soundFX(triangle)
}