document.addEventListener('DOMContentLoaded', () => {

document.querySelector('.fa-play-circle').addEventListener('click', clickPlay)
document.querySelector('.wasCalledHead').addEventListener('click', gameOver)

//Arrays to store bingo card numbers
const bNumbers = []
const iNumbers = []
const nNumbers = []
const gNumbers = []
const oNumbers = []

const numbersCalled = []
const ballPool = []

const onCardIDs = []
const claimedNumbers = []

let interval1
let interval2

//Generates a unique number and pushes it into the arrays
function generateB(){
  let current = Math.ceil(Math.random() * 15)
  if (bNumbers.includes(current)) {
    generateB()
  } else {
    bNumbers.push(current)
  }
}

function generateI(){
  let current = Math.ceil(Math.random() * 15 + 15)
  if (iNumbers.includes(current)) {
    generateI()
  } else {
    iNumbers.push(current)
  }
}

function generateN(){
  let current = Math.ceil(Math.random() * 15 + 30)
  if (nNumbers.includes(current)) {
    generateN()
  } else {
    nNumbers.push(current)
  }
}

function generateG(){
  let current = Math.ceil(Math.random() * 15 + 45)
  if (gNumbers.includes(current)) {
    generateG()
  } else {
    gNumbers.push(current)
  }
}

function generateO(){
  let current = Math.ceil(Math.random() * 15 + 60)
  if (oNumbers.includes(current)) {
    generateO()
  } else {
    oNumbers.push(current)
  }
}


//Generates 5 numbers per letter and prints the values on the card
function createCard() {

  let i = 0

  while (i < 5) {
    generateB()
    document.getElementById("b" + (i+1)).innerHTML = bNumbers[i]
    generateI()
    document.getElementById("i" + (i+1)).innerHTML = iNumbers[i]
    generateN()
    document.getElementById("n" + (i+1)).innerHTML = nNumbers[i]
    generateG()
    document.getElementById("g" + (i+1)).innerHTML = gNumbers[i]
    generateO()
    document.getElementById("o" + (i+1)).innerHTML = oNumbers[i]
    i++
  }
}

function ballOrder(){
  let i = 1
  
  while (i < 76){
    ballPool.push(i)
    i++
  }
}

let totalBalls = 75

function currentBall(){

  interval2 = setInterval(checkBingo, 10); 

  document.querySelector('.bingoMessage').innerHTML = ''
  
  let current = Math.floor(Math.random() * totalBalls) 
  
  if(numbersCalled.includes(ballPool[current])){
  } else {
    if(ballPool[current] == undefined){

    } else {
      
      document.querySelector('h1').innerHTML = ballPool[current]

      if(ballPool[current] <= 15 && ballPool[current] > 0){
        document.querySelector('h3').innerHTML = 'B'
      }
      if(ballPool[current] <= 30 && ballPool[current] > 15){
        document.querySelector('h3').innerHTML = 'I'
      }
      if(ballPool[current] <= 45 && ballPool[current] > 30){
        document.querySelector('h3').innerHTML = 'N'
      }
      if(ballPool[current] <= 60 && ballPool[current] > 45){
        document.querySelector('h3').innerHTML = 'G'
      }
      if(ballPool[current] <= 75 && ballPool[current] > 60){
        document.querySelector('h3').innerHTML = 'O'
      }

      //Checking if the card contains the current number and getting the id
      let q = 0

      while (q < 5) {

        if(document.getElementById("b" + (q+1)).innerHTML == ballPool[current]){
          onCardIDs.push("b" + (q+1))
          document.getElementById("b" + (q+1)).addEventListener('click', claimBox)
        }
        if(document.getElementById("i" + (q+1)).innerHTML == ballPool[current]){
          onCardIDs.push("i" + (q+1))
          document.getElementById("i" + (q+1)).addEventListener('click', claimBox)
        }
        if(document.getElementById("n" + (q+1)).innerHTML == ballPool[current]){
          onCardIDs.push("n" + (q+1))
          document.getElementById("n" + (q+1)).addEventListener('click', claimBox)
        }
        if(document.getElementById("g" + (q+1)).innerHTML == ballPool[current]){
          onCardIDs.push("g" + (q+1))
          document.getElementById("g" + (q+1)).addEventListener('click', claimBox)
        }
        if(document.getElementById("o" + (q+1)).innerHTML == ballPool[current]){
          onCardIDs.push("o" + (q+1))
          document.getElementById("o" + (q+1)).addEventListener('click', claimBox)
        }
        q++
      }

      //Creates the visual for called balls
      let wasCalled = document.querySelector('.wasCalled')
      let smallBallOuter = document.createElement('div')
      let smallBallInner = document.createElement('div')
      
      smallBallOuter.setAttribute('class', 'calledBall')
      smallBallInner.setAttribute('class', 'calledBallInner')
      smallBallOuter.appendChild(smallBallInner)
      wasCalled.appendChild(smallBallOuter)
      smallBallInner.innerHTML = ballPool[current]


      //Stores numbers called and removes from ball pool
      numbersCalled.push(ballPool[current])
      ballPool.splice(current,1)
      totalBalls--

      if(ballPool.length < 1){
        clearInterval(interval1)
      } 
    }
  }
}

function claimBox(){
  let boxID = this.getAttribute('id')
  if(claimedNumbers.includes(boxID)){
  } else {
    document.getElementById(boxID).style.background = 'aquamarine'
    claimedNumbers.push(boxID)
  }
}


//Checks for all BINGO possibilities
function checkBingo(){
  let x = claimedNumbers
  const bingoButton = document.querySelector('button')
  if(x.includes('b1') && x.includes('i1') && x.includes('n1') && x.includes('g1') && x.includes('o1')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b2') && x.includes('i2') && x.includes('n2') && x.includes('g2') && x.includes('o2')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b3') && x.includes('i3') && x.includes('n3') && x.includes('g3') && x.includes('o3')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b4') && x.includes('i4') && x.includes('n4') && x.includes('g4') && x.includes('o4')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b5') && x.includes('i5') && x.includes('n5') && x.includes('g5') && x.includes('o5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b1') && x.includes('b2') && x.includes('b3') && x.includes('b4') && x.includes('b5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('i1') && x.includes('i2') && x.includes('i3') && x.includes('i4') && x.includes('i5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('n1') && x.includes('n2') && x.includes('n3') && x.includes('n4') && x.includes('n5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('g1') && x.includes('g2') && x.includes('g3') && x.includes('g4') && x.includes('g5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('o1') && x.includes('o2') && x.includes('o3') && x.includes('o4') && x.includes('o5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b1') && x.includes('i2') && x.includes('n3') && x.includes('g4') && x.includes('o5')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else if(x.includes('b5') && x.includes('i4') && x.includes('n3') && x.includes('g2') && x.includes('o1')){
    bingoButton.addEventListener('click', claimBingo)
    bingoButton.removeEventListener('click', noBingo)
  }
  else{
    bingoButton.addEventListener('click', noBingo)
    bingoButton.removeEventListener('click', claimBingo)
  }
}

function noBingo(){
  document.querySelector('.bingoMessage').style.color = 'red'
  document.querySelector('.bingoMessage').innerHTML = 'You dont have BINGO yet!'
}

function claimBingo(){
  document.querySelector('.bingoMessage').style.color = 'green'
  document.querySelector('.bingoMessage').innerHTML = 'You got BINGO!'
  gameOver() 
}

function clickPlay(){

  createCard()
  ballOrder()
  totalBalls = 75
  let playButton = document.querySelector('.fa-play-circle')
  let h3 = document.createElement('h3')
  let h1 = document.createElement('h1')
  document.querySelector('.currentInner').removeChild(playButton)
  document.querySelector('.currentInner').appendChild(h3)
  document.querySelector('.currentInner').appendChild(h1)

  interval1 = setInterval(currentBall, 3000)
}

function gameOver(){
  clearInterval(interval1)
  clearInterval(interval2)

  //Remove current ball visual and add replay button
  let replay = document.createElement('i')
  let h3 = document.querySelector('h3')
  let h1 = document.querySelector('h1')
  document.querySelector('.currentInner').removeChild(h3)
  document.querySelector('.currentInner').removeChild(h1)
  document.querySelector('.currentInner').appendChild(replay)
  document.querySelector('i').setAttribute('class', 'fas fa-sync-alt')
  document.querySelector('.fa-sync-alt').addEventListener('click', clickReplay)
}

function clearBoard(){
  let i = 0

  while(i < 25){
    document.querySelectorAll('.box')[i].innerHTML = ''
    document.querySelectorAll('.box')[i].style.background = 'white'
    i++
  }

  let wasCalled = document.querySelector('.wasCalled')
  while(wasCalled.firstChild){
    wasCalled.removeChild(wasCalled.firstChild)
  } 

  let q = 0

  while (q < 5) {
    document.getElementById("b" + (q+1)).removeEventListener('click', claimBox)
    document.getElementById("i" + (q+1)).removeEventListener('click', claimBox)
    document.getElementById("n" + (q+1)).removeEventListener('click', claimBox)
    document.getElementById("g" + (q+1)).removeEventListener('click', claimBox)
    document.getElementById("o" + (q+1)).removeEventListener('click', claimBox)
    q++
  }

  document.querySelector('.bingoMessage').innerHTML = ''

  ballPool.splice(0)
  numbersCalled.splice(0)
  claimedNumbers.splice(0)
  bNumbers.splice(0)
  iNumbers.splice(0)
  nNumbers.splice(0)
  gNumbers.splice(0)
  oNumbers.splice(0)
  onCardIDs.splice(0)
}

function clickReplay(){
  clearBoard()
  createCard()
  ballOrder()
  totalBalls = 75
  let replayButton = document.querySelector('.fa-sync-alt')
  let h3 = document.createElement('h3')
  let h1 = document.createElement('h1')
  document.querySelector('.currentInner').removeChild(replayButton)
  document.querySelector('.currentInner').appendChild(h3)
  document.querySelector('.currentInner').appendChild(h1)
  interval1 = setInterval(currentBall, 3000); 
}

})

