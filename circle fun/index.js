let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let w = window.innerWidth, h = window.innerHeight;

canvas.width = w
canvas.height = h

r = Math.min(w/3,h/3)
ctx.textAlign = "center"
ctx.textBaseline = "middle"

let answer = 100
let error = 0.1
let t = 120
let speed = 0.1
let progress = 1.1
let increase = 1.1
let max = 10
isdead = false

function fullReset(){
  answer = 100
  error = 0.1
  t = 120
  speed = 0.1
  progress = 1.1
  increase = 1.5
  max = 10
  isdead = false
  reset()
}

function reset(){
  geuss = ""
  isdead = false
  t = 120
  speed *= progress
  max *= increase
  answer = Math.floor(max*Math.random())
  ctx.clearRect(0,0,w,h)
  ctx.beginPath()
  ctx.arc(w/2,h/2,r+2,0,2*Math.PI)
  ctx.stroke()
  ctx.fillStyle = "black"
  ctx.font = `${r/3}px Palatino`
  ctx.fillText("How Many?",w/2,h*11/12)


  points = []

  for(let i = 0; i < answer; i++){
    let a = 0, b = 0
    while(Math.hypot(w/2-a,h/2-b)>r){
      a = Math.random()*w
      b = Math.random()*h
    }//}
    ctx.beginPath()
    ctx.arc(a,b,2,0,2*Math.PI)
    ctx.stroke()
  }
  run()
}



function run(){
  if(isdead)return
  ctx.fillStyle = 'white'
  ctx.fillRect(0,0,w,h/6-5)
  ctx.fillStyle = `hsl(${t},70%,50%)`
  ctx.fillRect(0,0,w*t/120,h/16)
  ctx.fillStyle = 'black'
  ctx.fillText(`${geuss}`,w/2,h*2/16)


  t-= speed

  if(t<0){
    timeOut()
  }else{
    requestAnimationFrame(run)
  }
}

function timeOut(){
  ctx.fillStyle = 'rgb(47, 57, 74)'
  ctx.fillRect(0,0,w,h)
  ctx.font = `italic ${r}px Palatino Linotype`

  ctx.fillStyle = 'white'
  ctx.fillText("Time's UP!",w/2,h/2)
  ctx.font = `italic ${r/12}px Palatino Linotype`
  ctx.fillText(`Any key to play again`,w/2,h*15/16)

}
function dead(){
  isdead = true
  ctx.fillStyle = 'rgb(222, 69, 61)'
  ctx.fillRect(0,0,w,h)
  ctx.font = `italic ${r}px Palatino Linotype`



  ctx.fillStyle = 'white'
  ctx.fillText("Wrong!",w/2,h/2)

  ctx.font = `italic ${r/6}px Palatino Linotype`
  ctx.fillText(`(It was ${answer}, not ${geuss})`,w/2,h*3/4)
ctx.font = `italic ${r/12}px Palatino Linotype`
  ctx.fillText(`Any key to play again`,w/2,h*15/16)

}


geuss = ""

document.addEventListener("keydown",function(e){
  console.log();
  if(isdead){
    fullReset()
    return
  }
  if(e.key=="Backspace"){
    geuss = geuss.substring(0,geuss.length-1)
  }else if(e.key=="Enter"){
    console.log("Hi!");
    console.log(Math.abs(parseInt(geuss)-answer));
    if(Math.abs(parseInt(geuss)-answer)<=answer*error){
      reset()
    }else{
      dead()
    }
  }else if (!isNaN(parseInt(e.key))){
    geuss += e.key
  }

  console.log(geuss);
})
reset()
