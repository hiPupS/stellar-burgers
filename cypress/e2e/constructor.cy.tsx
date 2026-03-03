describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', '**/auth/user', {
      success: true,
      user: { email: 'test@test.com', name: 'Test' }
    }).as('getUser');
  });

  describe('Добавление ингредиента в конструктор', () => {
    it('при клике на кнопку «Добавить» ингредиент появляется в конструкторе бургера', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Добавить').first().click();
      cy.get('[data-testid="burger-constructor"]')
        .should('exist')
        .and('contain', 'Краторная булка N-200i');
    });
  });

  describe('Модальное окно с описанием ингредиента', () => {
    it('при клике на ингредиент открывается модальное окно с детальным описанием', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.contains('Детали ингредиента').should('exist');
    });

    it('модальное окно закрывается при клике на кнопку закрытия', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal"]').find('button[type="button"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('модальное окно закрывается при клике на оверлей', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('body').click(0, 0);
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('модальное окно закрывается при нажатии Escape', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('body').type('{esc}');
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('в модальном окне отображаются данные того ингредиента, по которому кликнули', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Соус Spicy-X').first().click();
      cy.get('[data-testid="modal"]').within(() => {
        cy.contains('Соус Spicy-X').should('exist');
        cy.contains('30').should('exist');
        cy.contains('20').should('exist');
        cy.contains('40').should('exist');
      });
    });
  });

  describe('Оформление заказа', () => {
    it('добавление ингредиентов, клик «Оформить заказ», модалка с номером заказа, конструктор очищается', () => {
      cy.setAuthTokens();
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Добавить').first().click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .first()
        .within(() => cy.contains('Добавить').click());
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]').within(() => {
        cy.contains('12345').should('exist');
        cy.contains('идентификатор заказа').should('exist');
      });

      cy.get('body').click(0, 0);
      cy.get('[data-testid="modal"]').should('not.exist');

      cy.get('[data-testid="burger-constructor"]').within(() => {
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
      });

      cy.clearAuthTokens();
    });
  });
});
