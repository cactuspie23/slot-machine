/*-------------------------------- Constants --------------------------------*/
const icons = ['☠️', '👻', '🎃', '🦇', '🪓', '🩸', '💰']

/*---------------------------- Variables (state) ----------------------------*/
let bet, credit, jackpot

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message')
const jackpotEl = document.getElementById('jackpot')
const slots = document.querySelectorAll('.slots')
const betBtns = document.querySelectorAll('.place-bet')
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const currentBet = document.getElementById('current-bet')
const credits = document.getElementById('credits')

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener('click', spin)
betBtns.forEach(btn => btn.addEventListener('click', placeBet))
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  bet = 0
  credit = 100
  jackpot = 100
  messageEl.textContent = 'Place your bet!'
  resetBtn.setAttribute('hidden', true)
  slots.forEach(slot => slot.textContent = icons[6]) 
  render()
}

function render() {
  bet = 0
  jackpotEl.textContent = `Jackpot : $${jackpot}`
  currentBet.textContent = `Current Bet : $${bet}`
  credits.textContent = `Credits : $${credit}`
  betBtns.forEach(btn => btn.disabled = false)
  if (credit === 0) {
    messageEl.textContent = 'Sorry you lose!'
    betBtns.forEach(btn => btn.disabled = true)
  }
}

function placeBet(evt) {
  if (evt.target.id === 'one' && credit >= 1) {
    bet = 1
  } else if (evt.target.id === 'five' && credit >= 5) {
    bet = 5
  } else if (evt.target.id === 'ten' && credit >= 10) {
    bet = 10
  } else {
    messageEl.textContent = `You don't have enough credits`
    return
  }
  credit -= bet
  betBtns.forEach(btn => btn.disabled = true)
  startBtn.disabled = false
  messageEl.textContent = 'Spin if you dare!'
  currentBet.textContent = `Current Bet : $${bet}`
  credits.textContent = `Credits : $${credit}`
}

function getWinner() {
  resetBtn.removeAttribute('hidden')
  const img1 = document.getElementById('img1').textContent
  const img2 = document.getElementById('img2').textContent
  const img3 = document.getElementById('img3').textContent
  if (img1 === icons[6] && img2 === icons[6] && img3 === icons[6]) {
    credit += jackpot
    jackpot = 100
    messageEl.textContent = 'You win Jackpot!'
  } else if (img1 === img2 && img1  === img3) {
    credit += bet*3
    messageEl.textContent = 'You win 3x!'
  } else if (img1 === img2 || img1 === img3 || img2 === img3) {
    credit += bet*2
    messageEl.textContent = 'You win 2x!'
  } else {
    jackpot += bet
    messageEl.textContent = 'Try again! Place your bet'
  }
  render()
}

function randomizeOne() {
  let randomImg = Math.floor(Math.random()*7)
  const img1 = document.getElementById('img1')
  img1.textContent = icons[randomImg]
}

function randomizeTwo() {
  let randomImg = Math.floor(Math.random()*7)
  const img2 = document.getElementById('img2')
  img2.textContent = icons[randomImg]
}

function randomizeThree() {
  let randomImg = Math.floor(Math.random()*7)
  const img3 = document.getElementById('img3')
  img3.textContent = icons[randomImg]
}

function spin() {
  let imageChangerOne = setInterval(randomizeOne, 100)
  let imageChangerTwo = setInterval(randomizeTwo, 100)
  let imageChangerThree = setInterval(randomizeThree, 100)
  startBtn.disabled = true
  setTimeout(() => {
    clearInterval(imageChangerOne)
  }, 2500)
  setTimeout(() => {
    clearInterval(imageChangerTwo)
  }, 4000)
  setTimeout(() => {
    clearInterval(imageChangerThree)
    getWinner()
  }, 5000)
}
