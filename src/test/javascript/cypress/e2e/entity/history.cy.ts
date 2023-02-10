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

describe('History e2e test', () => {
  const historyPageUrl = '/history';
  const historyPageUrlPattern = new RegExp('/history(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const historySample = {"imageSource":"Associate reboot Web"};

  let history;
  // let user;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"Chair Unbranded productivity","firstName":"Estell","lastName":"Upton"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/histories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/histories').as('postEntityRequest');
    cy.intercept('DELETE', '/api/histories/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

    cy.intercept('GET', '/api/models', {
      statusCode: 200,
      body: [],
    });

    cy.intercept('GET', '/api/statuses', {
      statusCode: 200,
      body: [],
    });

  });
   */

  afterEach(() => {
    if (history) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/histories/${history.id}`,
      }).then(() => {
        history = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Histories menu should load Histories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('history');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('History').should('exist');
    cy.url().should('match', historyPageUrlPattern);
  });

  describe('History page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(historyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create History page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/history/new$'));
        cy.getEntityCreateUpdateHeading('History');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', historyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/histories',
          body: {
            ...historySample,
            user: user,
          },
        }).then(({ body }) => {
          history = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/histories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [history],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(historyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(historyPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details History page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('history');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', historyPageUrlPattern);
      });

      it('edit button click should load edit History page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('History');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', historyPageUrlPattern);
      });

      it('edit button click should load edit History page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('History');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', historyPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of History', () => {
        cy.intercept('GET', '/api/histories/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('history').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', historyPageUrlPattern);

        history = undefined;
      });
    });
  });

  describe('new History page', () => {
    beforeEach(() => {
      cy.visit(`${historyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('History');
    });

    it.skip('should create an instance of History', () => {
      cy.get(`[data-cy="imageSource"]`).type('XML Planner').should('have.value', 'XML Planner');

      cy.get(`[data-cy="imageDestination"]`).type('Refined').should('have.value', 'Refined');

      cy.get(`[data-cy="duration"]`).type('4442').should('have.value', '4442');

      cy.get(`[data-cy="user"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        history = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', historyPageUrlPattern);
    });
  });
});
