describe('Mouse', () => {
  beforeEach(() => {
    cy.setup()
  })

  it.only('should track left click down/up and right click down/up', () => {
    cy.randomMouseDown('left')
    cy.assertMouseCounts([0,1,0,0,0])

    cy.randomMouseUp('left')
    cy.assertMouseCounts([0,1,1,0,0])

    cy.randomMouseDown('right')
    cy.assertMouseCounts([0,1,1,1,0])

    cy.randomMouseUp('right')
    cy.assertMouseCounts([0,1,1,1,1])
  })
  
  it('should randomly move mouse by count', () => {
    cy.singleMouseMove()
    cy.assertMouseCounts([1,0,0,0,0])
    
    cy.randomMouseMove(11)
    cy.assertMouseCounts([10,0,0,0,0])
  })

})
