describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "julia",
      name: "Julia Shi",
      password: "julia"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('julia')
      cy.get('#password').type('julia')
      cy.get('#login').click()

      cy.contains("Julia Shi logged in")
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('julia')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'julia', password: 'julia' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title by cypress')
      cy.get('#author').type('a author by cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#create').click()
      cy.contains('a title by cypress a author by cypress')
    })

    describe('When a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({title: "test title", author: "julia", url: "juliashi.com"})
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.get('.like-button').click()
        setTimeout(() => {
          cy.get('#likes-display').then(ele => expect(ele.text()).to.equal('likes 1'))
        }, 10000)
      })

      it.only('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.get('#container').should('not.contain', 'test title')
      })
    })
    
    it('blogs are ranked by likes', function() {
      cy.createBlog({title: "most liked", author: "julia", url: "juliashi.com"})
      cy.createBlog({title: "least liked", author: "julia", url: "juliashi.com"})
      cy.contains("most liked julia").contains('view').click()
      cy.contains("most liked julia").contains('button', 'like').click()
      cy.contains("most liked julia").contains('button', 'like').click()
      setTimeout(() => {cy.get('.blog').last().contains('most liked julia')}, 10000)
    })
  })
})