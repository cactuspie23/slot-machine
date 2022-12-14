/*-------------------------------- Constants --------------------------------*/
const icons = ['☠️', '👻', '🎃', '🦇', '🪓', '🩸', '💰']
const impact = new Audio('./assets/sounds/impact1.mp3')
const intro = new Audio('./assets/sounds/werewolf-intro.mp3')
const witch = new Audio('./assets/sounds/witch.mp3')
const laugh = new Audio('./assets/sounds/evil-laugh.wav')
const lose = new Audio('./assets/sounds/lose.wav')
const bubble = new Audio('./assets/sounds/bubbling.wav')
const organ = new Audio('./assets/sounds/organ.wav')
const ghost = new Audio('./assets/sounds/ghost.wav')

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
  intro.play()
  intro.volume = 0.5
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
    lose.play()
    lose.volume = 0.5
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
  impact.play()
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
    organ.play()
    organ.volume = 0.5
  } else if (img1 === img2 && img1  === img3) {
    credit += bet*3
    messageEl.textContent = 'You win 3x!'
    ghost.play()
    ghost.volume = 0.5
  } else if (img1 === img2 || img1 === img3 || img2 === img3) {
    credit += bet*2
    messageEl.textContent = 'You win 2x!'
    witch.play()
    witch.volume = 0.5
  } else {
    jackpot += bet
    messageEl.textContent = 'Try again! Place your bet'
    laugh.play()
    laugh.volume = 0.5
  }
  render()
}

function randomize(imgId) {
  let randomImg = Math.floor(Math.random()*7)
  const img = document.getElementById(imgId)
  img.textContent = icons[randomImg]
}

function spin() {
  let imageChangerOne = setInterval(() => randomize('img1'), 100)
  let imageChangerTwo = setInterval(() => randomize('img2'), 100)
  let imageChangerThree = setInterval(() => randomize('img3'), 100)
  startBtn.disabled = true
  bubble.play()
  bubble.volume = 0.5
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
