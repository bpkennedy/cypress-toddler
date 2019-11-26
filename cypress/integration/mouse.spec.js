describe('Mouse', () => {
  beforeEach(() => {
    cy.setup()
  })

  it('should track left click down/up and right click down/up', () => {
    cy.mouseDown('left')
    cy.assertMouseCounts([0,1,0,0,0])

    cy.mouseUp('left')
    cy.assertMouseCounts([0,1,1,0,0])

    cy.mouseDown('right')
    cy.assertMouseCounts([0,1,1,1,0])

    cy.mouseUp('right')
    cy.assertMouseCounts([0,1,1,1,1])
  })
  
  it('should randomly move mouse by count', () => {
    cy.mouseMove(10)
    cy.assertMouseCounts([10,0,0,0,0])
  })
})
