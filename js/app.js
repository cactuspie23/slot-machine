/*-------------------------------- Constants --------------------------------*/
const icons = ['☠️', '🧟', '🕸️', '🦇', '👻', '🧛', '🎃', '🪓', '🩸', '⚰️', '🪦', '💰']

/*---------------------------- Variables (state) ----------------------------*/
let winner, jackpot

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
  winner = null
  messageEl.textContent = 'Place your bet to start the game!'
  resetBtn.setAttribute('hidden', true)
  render()
}

function render() {

}

function placeBet() {

}

function playGame() {

}

function randomize() {

}

function reset() {

}

// - store cached elements for message, buttons, img
// - create function to initialize the game
// - create render function
// - click events for betting
// - create function to place bet
// - create function to randomize the icon array
// - create function to play the game
// - create function to determine winner/payout
// - animation for icon display at different intervals
// - create game reset
// - sounds/animation for jackpot
