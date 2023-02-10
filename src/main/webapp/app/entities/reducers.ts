import userDetails from 'app/entities/user-details/user-details.reducer';
import model from 'app/entities/model/model.reducer';
import history from 'app/entities/history/history.reducer';
import status from 'app/entities/status/status.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userDetails,
  model,
  history,
  status,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
