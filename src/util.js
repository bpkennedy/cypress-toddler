const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
const numeric = [...'0123456789']
const specialChars = [...`~\`!@#$%^&*()-_=+[{]}\\|;:'",<.>/?`] // eslint-disable-line quotes

function randomAlpha() {
  return alphabet[randomIntFromInterval(0, 25)]
}

function randomNum() {
  return numeric[randomIntFromInterval(0, 9)]
}

function randomSpecial() {
  return specialChars[randomIntFromInterval(0, 31)]
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomAlphaNumSpecial() {
  return randomAlpha() + randomNum() + randomSpecial()
}