const width = 500
const height = 500
const mouseClickCode = { left: 1, right: 3 }

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const pageX = () => {
  return randomIntFromInterval(1, width)
}

const pageY = () => {
  return randomIntFromInterval(1, height)
}

Cypress.Commands.add('setup', () => {
  cy.viewport(width, height)
  cy.visit('http://localhost:8080')
})

Cypress.Commands.add('randomMouseDown', (direction) => {
  cy.get('body').trigger('mousedown',  pageX(), pageY(), { which: mouseClickCode[direction] })
})

Cypress.Commands.add('randomMouseUp', (direction) => {
  cy.get('body').trigger('mouseup',  pageX(), pageY(), { which: mouseClickCode[direction] })
})

Cypress.Commands.add('mouseUp', (direction) => {
  cy.get('body').trigger('mouseup',  { which: mouseClickCode[direction] })
})

Cypress.Commands.add('randomMouseMove', (count) => {
  let X = pageX()
  let Y = pageY()
  cy.singleMouseMove(X, Y)
  for (let m=0;m < count;m++) {
    X += 1
    Y += 1
    cy.singleMouseMove(X, Y)
  }
})

Cypress.Commands.add('singleMouseMove', (posX = pageX(), posY = pageY()) => {
  cy.get('body').trigger('mousemove', posX, posY)
  // cy.get('body').trigger('mousemove', posX + 1, posY + 1)
})

Cypress.Commands.add('assertMouseCounts', (mouseEvents) => {
  cy.contains(`mousemove:${mouseEvents[0]}`)
  cy.contains(`leftclickdown:${mouseEvents[1]}`)
  cy.contains(`leftclickup:${mouseEvents[2]}`)
  cy.contains(`rightclickdown:${mouseEvents[3]}`)
  cy.contains(`rightclickup:${mouseEvents[4]}`)
})

Cypress.Commands.add('toddle', { prevSubject: 'element' }, () => {
  console.log('tested....')
})
