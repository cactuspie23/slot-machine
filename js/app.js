/*-------------------------------- Constants --------------------------------*/
const icons = ['☠️', '🧟', '🕸️', '🦇', '👻', '🧛', '🎃', '🪓', '🩸', '⚰️', '🪦', '💰']

/*---------------------------- Variables (state) ----------------------------*/
let jackpot

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message')
const slots = document.querySelectorAll('.slots')
const betBtn = document.querySelectorAll('.place-bet')
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const bet = document.getElementById('current-bet')
const credits = document.getElementById('credits')

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener('click', playGame)
betBtn.forEach(btn => {
  btn.addEventListener('click', placeBet)
})
resetBtn.addEventListener('click', reset)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  jackpot = 0
  messageEl.textContent = 'Place your bet to start the game!'
  resetBtn.setAttribute('hidden', true)
  render()
}

function render() {

}

function placeBet() {
  
}

function playGame() {
  randomize()
}

function randomize() {
  let randomImg
  slots.forEach(slot => {
    randomImg = Math.floor(Math.random()*12)
    slot.textContent = icons[randomImg]
  })
}

function reset() {

}


// - create render function
// - click events for betting
// - create function to place bet
// - create function to play the game
// - create function to determine winner/payout
// - if player doesn't win, bet gets added to jackpot
// - if player wins first tier, player gets 2X the bet
// - if player wins second tier, player gets 3X
// - animation for icon display at different intervals
// - create game reset
// - sounds/animation for jackpot
