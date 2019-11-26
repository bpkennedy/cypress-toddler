describe('Keyboard', () => {
  beforeEach(() => {
    cy.setup()
  })

  it('should press a keyboard button', () => {
    cy.get('#editable').keyDown(10)
  })
})
