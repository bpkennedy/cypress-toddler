import { randomAlphaNumSpecial, randomIntFromInterval } from './util'

const width = Cypress.config('viewportWidth')
const height = Cypress.config('viewportHeight')
const mouseClickCode = { left: 1, right: 3 }

const pageX = () => {
  return randomIntFromInterval(1, width)
}

const pageY = () => {
  return randomIntFromInterval(1, height)
}

Cypress.Commands.add('setup', () => {
  cy.viewport(width + 50, height + 50)
  cy.visit('http://localhost:8080')
})

Cypress.Commands.add('mouseOver', { prevSubject: true }, subject => {
  return subject.trigger('mouseover')
})

Cypress.Commands.add('mouseUp', { prevSubject: 'optional' }, (subject, direction) => {
  if (subject) {
    return subject.trigger('mouseup', { which: mouseClickCode[direction] })
  }
  return cy.get('body').trigger('mouseup', pageX(), pageY(), { which: mouseClickCode[direction] })
})

Cypress.Commands.add('mouseDown', { prevSubject: 'optional' }, (subject, direction) => {
  if (subject) {
    return subject.trigger('mousedown', { which: mouseClickCode[direction] })
  }
  return cy.get('body').trigger('mousedown',  pageX(), pageY(), { which: mouseClickCode[direction] })
})

Cypress.Commands.add('mouseMove', (steps) => {
  let X = pageX()
  let Y = pageY()
  cy.get('body').trigger('mousemove', X, Y)
  for (let m=0; m < steps; m++) {
    X += X + 20 < width ? 20 : 0
    Y += X + 20 < height ? 20 : 0
    cy.get('body').trigger('mousemove', X, Y)
  }
})

Cypress.Commands.add('keyDown', { prevSubject: 'optional' }, (subject, count) => {
  for (let i=0; i < count; i++) {
    if (subject) {
      cy.get(subject).type(randomAlphaNumSpecial(), { release: false })
      continue
    }
    cy.get('body').type(randomAlphaNumSpecial(), { release: false })
  }
  return subject ? cy.get(subject) : cy.get('body')
})

Cypress.Commands.add('randomElement', () => {
  const allElements = Cypress.$('body *')
  const randomNumber = Math.floor(Math.random() * allElements.length)
  return cy.get(allElements[randomNumber])
})

Cypress.Commands.add('assertMouseCounts', (mouseEvents) => {
  cy.contains(`mousemove:${mouseEvents[0]}`)
  cy.contains(`leftclickdown:${mouseEvents[1]}`)
  cy.contains(`leftclickup:${mouseEvents[2]}`)
  cy.contains(`rightclickdown:${mouseEvents[3]}`)
  cy.contains(`rightclickup:${mouseEvents[4]}`)
})

Cypress.Commands.add('toddle', { prevSubject: 'optional' }, (subject, options) => {
  if (options.keypressCount) {
    cy.keyDown(options.keypressCount)
  }
  if (options.leftMouseClicks) {
    for (let j=0; j < options.leftMouseClicks; j++) {
      cy.mouseDown('left')
      cy.mouseMove(2)
      cy.mouseUp()
    }
  }
  if (options.rightMouseClicks) {
    for (let j=0; j < options.rightMouseClicks; j++) {
      cy.mouseDown('right')
      cy.mouseMove(2)
      cy.mouseUp()
    }
  }
})
