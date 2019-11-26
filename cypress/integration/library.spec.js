describe('Library', () => {
  beforeEach(() => {
    cy.setup()
  })

  it('should get a random element within body', () => {
    cy.randomElement().mouseOver().click()
    cy.randomElement().mouseOver().click()
    cy.randomElement().mouseOver().click()
    cy.randomElement().mouseOver().click()
  })
  
  it('should toddle', () => {
    cy.toddle({
      keypressCount: 20,
      leftMouseClicks: 10,
      rightMouseClicks: 10,
    })
  })
})
