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
betBtn.forEach(btn => {
  btn.addEventListener('click', placeBet)
})
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  bet = 0
  credit = 300
  jackpot = 100
  jackpotEl.textContent = `Jackpot : $${jackpot}`
  messageEl.textContent = 'Place your bet to start the game!'
  currentBet.textContent = `Current Bet : $${bet}`
  credits.textContent = `Credits : $${credit}`
  resetBtn.setAttribute('hidden', true)
}

function render() {
  bet = 0
  currentBet.textContent = `Current Bet : $${bet}`
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
  if (img1 === img2 && img1 === img3) {
    credit += jackpot
    credits.textContent = `Credits : $${credit}`
  } else if (img1 === img2 || img1 === img3 || img2 === img3) {
    credit += bet*3
    credits.textContent = `Credits : $${credit}`
  } else {
    jackpot += bet
    jackpotEl.textContent = `Jackpot : $${jackpot}`
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


// - create render function
// - create function to place bet
// - create function to play the game
// - create function to determine winner/payout
// - if player doesn't win, bet gets added to jackpot
// - if player wins first tier, player gets 2X the bet
// - if player wins second tier, player gets 3X
// - animation for icon display at different intervals
// - create game reset
// - sounds/animation for jackpot
