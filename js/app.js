/*-------------------------------- Constants --------------------------------*/
const icons = ['☠️', '🕸️', '🎃', '🦇', '👻', '🪓', '💰']

/*---------------------------- Variables (state) ----------------------------*/
let bet, credit, jackpot

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message')
const jackpotEl = document.getElementById('jackpot')
const slots = document.querySelectorAll('.slots')
const betBtn = document.querySelectorAll('.place-bet')
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const currentBet = document.getElementById('current-bet')
const credits = document.getElementById('credits')

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener('click', playGame)
betBtn.forEach(btn => btn.addEventListener('click', placeBet))
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  bet = 0
  credit = 300
  jackpot = 100
  messageEl.textContent = 'Place your bet to start the game!'
  resetBtn.setAttribute('hidden', true)
  render()
}

function render() {
  bet = 0
  jackpotEl.textContent = `Jackpot : $${jackpot}`
  currentBet.textContent = `Current Bet : $${bet}`
  credits.textContent = `Credits : $${credit}`
  betBtn.forEach(btn => btn.disabled = false)
  startBtn.disabled = true
  if (credit === 0) {
    messageEl.textContent = 'Sorry you lose!'
    betBtn.forEach(btn => btn.disabled = true)
  }
}

function placeBet(evt) {
  if (evt.target.id === 'one') {
    bet = 1
  } else if (evt.target.id === 'five') {
    bet = 5
  } else {
    bet = 10
  } 
  credit -= bet
  betBtn.forEach(btn => btn.disabled = true)
  startBtn.disabled = false
  messageEl.textContent = 'Push Start to play!'
  currentBet.textContent = `Current Bet : $${bet}`
  credits.textContent = `Credits : $${credit}`
}

function playGame() {
  resetBtn.removeAttribute('hidden')
  randomize()
  const img1 = document.getElementById('img1').textContent
  const img2 = document.getElementById('img2').textContent
  const img3 = document.getElementById('img3').textContent
  if (img1 === icons[6] && img2 === icons[6] && img3 === icons[6]) {
    credit += jackpot
    messageEl.textContent = 'You win Jackpot!'
  } else if (img1 === img2 && img1 === img3) {
    credit += bet*3
    messageEl.textContent = 'You win 3x!!'
  } else if (img1 === img2 || img1 === img3 || img2 === img3) {
    credit += bet*2
    messageEl.textContent = 'You win 2x!!'
  } else {
    jackpot += bet
    messageEl.textContent = 'Try again! Place your bet'
  }
  render()
}

function randomize() {
  let randomImg
  slots.forEach(slot => {
    randomImg = Math.floor(Math.random()*7)
    slot.textContent = icons[randomImg]
  })
}



// - animation for icon display at different intervals
// - sounds/animation for jackpot
