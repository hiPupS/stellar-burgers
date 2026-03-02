describe('Конструктор бургера', () => {
  const API_URL = 'https://norma.education-services.ru/api';

  beforeEach(() => {
    cy.intercept('GET', `${API_URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('POST', `${API_URL}/orders`, {
      fixture: 'order.json'
    }).as('createOrder');
    cy.intercept('GET', `${API_URL}/auth/user`, {
      success: true,
      user: { email: 'test@test.com', name: 'Test' }
    }).as('getUser');
  });

  describe('Добавление ингредиента в конструктор', () => {
    it('при клике на кнопку «Добавить» ингредиент появляется в конструкторе бургера', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Добавить').first().click();
      cy.get('[class*="burger_constructor"]').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
    });
  });

  describe('Модальное окно с описанием ингредиента', () => {
    it('при клике на ингредиент открывается модальное окно с детальным описанием', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.contains('Детали ингредиента').should('exist');
    });

    it('модальное окно закрывается при клике на кнопку закрытия или оверлей', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Биокотлета из марсианской Магнолии').first().click();
      cy.get('[class*="modal"]').should('be.visible');
      cy.get('[class*="modal"]').find('button[type="button"]').click();
      cy.get('[class*="modal"]').should('not.exist');
    });

    it('в модальном окне отображаются данные того ингредиента, по которому кликнули', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.contains('Соус Spicy-X').first().click();
      cy.get('[class*="modal"]').within(() => {
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
      cy.contains('Добавить').eq(1).click();
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get('[class*="modal"]').within(() => {
        cy.contains('12345').should('exist');
        cy.contains('идентификатор заказа').should('exist');
      });

      cy.get('body').click(0, 0);
      cy.get('[class*="modal"]').should('not.exist');
      cy.contains('Выберите булки').should('exist');

      cy.clearAuthTokens();
    });
  });
});
