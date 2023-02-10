import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Model e2e test', () => {
  const modelPageUrl = '/model';
  const modelPageUrlPattern = new RegExp('/model(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const modelSample = { name: 'Savings', version: 'feed Functionality', feePerSecond: 38389, displayName: 'copying wireless Director' };

  let model;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/models+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/models').as('postEntityRequest');
    cy.intercept('DELETE', '/api/models/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (model) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/models/${model.id}`,
      }).then(() => {
        model = undefined;
      });
    }
  });

  it('Models menu should load Models page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('model');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Model').should('exist');
    cy.url().should('match', modelPageUrlPattern);
  });

  describe('Model page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(modelPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Model page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/model/new$'));
        cy.getEntityCreateUpdateHeading('Model');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', modelPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/models',
          body: modelSample,
        }).then(({ body }) => {
          model = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/models+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [model],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(modelPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Model page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('model');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', modelPageUrlPattern);
      });

      it('edit button click should load edit Model page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Model');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', modelPageUrlPattern);
      });

      it('edit button click should load edit Model page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Model');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', modelPageUrlPattern);
      });

      it('last delete button click should delete instance of Model', () => {
        cy.intercept('GET', '/api/models/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('model').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', modelPageUrlPattern);

        model = undefined;
      });
    });
  });

  describe('new Model page', () => {
    beforeEach(() => {
      cy.visit(`${modelPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Model');
    });

    it('should create an instance of Model', () => {
      cy.get(`[data-cy="name"]`).type('Buckinghamshire').should('have.value', 'Buckinghamshire');

      cy.get(`[data-cy="version"]`).type('XSS Steel withdrawal').should('have.value', 'XSS Steel withdrawal');

      cy.get(`[data-cy="feePerSecond"]`).type('99152').should('have.value', '99152');

      cy.get(`[data-cy="displayName"]`).type('visualize Fork').should('have.value', 'visualize Fork');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        model = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', modelPageUrlPattern);
    });
  });
});
