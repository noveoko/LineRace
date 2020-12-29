const c = document.getElementById("mainCanvas");
const ctx = c.getContext("2d");
const dot = {x:5,y:5, outline:"black",fill:"yellow",sound:'sounds/newPoint.wav'};
const line = {outline:"red",sound:'sounds/drawLine.wav'};
const triangle = {fill:'#ff00ff',sound:'sounds/fillTriangle2.wav'};
const prefs = {sound:"on"};
const info = {score:0, level:0}

const startGame = function(){
    console.log('Game started...')

}

const levels = {
    0:{time:60000,shapes:2},
    1:{time:45000,shapes:3},
    2:{time:35000,shapes:5},
    3:{time:30000,shapes:7},
    4:{time:28000,shapes:9},
    5:{time:25000,shapes:11},
    6:{time:22000,shapes:13},
    7:{time:20000,shapes:15},
    8:{time:20000,shapes:15},
    9:{time:19000,shapes:16},
    10:{time:18000,shapes:17},
}

startGame();

const startLevel = function(){
    let currentLevel = info.level;
    console.log(`Starting level ${currentLevel}`);
}


const canvasArea = function(){
    let cHeight = ctx.canvas.clientWidth;
    let cWidth = ctx.canvas.clientHeight;
    return cHeight*cWidth;
}

const points = {data:[],canvasArea:canvasArea(), shapeArea:0}

c.addEventListener('click',function(e){
    let x = e.offsetX
    let y = e.offsetY
    let currentShape = points.data;
    let shapeIndex;
    if(points.data.length==0){
        points.data.push([]);
    }
    shapeIndex = points.data.length-1;
    currentShape = points.data[shapeIndex]
    vectorCount = currentShape.length;
    switch (vectorCount) {
        case 0:
            drawCircle(x,y,3);
            currentShape.push([x,y])
            break;
        case 1:
            drawCircle(x,y,3);
            currentShape.push([x,y])
            drawLine(currentShape[0],currentShape[1])
            break;
        case 2:
            drawCircle(x,y,3);
            currentShape.push([x,y])
            drawLine(currentShape[1],currentShape[2])
            drawLine(currentShape[2],currentShape[0])
            fillTriangle(currentShape[0],currentShape[1],currentShape[2])
            points.data.push([])
            break;
        default:
            console.log("Points count:",vectorCount)
            break;
    }
})

const toggleSound = ()=>{
    if(prefs.sound=="on"){
        prefs.sound="off"
    }else{prefs.sound="on"}
}

const randomColor = function() {
/* Source https://stackoverflow.com/questions/1484506/random-color-generator */
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
const updateScore = function(){
    let target = document.getElementById('score');
    target.textContent = score.total;
}



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

const restartLevel = function(){

}

const drawLine = (startXY,endXY)=>{
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
const dashboard = function(){
    let canvasAreaVal = canvasArea();
    let areaCovered = points.shapeArea;
    let levelDB = document.getElementById("level");
    levelDB.value=level.current;
    let scoreDB = document.getElementById("score");
    scoreDB.value = 0;
    let totalAreaDB = document.getElementById("totalArea");
    totalAreaDB.value=canvasArea();
    let areaRemainingDB = document.getElementById("areaRemaining");
    areaRemainingDB.value= canvasAreaVal-=areaCovered;
    let shapesRemainingDB = document.getElementById("shapesRemaining");
    shapesRemainingDB.value =0;
}

const fillTriangle = (point0,point1,point2)=>{
    ctx.beginPath();
    ctx.moveTo(point0[0], point0[1]);
    ctx.lineTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.lineTo(point0[0], point0[1]);
    ctx.fillStyle = randomColor();
    ctx.fill();
    updateScore();
    soundFX(triangle)
    //calculate and sum area
    let area = triangleArea([point0,point1,point2])
    points.shapeArea+=area;
    //update dashboard
    dashboard();

}

const triangleArea = function(list_of_vectors){
    //adapted to code from: https://www.onlinemath4all.com/area-of-triangle-in-coordinate-geometry.html
    v1 = list_of_vectors[0]
    v2 = list_of_vectors[1]
    v3 = list_of_vectors[2]

    let area = ((v1[0]*v2[1])+(v2[0]*v3[1])+(v3[0]*v1[1]))-((v2[0]*v1[1])+(v3[0]*v2[1])+(v1[0]*v3[1]))/2
    return Math.abs(area)
}

dashboard();
